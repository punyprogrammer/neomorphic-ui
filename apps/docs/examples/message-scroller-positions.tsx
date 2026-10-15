"use client";

import { Bubble, BubbleContent } from "@neomorphic-react/ui/bubble";
import { Message } from "@neomorphic-react/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  type ScrollPosition,
} from "@neomorphic-react/ui/message-scroller";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@neomorphic-react/ui/toggle-group";
import { useState } from "react";

const turns = [
  { id: "q1", mine: true, text: "What's a good first plant for a dark flat?" },
  {
    id: "a1",
    mine: false,
    text: "A snake plant. It copes with low light and only needs water every few weeks.",
  },
  { id: "q2", mine: true, text: "How do I keep it healthy through winter?" },
  {
    id: "a2",
    mine: false,
    text: "Water it about once a month, and only when the soil is dry all the way down. Keep it away from radiators and cold windows, since sudden changes in temperature brown the leaf tips. It will barely grow until spring, which is normal, so hold off on feeding it until then. Wipe the leaves now and then so dust doesn't block what little light there is. If the leaves go soft or yellow at the base, it's had too much water: let it dry out completely before you water it again.",
  },
];

const positions = [
  { value: "last-anchor", label: "Last question" },
  { value: "end", label: "End" },
  { value: "start", label: "Start" },
] as const;

export default function MessageScrollerPositions() {
  const [position, setPosition] = useState<ScrollPosition>("last-anchor");

  return (
    <div className="grid w-full max-w-md gap-4">
      <ToggleGroup
        aria-label="Opening position"
        className="justify-self-center"
        onValueChange={(value) => {
          if (value[0]) {
            setPosition(value[0] as ScrollPosition);
          }
        }}
        size="sm"
        value={[position]}
      >
        {positions.map((item) => (
          <ToggleGroupItem className="px-4" key={item.value} value={item.value}>
            {item.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <MessageScrollerProvider defaultScrollPosition={position} key={position}>
        <div className="inset-shadow-neu h-72 overflow-hidden rounded-2xl bg-background p-1 shadow-neu-flat">
          <MessageScroller>
            <MessageScrollerViewport className="px-4">
              <MessageScrollerContent aria-label="Plant care" className="py-4">
                {turns.map((turn) => (
                  <MessageScrollerItem
                    key={turn.id}
                    messageId={turn.id}
                    scrollAnchor={turn.mine}
                  >
                    <Message align={turn.mine ? "end" : "start"}>
                      <Bubble
                        align={turn.mine ? "end" : "start"}
                        variant={turn.mine ? "default" : "ghost"}
                      >
                        <BubbleContent>{turn.text}</BubbleContent>
                      </Bubble>
                    </Message>
                  </MessageScrollerItem>
                ))}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton direction="start" />
            <MessageScrollerButton />
          </MessageScroller>
        </div>
      </MessageScrollerProvider>
    </div>
  );
}
