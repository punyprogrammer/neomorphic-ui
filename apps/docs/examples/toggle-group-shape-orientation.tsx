"use client";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@neomorphic-react/ui/toggle-group";
import { LayoutGrid, List, Rows3 } from "lucide-react";

export default function ToggleGroupShapeOrientation() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-10">
      <ToggleGroup aria-label="Range" defaultValue={["week"]} shape="pill">
        <ToggleGroupItem className="px-5" value="day">
          Day
        </ToggleGroupItem>
        <ToggleGroupItem className="px-5" value="week">
          Week
        </ToggleGroupItem>
        <ToggleGroupItem className="px-5" value="month">
          Month
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup
        aria-label="Layout"
        defaultValue={["grid"]}
        orientation="vertical"
      >
        <ToggleGroupItem aria-label="Grid" value="grid">
          <LayoutGrid />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="List" value="list">
          <List />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Compact rows" value="rows">
          <Rows3 />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
