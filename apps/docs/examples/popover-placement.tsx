"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@neomorphic-react/ui/popover";

const placements = [
  { side: "top", align: "center" },
  { side: "bottom", align: "start" },
  { side: "bottom", align: "end" },
  { side: "right", align: "center" },
] as const;

export default function PopoverPlacement() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {placements.map(({ side, align }) => (
        <Popover key={`${side}-${align}`}>
          <PopoverTrigger render={<Button size="sm" />}>
            {side}, {align}
          </PopoverTrigger>
          <PopoverContent align={align} className="w-56" side={side}>
            <p>
              Opens on the {side}, aligned to the {align} of the trigger.
            </p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
}
