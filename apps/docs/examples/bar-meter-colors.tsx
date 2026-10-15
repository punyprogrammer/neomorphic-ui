"use client";

import {
  BarMeter,
  BarMeterItem,
  BarMeterLabel,
  BarMeterValue,
} from "@neomorphic-react/ui/bar-meter";

const highs = [
  ["Mon", 24],
  ["Tue", 28],
  ["Wed", 31],
  ["Thu", 26],
] as const;

const battery = [
  ["Mon", 82],
  ["Tue", 64],
  ["Wed", 91],
  ["Thu", 47],
] as const;

const celsius = { style: "unit", unit: "celsius" } as const;

export default function BarMeterColors() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-16">
      <BarMeter
        aria-label="Highs this week"
        className="[--bar-meter-fill-start:oklch(0.62_0.14_245)] [--bar-meter-fill:oklch(0.86_0.16_90)]"
      >
        {highs.map(([day, high]) => (
          <BarMeterItem format={celsius} key={day} max={40} value={high}>
            <BarMeterValue />
            <BarMeterLabel>{day}</BarMeterLabel>
          </BarMeterItem>
        ))}
      </BarMeter>
      <BarMeter
        aria-label="Battery left at bedtime"
        className="[--bar-meter-fill:var(--color-success)]"
      >
        {battery.map(([day, left]) => (
          <BarMeterItem key={day} value={left}>
            <BarMeterValue />
            <BarMeterLabel>{day}</BarMeterLabel>
          </BarMeterItem>
        ))}
      </BarMeter>
    </div>
  );
}
