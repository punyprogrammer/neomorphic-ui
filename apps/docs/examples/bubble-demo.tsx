"use client";

import { Bubble, BubbleContent } from "@neomorphic-react/ui/bubble";

export default function BubbleDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Bubble variant="secondary">
        <BubbleContent>
          Morning, did you get the tickets for Saturday?
        </BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>Yes, two seats in row F.</BubbleContent>
      </Bubble>
    </div>
  );
}
