"use client";

import { Dial } from "@neomorphic-react/ui/dial";

export default function DialColors() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-10">
      <Dial
        aria-label="Heating"
        className="[--dial-fill-start:oklch(0.62_0.14_245)] [--dial-fill:oklch(0.64_0.17_50)]"
        defaultValue={65}
      />
      <Dial
        aria-label="Battery saver threshold"
        className="[--dial-fill:var(--color-success)]"
        defaultValue={30}
      />
    </div>
  );
}
