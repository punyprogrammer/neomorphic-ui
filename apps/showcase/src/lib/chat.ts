// Still, a calm assistant: seed conversations and a small, canned reply
// composer. Nothing leaves the browser; replies are picked by topic and
// shaped by the session settings.

import { INTERIORS } from "./photos";

export type Tone = "gentle" | "balanced" | "direct";
export type Length = "brief" | "balanced" | "detailed";
export type ToolId = "sleep" | "calendar" | "web";
export type StepIcon = "file" | "calendar" | "search" | "memory" | "think";

export interface Settings {
  deep: boolean;
  length: Length;
  memory: boolean;
  model: string;
  /** Words streamed per second. */
  pace: number;
  speak: boolean;
  tone: Tone;
  tools: ToolId[];
  /** 0–100: how much reassurance the replies carry. */
  warmth: number;
}

export const DEFAULT_SETTINGS: Settings = {
  deep: false,
  length: "balanced",
  memory: true,
  model: "still-2",
  pace: 38,
  speak: false,
  tone: "gentle",
  tools: ["sleep", "calendar", "web"],
  warmth: 64,
};

export const MODELS = [
  { value: "still-2", label: "Still 2" },
  { value: "still-2-deep", label: "Still 2 Deep" },
  { value: "still-mini", label: "Still Mini" },
];

export const TOOLS: { id: ToolId; label: string; description: string }[] = [
  {
    id: "sleep",
    label: "Sleep log",
    description: "Bedtimes and wake-ups from your tracker",
  },
  {
    id: "calendar",
    label: "Calendar",
    description: "Evening events, read only",
  },
  {
    id: "web",
    label: "Web search",
    description: "Trusted health and sleep sources",
  },
];

export interface TraceStep {
  detail: string;
  icon: StepIcon;
  id: string;
  output?: string;
  status?: "running" | "pending" | "error";
  title: string;
}

export interface FileRef {
  id: string;
  kind: "image" | "sheet" | "doc";
  name: string;
  /** 0–100 while uploading. */
  progress?: number;
  size: string;
  src?: string;
}

export interface Source {
  href: string;
  site: string;
  summary: string;
  title: string;
}

export interface PlanTable {
  caption: string;
  columns: string[];
  rows: string[][];
}

export interface Snippet {
  code: string;
  title: string;
}

export interface ChatMessage {
  after?: string;
  /** Shows the evening check-in form under the reply. */
  checkin?: boolean;
  code?: Snippet;
  files?: FileRef[];
  id: string;
  quote?: string;
  reaction?: string;
  role: "user" | "assistant";
  sources?: Source[];
  status?: "thinking" | "streaming" | "done" | "stopped";
  steps?: TraceStep[];
  suggestions?: string[];
  table?: PlanTable;
  text?: string;
  time: string;
  type: "message";
}

export interface ChatMarker {
  id: string;
  label: string;
  type: "marker";
}

export type Entry = ChatMessage | ChatMarker;

export type When = "today" | "week" | "earlier";

export interface Conversation {
  entries: Entry[];
  id: string;
  pinned: boolean;
  title: string;
  topic: string;
  unread?: number;
  when: When;
}

let counter = 0;
export function uid(prefix = "m") {
  counter += 1;
  return `${prefix}-${Date.now().toString(36)}-${counter}`;
}

