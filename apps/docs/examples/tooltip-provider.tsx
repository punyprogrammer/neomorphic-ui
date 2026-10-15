"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@neomorphic-react/ui/tooltip";
import { Pause, Repeat, Shuffle, SkipBack, SkipForward } from "lucide-react";

const controls = [
  { label: "Shuffle", icon: Shuffle },
  { label: "Previous", icon: SkipBack },
  { label: "Pause", icon: Pause },
  { label: "Next", icon: SkipForward },
  { label: "Repeat", icon: Repeat },
];

export default function TooltipProviderExample() {
  return (
    <TooltipProvider>
      <div className="flex gap-3">
        {controls.map(({ label, icon: Icon }) => (
          <Tooltip key={label}>
            <TooltipTrigger
              render={
                <Button aria-label={label} icon={<Icon />} shape="pill" />
              }
            />
            <TooltipContent>{label}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
