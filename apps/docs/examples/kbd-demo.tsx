"use client";

import { Kbd, KbdGroup } from "@neomorphic-react/ui/kbd";

export default function KbdDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <KbdGroup>
        <Kbd aria-label="Command">⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>B</Kbd>
      </KbdGroup>
      <Kbd>Esc</Kbd>
    </div>
  );
}
