"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from "@neomorphic-react/ui/collapsible";

const stops = ["Coimbra B", "Aveiro"];

export default function CollapsibleButtonTrigger() {
  return (
    <Collapsible className="inset-shadow-neu-flat w-full max-w-sm rounded-xl bg-neu-convex p-4 shadow-neu">
      <div className="flex items-center justify-between gap-4">
        <p className="font-medium text-foreground text-sm">
          Lisbon to Porto, 2 stops
        </p>
        <CollapsibleTrigger
          render={
            <Button
              aria-label="Show stops"
              icon={<CollapsibleIndicator />}
              size="sm"
            />
          }
        />
      </div>
      <CollapsibleContent>
        <ol className="flex flex-col gap-2 pt-3">
          {stops.map((stop) => (
            <li
              className="inset-shadow-neu-sm rounded-lg px-3 py-2 text-sm shadow-neu-flat"
              key={stop}
            >
              {stop}
            </li>
          ))}
        </ol>
      </CollapsibleContent>
    </Collapsible>
  );
}
