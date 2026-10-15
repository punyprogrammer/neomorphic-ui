import { Bubble, BubbleContent } from "@neomorphic-react/ui/bubble";
import { Button } from "@neomorphic-react/ui/button";
import { Marker, MarkerContent, MarkerIcon } from "@neomorphic-react/ui/marker";
import {
  Message,
  MessageContent,
  MessageHeader,
} from "@neomorphic-react/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
} from "@neomorphic-react/ui/message-scroller";
import { Spinner } from "@neomorphic-react/ui/spinner";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SendHorizontal } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";

const REPLY_END = /compare first-invite completion/;
const EARLIER = /Earlier question 1/;

interface Turn {
  id: string;
  role: "user" | "assistant";
  text: string;
}

const FIRST_QUESTION =
  "We're seeing activation dip after workspace creation. Where should I look?";

const QUESTIONS = [
  FIRST_QUESTION,
  "What should I compare before changing the onboarding flow?",
  "Can you turn that into an experiment?",
];

const ANSWERS = [
  "The sharpest drop is between creating the workspace and inviting the first teammate. Workspace creation is still healthy, but the invite step is where people pause.",
  "Compare three cohorts: people who choose a template before inviting, people who start from a blank workspace, and people who skip invites but come back within a day.",
  "Yes. Show a short checklist after workspace creation: pick a template, add one project detail, then invite a teammate once the workspace has some context. Measure first-invite completion and next-day return.",
];

const REPLY =
  "Here's a plan. First, segment activation by account size, because large teams often invite during setup while small ones wait. Second, look at whether template users invite sooner; if they do, the fix is better first-run guidance, not a louder prompt. Third, keep the invite action visible in the header so confident teams still have a direct route. Fourth, watch the 24-hour return rate for people who skip the invite, since a skipped step isn't always a lost user. Finally, ship the checklist to half of new workspaces for two weeks and compare first-invite completion, second-project creation and support contacts between the groups.";

const HISTORY: Turn[] = Array.from({ length: 6 }, (_, i) => ({
  id: `old-${i + 1}`,
  role: i % 2 === 0 ? "user" : "assistant",
  text:
    i % 2 === 0
      ? `Earlier question ${i / 2 + 1}: how did the last onboarding test go?`
      : `Earlier answer ${(i + 1) / 2}: completion rose 3%, mostly from teams that used a template.`,
}));

function savedThread(): Turn[] {
  return QUESTIONS.flatMap((question, i) => [
    { id: `q${i + 1}`, role: "user" as const, text: question },
    { id: `a${i + 1}`, role: "assistant" as const, text: ANSWERS[i] ?? "" },
  ]);
}

function TurnRow({ turn }: { turn: Turn }) {
  const mine = turn.role === "user";
  return (
    <MessageScrollerItem messageId={turn.id} scrollAnchor={mine}>
      <Message align={mine ? "end" : "start"}>
        <MessageContent>
          {mine ? null : <MessageHeader>Assistant</MessageHeader>}
          <Bubble
            align={mine ? "end" : "start"}
            variant={mine ? "default" : "ghost"}
          >
            <BubbleContent>{turn.text}</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageScrollerItem>
  );
}

function LoadEarlierRow({ onLoad }: { onLoad: () => void }) {
  return (
    <MessageScrollerItem className="flex justify-center">
      <Button onClick={onLoad} size="sm" variant="ghost">
        Load earlier messages
      </Button>
    </MessageScrollerItem>
  );
}

function JumpTo() {
  const { scrollToMessage } = useMessageScroller();
  const jump = useCallback(() => scrollToMessage("q1"), [scrollToMessage]);
  return (
    <Button onClick={jump} size="sm" variant="ghost">
      First question
    </Button>
  );
}

