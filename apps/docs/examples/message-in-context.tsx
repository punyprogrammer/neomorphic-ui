"use client";

import { Avatar, AvatarImage } from "@neomorphic-react/ui/avatar";
import { Bubble, BubbleContent } from "@neomorphic-react/ui/bubble";
import { Card, CardContent, CardFooter } from "@neomorphic-react/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@neomorphic-react/ui/input-group";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "@neomorphic-react/ui/message";
import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { portrait } from "@/components/blocks/images";

export default function MessageInContext() {
  const [text, setText] = useState("");
  const [sent, setSent] = useState([
    { id: 0, text: "Yes, two seats in row F." },
  ]);

  return (
    <Card className="w-full max-w-md" size="sm">
      <CardContent className="flex flex-col gap-4">
        <Message>
          <MessageAvatar>
            <Avatar size="sm">
              <AvatarImage alt="" src={portrait(330)} />
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <MessageHeader>
              Maya Chen <time dateTime="09:12">09:12</time>
            </MessageHeader>
            <Bubble variant="secondary">
              <BubbleContent>
                Did you get the tickets for Saturday?
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message align="end">
          <MessageContent>
            {sent.map((message) => (
              <Bubble align="end" key={message.id}>
                <BubbleContent>{message.text}</BubbleContent>
              </Bubble>
            ))}
            <MessageFooter>Delivered</MessageFooter>
          </MessageContent>
        </Message>
      </CardContent>
      <CardFooter>
        <form
          className="w-full"
          onSubmit={(event) => {
            event.preventDefault();
            const message = text.trim();
            setSent((current) => [
              ...current,
              { id: current.length, text: message },
            ]);
            setText("");
          }}
        >
          <InputGroup shape="pill">
            <InputGroupInput
              aria-label="Message Maya"
              onValueChange={setText}
              placeholder="Write a message…"
              value={text}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                aria-label="Send"
                disabled={!text.trim()}
                icon={<ArrowUp />}
                type="submit"
                variant="primary"
              />
            </InputGroupAddon>
          </InputGroup>
        </form>
      </CardFooter>
    </Card>
  );
}
