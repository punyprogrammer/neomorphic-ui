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
} from "@neomorphic-react/ui/message-scroller";

const messages = [
  { id: "1", mine: false, text: "Are we still on for the design review?" },
  { id: "2", mine: true, text: "Yes, 10:30 in the small meeting room." },
  { id: "3", mine: false, text: "Should I bring the checkout prototypes?" },
  { id: "4", mine: true, text: "Please. Priya wants to try them on a phone." },
  { id: "5", mine: false, text: "I'll load them on the test device tonight." },
  { id: "6", mine: true, text: "Could you add the error states too?" },
  {
    id: "7",
    mine: false,
    text: "Already done. The card decline and expired session screens are in the file, with copy from the content team.",
  },
];

export default function MessageScrollerDemo() {
  return (
    <MessageScrollerProvider>
      <div className="inset-shadow-neu h-80 w-full max-w-md overflow-hidden rounded-2xl bg-background p-1 shadow-neu-flat">
        <MessageScroller>
          <MessageScrollerViewport className="px-4">
            <MessageScrollerContent
              aria-label="Chat with Maya"
              className="py-4"
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
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </div>
    </MessageScrollerProvider>
  );
}
