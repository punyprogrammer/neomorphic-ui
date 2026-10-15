"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@neomorphic-react/ui/tooltip";
import { BookmarkPlus } from "lucide-react";

export default function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger
        render={<Button aria-label="Save for later" icon={<BookmarkPlus />} />}
      />
      <TooltipContent>Save for later</TooltipContent>
    </Tooltip>
  );
}
