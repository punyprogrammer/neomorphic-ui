"use client";

import { Bubble, BubbleContent } from "@neomorphic-react/ui/bubble";
import { Button } from "@neomorphic-react/ui/button";
import { Marker, MarkerContent } from "@neomorphic-react/ui/marker";
import { Message } from "@neomorphic-react/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@neomorphic-react/ui/message-scroller";
import { useEffect, useRef, useState } from "react";

const QUESTION = "How should we roll out the new checkout?";
const REPLY =
  "Start with 10% of returning customers for a week, since they know the old flow and will notice problems first. Watch payment errors, time to purchase and support contacts against the rest. If all three hold, move to half of all traffic for another week, then everyone. Keep the old checkout behind a flag until the full rollout has run for a fortnight, so you can switch back in minutes.";

export default function MessageScrollerStreaming() {
  const [turns, setTurns] = useState([
    { id: "a0", mine: false, text: "Hi. What are you working on today?" },
  ]);
  const [streaming, setStreaming] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);
  useEffect(() => () => clearInterval(timer.current), []);

  const ask = () => {
    const reply = `a${turns.length}`;
    const words = REPLY.split(" ");
    let count = 0;
    setStreaming(true);
    setTurns((current) => [
      ...current,
      { id: `q${current.length}`, mine: true, text: QUESTION },
      { id: reply, mine: false, text: "" },
    ]);
    timer.current = setInterval(() => {
      count += 2;
      const text = words.slice(0, count).join(" ");
      setTurns((current) =>
        current.map((turn) => (turn.id === reply ? { ...turn, text } : turn))
      );
      if (count >= words.length) {
        clearInterval(timer.current);
        setStreaming(false);
      }
    }, 80);
  };

  return (
    <MessageScrollerProvider autoScroll>
      <div className="grid w-full max-w-md gap-4">
        <div className="inset-shadow-neu h-80 overflow-hidden rounded-2xl bg-background p-1 shadow-neu-flat">
          <MessageScroller>
            <MessageScrollerViewport className="px-4">
              <MessageScrollerContent
                aria-busy={streaming}
                aria-label="Conversation with the assistant"
                className="py-4"
              >
                {turns.map((turn) => (
                  <MessageScrollerItem
                    key={turn.id}
                    messageId={turn.id}
                    scrollAnchor={turn.mine}
                  >
                    {turn.text ? (
                      <Message align={turn.mine ? "end" : "start"}>
                        <Bubble
                          align={turn.mine ? "end" : "start"}
                          variant={turn.mine ? "default" : "ghost"}
                        >
                          <BubbleContent>{turn.text}</BubbleContent>
                        </Bubble>
                      </Message>
                    ) : (
                      <Marker role="status" shimmer>
                        <MarkerContent>Thinking…</MarkerContent>
                      </Marker>
                    )}
                  </MessageScrollerItem>
                ))}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </div>
        <Button
          className="justify-self-end"
          disabled={streaming}
          onClick={ask}
          size="sm"
          variant="primary"
        >
          Ask about the rollout
        </Button>
      </div>
    </MessageScrollerProvider>
  );
}
