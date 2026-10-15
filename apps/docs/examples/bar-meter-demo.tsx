"use client";

import {
  BarMeter,
  BarMeterItem,
  BarMeterLabel,
  BarMeterValue,
} from "@neomorphic-react/ui/bar-meter";

const week = [
  ["Mon", 24],
  ["Tue", 28],
  ["Wed", 31],
  ["Thu", 26],
  ["Fri", 19],
  ["Sat", 22],
  ["Sun", 29],
] as const;

const celsius = { style: "unit", unit: "celsius" } as const;

export default function BarMeterDemo() {
  return (
    <BarMeter aria-label="Highs this week">
      {week.map(([day, high]) => (
        <BarMeterItem format={celsius} key={day} max={40} value={high}>
          <BarMeterValue />
          <BarMeterLabel>{day}</BarMeterLabel>
        </BarMeterItem>
      ))}
    </BarMeter>
  );
}
