"use client";

import { Dial } from "@neomorphic-react/ui/dial";

const sizes = ["sm", "md", "lg"] as const;

export default function DialSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-10">
      {sizes.map((size) => (
        <Dial
          aria-label={`Volume, ${size}`}
          defaultValue={60}
          key={size}
          size={size}
        />
      ))}
    </div>
  );
}
