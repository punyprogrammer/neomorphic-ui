import type { PianoParams } from "@/app/piano/engine";

export type PresetId =
  | "hushed-grand"
  | "felt-upright"
  | "distant-hall"
  | "tape-memory"
  | "rain-window"
  | "morning-study";

export interface Preset {
  description: string;
  id: PresetId;
  name: string;
  params: Omit<PianoParams, "expression" | "volume">;
}

export const PRESETS: Preset[] = [
  {
    id: "hushed-grand",
    name: "Hushed Grand",
    description: "A grand with the lid down, close and warm.",
    params: {
      tone: 0.58,
      felt: 0.45,
      release: 0.45,
      reverb: 0.38,
      space: 0.55,
      air: 0.12,
      dynamics: 0.55,
    },
  },
  {
    id: "felt-upright",
    name: "Felt Upright",
    description: "A strip of felt before the strings. Soft and woody.",
    params: {
      tone: 0.45,
      felt: 0.85,
      release: 0.35,
      reverb: 0.3,
      space: 0.35,
      air: 0.25,
      dynamics: 0.5,
    },
  },
  {
    id: "distant-hall",
    name: "Distant Hall",
    description: "Heard from the back of an empty hall.",
    params: {
      tone: 0.4,
      felt: 0.55,
      release: 0.7,
      reverb: 0.78,
      space: 0.92,
      air: 0.15,
      dynamics: 0.45,
    },
  },
  {
    id: "tape-memory",
    name: "Tape Memory",
    description: "Dark and a little hissy, like an old cassette.",
    params: {
      tone: 0.28,
      felt: 0.7,
      release: 0.5,
      reverb: 0.45,
      space: 0.5,
      air: 0.65,
      dynamics: 0.5,
    },
  },
  {
    id: "rain-window",
    name: "Rain on the Window",
    description: "Heavy felt, long tails and a soft wash of air.",
    params: {
      tone: 0.35,
      felt: 0.92,
      release: 0.8,
      reverb: 0.62,
      space: 0.78,
      air: 0.85,
      dynamics: 0.4,
    },
  },
  {
    id: "morning-study",
    name: "Morning Study",
    description: "Brighter and dry, for practising scales.",
    params: {
      tone: 0.78,
      felt: 0.2,
      release: 0.3,
      reverb: 0.18,
      space: 0.3,
      air: 0,
      dynamics: 0.6,
    },
  },
];

/** Typing-keyboard layout: the home row plays white keys, the row above sharps. */
export const KEY_OFFSETS: Record<string, number> = {
  a: 0,
  w: 1,
  s: 2,
  e: 3,
  d: 4,
  f: 5,
  t: 6,
  g: 7,
  y: 8,
  h: 9,
  u: 10,
  j: 11,
  k: 12,
  o: 13,
  l: 14,
  p: 15,
  ";": 16,
  "'": 17,
};

const NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];

export function noteName(midi: number) {
  return `${NAMES[midi % 12]}${Math.floor(midi / 12) - 1}`;
}

export function isSharp(midi: number) {
  return NAMES[midi % 12].length > 1;
}

const DYNAMIC_MARKS = [
  { at: 0.12, mark: "ppp", word: "very, very soft" },
  { at: 0.26, mark: "pp", word: "very soft" },
  { at: 0.42, mark: "p", word: "soft" },
  { at: 0.56, mark: "mp", word: "moderately soft" },
  { at: 0.7, mark: "mf", word: "moderately loud" },
  { at: 0.85, mark: "f", word: "loud" },
  { at: 1.01, mark: "ff", word: "very loud" },
];

/** The score marking for a dynamics level, 0–1. */
export function dynamicMark(level: number) {
  return DYNAMIC_MARKS.find(({ at }) => level < at) ?? DYNAMIC_MARKS[6];
}

export interface PhraseNote {
  /** Seconds from the start. */
  at: number;
  /** Seconds held. */
  hold: number;
  midi: number;
  velocity: number;
}

// "Evening, slowly": Fmaj9, Em7, Dm9, Cmaj9, twice, at 60 bpm. A bass note
// with its fifth in the left hand, an eighth-note arpeggio in the right.
const BARS = [
  { bass: [41, 48], arp: [57, 60, 64, 67, 72, 67, 64, 60] },
  { bass: [40, 47], arp: [55, 59, 62, 67, 71, 67, 62, 59] },
  { bass: [38, 45], arp: [53, 57, 60, 64, 69, 64, 60, 57] },
  { bass: [36, 43], arp: [52, 55, 59, 62, 67, 62, 59, 55] },
  { bass: [41, 48], arp: [60, 64, 67, 72, 76, 72, 67, 64] },
  { bass: [40, 47], arp: [59, 62, 67, 71, 74, 71, 67, 62] },
  { bass: [38, 45], arp: [57, 60, 64, 69, 72, 69, 64, 60] },
  { bass: [36, 43], arp: [55, 59, 62, 64, 67, 71, 74, 79] },
];

const BAR = 4;

export const PHRASE: PhraseNote[] = BARS.flatMap(({ bass, arp }, bar) => [
  ...bass.map((midi, i) => ({
    at: bar * BAR + i * 0.04,
    hold: BAR - 0.15,
    midi,
    velocity: 0.42,
  })),
  ...arp.map((midi, i) => ({
    at: bar * BAR + i * 0.5,
    hold: 1.3,
    midi,
    // Lean into the top of each arpeggio.
    velocity: 0.3 + 0.18 * Math.sin((i / (arp.length - 1)) * Math.PI),
  })),
]);

export const PHRASE_LENGTH = BARS.length * BAR + 2;
