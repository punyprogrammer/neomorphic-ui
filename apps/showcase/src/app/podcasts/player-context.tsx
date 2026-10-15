"use client";

import { toast } from "@neomorphic-react/ui/toast";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { EPISODES, getEpisode, getShow } from "@/lib/podcasts";

export type View =
  | { kind: "home" }
  | { kind: "search" }
  | { kind: "saved" }
  | { kind: "show"; id: string };

export type Panel = "now" | "queue" | "chapters" | null;

const TICK = 250;

function usePlayerState() {
  const [current, setCurrent] = useState("slow-signal-1");
  const [position, setPosition] = useState(
    () => getEpisode("slow-signal-1").heard
  );
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(70);
  const [muted, setMuted] = useState(false);
  const [queue, setQueue] = useState([
    "headroom-1",
    "tidewater-1",
    "groove-theory-1",
  ]);
  const [heard, setHeard] = useState<Record<string, number>>(() =>
    Object.fromEntries(EPISODES.map((episode) => [episode.id, episode.heard]))
  );
  const [saved, setSaved] = useState<string[]>(["tidewater-1", "margins-1"]);
  const [followed, setFollowed] = useState([
    "slow-signal",
    "headroom",
    "tidewater",
    "small-hours",
    "groove-theory",
    "field-notes",
    "margins",
    "after-hours",
  ]);
  const [pinned, setPinned] = useState(["slow-signal", "small-hours"]);
  const [panel, setPanel] = useState<Panel>("now");
  const [sleepAt, setSleepAt] = useState<number | null>(null);
  const [history, setHistory] = useState<{ stack: View[]; index: number }>({
    stack: [{ kind: "home" }],
    index: 0,
  });
  const [query, setQuery] = useState("");

  const episode = getEpisode(current);
  const positionRef = useRef(position);
  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  const load = useCallback(
    (id: string, autoplay = true) => {
      setHeard((h) => ({ ...h, [current]: positionRef.current }));
      const next = getEpisode(id);
      const resume = heard[id] ?? 0;
      setCurrent(id);
      setPosition(resume >= next.duration - 5 ? 0 : resume);
      setPlaying(autoplay);
    },
    [current, heard]
  );

  const next = useCallback(() => {
    const [first, ...rest] = queue;
    if (!first) {
      setPlaying(false);
      setPosition(episode.duration);
      return;
    }
    setQueue(rest);
    load(first);
  }, [episode.duration, load, queue]);

  useEffect(() => {
    if (!playing) {
      return;
    }
    // Browsers throttle timers in background tabs, so advance by the time
    // that actually passed rather than by one tick.
    let last = performance.now();
    const timer = window.setInterval(() => {
      if (sleepAt !== null && Date.now() >= sleepAt) {
        setPlaying(false);
        setSleepAt(null);
        toast({ title: "Sleep timer ended", description: "Playback paused." });
        return;
      }
      const now = performance.now();
      const elapsed = (now - last) / 1000;
      last = now;
      setPosition((p) => p + elapsed * speed);
    }, TICK);
    return () => window.clearInterval(timer);
  }, [playing, sleepAt, speed]);

  useEffect(() => {
    if (playing && position >= episode.duration) {
      setHeard((h) => ({ ...h, [current]: episode.duration }));
      next();
    }
  }, [current, episode.duration, next, playing, position]);

  const toggle = useCallback(() => setPlaying((p) => !p), []);

  const navigate = useCallback((view: View) => {
    setHistory(({ stack, index }) => {
      const head = stack.slice(0, index + 1);
      const last = head[head.length - 1];
      if (JSON.stringify(last) === JSON.stringify(view)) {
        return { stack, index };
      }
      return { stack: [...head, view], index: head.length };
    });
  }, []);

  return {
    current,
    episode,
    show: getShow(episode.showId),
    position,
    playing,
    speed,
    volume,
    muted,
    queue,
    heard: { ...heard, [current]: position },
    saved,
    followed,
    pinned,
    panel,
    sleepAt,
    query,
    view: history.stack[history.index],
    canBack: history.index > 0,
    canForward: history.index < history.stack.length - 1,
    setQuery,
    setPanel,
    setSpeed,
    setVolume: (value: number) => {
      setVolume(value);
      setMuted(value === 0);
    },
    toggleMute: () => setMuted((m) => !m),
    setSleep: (minutes: number | null) =>
      setSleepAt(minutes === null ? null : Date.now() + minutes * 60_000),
    play: (id: string) => {
      if (id === current) {
        setPlaying((p) => !p);
      } else {
        setQueue((q) => q.filter((item) => item !== id));
        load(id);
      }
    },
    toggle,
    seek: (seconds: number) =>
      setPosition(Math.min(Math.max(seconds, 0), episode.duration - 1)),
    skip: (delta: number) =>
      setPosition((p) =>
        Math.min(Math.max(p + delta, 0), episode.duration - 1)
      ),
    next,
    previous: () => {
      if (positionRef.current > 5) {
        setPosition(0);
      }
    },
    enqueue: (id: string) => {
      setQueue((q) => (q.includes(id) || id === current ? q : [...q, id]));
      toast({ title: "Added to queue", description: getEpisode(id).title });
    },
    dequeue: (id: string) => setQueue((q) => q.filter((item) => item !== id)),
    clearQueue: () => setQueue([]),
    toggleSaved: (id: string) =>
      setSaved((s) =>
        s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
      ),
    toggleFollow: (id: string) =>
      setFollowed((f) =>
        f.includes(id) ? f.filter((x) => x !== id) : [...f, id]
      ),
    togglePin: (id: string) =>
      setPinned((p) =>
        p.includes(id) ? p.filter((x) => x !== id) : [...p, id]
      ),
    markPlayed: (id: string) =>
      setHeard((h) => ({ ...h, [id]: getEpisode(id).duration })),
    navigate,
    back: () => setHistory((h) => ({ ...h, index: Math.max(h.index - 1, 0) })),
    forward: () =>
      setHistory((h) => ({
        ...h,
        index: Math.min(h.index + 1, h.stack.length - 1),
      })),
  };
}

type Player = ReturnType<typeof usePlayerState>;

const PlayerContext = createContext<Player | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const player = usePlayerState();
  return <PlayerContext value={player}>{children}</PlayerContext>;
}

export function usePlayer() {
  const player = useContext(PlayerContext);
  if (!player) {
    throw new Error("usePlayer needs a PlayerProvider");
  }
  return player;
}

/** Episodes the listener has started but not finished. */
export function useInProgress() {
  const { heard } = usePlayer();
  return EPISODES.filter(
    (episode) => heard[episode.id] > 0 && heard[episode.id] < episode.duration
  );
}
