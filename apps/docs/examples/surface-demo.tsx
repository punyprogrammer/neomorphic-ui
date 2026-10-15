"use client";

import { Surface } from "@neomorphic-react/ui/surface";

export default function SurfaceDemo() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <Surface className="grid w-44 gap-1 p-5">
        <span className="text-muted-foreground text-sm">Living room</span>
        <span className="font-semibold text-3xl tabular-nums">22°C</span>
      </Surface>
      <Surface className="grid w-44 gap-1 p-5" elevation="inset">
        <span className="text-muted-foreground text-sm">Outside</span>
        <span className="font-semibold text-3xl tabular-nums">9°C</span>
      </Surface>
    </div>
  );
}
