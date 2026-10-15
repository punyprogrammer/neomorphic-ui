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
import { portrait } from "@/components/blocks/images";

export default function MessageDemo() {
  return (
    <Message className="max-w-md">
      <MessageAvatar>
        <Avatar size="sm">
          <AvatarImage alt="" src={portrait(330)} />
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <MessageHeader>Maya Chen</MessageHeader>
        <Bubble variant="secondary">
          <BubbleContent>
            Morning, did you get the tickets for Saturday?
          </BubbleContent>
        </Bubble>
        <MessageFooter>
          <time dateTime="09:12">09:12</time>
        </MessageFooter>
      </MessageContent>
    </Message>
  );
}
