// A small felt-piano synthesiser on the Web Audio API. No samples: each note
// is a handful of slightly inharmonic sine partials (as a real string's are)
// through a lowpass that closes as the note rings, plus a short burst of
// filtered noise for the hammer.
//
//   voices → expression → tone ─┬─ dry ──┬→ volume → compressor → speakers
//                         air ──┘└ reverb ┘                     └→ meters

export interface PianoParams {
  /** Room hiss under the piano, like a tape or a quiet room. */
  air: number;
  /** Scales every note's velocity. */
  dynamics: number;
  expression: number;
  /** How much felt sits between hammer and string: darker, softer attack. */
  felt: number;
  /** How long a note rings after the key (or pedal) lets go. */
  release: number;
  reverb: number;
  /** Size of the reverb's room. */
  space: number;
  /** Brightness of the whole instrument. */
  tone: number;
  volume: number;
}

interface Voice {
  endsAt: number;
  held: boolean;
  midi: number;
  out: GainNode;
  sources: AudioScheduledSourceNode[];
  sustained: boolean;
}

const MAX_VOICES = 40;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function midiToFrequency(midi: number) {
  return 440 * 2 ** ((midi - 69) / 12);
}

export class PianoEngine {
  private ctx: AudioContext | null = null;
  private expression!: GainNode;
  private tone!: BiquadFilterNode;
  private dry!: GainNode;
  private wet!: GainNode;
  private reverb!: ConvolverNode;
  private air!: GainNode;
  private volume!: GainNode;
  private meters: AnalyserNode[] = [];
  private meterData = new Float32Array(1024);
  private analyser: AnalyserNode | null = null;
  private spectrumData = new Float32Array(2048);
  private noise!: AudioBuffer;
  private voices = new Map<number, Voice>();
  private sustain = false;
  private soft = false;
  private params: PianoParams;
  private impulseTimer: ReturnType<typeof setTimeout> | undefined;

  constructor(params: PianoParams) {
    this.params = { ...params };
  }

  get started() {
    return this.ctx !== null;
  }

  /** Call from a user gesture: browsers only allow audio to start there. */
  start() {
    if (!this.ctx) {
      this.build();
    }
    if (this.ctx?.state === "suspended") {
      this.ctx.resume();
    }
  }

  dispose() {
    clearTimeout(this.impulseTimer);
    this.ctx?.close();
    this.ctx = null;
    this.voices.clear();
  }

  setParams(next: Partial<PianoParams>) {
    const spaceChanged =
      next.space !== undefined && next.space !== this.params.space;
    this.params = { ...this.params, ...next };
    this.apply();
    if (spaceChanged) {
      clearTimeout(this.impulseTimer);
      this.impulseTimer = setTimeout(() => this.buildImpulse(), 160);
    }
  }

  setSoft(on: boolean) {
    this.soft = on;
  }

  setSustain(on: boolean) {
    this.sustain = on;
    if (on) {
      return;
    }
    for (const voice of [...this.voices.values()]) {
      if (voice.sustained && !voice.held) {
        this.release(voice);
      }
    }
  }

  /** Left and right output levels, 0–1 on a −60 to 0 dB scale. */
  levels(): [number, number] {
    if (!this.ctx || this.meters.length < 2) {
      return [0, 0];
    }
    const [left, right] = this.meters.map((meter) => {
      meter.getFloatTimeDomainData(this.meterData);
      let sum = 0;
      for (const sample of this.meterData) {
        sum += sample * sample;
      }
      const rms = Math.sqrt(sum / this.meterData.length);
      const db = 20 * Math.log10(rms || 1e-6);
      return clamp((db + 60) / 60, 0, 1);
    });
    return [left, right];
  }

  /** Energy in `bands` log-spaced bands from 60 Hz to 8 kHz, each 0–1. */
  spectrum(bands: number): number[] {
    const ctx = this.ctx;
    if (!ctx || !this.analyser) {
      return Array.from({ length: bands }, () => 0);
    }
    this.analyser.getFloatFrequencyData(this.spectrumData);
    const binWidth = ctx.sampleRate / this.analyser.fftSize;
    const low = Math.log(60);
    const high = Math.log(8000);
    return Array.from({ length: bands }, (_, band) => {
      const from = Math.exp(low + ((high - low) * band) / bands);
      const to = Math.exp(low + ((high - low) * (band + 1)) / bands);
      const start = Math.floor(from / binWidth);
      const end = Math.max(start + 1, Math.ceil(to / binWidth));
      let peak = -Infinity;
      for (let bin = start; bin < end; bin++) {
        peak = Math.max(peak, this.spectrumData[bin]);
      }
      return clamp((peak + 95) / 65, 0, 1);
    });
  }

