"use client";

import { Separator } from "@neomorphic-react/ui/separator";

export default function SeparatorDemo() {
  return (
    <div className="w-full max-w-sm text-foreground text-sm">
      <div className="grid gap-1">
        <p className="font-medium">Neomorphic UI</p>
        <p className="text-muted-foreground">
          Soft, tactile components for React.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Components</span>
        <Separator orientation="vertical" />
        <span>Themes</span>
      </div>
    </div>
  );
}
