"use client";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@neomorphic-react/ui/context-menu";
import { useState } from "react";

const zooms = ["50%", "100%", "200%"];

export default function ContextMenuCheckboxes() {
  const [grid, setGrid] = useState(true);
  const [snap, setSnap] = useState(false);
  const [zoom, setZoom] = useState("100%");

  return (
    <ContextMenu>
      <ContextMenuTrigger className="inset-shadow-neu flex h-40 w-full max-w-xs flex-col items-center justify-center gap-1 rounded-xl text-sm shadow-neu-flat">
        <span className="font-medium text-foreground">Canvas at {zoom}</span>
        <span className="text-muted-foreground">
          Grid {grid ? "on" : "off"}, snapping {snap ? "on" : "off"}
        </span>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuCheckboxItem checked={grid} onCheckedChange={setGrid}>
          Show grid
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem checked={snap} onCheckedChange={setSnap}>
          Snap to grid
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuLabel>Zoom</ContextMenuLabel>
          <ContextMenuRadioGroup
            onValueChange={(value) => setZoom(value as string)}
            value={zoom}
          >
            {zooms.map((value) => (
              <ContextMenuRadioItem key={value} value={value}>
                {value}
              </ContextMenuRadioItem>
            ))}
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
