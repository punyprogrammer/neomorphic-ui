"use client";

import {
  BarMeter,
  BarMeterItem,
  BarMeterLabel,
  BarMeterValue,
} from "@neomorphic-react/ui/bar-meter";

const storage = [
  ["Photos", 62],
  ["Apps", 23],
  ["Docs", 8],
  ["Other", 3],
] as const;

export default function BarMeterHeight() {
  return (
    <BarMeter
      aria-label="Storage by type"
      className="[--bar-meter-height:12rem]"
      size="lg"
    >
      {storage.map(([label, value]) => (
        <BarMeterItem key={label} value={value}>
          <BarMeterValue />
          <BarMeterLabel>{label}</BarMeterLabel>
        </BarMeterItem>
      ))}
    </BarMeter>
  );
}
