"use client";

import { Surface } from "@neomorphic-react/ui/surface";

const elevations = ["raised", "inset", "flat"] as const;

export default function SurfaceElevations() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      {elevations.map((elevation) => (
        <Surface
          className="flex size-28 items-center justify-center text-muted-foreground text-sm"
          elevation={elevation}
          key={elevation}
        >
          {elevation}
        </Surface>
      ))}
    </div>
  );
}
