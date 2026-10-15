"use client";

import { Toggle } from "@neomorphic-react/ui/toggle";
import { Heart } from "lucide-react";

export default function ToggleIconFill() {
  return (
    <div className="flex items-center gap-8">
      <Toggle aria-label="Like" defaultPressed size="lg">
        <Heart />
      </Toggle>
      <Toggle aria-label="Like" defaultPressed iconFill size="lg">
        <Heart />
      </Toggle>
    </div>
  );
}
