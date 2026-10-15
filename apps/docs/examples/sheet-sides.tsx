"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@neomorphic-react/ui/sheet";

const sides = ["top", "end", "bottom", "start"] as const;

export default function SheetSides() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {sides.map((side) => (
        <Sheet key={side}>
          <SheetTrigger render={<Button />}>{side}</SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>From the {side}</SheetTitle>
              <SheetDescription>
                This sheet slides in from the {side} edge of the screen.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
