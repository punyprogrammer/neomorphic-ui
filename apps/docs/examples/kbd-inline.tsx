"use client";

import { Kbd, KbdGroup } from "@neomorphic-react/ui/kbd";

export default function KbdInline() {
  return (
    <p className="max-w-sm text-muted-foreground text-sm leading-7">
      Press <Kbd size="sm">/</Kbd> to search, or{" "}
      <KbdGroup>
        <Kbd aria-label="Shift" size="sm">
          ⇧
        </Kbd>
        <Kbd size="sm">?</Kbd>
      </KbdGroup>{" "}
      to see every shortcut. Close any panel with <Kbd size="sm">Esc</Kbd>.
    </p>
  );
}
