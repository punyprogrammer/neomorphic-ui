"use client";

import { Badge } from "@neomorphic-react/ui/badge";

const COUNTS = [
  { label: "count={5}", count: 5 },
  { label: "count={120}", count: 120 },
  { label: "count={12} max={9}", count: 12, max: 9 },
  { label: "count={1500} max={999}", count: 1500, max: 999 },
  { label: "count={0} showZero", count: 0, showZero: true },
];

export default function BadgeCounts() {
  return (
    <dl className="grid grid-cols-[auto_auto] items-center gap-x-8 gap-y-4">
      {COUNTS.map(({ label, ...props }) => (
        <div className="contents" key={label}>
          <dt className="font-mono text-muted-foreground text-xs">{label}</dt>
          <dd>
            <Badge {...props} variant="primary" />
          </dd>
        </div>
      ))}
    </dl>
  );
}
