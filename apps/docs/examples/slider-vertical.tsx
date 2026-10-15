"use client";

import { Slider } from "@neomorphic-react/ui/slider";

const bands = [
  { label: "60", value: 40 },
  { label: "230", value: 65 },
  { label: "910", value: 55 },
  { label: "3.6k", value: 80 },
  { label: "14k", value: 35 },
];

export default function SliderVertical() {
  return (
    <div className="flex h-56 gap-6">
      {bands.map((band) => (
        <div className="flex flex-col items-center gap-3" key={band.label}>
          <Slider
            aria-label={`${band.label} Hz`}
            defaultValue={band.value}
            orientation="vertical"
            size="sm"
          />
          <span className="text-muted-foreground text-xs">{band.label}</span>
        </div>
      ))}
    </div>
  );
}
