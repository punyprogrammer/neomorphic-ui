"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@neomorphic-react/ui/dialog";

const sizes = [
  { size: "sm", width: "384px" },
  { size: "md", width: "512px" },
  { size: "lg", width: "672px" },
] as const;

export default function DialogSizes() {
  return (
    <div className="flex flex-wrap gap-3">
      {sizes.map(({ size, width }) => (
        <Dialog key={size}>
          <DialogTrigger render={<Button />}>{size}</DialogTrigger>
          <DialogContent size={size}>
            <DialogHeader>
              <DialogTitle>A {size} dialog</DialogTitle>
              <DialogDescription>
                At most {width} wide, and never wider than the screen less 1rem
                on each side.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter showCloseButton />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
