"use client";

import { Button } from "@neomorphic-react/ui/button";
import { Surface } from "@neomorphic-react/ui/surface";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const MIN = 16;
const MAX = 28;

export default function SurfaceInContext() {
  const [target, setTarget] = useState(21);
  return (
    <Surface
      className="grid w-full max-w-xs justify-items-center gap-6 p-6"
      depth="lg"
      render={<section aria-label="Thermostat" />}
    >
      <div className="grid justify-items-center gap-1">
        <span className="font-medium text-foreground">Bedroom</span>
        <span className="text-muted-foreground text-sm">Heating to target</span>
      </div>
      <Surface
        className="flex size-36 flex-col items-center justify-center gap-1"
        elevation="inset"
        shape="circle"
      >
        <span
          aria-live="polite"
          className="font-semibold text-4xl text-foreground tabular-nums"
        >
          {target}°C
        </span>
        <span className="text-muted-foreground text-xs">Now 19°C</span>
      </Surface>
      <div className="flex items-center gap-6">
        <Button
          aria-label="Lower target temperature"
          disabled={target <= MIN}
          icon={<Minus />}
          onClick={() => setTarget((value) => value - 1)}
          shape="pill"
        />
        <Button
          aria-label="Raise target temperature"
          disabled={target >= MAX}
          icon={<Plus />}
          onClick={() => setTarget((value) => value + 1)}
          shape="pill"
        />
      </div>
    </Surface>
  );
}
