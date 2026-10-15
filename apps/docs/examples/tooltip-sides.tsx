"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@neomorphic-react/ui/tooltip";

const sides = ["top", "right", "bottom", "left"] as const;

export default function TooltipSides() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {sides.map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger render={<Button size="sm" />}>{side}</TooltipTrigger>
          <TooltipContent side={side}>Opens on the {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
