"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from "@neomorphic-react/ui/collapsible";

export default function CollapsibleFindInPage() {
  return (
    <Collapsible className="w-full max-w-sm">
      <CollapsibleTrigger className="flex w-full items-center justify-between gap-2 rounded-md font-medium text-foreground text-sm outline-none hover:text-primary focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2">
        Delivery and returns
        <CollapsibleIndicator />
      </CollapsibleTrigger>
      <CollapsibleContent hiddenUntilFound>
        <p className="pt-3 text-muted-foreground text-sm">
          Orders ship within 2 working days. Send unworn items back within 30
          days for a full refund.
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
}
