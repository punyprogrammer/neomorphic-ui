"use client";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@neomorphic-react/ui/toggle-group";

const SIZES = ["sm", "md", "lg"] as const;

export default function ToggleGroupSizes() {
  return (
    <div className="grid justify-items-center gap-6">
      {SIZES.map((size) => (
        <ToggleGroup
          aria-label={`Range, ${size}`}
          defaultValue={["week"]}
          key={size}
          size={size}
        >
          <ToggleGroupItem className="px-4" value="day">
            Day
          </ToggleGroupItem>
          <ToggleGroupItem className="px-4" value="week">
            Week
          </ToggleGroupItem>
          <ToggleGroupItem className="px-4" value="month">
            Month
          </ToggleGroupItem>
        </ToggleGroup>
      ))}
    </div>
  );
}
