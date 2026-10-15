"use client";

import { Slider, SliderLabel, SliderValue } from "@neomorphic-react/ui/slider";
import { Sun } from "lucide-react";

export default function SliderColors() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      <Slider className="[--slider-fill:oklch(0.64_0.17_50)]" defaultValue={70}>
        <div className="flex items-center justify-between">
          <SliderLabel className="flex items-center gap-2">
            <Sun aria-hidden="true" className="size-4" />
            Brightness
          </SliderLabel>
          <SliderValue />
        </div>
      </Slider>
      <Slider
        className="[--slider-fill:oklch(0.58_0.1_172)]"
        defaultValue={21}
        format={{ style: "unit", unit: "celsius" }}
        max={30}
        min={10}
        step={0.5}
      >
        <div className="flex items-center justify-between">
          <SliderLabel>Thermostat</SliderLabel>
          <SliderValue />
        </div>
      </Slider>
    </div>
  );
}
