"use client";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@neomorphic-react/ui/toggle-group";
import { useState } from "react";

export default function ToggleGroupRequired() {
  const [value, setValue] = useState(["on"]);
  return (
    <ToggleGroup
      aria-label="Power"
      className="[--toggle-on:oklch(0.51_0.16_45)]"
      onValueChange={(next) => {
        if (next.length > 0) {
          setValue(next);
        }
      }}
      size="lg"
      value={value}
    >
      <ToggleGroupItem className="px-6 font-bold" value="off">
        Off
      </ToggleGroupItem>
      <ToggleGroupItem className="px-6 font-bold" value="on">
        On
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
