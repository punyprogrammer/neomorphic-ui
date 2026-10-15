"use client";

import { Bubble, BubbleContent } from "@neomorphic-react/ui/bubble";
import { Button } from "@neomorphic-react/ui/button";
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
import { MapPin } from "lucide-react";

const messages = [
  { id: "m1", from: "Ana", text: "Offsite is confirmed for 14 November." },
  {
    id: "venue",
    from: "Ana",
    text: "Venue: The Old Mill, 12 River Lane. Doors at 9:00.",
  },
  {
    id: "m3",
    from: "Leo",
    text: "Is there parking, or should we get the train?",
  },
  {
    id: "m4",
    from: "Ana",
    text: "Twenty spaces. The station is a ten-minute walk.",
  },
  { id: "m5", from: "Priya", text: "I'll book a table for dinner afterwards." },
  { id: "m6", from: "Leo", text: "Can someone bring the projector adapter?" },
  { id: "m7", from: "Ana", text: "Done, it's in my bag already." },
  { id: "m8", from: "Priya", text: "Dinner is booked for 19:30 at Fern." },
];

function JumpToVenue() {
  const { scrollToMessage } = useMessageScroller();
  return (
    <Button
      className="justify-self-start"
      icon={<MapPin />}
      onClick={() => scrollToMessage("venue")}
      size="sm"
      variant="ghost"
    >
      Venue details
    </Button>
  );
}

export default function MessageScrollerJump() {
  return (
    <MessageScrollerProvider defaultScrollPosition="end">
      <div className="grid w-full max-w-md gap-3">
        <div className="inset-shadow-neu h-80 overflow-hidden rounded-2xl bg-background p-1 shadow-neu-flat">
          <MessageScroller>
            <MessageScrollerViewport className="px-4">
              <MessageScrollerContent
                aria-label="Offsite planning"
                className="py-4"
              >
                {messages.map((message) => (
                  <MessageScrollerItem key={message.id} messageId={message.id}>
                    <Message>
                      <MessageContent>
                        <MessageHeader>{message.from}</MessageHeader>
                        <Bubble variant="secondary">
                          <BubbleContent>{message.text}</BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                ))}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton direction="start" />
            <MessageScrollerButton>Latest</MessageScrollerButton>
          </MessageScroller>
        </div>
        <JumpToVenue />
      </div>
    </MessageScrollerProvider>
  );
}
