"use client";

import {
  BarMeter,
  BarMeterItem,
  BarMeterLabel,
} from "@neomorphic-react/ui/bar-meter";
import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { Chip } from "@neomorphic-react/ui/chip";
import { Dial } from "@neomorphic-react/ui/dial";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@neomorphic-react/ui/item";
import { Kbd } from "@neomorphic-react/ui/kbd";
import { Progress } from "@neomorphic-react/ui/progress";
import { Separator } from "@neomorphic-react/ui/separator";
import { Slider, SliderLabel, SliderValue } from "@neomorphic-react/ui/slider";
import { Surface } from "@neomorphic-react/ui/surface";
import { toast } from "@neomorphic-react/ui/toast";
import { Toggle } from "@neomorphic-react/ui/toggle";
import {
  Cable,
  CassetteTape,
  Church,
  CloudRain,
  Feather,
  Footprints,
  Keyboard as KeyboardIcon,
  type LucideIcon,
  Minus,
  Moon,
  Piano,
  Play,
  Plus,
  Square,
  Sunrise,
} from "lucide-react";
import Image from "next/image";
import {
  type ReactNode,
  type RefObject,
  useEffect,
  useEffectEvent,
  useId,
  useRef,
  useState,
} from "react";

import { PageHeader } from "@/components/page-header";
import { MUSIC } from "@/lib/photos";
import {
  dynamicMark,
  KEY_OFFSETS,
  PHRASE,
  PHRASE_LENGTH,
  PRESETS,
  type Preset,
  type PresetId,
} from "@/lib/piano";

import { PianoEngine, type PianoParams } from "./engine";
import { Keyboard } from "./keyboard";

const LOWEST = 36;
const HIGHEST = 84;
const OCTAVES = { min: 2, max: 5 };

const PRESET_ICONS: Record<PresetId, LucideIcon> = {
  "hushed-grand": Piano,
  "felt-upright": Feather,
  "distant-hall": Church,
  "tape-memory": CassetteTape,
  "rain-window": CloudRain,
  "morning-study": Sunrise,
};

const BRASS =
  "[--dial-fill-start:color-mix(in_oklab,var(--brass)_35%,var(--color-background))] [--dial-fill:var(--brass)]";

function paramsFor(preset: Preset, current?: PianoParams): PianoParams {
  return {
    ...preset.params,
    expression: current?.expression ?? 0.8,
    volume: current?.volume ?? 0.75,
  };
}

// Inputs keep their letters; buttons and sliders keep Space.
function isTyping(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      target.matches("input, textarea, select, [role='combobox']"))
  );
}

function isControl(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    target.matches("button, a, [role='slider'], [role='button']")
  );
}

