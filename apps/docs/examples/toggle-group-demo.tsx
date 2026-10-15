"use client";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@neomorphic-react/ui/toggle-group";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";

export default function ToggleGroupDemo() {
  return (
    <ToggleGroup aria-label="Text alignment" defaultValue={["left"]}>
      <ToggleGroupItem aria-label="Align left" value="left">
        <AlignLeft />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Align centre" value="center">
        <AlignCenter />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Align right" value="right">
        <AlignRight />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
