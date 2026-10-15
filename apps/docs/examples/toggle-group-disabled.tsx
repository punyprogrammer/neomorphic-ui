"use client";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@neomorphic-react/ui/toggle-group";

export default function ToggleGroupDisabled() {
  return (
    <div className="grid justify-items-center gap-8">
      <ToggleGroup aria-label="Delivery" defaultValue={["standard"]}>
        <ToggleGroupItem className="px-4" value="standard">
          Standard
        </ToggleGroupItem>
        <ToggleGroupItem className="px-4" value="express">
          Express
        </ToggleGroupItem>
        <ToggleGroupItem className="px-4" disabled value="same-day">
          Same day
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup aria-label="Range" defaultValue={["week"]} disabled>
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
    </div>
  );
}
