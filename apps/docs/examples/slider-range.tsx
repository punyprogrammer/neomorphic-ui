"use client";

import { Slider, SliderLabel, SliderValue } from "@neomorphic-react/ui/slider";

export default function SliderRange() {
  return (
    <Slider
      className="max-w-sm"
      defaultValue={[200, 800]}
      format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
      getAriaLabel={(index) => ["Minimum price", "Maximum price"][index] ?? ""}
      max={1000}
      minStepsBetweenValues={5}
      step={10}
    >
      <div className="flex items-center justify-between">
        <SliderLabel>Price</SliderLabel>
        <SliderValue />
      </div>
    </Slider>
  );
}
