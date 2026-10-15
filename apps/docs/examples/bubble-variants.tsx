"use client";

import { Bubble, BubbleContent } from "@neomorphic-react/ui/bubble";

const variants = [
  ["default", "Outgoing, filled with primary."],
  ["secondary", "Incoming, raised from the surface."],
  ["muted", "Pressed into the surface, for a quieter aside."],
  ["tinted", "A wash of primary, raised."],
  ["outline", "A groove around the text."],
  ["ghost", "Bare text, for a long reply that reads like a document."],
  ["destructive", "Couldn't send. Check your connection."],
] as const;

export default function BubbleVariants() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      {variants.map(([variant, text], index) => (
        <Bubble
          align={index % 2 === 0 ? "end" : "start"}
          key={variant}
          variant={variant}
        >
          <BubbleContent>{text}</BubbleContent>
        </Bubble>
      ))}
    </div>
  );
}
