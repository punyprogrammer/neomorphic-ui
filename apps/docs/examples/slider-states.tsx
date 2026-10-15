"use client";

import { Slider, SliderLabel, SliderValue } from "@neomorphic-react/ui/slider";
import { Volume, Volume2 } from "lucide-react";

export default function SliderStates() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      <div className="flex items-center gap-3 text-muted-foreground">
        <Volume aria-hidden="true" className="size-4 shrink-0" />
        <Slider aria-label="Volume" defaultValue={60} />
        <Volume2 aria-hidden="true" className="size-4 shrink-0" />
      </div>
      <Slider defaultValue={60} disabled>
        <div className="flex items-center justify-between">
          <SliderLabel>Bass boost</SliderLabel>
          <SliderValue />
        </div>
      </Slider>
    </div>
  );
}
