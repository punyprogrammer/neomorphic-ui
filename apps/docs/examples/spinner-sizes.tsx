"use client";

import { Spinner } from "@neomorphic-react/ui/spinner";

const sizes = ["sm", "md", "lg"] as const;

export default function SpinnerSizes() {
  return (
    <div className="flex items-center gap-8">
      {sizes.map((size) => (
        <Spinner aria-label={`Loading (${size})`} key={size} size={size} />
      ))}
    </div>
  );
}
