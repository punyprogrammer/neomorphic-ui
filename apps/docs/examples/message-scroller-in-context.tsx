"use client";

import { Bubble, BubbleContent } from "@neomorphic-react/ui/bubble";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@neomorphic-react/ui/input-group";
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
import { ArrowUp } from "lucide-react";
import { type FormEvent, useState } from "react";

const opening = [
  { id: "1", mine: false, text: "Hi, I'm Jo from support. How can I help?" },
  {
    id: "2",
    mine: true,
    text: "Order #4821 says delivered, but it isn't here.",
  },
  {
    id: "3",
    mine: false,
    text: "Sorry about that. Is your door the green one?",
  },
];

const REPLY =
  "Thanks. I've asked the courier to check, and I'll update you here within the hour.";

export default function MessageScrollerInContext() {
  const [messages, setMessages] = useState(opening);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);

  const add = (mine: boolean, body: string) =>
    setMessages((current) => [
      ...current,
      { id: `${current.length + 1}`, mine, text: body },
    ]);

  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!text.trim()) {
      return;
    }
    add(true, text.trim());
    setText("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      add(false, REPLY);
    }, 1500);
  };

  return (
    <MessageScrollerProvider autoScroll>
      <div className="grid w-full max-w-md gap-4">
        <div className="inset-shadow-neu h-72 overflow-hidden rounded-2xl bg-background p-1 shadow-neu-flat">
          <MessageScroller>
            <MessageScrollerViewport className="px-3">
              <MessageScrollerContent
                aria-label="Chat with Jo"
                className="py-3"
              >
                {messages.map((message) => (
                  <MessageScrollerItem
                    key={message.id}
                    messageId={message.id}
                    scrollAnchor={message.mine}
                  >
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
                {typing ? (
                  <MessageScrollerItem>
                    <Marker role="status" shimmer>
                      <MarkerContent>Jo is typing…</MarkerContent>
                    </Marker>
                  </MessageScrollerItem>
                ) : null}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </div>
        <form onSubmit={send}>
          <InputGroup shape="pill">
            <InputGroupInput
              aria-label="Message"
              onValueChange={setText}
              placeholder="Write a message…"
              value={text}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                aria-label="Send message"
                disabled={!text.trim()}
                icon={<ArrowUp />}
                type="submit"
                variant="primary"
              />
            </InputGroupAddon>
          </InputGroup>
        </form>
      </div>
    </MessageScrollerProvider>
  );
}
