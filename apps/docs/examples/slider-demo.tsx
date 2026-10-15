"use client";

import { Slider, SliderLabel, SliderValue } from "@neomorphic-react/ui/slider";

export default function SliderDemo() {
  return (
    <Slider className="max-w-sm" defaultValue={30}>
      <div className="flex items-center justify-between">
        <SliderLabel>Volume</SliderLabel>
        <SliderValue />
      </div>
    </Slider>
  );
}
