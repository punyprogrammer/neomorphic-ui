"use client";

import { PageIndicator } from "@neomorphic-react/ui/page-indicator";

const sizes = ["sm", "md", "lg"] as const;

export default function PageIndicatorSizes() {
  return (
    <div className="grid justify-items-center gap-6">
      {sizes.map((size) => (
        <PageIndicator count={4} key={size} size={size} value={1} />
      ))}
    </div>
  );
}
