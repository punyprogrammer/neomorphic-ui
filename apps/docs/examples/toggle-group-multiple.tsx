"use client";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@neomorphic-react/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";

export default function ToggleGroupMultiple() {
  return (
    <ToggleGroup aria-label="Text style" defaultValue={["bold"]} multiple>
      <ToggleGroupItem aria-label="Bold" value="bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Italic" value="italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Underline" value="underline">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
