"use client";

import { Progress } from "@neomorphic-react/ui/progress";

const values = [4, 40, 100];

export default function ProgressValueInside() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      {values.map((value) => (
        <Progress
          aria-label={`Course ${value}% complete`}
          className="[--progress-fill:oklch(0.54_0.22_350)]"
          key={value}
          size="lg"
          value={value}
          valueInside
        />
      ))}
    </div>
  );
}
