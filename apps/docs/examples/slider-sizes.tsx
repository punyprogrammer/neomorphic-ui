"use client";

import { Slider } from "@neomorphic-react/ui/slider";

const sizes = ["sm", "md", "lg"] as const;

export default function SliderSizes() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      {sizes.map((size) => (
        <div className="flex items-center gap-4" key={size}>
          <Slider
            aria-label={`Volume, ${size}`}
            defaultValue={45}
            size={size}
          />
          <span className="w-4 text-muted-foreground text-xs">{size}</span>
        </div>
      ))}
    </div>
  );
}
