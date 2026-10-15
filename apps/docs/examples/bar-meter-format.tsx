"use client";

import {
  BarMeter,
  BarMeterItem,
  BarMeterLabel,
  BarMeterValue,
} from "@neomorphic-react/ui/bar-meter";

const sleep = [
  ["Mon", 7.5],
  ["Tue", 6],
  ["Wed", 8.5],
  ["Thu", 5.5],
  ["Fri", 7],
] as const;

const hours = {
  style: "unit",
  unit: "hour",
  unitDisplay: "narrow",
  maximumFractionDigits: 1,
} as const;

export default function BarMeterFormat() {
  return (
    <BarMeter aria-label="Hours slept" size="sm">
      {sleep.map(([day, value]) => (
        <BarMeterItem
          format={hours}
          getAriaValueText={(_, slept) => `${slept} hours`}
          key={day}
          max={10}
          value={value}
        >
          <BarMeterValue />
          <BarMeterLabel>{day}</BarMeterLabel>
        </BarMeterItem>
      ))}
    </BarMeter>
  );
}
