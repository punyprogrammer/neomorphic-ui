"use client";

import { Avatar, AvatarImage } from "@neomorphic-react/ui/avatar";
import { Bubble, BubbleContent } from "@neomorphic-react/ui/bubble";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageGroup,
  MessageHeader,
} from "@neomorphic-react/ui/message";
import { portrait } from "@/components/blocks/images";

export default function MessageGroupExample() {
  return (
    <MessageGroup className="w-full max-w-md">
      <Message>
        <MessageAvatar />
        <MessageContent>
          <MessageHeader>
            Jonah Reyes <time dateTime="18:02">18:02</time>
          </MessageHeader>
          <Bubble variant="secondary">
            <BubbleContent>Running ten minutes late, sorry.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageAvatar>
          <Avatar size="sm">
            <AvatarImage alt="" src={portrait(200)} />
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="secondary">
            <BubbleContent>Order me the risotto if they're busy.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageGroup>
  );
}
