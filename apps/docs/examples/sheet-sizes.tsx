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

const sizes = [
  { size: "sm", width: "320px" },
  { size: "md", width: "384px" },
  { size: "lg", width: "512px" },
  { size: "xl", width: "672px" },
] as const;

export default function SheetSizes() {
  return (
    <div className="flex flex-wrap gap-3">
      {sizes.map(({ size, width }) => (
        <Sheet key={size}>
          <SheetTrigger render={<Button />}>{size}</SheetTrigger>
          <SheetContent size={size}>
            <SheetHeader>
              <SheetTitle>A {size} sheet</SheetTitle>
              <SheetDescription>
                At most {width} wide. On a narrow screen it leaves a 3rem strip
                of the page showing.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