  noteOn(midi: number, velocity: number) {
    const ctx = this.ctx;
    if (!ctx) {
      return;
    }
    const existing = this.voices.get(midi);
    if (existing) {
      this.release(existing, 0.03);
    }
    if (this.voices.size >= MAX_VOICES) {
      const oldest = this.voices.values().next().value;
      if (oldest) {
        this.release(oldest, 0.05);
      }
    }

    const { felt: baseFelt, dynamics } = this.params;
    const felt = clamp(baseFelt + (this.soft ? 0.25 : 0), 0, 1);
    const v = clamp(
      velocity * (0.35 + 0.65 * dynamics) * (this.soft ? 0.7 : 1),
      0.02,
      1
    );
    const f0 = midiToFrequency(midi);
    const t = ctx.currentTime + 0.005;

    const out = ctx.createGain();
    out.gain.value = 0.2 * v ** 1.4;
    const pan = ctx.createStereoPanner();
    pan.pan.value = clamp((midi - 60) / 50, -0.4, 0.4);
    out.connect(pan).connect(this.expression);

    // Harder strikes and less felt open the filter; it then settles.
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.Q.value = 0.6;
    const bright = Math.min(f0 * (1.5 + 16 * v * (1 - felt * 0.75)), 16_000);
    const settled = Math.min(f0 * (1.2 + 3 * (1 - felt)), 16_000);
    filter.frequency.setValueAtTime(bright, t);
    filter.frequency.setTargetAtTime(settled, t + 0.02, 0.3 + felt * 0.5);
    filter.connect(out);

    // Low strings ring for seconds, high ones for a moment.
    const ring = clamp(3.4 * (261.6 / f0) ** 0.55, 0.45, 7);
    const attack = 0.002 + felt * 0.014;
    const endsAt = t + attack + ring * 5;
    const sources: AudioScheduledSourceNode[] = [];

    const partial = (
      frequency: number,
      amp: number,
      decay: number,
      detune = 0
    ) => {
      const osc = ctx.createOscillator();
      osc.frequency.value = frequency;
      osc.detune.value = detune;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(amp, t + attack);
      // A quick first drop, then the long after-sound.
      gain.gain.setTargetAtTime(amp * 0.4, t + attack, decay * 0.12);
      gain.gain.setTargetAtTime(0, t + attack + decay * 0.25, decay);
      osc.connect(gain).connect(filter);
      osc.start(t);
      osc.stop(endsAt);
      sources.push(osc);
    };

    const count = clamp(Math.floor(14_000 / f0), 1, 9);
    for (let n = 1; n <= count; n++) {
      const frequency = n * f0 * Math.sqrt(1 + 0.00035 * n * n);
      const amp = 1 / n ** (1.15 + felt * 0.9);
      partial(frequency, amp, ring / (1 + 0.45 * (n - 1)), n % 2 ? 1.2 : -1.2);
    }
    // A second, slightly detuned string on the fundamental: the slow beating
    // of a real unison.
    partial(f0, 0.5, ring, 2.6);

    const hammer = ctx.createBufferSource();
    hammer.buffer = this.noise;
    const hammerTone = ctx.createBiquadFilter();
    hammerTone.type = "bandpass";
    hammerTone.frequency.value = clamp(f0 * 4, 300, 7000);
    hammerTone.Q.value = 0.8;
    const hammerGain = ctx.createGain();
    hammerGain.gain.setValueAtTime(0, t);
    hammerGain.gain.linearRampToValueAtTime(
      0.22 * v * (1 - felt * 0.7),
      t + 0.002
    );
    hammerGain.gain.setTargetAtTime(0, t + 0.003, 0.012 + felt * 0.02);
    hammer.connect(hammerTone).connect(hammerGain).connect(out);
    hammer.start(t, Math.random() * 1.5);
    hammer.stop(t + 0.3);
    sources.push(hammer);

    const voice: Voice = {
      endsAt,
      held: true,
      midi,
      out,
      sources,
      sustained: false,
    };
    sources[0].onended = () => {
      out.disconnect();
      if (this.voices.get(midi) === voice) {
        this.voices.delete(midi);
      }
    };
    this.voices.set(midi, voice);
  }

  noteOff(midi: number) {
    const voice = this.voices.get(midi);
    if (!voice) {
      return;
    }
    voice.held = false;
    if (this.sustain) {
      voice.sustained = true;
      return;
    }
    this.release(voice);
  }

  allNotesOff() {
    for (const voice of [...this.voices.values()]) {
      this.release(voice, 0.08);
    }
  }

