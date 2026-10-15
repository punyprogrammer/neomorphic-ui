"use client";

import { Dial } from "@neomorphic-react/ui/dial";
import { useState } from "react";

const spoken = (value: number) => `${value} degrees Celsius`;

export default function DialRange() {
  const [temperature, setTemperature] = useState(21.5);

  return (
    <Dial
      aria-label="Temperature"
      getAriaValueText={spoken}
      largeStep={2}
      max={30}
      min={16}
      onValueChange={setTemperature}
      size="lg"
      step={0.5}
      value={temperature}
    >
      {temperature}°
    </Dial>
  );
}