export function clockNow() {
  return new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

// ---------------------------------------------------------------------------
// Seed content
// ---------------------------------------------------------------------------

const BREATHING_SCRIPT = `import time

PATTERN = [("Breathe in", 4), ("Hold", 4), ("Breathe out", 4), ("Hold", 4)]


def box_breathing(rounds: int = 4) -> None:
    for n in range(1, rounds + 1):
        print(f"\\nRound {n} of {rounds}")
        for phase, seconds in PATTERN:
            for left in range(seconds, 0, -1):
                print(f"  {phase:<12} {'●' * left:<4}", end="\\r", flush=True)
                time.sleep(1)
    print("\\nWell done. Notice how you feel.")


if __name__ == "__main__":
    box_breathing()`;

const SOURCES: Source[] = [
  {
    title: "Sleep hygiene",
    site: "sleepfoundation.org",
    href: "https://www.sleepfoundation.org/sleep-hygiene",
    summary:
      "A steady wake time, a dim and cool room, and a screen-free last hour are the habits with the strongest evidence.",
  },
  {
    title: "How to fall asleep faster",
    site: "nhs.uk",
    href: "https://www.nhs.uk/live-well/sleep-and-tiredness/how-to-get-to-sleep/",
    summary:
      "Wind down with a bath, reading or light stretches, and keep the bedroom for sleep.",
  },
  {
    title: "Box breathing",
    site: "clevelandclinic.org",
    href: "https://my.clevelandclinic.org/health/articles/box-breathing",
    summary:
      "Equal counts in, hold, out and hold slow the breath and calm the nervous system within a few minutes.",
  },
];

const EVENING: Entry[] = [
  { type: "marker", id: "evening-day", label: "Today" },
  {
    type: "message",
    id: "evening-1",
    role: "user",
    time: "9:02 PM",
    text: "I keep scrolling until 1am and wake up foggy. Can you help me build a gentler evening routine? My sleep log and a photo of my room are attached.",
    files: [
      {
        id: "f-log",
        kind: "sheet",
        name: "sleep-log.csv",
        size: "14 nights · 3 KB",
      },
      {
        id: "f-room",
        kind: "image",
        name: "bedroom.jpg",
        size: "1.2 MB",
        src: INTERIORS.bedroomCalm.src,
      },
    ],
  },
  {
    type: "message",
    id: "evening-2",
    role: "assistant",
    time: "9:02 PM",
    status: "done",
    reaction: "🌿",
    steps: [
      {
        id: "s1",
        icon: "file",
        title: "Read sleep-log.csv",
        detail: "14 nights",
        output:
          "Average lights-out 12:48 AM · wake 7:10 AM · 6 h 22 m asleep. Phone use logged on 12 of 14 nights after 11 PM.",
      },
      {
        id: "s2",
        icon: "calendar",
        title: "Checked your calendar",
        detail: "2 late calls",
      },
      {
        id: "s3",
        icon: "search",
        title: "Searched for gentle wind-down routines",
        detail: "6 sources",
      },
    ],
    text: "Thank you for sharing these. Your log shows lights-out drifting to around 12:48, and the phone is the last thing you touch on most nights. Nothing is wrong with you: an evening with no edges simply keeps going.\n\nLet's give it soft edges instead of strict rules. Here is a routine that starts small and leaves room for slow nights.",
    table: {
      caption: "A gentler evening",
      columns: ["Time", "Step", "Why it helps"],
      rows: [
        [
          "10:00",
          "Dim the lights, start the kettle",
          "Low light tells your body evening has begun",
        ],
        [
          "10:15",
          "Phone to the hallway charger",
          "Out of reach is easier than willpower",
        ],
        [
          "10:20",
          "Herbal tea and a paper book",
          "Something to do with your hands",
        ],
        [
          "10:50",
          "Four rounds of box breathing",
          "Slows the breath and quiets the mind",
        ],
        ["11:00", "Lights out", "Same time each night, even at weekends"],
      ],
    },
    after:
      "Your room already looks restful. A warm bedside lamp instead of the ceiling light would make 10:00 feel different straight away.",
    sources: SOURCES.slice(0, 2),
  },
  {
    type: "message",
    id: "evening-3",
    role: "user",
    time: "9:06 PM",
    text: "That feels doable. Could you make me a little breathing timer I can run in the terminal?",
  },
  {
    type: "message",
    id: "evening-4",
    role: "assistant",
    time: "9:06 PM",
    status: "done",
    text: "Of course. This one counts four slow seconds for each side of the box and shows a fading row of dots, so you can close your eyes and just listen to the rhythm.",
    code: { title: "breathe.py", code: BREATHING_SCRIPT },
    after:
      "Save it as breathe.py and run python3 breathe.py. Four rounds take a little over four minutes.",
    quote:
      "Breath is the bridge which connects life to consciousness. — Thích Nhất Hạnh",
    sources: SOURCES.slice(2),
  },
  { type: "marker", id: "evening-checkin", label: "Still is checking in" },
  {
    type: "message",
    id: "evening-5",
    role: "assistant",
    time: "9:07 PM",
    status: "done",
    text: "Before you go: a 20-second check-in helps me tune tomorrow's plan. Skip anything you like.",
    checkin: true,
    suggestions: [
      "Make it a weekly plan",
      "Add a slow morning routine",
      "Why does box breathing work?",
    ],
  },
];

function brief(
  id: string,
  title: string,
  topic: string,
  when: When,
  prompt: string,
  reply: string,
  extra: Partial<Conversation> = {}
): Conversation {
  return {
    id,
    title,
    topic,
    when,
    pinned: false,
    entries: [
      {
        type: "message",
        id: `${id}-1`,
        role: "user",
        time: "8:40 AM",
        text: prompt,
      },
      {
        type: "message",
        id: `${id}-2`,
        role: "assistant",
        time: "8:40 AM",
        status: "done",
        text: reply,
      },
    ],
    ...extra,
  };
}

export const SEED: Conversation[] = [
  {
    id: "evening",
    title: "A gentler evening routine",
    topic: "Sleep",
    when: "today",
    pinned: true,
    entries: EVENING,
  },
  brief(
    "journal",
    "Journaling prompts for Sundays",
    "Reflection",
    "week",
    "Give me three journaling prompts for a slow Sunday.",
    "What surprised you this week, gently or otherwise?\n\nWhat would you like to carry into Monday, and what can you set down?\n\nWhere did you feel most like yourself?",
    { pinned: true }
  ),
  brief(
    "focus",
    "Focus music for deep work",
    "Focus",
    "today",
    "What should I listen to for two hours of deep work?",
    "Try something without lyrics and with little change: long ambient pieces, piano at low volume, or brown noise. Pick one and keep it for the whole session so it fades into the background.",
    { unread: 2 }
  ),
  brief(
    "walk",
    "A 20-minute lunchtime walk",
    "Movement",
    "today",
    "Plan a 20-minute walk I can do at lunch.",
    "Five minutes out at an easy pace, ten minutes a little brisker, five minutes back slowly. Leave the headphones in your pocket for the last stretch and notice three things you can hear."
  ),
  brief(
    "tea",
    "Caffeine-free afternoon drinks",
    "Food",
    "week",
    "What can I drink after 2pm instead of coffee?",
    "Rooibos, a mint and ginger infusion, or warm water with lemon. If you miss the ritual more than the caffeine, a decaf made the same way keeps the pause without the late buzz."
  ),
  brief(
    "inbox",
    "Letting go of inbox zero",
    "Work",
    "week",
    "My inbox makes me anxious. How do I let go of inbox zero?",
    "Check twice a day at set times, answer what takes under two minutes, and move the rest into one 'this week' folder. An empty inbox is a tool, not a measure of you."
  ),
  brief(
    "stretch",
    "Desk stretches every hour",
    "Movement",
    "week",
    "Remind me of some easy desk stretches.",
    "Roll your shoulders back five times, tilt each ear to its shoulder for three breaths, then stand and reach up with interlaced fingers. One minute is enough."
  ),
  brief(
    "basil",
    "Why my basil keeps wilting",
    "Home",
    "earlier",
    "My basil wilts every afternoon. What am I doing wrong?",
    "Afternoon wilting usually means the pot dries out in direct sun. Water deeply in the morning, let the top centimetre dry between waterings, and move it out of the hottest light after noon."
  ),
  brief(
    "kyoto",
    "A slow weekend in Kyoto",
    "Travel",
    "earlier",
    "Plan a slow weekend in Kyoto with lots of walking.",
    "Saturday: an early walk up to Kiyomizu-dera before the crowds, then the Philosopher's Path in the afternoon. Sunday: Arashiyama at dawn, tea by the river, and a long lunch with nowhere to be."
  ),
];

export const MEMORIES = [
  "Prefers gentle suggestions over strict rules",
  "Lights out goal is 11 PM",
  "Drinks chamomile or rooibos in the evening",
  "Finds box breathing calming",
];

/** Rest scores (0–100) from the last seven check-ins, oldest first. */
export const WEEK = [
  { day: "Mon", rest: 42 },
  { day: "Tue", rest: 55 },
  { day: "Wed", rest: 38 },
  { day: "Thu", rest: 61 },
  { day: "Fri", rest: 70 },
  { day: "Sat", rest: 78 },
  { day: "Sun", rest: 0 },
];

export const PROMPTS = [
  {
    title: "Wind down",
    description: "Help me slow down after a busy day",
    prompt: "Help me wind down after a busy day.",
  },
  {
    title: "Untangle a thought",
    description: "Something keeps looping in my head",
    prompt: "Something keeps looping in my head. Can you help me untangle it?",
  },
  {
    title: "Plan tomorrow",
    description: "Three small things, nothing more",
    prompt: "Help me plan tomorrow with just three small things.",
  },
  {
    title: "Breathe with me",
    description: "A two-minute breathing exercise",
    prompt: "Guide me through a two-minute breathing exercise.",
  },
];

// ---------------------------------------------------------------------------
// Replies
// ---------------------------------------------------------------------------

interface Topic {
  code?: Snippet;
  match: RegExp;
  paragraphs: string[];
  suggestions: string[];
  table?: PlanTable;
}

const TOPICS: Topic[] = [
  {
    match: /^check-in:/i,
    paragraphs: [
      "Thank you for checking in. I've added tonight to your week, so we can notice patterns together rather than judge single days.",
      "Whatever got in the way, it doesn't need fixing tonight. Choose one small thing for the last hour: lights low, phone in another room, or a page of something dull.",
      "Tomorrow evening I'll ask again. A few check-ins in a row tell us far more than any one of them.",
    ],
    suggestions: [
      "Plan my last hour",
      "Why patterns over single nights?",
      "Remind me tomorrow",
    ],
  },
  {
    match: /breath|breathe|anxious|panic|calm/i,
    paragraphs: [
      "Let's breathe together for a moment. Sit back, let your shoulders drop and rest one hand on your belly.",
      "Breathe in through your nose for four, hold for four, out through your mouth for four, and hold again for four. Picture tracing the sides of a square.",
      "Four rounds is enough. If your mind wanders, that is part of it: notice where it went and come back to the next count.",
    ],
    suggestions: [
      "Make it longer",
      "Try a different pattern",
      "Why does it work?",
    ],
  },
  {
    match: /sleep|night|tired|bed|insomnia/i,
    paragraphs: [
      "Rest starts long before your head touches the pillow. The hour before bed matters more than the minute you turn off the light.",
      "Keep the wake-up time steady, even after a short night; it anchors everything else. Dim the lights an hour before bed and keep the phone outside the bedroom.",
      "If you are awake for longer than twenty minutes, get up, read something dull in low light, and go back when you feel sleepy.",
    ],
    table: {
      caption: "Your last hour",
      columns: ["When", "What"],
      rows: [
        ["−60 min", "Lights low, screens away"],
        ["−30 min", "Warm drink, paper book"],
        ["−5 min", "Four slow breaths"],
      ],
    },
    suggestions: [
      "What if I wake at 3am?",
      "Make it a weekly plan",
      "Add a morning routine",
    ],
  },
  {
    match: /focus|work|procrastinat|study|deadline/i,
    paragraphs: [
      "Focus comes easier when the next step is small enough to start without thinking.",
      "Pick one task, write the very first action on a sticky note, and set a timer for twenty-five minutes. When it rings, stand up and look out of a window for five.",
      "After three rounds, take a longer break. Progress counts even when it is quiet.",
    ],
    code: {
      title: "focus.sh",
      code: `#!/usr/bin/env bash
# Three quiet focus rounds with a soft chime between them.
for round in 1 2 3; do
  echo "Round $round: focus for 25 minutes"
  sleep 1500
  printf '\\a'
  echo "Rest for 5 minutes. Look at something far away."
  sleep 300
done`,
    },
    suggestions: [
      "Help me pick the one task",
      "Make the breaks longer",
      "Play focus sounds",
    ],
  },
  {
    match: /walk|move|stretch|exercise|tired/i,
    paragraphs: [
      "Movement doesn't need to be a workout to help. Ten easy minutes changes how the rest of the day feels.",
      "Walk at a pace where you could still hum a song. Swing your arms a little more than usual and look at the horizon rather than the pavement.",
      "Back home, roll your shoulders, reach up tall, and take one long breath out before you sit down again.",
    ],
    suggestions: [
      "Plan a weekly walk",
      "Desk stretches",
      "Something for rainy days",
    ],
  },
];

const FALLBACK: Topic = {
  match: /.*/,
  paragraphs: [
    "Thank you for telling me. We can look at it one piece at a time.",
    "What feels heaviest right now? Often naming the one part that matters most makes the rest feel lighter.",
    "We can make a small plan, talk it through, or simply sit with it for a moment. There's no wrong place to start.",
  ],
  suggestions: ["Make a small plan", "Talk it through", "Breathe with me"],
};

const OPENERS: Record<Tone, string> = {
  gentle: "Let's take this slowly. ",
  balanced: "",
  direct: "Here's the short version. ",
};

const COUNT: Record<Length, number> = { brief: 1, balanced: 2, detailed: 3 };

const STEPS: Record<ToolId, Omit<TraceStep, "id">> = {
  sleep: {
    icon: "file",
    title: "Read your sleep log",
    detail: "14 nights",
    output:
      "Average lights-out 12:31 AM, two nights before midnight this week.",
  },
  calendar: {
    icon: "calendar",
    title: "Checked tomorrow's calendar",
    detail: "first call 9:30 AM",
  },
  web: {
    icon: "search",
    title: "Searched trusted sources",
    detail: "4 results",
  },
};

export type Reply = Pick<
  ChatMessage,
  "code" | "steps" | "suggestions" | "table" | "text"
>;

export function composeReply(prompt: string, settings: Settings): Reply {
  const topic = TOPICS.find((t) => t.match.test(prompt)) ?? FALLBACK;
  const paragraphs = topic.paragraphs.slice(0, COUNT[settings.length]);
  paragraphs[0] = OPENERS[settings.tone] + paragraphs[0];
  if (settings.warmth >= 60) {
    paragraphs.push("I'm here whenever you want to change any of it.");
  }

  const steps: TraceStep[] = settings.tools.map((tool) => ({
    ...STEPS[tool],
    id: uid("s"),
  }));
  if (settings.memory) {
    steps.unshift({
      id: uid("s"),
      icon: "memory",
      title: "Recalled what you've shared",
      detail: "4 memories",
    });
  }
  if (settings.deep) {
    steps.push({
      id: uid("s"),
      icon: "think",
      title: "Weighed three approaches",
      detail: "chose the gentlest",
    });
  }

  return {
    text: paragraphs.join("\n\n"),
    steps,
    table: settings.length === "brief" ? undefined : topic.table,
    code: topic.code,
    suggestions: topic.suggestions,
  };
}

export function titleFrom(prompt: string) {
  const clean = prompt.replace(/\s+/g, " ").trim();
  return clean.length > 38 ? `${clean.slice(0, 36).trimEnd()}…` : clean;
}
