"use client";

import { toast } from "@neomorphic-react/ui/toast";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  type ChatMessage,
  type Conversation,
  clockNow,
  composeReply,
  DEFAULT_SETTINGS,
  type FileRef,
  MEMORIES,
  SEED,
  type Settings,
  titleFrom,
  uid,
  WEEK,
} from "@/lib/chat";

export type Feedback = "up" | "down";

interface ChatContextValue {
  active: Conversation;
  busy: boolean;
  conversations: Conversation[];
  feedback: Record<string, Feedback | undefined>;
  loading: boolean;
  memories: string[];
  newChat: () => void;
  open: (id: string) => void;
  paletteOpen: boolean;
  panelOpen: boolean;
  regenerate: () => void;
  remove: (id: string) => void;
  removeMemory: (memory: string) => void;
  rename: (id: string, title: string) => void;
  send: (text: string, files?: FileRef[]) => void;
  setFeedback: (id: string, value: Feedback | undefined) => void;
  setPaletteOpen: (open: boolean) => void;
  setPanelOpen: (open: boolean) => void;
  settings: Settings;
  speak: (text: string) => void;
  stop: () => void;
  submitCheckin: (summary: string, rest: number) => void;
  togglePin: (id: string) => void;
  update: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  week: typeof WEEK;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}

type Timer = ReturnType<typeof setTimeout>;

