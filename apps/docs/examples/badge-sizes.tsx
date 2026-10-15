"use client";

import { Badge } from "@neomorphic-react/ui/badge";

const SIZES = ["sm", "md", "lg"] as const;

export default function BadgeSizes() {
  return (
    <div className="grid gap-6">
      {SIZES.map((size) => (
        <div className="flex items-center gap-6" key={size}>
          <Badge count={7} size={size} />
          <Badge count={128} size={size} variant="primary" />
          <Badge size={size} variant="inset">
            New
          </Badge>
          <Badge dot size={size} variant="destructive" />
        </div>
      ))}
    </div>
  );
}
