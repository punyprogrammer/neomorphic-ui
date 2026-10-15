"use client";

import { Surface } from "@neomorphic-react/ui/surface";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@neomorphic-react/ui/toggle-group";
import { Flame, Power, Snowflake, Thermometer } from "lucide-react";
import { useState } from "react";

type Mode = "heat" | "cool" | "auto" | "off";

const MODES = [
  { value: "heat", label: "Heat", icon: Flame },
  { value: "cool", label: "Cool", icon: Snowflake },
  { value: "auto", label: "Auto", icon: Thermometer },
  { value: "off", label: "Off", icon: Power },
] as const;

const STATUS: Record<Mode, string> = {
  heat: "Heating to 21.5°",
  cool: "Cooling to 21.5°",
  auto: "Holding 21.5°",
  off: "Climate control is off",
};

export default function ToggleGroupInContext() {
  const [mode, setMode] = useState<Mode>("heat");
  return (
    <Surface className="grid w-72 justify-items-center gap-6 p-6">
      <div className="grid justify-items-center gap-1">
        <span className="text-muted-foreground text-sm">Living room</span>
        <span className="font-semibold text-4xl text-foreground tabular-nums">
          20.8°
        </span>
        <span className="text-muted-foreground text-xs">{STATUS[mode]}</span>
      </div>
      <ToggleGroup
        aria-label="Mode"
        onValueChange={(next) => {
          if (next.length > 0) {
            setMode(next[0] as Mode);
          }
        }}
        value={[mode]}
      >
        {MODES.map(({ value, label, icon: Icon }) => (
          <ToggleGroupItem aria-label={label} key={value} value={value}>
            <Icon />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </Surface>
  );
}