function Chat({ history = false }: { history?: boolean }) {
  const [turns, setTurns] = useState<Turn[]>(savedThread);
  const [older, setOlder] = useState(history ? HISTORY : []);
  const [status, setStatus] = useState<"idle" | "thinking" | "streaming">(
    "idle"
  );
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => {
    const pending = timers.current;
    return () => {
      for (const timer of pending) {
        clearTimeout(timer);
        clearInterval(timer);
      }
    };
  }, []);

  const loadEarlier = useCallback(() => {
    timers.current.push(
      setTimeout(() => {
        setTurns((current) => [...older, ...current]);
        setOlder([]);
      }, 200)
    );
  }, [older]);

  const send = useCallback(() => {
    const n = Date.now();
    setTurns((current) => [
      ...current,
      { id: `u${n}`, role: "user", text: "Give me a step-by-step plan." },
    ]);
    setStatus("thinking");
    const words = REPLY.split(" ");
    const reply = `r${n}`;
    let count = 0;
    const stream = () => {
      count += 3;
      const text = words.slice(0, count).join(" ");
      setTurns((current) =>
        current.map((turn) => (turn.id === reply ? { ...turn, text } : turn))
      );
      if (count >= words.length) {
        clearInterval(interval);
        setStatus("idle");
      }
    };
    let interval: ReturnType<typeof setInterval> | undefined;
    timers.current.push(
      setTimeout(() => {
        setStatus("streaming");
        setTurns((current) => [
          ...current,
          { id: reply, role: "assistant", text: "" },
        ]);
        interval = setInterval(stream, 45);
        timers.current.push(interval);
      }, 700)
    );
  }, []);

  return (
    <MessageScrollerProvider autoScroll>
      <div className="flex w-[32rem] flex-col gap-3 p-8">
        <div className="inset-shadow-neu flex h-[26rem] flex-col overflow-hidden rounded-2xl bg-background p-1 shadow-neu-flat">
          <MessageScroller>
            <MessageScrollerViewport className="px-4">
              <MessageScrollerContent
                aria-busy={status === "streaming"}
                aria-label="Conversation with the assistant"
                className="py-4"
              >
                {older.length > 0 ? (
                  <LoadEarlierRow onLoad={loadEarlier} />
                ) : null}
                {turns.map((turn) => (
                  <TurnRow key={turn.id} turn={turn} />
                ))}
                {status === "thinking" ? (
                  <MessageScrollerItem>
                    <Marker role="status" shimmer>
                      <MarkerIcon>
                        <Spinner
                          aria-hidden="true"
                          className="size-4"
                          size="sm"
                        />
                      </MarkerIcon>
                      <MarkerContent>Thinking…</MarkerContent>
                    </Marker>
                  </MessageScrollerItem>
                ) : null}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </div>
        <div className="flex justify-between">
          <JumpTo />
          <Button
            disabled={status !== "idle"}
            icon={<SendHorizontal />}
            iconPosition="end"
            onClick={send}
            size="sm"
            variant="primary"
          >
            Ask for a plan
          </Button>
        </div>
      </div>
    </MessageScrollerProvider>
  );
}

const meta = {
  title: "Components/Message Scroller",
  component: MessageScroller,
  parameters: {
    docs: {
      description: {
        component: `
The scroll behaviour of a chat transcript. \`MessageScrollerProvider\` owns
the state; \`MessageScroller\` is the frame (it fills its parent, so give the
parent a height); \`MessageScrollerViewport\` scrolls; \`MessageScrollerContent\`
is the \`role="log"\`; each row is a \`MessageScrollerItem\`.

\`\`\`tsx
import {
  MessageScroller, MessageScrollerButton, MessageScrollerContent,
  MessageScrollerItem, MessageScrollerProvider, MessageScrollerViewport,
} from "@neomorphic-react/ui/message-scroller";

<MessageScrollerProvider autoScroll>
  <MessageScroller>
    <MessageScrollerViewport>
      <MessageScrollerContent aria-label="Conversation">
        {messages.map((m) => (
          <MessageScrollerItem key={m.id} messageId={m.id} scrollAnchor={m.role === "user"}>
            <Message>…</Message>
          </MessageScrollerItem>
        ))}
      </MessageScrollerContent>
    </MessageScrollerViewport>
    <MessageScrollerButton />
  </MessageScroller>
</MessageScrollerProvider>
\`\`\`

- **Opening**: \`defaultScrollPosition="last-anchor"\` opens at the reader's
  latest question with the reply below it (\`end\` and \`start\` are there too).
  The viewport stays hidden until that's applied, so nothing jumps.
- **New turns**: an appended \`scrollAnchor\` row settles near the top, with
  \`scrollPreviousItemPeek\` pixels of the row before it still visible. The
  reply streams into the room below without moving the view.
- **Following**: with \`autoScroll\`, growing output stays in view while the
  reader is at the latest message. Scrolling away (wheel, touch, keys,
  scrollbar), selecting text or jumping to a message releases it.
- **History**: prepending earlier rows keeps the reader's place
  (\`preserveScrollOnPrepend\`); give rows a stable \`messageId\`.
- **Jump**: \`MessageScrollerButton\` is a raised round button, hidden and
  inert until there is content below. \`useMessageScroller()\` gives
  \`scrollToEnd\`, \`scrollToStart\` and \`scrollToMessage(id)\` to controls
  anywhere inside the provider; \`useMessageScrollerScrollable()\` says which
  edges can still be reached.

The viewport is a focusable region named "Messages"; the log announces added
rows, not every streamed token (set \`aria-busy\` while a reply streams).
`,
      },
    },
  },
} satisfies Meta<typeof MessageScroller>;

