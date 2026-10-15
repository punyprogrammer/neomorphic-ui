"use client";

import { Kbd, KbdGroup } from "@neomorphic-react/ui/kbd";
import { ArrowUp } from "lucide-react";

export default function KbdGroups() {
  return (
    <dl className="grid w-full max-w-xs grid-cols-[1fr_auto] items-center gap-x-6 gap-y-4 text-sm">
      <dt className="text-foreground">Command menu</dt>
      <dd>
        <KbdGroup>
          <Kbd aria-label="Command">⌘</Kbd>
          <Kbd aria-label="Shift">⇧</Kbd>
          <Kbd>P</Kbd>
        </KbdGroup>
      </dd>
      <dt className="text-foreground">Go to dashboard</dt>
      <dd>
        <KbdGroup>
          <Kbd>G</Kbd>
          then
          <Kbd>D</Kbd>
        </KbdGroup>
      </dd>
      <dt className="text-foreground">Previous message</dt>
      <dd>
        <KbdGroup>
          <Kbd aria-label="Up arrow">
            <ArrowUp aria-hidden="true" />
          </Kbd>
        </KbdGroup>
      </dd>
    </dl>
  );
}