export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(SEED);
  const [activeId, setActiveId] = useState("evening");
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [feedback, setFeedbackMap] = useState<
    Record<string, Feedback | undefined>
  >({ "evening-2": "up" });
  const [memories, setMemories] = useState(MEMORIES);
  const [week, setWeek] = useState(WEEK);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const settingsRef = useRef(settings);
  settingsRef.current = settings;
  const timers = useRef(new Set<Timer>());
  const streaming = useRef<{ conversation: string; message: string } | null>(
    null
  );

  const active =
    conversations.find((c) => c.id === activeId) ??
    (conversations[0] as Conversation);

  const later = useCallback((ms: number, run: () => void) => {
    const timer = setTimeout(() => {
      timers.current.delete(timer);
      run();
    }, ms);
    timers.current.add(timer);
  }, []);

  const clearTimers = useCallback(() => {
    for (const timer of timers.current) {
      clearTimeout(timer);
    }
    timers.current.clear();
  }, []);

  useEffect(
    () => () => {
      clearTimers();
      window.speechSynthesis?.cancel();
    },
    [clearTimers]
  );

  const patch = useCallback(
    (
      conversation: string,
      message: string,
      change: (m: ChatMessage) => ChatMessage
    ) => {
      setConversations((current) =>
        current.map((c) =>
          c.id === conversation
            ? {
                ...c,
                entries: c.entries.map((e) =>
                  e.type === "message" && e.id === message ? change(e) : e
                ),
              }
            : c
        )
      );
    },
    []
  );

  const speak = useCallback((text: string) => {
    const synth = window.speechSynthesis;
    if (!synth) {
      toast({ title: "Reading aloud isn't supported in this browser" });
      return;
    }
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.92;
    utterance.pitch = 0.95;
    synth.speak(utterance);
  }, []);

  /** Thinks through each step, then streams the reply word by word. */
  const reply = useCallback(
    (conversation: string, prompt: string) => {
      const id = uid();
      const full = composeReply(prompt, settingsRef.current);
      const steps = full.steps ?? [];
      const pending: ChatMessage = {
        type: "message",
        id,
        role: "assistant",
        time: clockNow(),
        status: "thinking",
        text: "",
        steps: steps.map((step, index) => ({
          ...step,
          status: index === 0 ? "running" : "pending",
        })),
      };
      setConversations((current) =>
        current.map((c) =>
          c.id === conversation ? { ...c, entries: [...c.entries, pending] } : c
        )
      );
      streaming.current = { conversation, message: id };
      setBusy(true);

      let at = 450;
      steps.forEach((_, done) => {
        at += 520;
        later(at, () =>
          patch(conversation, id, (m) => ({
            ...m,
            steps: m.steps?.map((step, index) => ({
              ...step,
              status:
                index <= done
                  ? undefined
                  : index === done + 1
                    ? "running"
                    : "pending",
            })),
          }))
        );
      });

      const words = (full.text ?? "").split(/(?<=\s)/);
      let shown = 0;
      const tick = () => {
        const perTick = Math.max(1, Math.round(settingsRef.current.pace / 12));
        shown = Math.min(words.length, shown + perTick);
        const text = words.slice(0, shown).join("");
        if (shown < words.length) {
          patch(conversation, id, (m) => ({ ...m, status: "streaming", text }));
          later(80, tick);
          return;
        }
        patch(conversation, id, (m) => ({
          ...m,
          ...full,
          steps: m.steps,
          status: "done",
        }));
        streaming.current = null;
        setBusy(false);
        if (settingsRef.current.speak) {
          speak(full.text ?? "");
        }
      };
      later(at + 350, tick);
    },
    [later, patch, speak]
  );

  const send = useCallback(
    (text: string, files: FileRef[] = []) => {
      const prompt = text.trim();
      if (!prompt && files.length === 0) {
        return;
      }
      const conversation = active.id;
      const message: ChatMessage = {
        type: "message",
        id: uid(),
        role: "user",
        time: clockNow(),
        text: prompt || undefined,
        files: files.length ? files : undefined,
      };
      setConversations((current) =>
        current.map((c) =>
          c.id === conversation
            ? {
                ...c,
                title:
                  c.entries.length === 0 && prompt
                    ? titleFrom(prompt)
                    : c.title,
                entries: [...c.entries, message],
              }
            : c
        )
      );
      reply(conversation, prompt || "attachment");
    },
    [active.id, reply]
  );

  const stop = useCallback(() => {
    const current = streaming.current;
    clearTimers();
    streaming.current = null;
    setBusy(false);
    if (current) {
      patch(current.conversation, current.message, (m) => ({
        ...m,
        status: "stopped",
        steps: m.steps?.map((step) => ({ ...step, status: undefined })),
      }));
    }
  }, [clearTimers, patch]);

  const regenerate = useCallback(() => {
    const lastUser = active.entries.findLast(
      (e): e is ChatMessage => e.type === "message" && e.role === "user"
    );
    stop();
    setConversations((current) =>
      current.map((c) => {
        if (c.id !== active.id) {
          return c;
        }
        const last = c.entries.at(-1);
        return last?.type === "message" && last.role === "assistant"
          ? { ...c, entries: c.entries.slice(0, -1) }
          : c;
      })
    );
    reply(active.id, lastUser?.text ?? "");
  }, [active, reply, stop]);

  const open = useCallback(
    (id: string) => {
      if (id === active.id) {
        return;
      }
      stop();
      setActiveId(id);
      setConversations((current) =>
        current.map((c) => (c.id === id ? { ...c, unread: undefined } : c))
      );
      setLoading(true);
      later(420, () => setLoading(false));
    },
    [active.id, later, stop]
  );

  const newChat = useCallback(() => {
    stop();
    const blank = conversations.find(
      (c) => c.entries.length === 0 && c.when === "today"
    );
    if (blank) {
      setActiveId(blank.id);
      return;
    }
    const id = uid("c");
    setConversations((current) => [
      {
        id,
        title: "New chat",
        topic: "Chats",
        when: "today",
        pinned: false,
        entries: [],
      },
      ...current,
    ]);
    setActiveId(id);
  }, [conversations, stop]);

  const togglePin = useCallback((id: string) => {
    setConversations((current) =>
      current.map((c) => (c.id === id ? { ...c, pinned: !c.pinned } : c))
    );
  }, []);

  const rename = useCallback((id: string, title: string) => {
    setConversations((current) =>
      current.map((c) => (c.id === id ? { ...c, title } : c))
    );
  }, []);

  const remove = useCallback(
    (id: string) => {
      const removed = conversations.find((c) => c.id === id);
      const rest = conversations.filter((c) => c.id !== id);
      if (rest.length === 0 || !removed) {
        return;
      }
      if (id === active.id) {
        stop();
        setActiveId((rest[0] as Conversation).id);
      }
      setConversations(rest);
      toast({
        title: "Chat deleted",
        description: removed.title,
        action: {
          label: "Undo",
          onClick: () => setConversations((current) => [removed, ...current]),
        },
      });
    },
    [active.id, conversations, stop]
  );

  const setFeedback = useCallback((id: string, value: Feedback | undefined) => {
    setFeedbackMap((current) => ({ ...current, [id]: value }));
    if (value === "down") {
      toast({
        title: "Thanks for telling me",
        description: "I'll try a different approach next time.",
      });
    }
  }, []);

  const removeMemory = useCallback((memory: string) => {
    setMemories((current) => current.filter((m) => m !== memory));
    toast({
      title: "Forgotten",
      description: memory,
      action: {
        label: "Undo",
        onClick: () => setMemories((current) => [...current, memory]),
      },
    });
  }, []);

  const submitCheckin = useCallback(
    (summary: string, rest: number) => {
      setWeek((current) =>
        current.map((day, index) =>
          index === current.length - 1 ? { ...day, rest } : day
        )
      );
      send(summary);
    },
    [send]
  );

  const update = useCallback(
    <K extends keyof Settings>(key: K, value: Settings[K]) => {
      setSettings((current) => ({ ...current, [key]: value }));
    },
    []
  );

  const value = useMemo<ChatContextValue>(
    () => ({
      active,
      busy,
      conversations,
      feedback,
      loading,
      memories,
      newChat,
      open,
      paletteOpen,
      panelOpen,
      regenerate,
      remove,
      removeMemory,
      rename,
      send,
      setFeedback,
      setPaletteOpen,
      setPanelOpen,
      settings,
      speak,
      stop,
      submitCheckin,
      togglePin,
      update,
      week,
    }),
    [
      active,
      busy,
      conversations,
      feedback,
      loading,
      memories,
      newChat,
      open,
      paletteOpen,
      panelOpen,
      regenerate,
      remove,
      removeMemory,
      rename,
      send,
      setFeedback,
      settings,
      speak,
      stop,
      submitCheckin,
      togglePin,
      update,
      week,
    ]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
