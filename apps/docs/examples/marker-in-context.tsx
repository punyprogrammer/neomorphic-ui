"use client";

import { Bubble, BubbleContent } from "@neomorphic-react/ui/bubble";
import { Card, CardContent } from "@neomorphic-react/ui/card";
import { Marker, MarkerContent, MarkerIcon } from "@neomorphic-react/ui/marker";
import {
  Message,
  MessageContent,
  MessageHeader,
} from "@neomorphic-react/ui/message";
import { UserPlus } from "lucide-react";

export default function MarkerInContext() {
  return (
    <Card className="w-full max-w-md" size="sm">
      <CardContent className="flex flex-col gap-4">
        <Marker variant="separator">
          <MarkerContent>Yesterday</MarkerContent>
        </Marker>
        <Message>
          <MessageContent>
            <MessageHeader>Maya Chen</MessageHeader>
            <Bubble variant="secondary">
              <BubbleContent>
                Who's in for the climbing gym on Sunday?
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Marker className="justify-center">
          <MarkerIcon>
            <UserPlus />
          </MarkerIcon>
          <MarkerContent>Maya added Marcus</MarkerContent>
        </Marker>
        <Marker variant="separator">
          <MarkerContent>Today</MarkerContent>
        </Marker>
        <Message>
          <MessageContent>
            <MessageHeader>Marcus Hale</MessageHeader>
            <Bubble variant="secondary">
              <BubbleContent>
                Count me in. I can drive two people.
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message align="end">
          <MessageContent>
            <Bubble align="end">
              <BubbleContent>Great, I'll take the second seat.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
      </CardContent>
    </Card>
  );
}
