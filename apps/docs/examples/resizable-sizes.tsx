"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@neomorphic-react/ui/resizable";
import { Surface } from "@neomorphic-react/ui/surface";
import { useState } from "react";
import type { PanelSize } from "react-resizable-panels";

const pane = "grid content-center justify-items-center gap-1 p-4 text-sm";

export default function ResizableSizes() {
  const [sizes, setSizes] = useState<Record<string, PanelSize>>({});
  const track = (id: string) => (size: PanelSize) =>
    setSizes((current) => ({ ...current, [id]: size }));
  const describe = (id: string) => {
    const size = sizes[id];
    return size
      ? `${Math.round(size.inPixels)}px · ${Math.round(size.asPercentage)}%`
      : "–";
  };

  return (
    <Surface className="h-56 w-full max-w-2xl overflow-hidden rounded-2xl">
      <ResizablePanelGroup>
        <ResizablePanel
          className={pane}
          defaultSize={180}
          maxSize={260}
          minSize={140}
          onResize={track("files")}
        >
          <span className="font-medium text-foreground">Files</span>
          <span className="text-muted-foreground text-xs tabular-nums">
            {describe("files")}
          </span>
        </ResizablePanel>
        <ResizableHandle aria-label="Resize files" />
        <ResizablePanel
          className={pane}
          minSize="30"
          onResize={track("editor")}
        >
          <span className="font-medium text-foreground">Editor</span>
          <span className="text-muted-foreground text-xs tabular-nums">
            {describe("editor")}
          </span>
        </ResizablePanel>
        <ResizableHandle aria-label="Resize editor" />
        <ResizablePanel
          className={pane}
          defaultSize="25"
          maxSize="35"
          minSize="15"
          onResize={track("outline")}
        >
          <span className="font-medium text-foreground">Outline</span>
          <span className="text-muted-foreground text-xs tabular-nums">
            {describe("outline")}
          </span>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Surface>
  );
}
