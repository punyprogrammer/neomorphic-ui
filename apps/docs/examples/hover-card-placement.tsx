"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@neomorphic-react/ui/hover-card";

const sides = ["top", "right", "bottom", "left"] as const;

export default function HoverCardPlacement() {
  return (
    <div className="flex flex-wrap justify-center gap-8 text-sm">
      {sides.map((side) => (
        <HoverCard key={side}>
          <HoverCardTrigger delay={200} href={`#${side}`}>
            {side}
          </HoverCardTrigger>
          <HoverCardContent align="start" className="w-48" side={side}>
            Opens on the {side}, aligned to the start of the link.
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
}
