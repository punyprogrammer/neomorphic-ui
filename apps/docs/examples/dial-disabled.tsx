"use client";

import { Dial } from "@neomorphic-react/ui/dial";

export default function DialDisabled() {
  return (
    <Dial aria-label="Volume" defaultValue={30} disabled>
      30
    </Dial>
  );
}
