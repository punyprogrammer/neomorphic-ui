"use client";

import { PageIndicator } from "@neomorphic-react/ui/page-indicator";

export default function PageIndicatorColors() {
  return (
    <div className="grid justify-items-center gap-6">
      <PageIndicator
        className="[--page-indicator-fill:oklch(0.54_0.22_350)]"
        count={3}
        value={0}
      />
      <PageIndicator
        className="[--page-indicator-fill:var(--color-destructive)]"
        count={3}
        value={2}
      />
    </div>
  );
}
