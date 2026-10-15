"use client";

import { Surface } from "@neomorphic-react/ui/surface";
import { Toggle } from "@neomorphic-react/ui/toggle";
import { Plane } from "lucide-react";
import { useState } from "react";

export default function ToggleControlled() {
  const [on, setOn] = useState(false);
  return (
    <Surface className="flex w-64 items-center gap-5 p-5">
      <Toggle
        aria-label="Airplane mode"
        className="size-16 [--toggle-on:oklch(0.52_0.14_240)]"
        onPressedChange={setOn}
        pressed={on}
        shape="rounded"
      >
        <Plane className="size-7" />
      </Toggle>
      <span
        aria-hidden="true"
        className="font-medium text-muted-foreground text-xs uppercase leading-snug tracking-wide"
      >
        Airplane mode
        <br />
        {on ? "Active" : "Inactive"}
      </span>
    </Surface>
  );
}
