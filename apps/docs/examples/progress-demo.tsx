"use client";

import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@neomorphic-react/ui/progress";

export default function ProgressDemo() {
  return (
    <Progress className="max-w-sm" value={40}>
      <div className="flex items-center justify-between">
        <ProgressLabel>Uploading</ProgressLabel>
        <ProgressValue />
      </div>
    </Progress>
  );
}
