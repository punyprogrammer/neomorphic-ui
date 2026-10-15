"use client";

import { Bubble, BubbleContent } from "@neomorphic-react/ui/bubble";
import { Button } from "@neomorphic-react/ui/button";
import { Message } from "@neomorphic-react/ui/message";
import {
  MessageScroller,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@neomorphic-react/ui/message-scroller";
import { useState } from "react";

const earlier = [
  { id: "1", mine: true, text: "Did the flat on Elm Street come back to you?" },
  { id: "2", mine: false, text: "Yes, they can do a viewing on Saturday." },
  { id: "3", mine: true, text: "Morning or afternoon?" },
  { id: "4", mine: false, text: "11:00. The agent will meet us outside." },
];

const recent = [
  { id: "5", mine: true, text: "Is parking included in the rent?" },
  {
    id: "6",
    mine: false,
    text: "One space in the garage, and bikes go in the courtyard.",
  },
  {
    id: "7",
    mine: true,
    text: "Perfect. Let's put in an offer after the viewing.",
  },
  {
    id: "8",
    mine: false,
    text: "Agreed. I'll ask for the tenancy terms tonight.",
  },
  { id: "9", mine: true, text: "Thanks. Send them over when they arrive." },
];

export default function MessageScrollerHistory() {
  const [messages, setMessages] = useState(recent);
  const [loading, setLoading] = useState(false);
  const hasMore = messages.length < earlier.length + recent.length;

  const loadEarlier = () => {
    setLoading(true);
    setTimeout(() => {
      setMessages((current) => [...earlier, ...current]);
      setLoading(false);
    }, 600);
  };

  return (
    <MessageScrollerProvider defaultScrollPosition="end">
      <div className="inset-shadow-neu h-80 w-full max-w-md overflow-hidden rounded-2xl bg-background p-1 shadow-neu-flat">
        <MessageScroller>
          <MessageScrollerViewport className="px-4">
            <MessageScrollerContent aria-label="Chat with Sam" className="py-4">
              {hasMore ? (
                <MessageScrollerItem className="flex justify-center">
                  <Button
                    isLoading={loading}
                    onClick={loadEarlier}
                    size="sm"
                    variant="ghost"
                  >
                    Load earlier messages
                  </Button>
                </MessageScrollerItem>
              ) : null}
              {messages.map((message) => (
                <MessageScrollerItem key={message.id} messageId={message.id}>
                  <Message align={message.mine ? "end" : "start"}>
                    <Bubble
                      align={message.mine ? "end" : "start"}
                      variant={message.mine ? "default" : "secondary"}
                    >
                      <BubbleContent>{message.text}</BubbleContent>
                    </Bubble>
                  </Message>
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
        </MessageScroller>
      </div>
    </MessageScrollerProvider>
  );
}
