"use client";

import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@neomorphic-react/ui/progress";

export default function ProgressSteps() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      <Progress
        getAriaValueText={(_, value) => `Step ${value} of 4`}
        max={4}
        value={3}
      >
        <div className="flex items-center justify-between">
          <ProgressLabel>Checkout</ProgressLabel>
          <span className="text-muted-foreground text-sm">Step 3 of 4</span>
        </div>
      </Progress>
      <Progress
        format={{ style: "unit", unit: "gigabyte", maximumFractionDigits: 1 }}
        max={15}
        value={11.6}
      >
        <div className="flex items-center justify-between">
          <ProgressLabel>Storage</ProgressLabel>
          <ProgressValue>
            {(formatted) => `${formatted} of 15 GB`}
          </ProgressValue>
        </div>
      </Progress>
    </div>
  );
}
