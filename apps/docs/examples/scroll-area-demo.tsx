"use client";

import { ScrollArea } from "@neomorphic-react/ui/scroll-area";
import { Separator } from "@neomorphic-react/ui/separator";

const stops = Array.from({ length: 24 }, (_, i) => `Stop ${i + 1}`);

export default function ScrollAreaDemo() {
  return (
    <ScrollArea
      className="inset-shadow-neu-sm h-72 w-56 rounded-xl bg-background shadow-neu-flat"
      fade
    >
      <div className="p-4">
        <h4 className="mb-4 font-medium text-foreground text-sm">Coast line</h4>
        {stops.map((stop) => (
          <div key={stop}>
            <div className="text-sm">{stop}</div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
