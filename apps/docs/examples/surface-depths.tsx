"use client";

import { Surface } from "@neomorphic-react/ui/surface";

const depths = ["sm", "md", "lg"] as const;

export default function SurfaceDepths() {
  return (
    <div className="grid gap-8">
      {(["raised", "inset"] as const).map((elevation) => (
        <div className="flex flex-wrap items-center gap-8" key={elevation}>
          {depths.map((depth) => (
            <Surface
              className="flex size-24 items-center justify-center text-muted-foreground text-sm"
              depth={depth}
              elevation={elevation}
              key={depth}
            >
              {depth}
            </Surface>
          ))}
        </div>
      ))}
    </div>
  );
}