export function PianoApp() {
  const [presetId, setPresetId] = useState<PresetId>("hushed-grand");
  const [params, setParams] = useState(() => paramsFor(PRESETS[0]));
  const [edited, setEdited] = useState(false);
  const [active, setActive] = useState<ReadonlySet<number>>(new Set());
  const [awake, setAwake] = useState(false);
  const [sustainLatched, setSustainLatched] = useState(false);
  const [spaceHeld, setSpaceHeld] = useState(false);
  const [midiPedal, setMidiPedal] = useState(false);
  const [soft, setSoft] = useState(false);
  const [octave, setOctave] = useState(4);
  const [showLabels, setShowLabels] = useState(true);
  const [midiDevice, setMidiDevice] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState<number | null>(null);

  const engine = useRef<PianoEngine | null>(null);
  const held = useRef(new Map<number, number>());
  const typed = useRef(new Map<string, number>());
  const phraseTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const midiAccess = useRef<MIDIAccess | null>(null);

  const preset = PRESETS.find(({ id }) => id === presetId) ?? PRESETS[0];
  const sustain = sustainLatched || spaceHeld || midiPedal;
  const mark = dynamicMark(params.dynamics);
  const labels = new Map(
    Object.entries(KEY_OFFSETS).map(([key, offset]) => [
      (octave + 1) * 12 + offset,
      key,
    ])
  );

  useEffect(() => engine.current?.setParams(params), [params]);
  useEffect(() => engine.current?.setSustain(sustain), [sustain]);
  useEffect(() => engine.current?.setSoft(soft), [soft]);

  useEffect(
    () => () => {
      for (const timer of phraseTimers.current) {
        clearTimeout(timer);
      }
      if (midiAccess.current) {
        for (const input of midiAccess.current.inputs.values()) {
          input.onmidimessage = null;
        }
      }
      engine.current?.dispose();
      engine.current = null;
    },
    []
  );

  // Browsers only start audio inside a user gesture: the first key, click or
  // MIDI toggle wakes the engine.
  function wake() {
    if (!engine.current) {
      engine.current = new PianoEngine(params);
      engine.current.setSustain(sustain);
      engine.current.setSoft(soft);
    }
    engine.current.start();
    setAwake(true);
    return engine.current;
  }

  function press(midi: number, velocity: number) {
    const instrument = engine.current ?? wake();
    instrument.noteOn(midi, velocity);
    held.current.set(midi, (held.current.get(midi) ?? 0) + 1);
    setActive(new Set(held.current.keys()));
  }

  function release(midi: number) {
    const count = held.current.get(midi);
    if (count === undefined) {
      return;
    }
    if (count > 1) {
      held.current.set(midi, count - 1);
      return;
    }
    held.current.delete(midi);
    engine.current?.noteOff(midi);
    setActive(new Set(held.current.keys()));
  }

  function update(next: Partial<PianoParams>) {
    setParams((current) => ({ ...current, ...next }));
    if (!("expression" in next || "volume" in next)) {
      setEdited(true);
    }
  }

  function choosePreset(next: Preset) {
    setPresetId(next.id);
    setParams((current) => paramsFor(next, current));
    setEdited(false);
  }

  function stopPhrase() {
    for (const timer of phraseTimers.current) {
      clearTimeout(timer);
    }
    phraseTimers.current = [];
    for (const midi of [...held.current.keys()]) {
      engine.current?.noteOff(midi);
    }
    held.current.clear();
    setActive(new Set());
    setElapsed(null);
  }

  function playPhrase() {
    wake();
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (const note of PHRASE) {
      timers.push(
        setTimeout(() => press(note.midi, note.velocity), note.at * 1000),
        setTimeout(() => release(note.midi), (note.at + note.hold) * 1000)
      );
    }
    for (let second = 1; second <= PHRASE_LENGTH; second++) {
      timers.push(setTimeout(() => setElapsed(second), second * 1000));
    }
    timers.push(setTimeout(() => setElapsed(null), PHRASE_LENGTH * 1000));
    phraseTimers.current = timers;
    setElapsed(0);
  }

  async function toggleMidi(on: boolean) {
    if (!on) {
      for (const input of midiAccess.current?.inputs.values() ?? []) {
        input.onmidimessage = null;
      }
      midiAccess.current = null;
      setMidiDevice(null);
      setMidiPedal(false);
      return;
    }
    wake();
    if (!("requestMIDIAccess" in navigator)) {
      toast({
        title: "MIDI isn't available here",
        description: "Try Chrome or Edge, or play with your keyboard.",
      });
      return;
    }
    try {
      const access = await navigator.requestMIDIAccess();
      midiAccess.current = access;
      const listen = () => {
        const inputs = [...access.inputs.values()];
        for (const input of inputs) {
          input.onmidimessage = (message) => onMidi(message);
        }
        setMidiDevice(inputs[0]?.name ?? "Waiting for a device");
      };
      access.onstatechange = listen;
      listen();
    } catch {
      toast({ title: "MIDI access was blocked" });
    }
  }

  const onMidi = useEffectEvent((message: MIDIMessageEvent) => {
    const [status = 0, data1 = 0, data2 = 0] = message.data ?? [];
    const type = status & 0xf0;
    if (type === 0x90 && data2 > 0) {
      press(data1, data2 / 127);
    } else if (type === 0x80 || type === 0x90) {
      release(data1);
    } else if (type === 0xb0 && data1 === 64) {
      setMidiPedal(data2 >= 64);
    }
  });

  const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      isTyping(event.target)
    ) {
      return;
    }
    const key = event.key.toLowerCase();
    if (key === " ") {
      if (isControl(event.target)) {
        return;
      }
      event.preventDefault();
      if (!event.repeat) {
        wake();
        setSpaceHeld(true);
      }
      return;
    }
    if (key === "z" || key === "x") {
      setOctave((current) =>
        Math.min(
          Math.max(current + (key === "z" ? -1 : 1), OCTAVES.min),
          OCTAVES.max
        )
      );
      return;
    }
    const offset = KEY_OFFSETS[key];
    if (offset === undefined || event.repeat || typed.current.has(key)) {
      return;
    }
    event.preventDefault();
    const midi = (octave + 1) * 12 + offset;
    typed.current.set(key, midi);
    press(midi, 0.75);
  });

  const onKeyUp = useEffectEvent((event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    if (key === " ") {
      setSpaceHeld(false);
      return;
    }
    const midi = typed.current.get(key);
    if (midi !== undefined) {
      typed.current.delete(key);
      release(midi);
    }
  });

  const onBlur = useEffectEvent(() => {
    for (const midi of typed.current.values()) {
      release(midi);
    }
    typed.current.clear();
    setSpaceHeld(false);
  });

  useEffect(() => {
    const down = (event: KeyboardEvent) => onKeyDown(event);
    const up = (event: KeyboardEvent) => onKeyUp(event);
    const blur = () => onBlur();
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
    };
  }, []);

  const playing = elapsed !== null;
  const PresetIcon = PRESET_ICONS[preset.id];

  return (
    <div className="grid gap-8">
      <PageHeader
        actions={
          <>
            {awake ? (
              <Chip size="sm" variant="inset">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-(--brass)"
                />
                Listening
              </Chip>
            ) : (
              <Chip icon={<Moon />} size="sm" variant="inset">
                Asleep · press any key
              </Chip>
            )}
            <Toggle
              onPressedChange={toggleMidi}
              pressed={midiDevice !== null}
              size="sm"
            >
              <Cable />
              {midiDevice ?? "MIDI"}
            </Toggle>
          </>
        }
        description="A soft felt piano for late evenings, synthesised in your browser. Play with the mouse, your keyboard or a MIDI controller."
        eyebrow="Hush Audio · Felt piano"
        title={
          <span className="font-display font-normal italic tracking-normal">
            Hush
          </span>
        }
      />

      <div className="grid gap-8 xl:grid-cols-[20rem_minmax(0,1fr)]">
        <aside aria-label="Presets" className="grid content-start gap-8">
          <Card>
            <CardContent>
              <Surface
                className="relative overflow-hidden rounded-xl p-1.5"
                depth="sm"
                elevation="inset"
              >
                <span className="relative block aspect-4/3 overflow-hidden rounded-lg">
                  <Image
                    alt={MUSIC.piano.alt}
                    className="object-cover object-[center_68%]"
                    fill
                    loading="eager"
                    sizes="(min-width: 1280px) 18rem, 100vw"
                    src={MUSIC.piano.src}
                  />
                </span>
              </Surface>
            </CardContent>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="flex items-center gap-2 font-display text-xl italic">
                  <PresetIcon
                    aria-hidden="true"
                    className="size-4 text-(--brass)"
                  />
                  {preset.name}
                </CardTitle>
                {edited ? (
                  <Chip size="sm" variant="inset">
                    Edited
                  </Chip>
                ) : null}
              </div>
              <CardDescription>{preset.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button
                fullWidth
                icon={playing ? <Square /> : <Play />}
                onClick={playing ? stopPhrase : playPhrase}
                variant="primary"
              >
                {playing ? "Stop" : "Play a phrase"}
              </Button>
              {playing ? (
                <Progress
                  aria-label="Phrase"
                  className="[--progress-fill:var(--brass)]"
                  max={PHRASE_LENGTH}
                  size="sm"
                  value={elapsed}
                />
              ) : (
                <p className="text-center text-muted-foreground text-xs">
                  “Evening, slowly” · {PHRASE_LENGTH} seconds
                </p>
              )}
            </CardContent>
          </Card>

          <Card size="sm">
            <CardHeader>
              <CardTitle>Presets</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2">
                {PRESETS.map((option) => {
                  const Icon = PRESET_ICONS[option.id];
                  const selected = option.id === presetId;
                  return (
                    <li key={option.id}>
                      <Item
                        render={
                          <button
                            aria-pressed={selected}
                            onClick={() => choosePreset(option)}
                            type="button"
                          />
                        }
                        size="sm"
                        variant={selected ? "inset" : "flat"}
                      >
                        <ItemMedia
                          className={selected ? "text-(--brass)" : undefined}
                          variant="icon"
                        >
                          <Icon />
                        </ItemMedia>
                        <ItemContent>
                          <ItemTitle>{option.name}</ItemTitle>
                          <ItemDescription className="line-clamp-1">
                            {option.description}
                          </ItemDescription>
                        </ItemContent>
                      </Item>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        </aside>

        <Card size="lg">
          <CardContent className="flex flex-1 flex-col justify-between gap-10">
            <div className="flex flex-wrap items-end justify-center gap-x-14 gap-y-8">
              <Fader
                label="Expression"
                onChange={(expression) => update({ expression })}
                value={params.expression}
              />
              <div className="grid justify-items-center gap-4">
                <Dial
                  aria-label="Dynamics"
                  className={`size-52! ${BRASS}`}
                  getAriaValueText={(value) =>
                    `${dynamicMark(value / 100).word}, ${value} percent`
                  }
                  onValueChange={(value) => update({ dynamics: value / 100 })}
                  size="lg"
                  value={Math.round(params.dynamics * 100)}
                >
                  <span className="grid justify-items-center leading-none">
                    <span className="font-display text-4xl italic">
                      {mark.mark}
                    </span>
                    <span className="mt-2 text-muted-foreground text-xs">
                      {mark.word}
                    </span>
                  </span>
                </Dial>
                <span className="font-medium text-foreground text-xs uppercase tracking-[0.2em]">
                  Dynamics
                </span>
              </div>
              <div className="flex items-end gap-6">
                <Fader
                  label="Volume"
                  onChange={(volume) => update({ volume })}
                  value={params.volume}
                />
                <OutputMeter engine={engine} running={awake} />
              </div>
            </div>

            <Spectrum engine={engine} running={awake} />

            <div className="grid gap-6 lg:grid-cols-2">
              <KnobGroup title="Character">
                <Knob
                  hint="dark to bright"
                  label="Tone"
                  onChange={(tone) => update({ tone })}
                  value={params.tone}
                />
                <Knob
                  hint="hammer softness"
                  label="Felt"
                  onChange={(felt) => update({ felt })}
                  value={params.felt}
                />
                <Knob
                  hint="after the key"
                  label="Release"
                  onChange={(value) => update({ release: value })}
                  value={params.release}
                />
              </KnobGroup>
              <KnobGroup title="Room">
                <Knob
                  hint="wet and dry"
                  label="Reverb"
                  onChange={(reverb) => update({ reverb })}
                  value={params.reverb}
                />
                <Knob
                  hint="size of the room"
                  label="Space"
                  onChange={(space) => update({ space })}
                  value={params.space}
                />
                <Knob
                  hint="tape and room hiss"
                  label="Air"
                  onChange={(air) => update({ air })}
                  value={params.air}
                />
              </KnobGroup>
            </div>
          </CardContent>
        </Card>
      </div>

      <section aria-label="Keyboard" className="grid gap-5">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <Toggle
            onPressedChange={setSustainLatched}
            pressed={sustain}
            size="sm"
          >
            <Footprints />
            Sustain
          </Toggle>
          <Toggle onPressedChange={setSoft} pressed={soft} size="sm">
            <Feather />
            Soft pedal
          </Toggle>
          <Separator className="h-6" orientation="vertical" />
          <div className="flex items-center gap-2">
            <Button
              aria-label="Octave down"
              disabled={octave === OCTAVES.min}
              icon={<Minus />}
              onClick={() => setOctave(octave - 1)}
              size="sm"
            />
            <span
              aria-live="polite"
              className="min-w-24 text-center text-foreground text-sm tabular-nums"
            >
              Keys from C{octave}
            </span>
            <Button
              aria-label="Octave up"
              disabled={octave === OCTAVES.max}
              icon={<Plus />}
              onClick={() => setOctave(octave + 1)}
              size="sm"
            />
          </div>
          <Separator className="h-6" orientation="vertical" />
          <Toggle
            onPressedChange={setShowLabels}
            pressed={showLabels}
            size="sm"
          >
            <KeyboardIcon />
            Key labels
          </Toggle>
          <p className="ms-auto hidden items-center gap-2 text-muted-foreground text-xs lg:flex">
            <Kbd size="sm">A</Kbd>–<Kbd size="sm">'</Kbd> play
            <Kbd size="sm">Space</Kbd> sustain
            <Kbd size="sm">Z</Kbd>
            <Kbd size="sm">X</Kbd> octave · strike lower on a key to play louder
          </p>
        </div>

        <Surface
          className="overflow-x-auto rounded-[1.75rem] p-4"
          elevation="inset"
        >
          <div className="grid min-w-[52rem] gap-3">
            <span
              aria-hidden="true"
              className="h-1.5 rounded-full bg-(--felt) opacity-70 shadow-neu-sm"
            />
            <Keyboard
              active={active}
              from={LOWEST}
              labels={labels}
              onPress={press}
              onRelease={release}
              showLabels={showLabels}
              to={HIGHEST}
            />
          </div>
        </Surface>
      </section>
    </div>
  );
}

function Fader({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: number) => void;
  value: number;
}) {
  return (
    <Slider
      className="h-56 gap-4 [--slider-fill:var(--brass)]"
      onValueChange={(next) => onChange((next as number) / 100)}
      orientation="vertical"
      value={Math.round(value * 100)}
    >
      <div className="grid justify-items-center gap-0.5">
        <SliderLabel className="text-xs uppercase tracking-[0.16em]">
          {label}
        </SliderLabel>
        <SliderValue className="text-xs" />
      </div>
    </Slider>
  );
}

function KnobGroup({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const id = useId();
  return (
    <Surface
      aria-labelledby={id}
      className="grid gap-5 rounded-2xl px-6 pt-4 pb-6"
      depth="sm"
      elevation="inset"
      render={<section />}
    >
      <h2
        className="font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]"
        id={id}
      >
        {title}
      </h2>
      <div className="flex flex-wrap justify-around gap-6">{children}</div>
    </Surface>
  );
}

function Knob({
  hint,
  label,
  onChange,
  value,
}: {
  hint: string;
  label: string;
  onChange: (value: number) => void;
  value: number;
}) {
  const id = useId();
  const percent = Math.round(value * 100);
  return (
    <div className="grid justify-items-center gap-3">
      <Dial
        aria-labelledby={id}
        className={BRASS}
        getAriaValueText={(next) => `${next} percent`}
        onValueChange={(next) => onChange(next / 100)}
        size="sm"
        value={percent}
      >
        <span className="text-foreground text-sm">{percent}</span>
      </Dial>
      <div className="grid justify-items-center gap-0.5 text-center">
        <span
          className="font-medium text-foreground text-xs uppercase tracking-[0.16em]"
          id={id}
        >
          {label}
        </span>
        <span className="text-[0.6875rem] text-muted-foreground">{hint}</span>
      </div>
    </div>
  );
}

interface MeterProps {
  engine: RefObject<PianoEngine | null>;
  running: boolean;
}

/** Reads the engine about eleven times a second while it runs. */
function useSampled<T>(
  engine: RefObject<PianoEngine | null>,
  running: boolean,
  read: (instrument: PianoEngine) => T,
  initial: T
) {
  const [value, setValue] = useState(initial);
  const sample = useEffectEvent((instrument: PianoEngine) =>
    setValue(read(instrument))
  );

  useEffect(() => {
    if (!running) {
      return;
    }
    const timer = setInterval(() => {
      if (engine.current) {
        sample(engine.current);
      }
    }, 90);
    return () => clearInterval(timer);
  }, [engine, running]);

  return value;
}

const BANDS = 40;
const SILENT = Array.from({ length: BANDS }, () => 0);

function Spectrum({ engine, running }: MeterProps) {
  const bands = useSampled(
    engine,
    running,
    (instrument) => instrument.spectrum(BANDS),
    SILENT
  );
  return (
    <Surface
      aria-hidden="true"
      className="grid gap-4 rounded-2xl px-6 pt-4 pb-5"
      depth="sm"
      elevation="inset"
    >
      <span className="font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
        Resonance
      </span>
      <BarMeter
        className="justify-between gap-1 [--bar-meter-fill-start:color-mix(in_oklab,var(--brass)_30%,var(--color-background))] [--bar-meter-fill:var(--brass)] [--bar-meter-height:4.5rem] [--bar-meter-width:0.5rem]"
        size="sm"
      >
        {bands.map((value, band) => (
          <BarMeterItem key={band} value={Math.round(value * 100)} />
        ))}
      </BarMeter>
    </Surface>
  );
}

function OutputMeter({ engine, running }: MeterProps) {
  const levels = useSampled(
    engine,
    running,
    (instrument) => instrument.levels(),
    [0, 0] as [number, number]
  );

  return (
    <BarMeter
      aria-label="Output level"
      className="gap-2 [--bar-meter-fill-start:color-mix(in_oklab,var(--brass)_40%,var(--color-background))] [--bar-meter-fill:var(--brass)] [--bar-meter-height:11rem]"
      size="sm"
    >
      {(["L", "R"] as const).map((side, index) => (
        <BarMeterItem key={side} value={Math.round(levels[index] * 100)}>
          <BarMeterLabel>{side}</BarMeterLabel>
        </BarMeterItem>
      ))}
    </BarMeter>
  );
}
