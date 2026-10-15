"use client";

import {
  Bubble,
  BubbleContent,
  BubbleReactions,
} from "@neomorphic-react/ui/bubble";

export default function BubbleReactionsExample() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Bubble variant="secondary">
        <BubbleContent>The venue moved the start to 7:30.</BubbleContent>
        <BubbleReactions aria-label="Liked by you and Maya" role="img">
          👍 2
        </BubbleReactions>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>Even better, more time for dinner.</BubbleContent>
        <BubbleReactions
          align="start"
          aria-label="Maya laughed"
          role="img"
          side="top"
        >
          😂
        </BubbleReactions>
      </Bubble>
    </div>
  );
}
