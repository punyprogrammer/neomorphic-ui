"use client";

import { Surface } from "@neomorphic-react/ui/surface";
import { Lightbulb } from "lucide-react";
import { useState } from "react";

export default function SurfaceRender() {
  const [on, setOn] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-8">
      <Surface
        className="grid w-48 gap-1 p-5"
        render={<section aria-label="Energy today" />}
      >
        <span className="text-muted-foreground text-sm">Energy today</span>
        <span className="font-semibold text-3xl tabular-nums">4.2 kWh</span>
      </Surface>
      <Surface
        aria-pressed={on}
        className="flex size-24 cursor-pointer select-none flex-col items-center justify-center gap-2 text-sm outline-none focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2"
        elevation={on ? "inset" : "raised"}
        onClick={() => setOn((value) => !value)}
        render={<button type="button" />}
        shape="circle"
      >
        <Lightbulb
          aria-hidden="true"
          className={on ? "size-5 fill-current" : "size-5"}
        />
        Lamp
      </Surface>
    </div>
  );
}
