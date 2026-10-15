"use client";

import { Kbd, KbdGroup } from "@neomorphic-react/ui/kbd";

export default function KbdSizes() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      {(["sm", "md"] as const).map((size) => (
        <KbdGroup key={size}>
          <Kbd aria-label="Shift" size={size}>
            ⇧
          </Kbd>
          <Kbd size={size}>Tab</Kbd>
        </KbdGroup>
      ))}
    </div>
  );
}
