"use client";

import { Separator } from "@neomorphic-react/ui/separator";
import { Surface } from "@neomorphic-react/ui/surface";

const stats = [
  { label: "Distance", value: "8.4 km" },
  { label: "Pace", value: "5:12 /km" },
  { label: "Time", value: "43:41" },
];

export default function SeparatorVertical() {
  return (
    <Surface className="flex w-full max-w-sm items-stretch justify-between gap-4 px-6 py-4">
      {stats.map(({ label, value }, index) => (
        <div className="contents" key={label}>
          {index > 0 ? <Separator orientation="vertical" /> : null}
          <div className="grid flex-1 gap-0.5 text-center">
            <span className="text-muted-foreground text-xs">{label}</span>
            <span className="font-semibold text-foreground tabular-nums">
              {value}
            </span>
          </div>
        </div>
      ))}
    </Surface>
  );
}
