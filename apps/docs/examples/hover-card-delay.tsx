"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@neomorphic-react/ui/hover-card";

const timings = [
  { label: "Default", delay: undefined, closeDelay: undefined },
  { label: "Quick", delay: 150, closeDelay: 100 },
  { label: "Patient", delay: 1000, closeDelay: 600 },
];

export default function HoverCardDelay() {
  return (
    <div className="flex flex-wrap justify-center gap-8 text-sm">
      {timings.map(({ label, delay, closeDelay }) => (
        <HoverCard key={label}>
          <HoverCardTrigger
            closeDelay={closeDelay}
            delay={delay}
            href={`#${label.toLowerCase()}`}
          >
            {label}
          </HoverCardTrigger>
          <HoverCardContent className="w-56">
            Opened after {delay ?? 600}ms. Closes {closeDelay ?? 300}ms after
            the pointer leaves.
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
}