  private release(voice: Voice, tau?: number) {
    const ctx = this.ctx;
    if (!ctx) {
      return;
    }
    if (this.voices.get(voice.midi) === voice) {
      this.voices.delete(voice.midi);
    }
    const t = ctx.currentTime;
    const time = tau ?? 0.07 + this.params.release ** 2 * 1.6;
    voice.out.gain.cancelScheduledValues(t);
    voice.out.gain.setValueAtTime(voice.out.gain.value, t);
    voice.out.gain.setTargetAtTime(0, t, time);
    const stopAt = Math.min(voice.endsAt, t + time * 6);
    for (const source of voice.sources) {
      try {
        source.stop(stopAt);
      } catch {
        // Already stopped.
      }
    }
  }

  private build() {
    const ctx = new AudioContext({ latencyHint: "interactive" });
    this.ctx = ctx;
    this.noise = noiseBuffer(ctx, 3);

    this.expression = ctx.createGain();
    this.tone = ctx.createBiquadFilter();
    this.tone.type = "lowpass";
    this.tone.Q.value = 0.5;
    this.dry = ctx.createGain();
    this.wet = ctx.createGain();
    this.reverb = ctx.createConvolver();
    this.volume = ctx.createGain();

    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -16;
    compressor.knee.value = 18;
    compressor.ratio.value = 3;
    compressor.attack.value = 0.01;
    compressor.release.value = 0.3;

    this.expression.connect(this.tone);
    this.tone.connect(this.dry).connect(this.volume);
    this.tone.connect(this.reverb).connect(this.wet).connect(this.volume);
    this.volume.connect(compressor).connect(ctx.destination);

    this.analyser = ctx.createAnalyser();
    this.analyser.fftSize = 4096;
    this.analyser.smoothingTimeConstant = 0.85;
    compressor.connect(this.analyser);

    const splitter = ctx.createChannelSplitter(2);
    compressor.connect(splitter);
    this.meters = [0, 1].map((channel) => {
      const meter = ctx.createAnalyser();
      meter.fftSize = 1024;
      splitter.connect(meter, channel);
      return meter;
    });

    // Air: looped noise, softened to a hiss, under the tone control.
    const hiss = ctx.createBufferSource();
    hiss.buffer = this.noise;
    hiss.loop = true;
    const hissLow = ctx.createBiquadFilter();
    hissLow.type = "lowpass";
    hissLow.frequency.value = 2400;
    const hissHigh = ctx.createBiquadFilter();
    hissHigh.type = "highpass";
    hissHigh.frequency.value = 180;
    this.air = ctx.createGain();
    hiss
      .connect(hissLow)
      .connect(hissHigh)
      .connect(this.air)
      .connect(this.tone);
    hiss.start();

    this.buildImpulse();
    this.apply(0);
  }

  private apply(smoothing = 0.06) {
    const ctx = this.ctx;
    if (!ctx) {
      return;
    }
    const p = this.params;
    const t = ctx.currentTime;
    const set = (param: AudioParam, value: number) => {
      if (smoothing === 0) {
        param.value = value;
      } else {
        param.setTargetAtTime(value, t, smoothing);
      }
    };
    set(this.expression.gain, 0.15 + 0.85 * p.expression ** 1.5);
    set(this.tone.frequency, 450 * 2 ** (p.tone * 5.3));
    set(this.dry.gain, 1 - p.reverb * 0.5);
    set(this.wet.gain, p.reverb * 0.85);
    set(this.volume.gain, 1.8 * p.volume ** 2);
    set(this.air.gain, 0.05 * p.air ** 2);
  }

  /** A synthetic room: stereo noise that darkens and fades. */
  private buildImpulse() {
    const ctx = this.ctx;
    if (!ctx) {
      return;
    }
    const seconds = 1.2 + this.params.space * 4.8;
    const length = Math.floor(ctx.sampleRate * seconds);
    const impulse = ctx.createBuffer(2, length, ctx.sampleRate);
    const preDelay = Math.floor(
      ctx.sampleRate * (0.008 + this.params.space * 0.025)
    );
    for (let channel = 0; channel < 2; channel++) {
      const data = impulse.getChannelData(channel);
      let smoothed = 0;
      for (let i = preDelay; i < length; i++) {
        const progress = i / length;
        const white = Math.random() * 2 - 1;
        smoothed += (white - smoothed) * (0.5 - 0.42 * progress);
        data[i] = smoothed * Math.exp(-progress * 6);
      }
    }
    this.reverb.buffer = impulse;
  }
}

function noiseBuffer(ctx: AudioContext, seconds: number) {
  const buffer = ctx.createBuffer(2, ctx.sampleRate * seconds, ctx.sampleRate);
  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  }
  return buffer;
}
