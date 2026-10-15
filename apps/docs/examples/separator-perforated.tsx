"use client";

import { Separator } from "@neomorphic-react/ui/separator";
import { Surface } from "@neomorphic-react/ui/surface";

export default function SeparatorPerforated() {
  return (
    <Surface className="grid w-full max-w-xs gap-5 p-6">
      <div className="flex justify-between text-foreground">
        <div>
          <p className="text-muted-foreground text-xs uppercase">From</p>
          <p className="font-medium text-2xl">CCU</p>
        </div>
        <div className="text-end">
          <p className="text-muted-foreground text-xs uppercase">To</p>
          <p className="font-medium text-2xl">BLR</p>
        </div>
      </div>
      <Separator variant="perforated" />
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Gate 12</span>
        <span className="font-medium text-foreground">Seat 14A</span>
      </div>
    </Surface>
  );
}
