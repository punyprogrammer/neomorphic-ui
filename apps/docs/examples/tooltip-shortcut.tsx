"use client";

import { Button } from "@neomorphic-react/ui/button";
import { Kbd, KbdGroup } from "@neomorphic-react/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@neomorphic-react/ui/tooltip";
import { Undo2 } from "lucide-react";

export default function TooltipShortcut() {
  return (
    <Tooltip>
      <TooltipTrigger
        render={<Button aria-label="Undo" icon={<Undo2 />} variant="ghost" />}
      />
      <TooltipContent className="flex items-center gap-2">
        Undo
        <KbdGroup>
          <Kbd size="sm">⌘</Kbd>
          <Kbd size="sm">Z</Kbd>
        </KbdGroup>
      </TooltipContent>
    </Tooltip>
  );
}
