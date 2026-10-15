"use client";

import { Toggle } from "@neomorphic-react/ui/toggle";
import { Bell, Bookmark } from "lucide-react";

const SIZES = ["sm", "md", "lg"] as const;

export default function ToggleSizes() {
  return (
    <div className="grid justify-items-center gap-8">
      <div className="flex items-center gap-6">
        {SIZES.map((size) => (
          <Toggle
            aria-label={`Bookmark, ${size}`}
            iconFill
            key={size}
            size={size}
          >
            <Bookmark />
          </Toggle>
        ))}
      </div>
      <div className="flex items-center gap-6">
        {SIZES.map((size) => (
          <Toggle key={size} size={size}>
            <Bell />
            Alerts
          </Toggle>
        ))}
      </div>
    </div>
  );
}
