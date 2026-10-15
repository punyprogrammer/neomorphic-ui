"use client";

import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@neomorphic-react/ui/progress";

const sizes = ["sm", "md", "lg"] as const;

export default function ProgressSizes() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      {sizes.map((size) => (
        <Progress key={size} size={size} value={65}>
          <div className="flex items-center justify-between">
            <ProgressLabel>{size}</ProgressLabel>
            <ProgressValue />
          </div>
        </Progress>
      ))}
    </div>
  );
}
