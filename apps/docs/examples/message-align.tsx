"use client";

import { Avatar, AvatarImage } from "@neomorphic-react/ui/avatar";
import { Bubble, BubbleContent } from "@neomorphic-react/ui/bubble";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "@neomorphic-react/ui/message";
import { CheckCheck } from "lucide-react";
import { portrait } from "@/components/blocks/images";

export default function MessageAlign() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
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
            <BubbleContent>Can you send me the seat numbers?</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble align="end">
            <BubbleContent>F12 and F13, right on the aisle.</BubbleContent>
          </Bubble>
          <MessageFooter>
            <CheckCheck aria-hidden="true" className="size-3.5" />
            Read 09:14
          </MessageFooter>
        </MessageContent>
      </Message>
    </div>
  );
}
