"use client";

import { Toggle } from "@neomorphic-react/ui/toggle";
import { Star } from "lucide-react";

export default function ToggleDisabled() {
  return (
    <div className="flex items-center gap-8">
      <Toggle aria-label="Favourite" disabled iconFill size="lg">
        <Star />
      </Toggle>
      <Toggle aria-label="Favourite" defaultPressed disabled iconFill size="lg">
        <Star />
      </Toggle>
    </div>
  );
}
