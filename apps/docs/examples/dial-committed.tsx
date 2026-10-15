"use client";

import { Dial } from "@neomorphic-react/ui/dial";
import { useState } from "react";

export default function DialCommitted() {
  const [brightness, setBrightness] = useState(70);
  const [saved, setSaved] = useState(70);

  return (
    <div className="grid justify-items-center gap-4">
      <Dial
        aria-label="Brightness"
        getAriaValueText={(value) => `${value} percent`}
        onValueChange={setBrightness}
        onValueCommitted={setSaved}
        value={brightness}
      >
        {brightness}%
      </Dial>
      <p className="text-muted-foreground text-sm" aria-live="polite">
        Saved to the lamp: {saved}%
      </p>
    </div>
  );
}
