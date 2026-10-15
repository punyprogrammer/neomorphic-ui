"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@neomorphic-react/ui/resizable";
import { Surface } from "@neomorphic-react/ui/surface";

export default function ResizableDemo() {
  return (
    <Surface className="h-64 w-full max-w-xl overflow-hidden rounded-2xl">
      <ResizablePanelGroup>
        <ResizablePanel
          className="flex items-center justify-center p-6 font-medium text-muted-foreground text-sm"
          defaultSize="30"
          minSize="20"
        >
          Mailboxes
        </ResizablePanel>
        <ResizableHandle aria-label="Resize mailboxes" withHandle />
        <ResizablePanel
          className="flex items-center justify-center p-6 font-medium text-muted-foreground text-sm"
          minSize="40"
        >
          Message
        </ResizablePanel>
      </ResizablePanelGroup>
    </Surface>
  );
}
