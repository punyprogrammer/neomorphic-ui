"use client";

import { Dial } from "@neomorphic-react/ui/dial";
import { useState } from "react";

export default function DialDemo() {
  const [volume, setVolume] = useState(40);

  return (
    <Dial aria-label="Volume" onValueChange={setVolume} value={volume}>
      {volume}
    </Dial>
  );
}
