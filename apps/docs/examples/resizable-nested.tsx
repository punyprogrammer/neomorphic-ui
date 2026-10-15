"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@neomorphic-react/ui/resizable";
import { Surface } from "@neomorphic-react/ui/surface";

const pane =
  "flex items-center justify-center p-6 font-medium text-muted-foreground text-sm";

export default function ResizableNested() {
  return (
    <Surface className="h-80 w-full max-w-xl overflow-hidden rounded-2xl">
      <ResizablePanelGroup>
        <ResizablePanel className={pane} defaultSize="35" minSize="20">
          Stations
        </ResizablePanel>
        <ResizableHandle aria-label="Resize stations" withHandle />
        <ResizablePanel minSize="30">
          <ResizablePanelGroup orientation="vertical">
            <ResizablePanel className={pane} defaultSize="60" minSize="25">
              Map
            </ResizablePanel>
            <ResizableHandle aria-label="Resize map" withHandle />
            <ResizablePanel className={pane} minSize="25">
              Timetable
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Surface>
  );
}
