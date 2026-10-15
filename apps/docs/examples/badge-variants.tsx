"use client";

import { Badge } from "@neomorphic-react/ui/badge";

export default function BadgeVariants() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <Badge>Default</Badge>
      <Badge variant="inset">Inset</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
    </div>
  );
}
