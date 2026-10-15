"use client";

import { Progress, ProgressLabel } from "@neomorphic-react/ui/progress";

export default function ProgressIndeterminate() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <Progress value={null}>
        <ProgressLabel>Syncing your library</ProgressLabel>
      </Progress>
      <Progress aria-label="Preparing download" size="lg" value={null} />
    </div>
  );
}
