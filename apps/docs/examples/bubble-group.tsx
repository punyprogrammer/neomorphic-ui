"use client";

import {
  Bubble,
  BubbleContent,
  BubbleGroup,
} from "@neomorphic-react/ui/bubble";

export default function BubbleGroupExample() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <BubbleGroup>
        <Bubble variant="secondary">
          <BubbleContent>Dinner before the show?</BubbleContent>
        </Bubble>
        <Bubble variant="secondary">
          <BubbleContent>The usual place at 6:30?</BubbleContent>
        </Bubble>
      </BubbleGroup>
      <BubbleGroup>
        <Bubble align="end">
          <BubbleContent>Perfect.</BubbleContent>
        </Bubble>
        <Bubble align="end">
          <BubbleContent>I'll book a table for two.</BubbleContent>
        </Bubble>
      </BubbleGroup>
    </div>
  );
}