export default meta;
type Story = StoryObj<typeof meta>;

const viewportOf = (canvasElement: HTMLElement) =>
  within(canvasElement).getByRole("region", { name: "Messages" });

const topWithin = (element: Element, viewport: Element) =>
  element.getBoundingClientRect().top - viewport.getBoundingClientRect().top;

/**
 * Opens at the last question, streams a reply below a new one, and jumps
 * back to the latest message after scrolling away.
 */
export const Default: Story = {
  render: () => <Chat />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const viewport = viewportOf(canvasElement);
    const root = canvasElement.querySelector("[data-slot=message-scroller]");
    await expect(
      canvas.getByRole("log", { name: "Conversation with the assistant" })
    ).toBeInTheDocument();

    // Opens at the latest turn; the jump button is hidden and inert.
    await waitFor(() =>
      expect(viewport).not.toHaveAttribute("data-pending-scroll")
    );
    await expect(root).toHaveAttribute("data-at-end");
    const jump = canvas.getByRole("button", {
      hidden: true,
      name: "Scroll to latest",
    });
    await expect(jump).toHaveAttribute("inert");

    // A new question settles near the top, with a peek of the reply above.
    await userEvent.click(
      canvas.getByRole("button", { name: "Ask for a plan" })
    );
    const question = await canvas.findByText("Give me a step-by-step plan.");
    await waitFor(
      () => {
        const top = topWithin(question, viewport);
        expect(top).toBeGreaterThan(40);
        expect(top).toBeLessThan(110);
      },
      { timeout: 2000 }
    );

    // The reply streams past the fold; the view follows it to the end.
    await waitFor(() => expect(canvas.getByText(REPLY_END)).toBeVisible(), {
      timeout: 10_000,
    });
    await waitFor(() => expect(root).toHaveAttribute("data-at-end"));

    // Scrolling away releases the view; the button brings it back.
    viewport.scrollTop = 0;
    await waitFor(() => expect(root).not.toHaveAttribute("data-following"));
    await waitFor(() => expect(jump).not.toHaveAttribute("inert"));
    await userEvent.click(jump);
    await waitFor(() => expect(root).toHaveAttribute("data-at-end"), {
      timeout: 2000,
    });
    await expect(root).toHaveAttribute("data-following");
  },
};

/** "Load earlier messages" prepends history without moving what you're reading. */
export const LoadEarlier: Story = {
  render: () => <Chat history />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const viewport = viewportOf(canvasElement);
    await waitFor(() =>
      expect(viewport).not.toHaveAttribute("data-pending-scroll")
    );
    viewport.scrollTop = 0;
    const first = canvas.getByText(FIRST_QUESTION);
    await waitFor(() => expect(topWithin(first, viewport)).toBeGreaterThan(0));
    const before = topWithin(first, viewport);

    await userEvent.click(
      canvas.getByRole("button", { name: "Load earlier messages" })
    );
    await canvas.findByText(EARLIER);
    await expect(Math.abs(topWithin(first, viewport) - before)).toBeLessThan(2);
    await expect(
      canvas.queryByRole("button", { name: "Load earlier messages" })
    ).toBeNull();
  },
};

/** `useMessageScroller().scrollToMessage` from a control outside the frame. */
export const JumpToMessage: Story = {
  render: () => <Chat />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const viewport = viewportOf(canvasElement);
    const first = canvas.getByText(FIRST_QUESTION);
    await userEvent.click(
      canvas.getByRole("button", { name: "First question" })
    );
    await waitFor(
      () => {
        const top = topWithin(first, viewport);
        expect(top).toBeGreaterThanOrEqual(0);
        expect(top).toBeLessThan(110);
      },
      { timeout: 2000 }
    );
  },
};
