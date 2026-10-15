"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from "@neomorphic-react/ui/collapsible";

export default function CollapsibleDemo() {
  return (
    <Collapsible className="w-full max-w-sm" defaultOpen>
      <CollapsibleTrigger className="flex w-full items-center justify-between gap-2 rounded-md font-medium text-foreground text-sm outline-none hover:text-primary focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2">
        Fare rules
        <CollapsibleIndicator />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p className="pt-3 text-muted-foreground text-sm">
          Refundable up to 24 hours before departure. Changes cost €5 plus any
          fare difference.
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
}
