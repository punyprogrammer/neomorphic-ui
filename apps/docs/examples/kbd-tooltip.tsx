"use client";

import { Button } from "@neomorphic-react/ui/button";
import { Kbd, KbdGroup } from "@neomorphic-react/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@neomorphic-react/ui/tooltip";
import { Bold, Italic, Underline } from "lucide-react";

const actions = [
  { label: "Bold", key: "B", icon: <Bold /> },
  { label: "Italic", key: "I", icon: <Italic /> },
  { label: "Underline", key: "U", icon: <Underline /> },
];

export default function KbdTooltip() {
  return (
    <div className="flex items-center gap-3">
      {actions.map(({ label, key, icon }) => (
        <Tooltip key={label}>
          <TooltipTrigger
            render={<Button aria-label={label} icon={icon} variant="ghost" />}
          />
          <TooltipContent className="flex items-center gap-2">
            {label}
            <KbdGroup>
              <Kbd aria-label="Command" size="sm">
                ⌘
              </Kbd>
              <Kbd size="sm">{key}</Kbd>
            </KbdGroup>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
