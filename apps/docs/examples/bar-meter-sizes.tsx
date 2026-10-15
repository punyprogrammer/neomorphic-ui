"use client";

import {
  BarMeter,
  BarMeterItem,
  BarMeterLabel,
} from "@neomorphic-react/ui/bar-meter";

const sizes = ["sm", "md", "lg"] as const;

const readings = [
  { id: "a", label: "Q1", value: 40 },
  { id: "b", label: "Q2", value: 75 },
  { id: "c", label: "Q3", value: 55 },
];

export default function BarMeterSizes() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-16">
      {sizes.map((size) => (
        <BarMeter aria-label={`Sales, size ${size}`} key={size} size={size}>
          {readings.map((reading) => (
            <BarMeterItem key={reading.id} value={reading.value}>
              <BarMeterLabel>{reading.label}</BarMeterLabel>
            </BarMeterItem>
          ))}
        </BarMeter>
      ))}
    </div>
  );
}
