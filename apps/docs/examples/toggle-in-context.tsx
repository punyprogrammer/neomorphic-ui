"use client";

import { Surface } from "@neomorphic-react/ui/surface";
import { Toggle } from "@neomorphic-react/ui/toggle";
import { cn } from "@neomorphic-react/ui/utils";
import { Fan, Lamp, Lightbulb, Speaker } from "lucide-react";
import { useState } from "react";

const LIGHT_ON = "[--toggle-on:oklch(0.62_0.13_75)]";

const DEVICES = [
  { key: "ceiling", label: "Ceiling light", icon: Lightbulb, tone: LIGHT_ON },
  { key: "lamp", label: "Floor lamp", icon: Lamp, tone: LIGHT_ON },
  { key: "fan", label: "Ceiling fan", icon: Fan },
  { key: "speaker", label: "Speaker", icon: Speaker },
];

export default function ToggleInContext() {
  const [on, setOn] = useState<string[]>(["ceiling", "speaker"]);
  const setDevice = (key: string, pressed: boolean) =>
    setOn((current) =>
      pressed ? [...current, key] : current.filter((k) => k !== key)
    );

  return (
    <ul aria-label="Devices" className="grid w-full max-w-md grid-cols-2 gap-6">
      {DEVICES.map(({ key, label, icon: Icon, tone }) => {
        const pressed = on.includes(key);
        return (
          <Surface
            className="flex items-center gap-4 p-4"
            key={key}
            render={<li />}
          >
            <Toggle
              aria-label={label}
              className={cn("size-14 shrink-0", tone)}
              onPressedChange={(next) => setDevice(key, next)}
              pressed={pressed}
              shape="rounded"
            >
              <Icon className="size-6" />
            </Toggle>
            <span aria-hidden="true" className="grid gap-0.5 text-sm">
              <span className="font-medium text-foreground">{label}</span>
              <span className="text-muted-foreground text-xs">
                {pressed ? "On" : "Off"}
              </span>
            </span>
          </Surface>
        );
      })}
    </ul>
  );
}
