"use client";

import { Avatar, AvatarFallback } from "@neomorphic-react/ui/avatar";
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@neomorphic-react/ui/bubble";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { useState } from "react";

const slots = ["Tuesday 10:00", "Wednesday 14:30", "Friday 09:15"];

export default function BubbleInContext() {
  const [booked, setBooked] = useState<string | null>(null);

  return (
    <Card className="w-full max-w-sm" size="sm">
      <CardHeader className="flex items-center gap-3">
        <Avatar size="sm">
          <AvatarFallback>HD</AvatarFallback>
        </Avatar>
        <div className="grid gap-0.5">
          <CardTitle>Harbour Dental</CardTitle>
          <CardDescription>Usually replies within an hour</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <BubbleGroup>
          <Bubble variant="secondary">
            <BubbleContent>Hi Sam, it's time for your check-up.</BubbleContent>
          </Bubble>
          <Bubble variant="secondary">
            <BubbleContent>Which of these suits you?</BubbleContent>
          </Bubble>
        </BubbleGroup>
        {booked ? (
          <>
            <Bubble align="end">
              <BubbleContent>{booked}, please.</BubbleContent>
            </Bubble>
            <Bubble variant="secondary">
              <BubbleContent>
                You're booked in for {booked}. We'll text you the day before.
              </BubbleContent>
              <BubbleReactions aria-label="Confirmed" role="img">
                ✅
              </BubbleReactions>
            </Bubble>
          </>
        ) : (
          <BubbleGroup aria-label="Available times" role="group">
            {slots.map((slot) => (
              <Bubble align="end" key={slot} variant="outline">
                <BubbleContent
                  onClick={() => setBooked(slot)}
                  render={<button type="button" />}
                >
                  {slot}
                </BubbleContent>
              </Bubble>
            ))}
          </BubbleGroup>
        )}
      </CardContent>
    </Card>
  );
}
