"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@neomorphic-react/ui/resizable";
import { Surface } from "@neomorphic-react/ui/surface";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useState } from "react";
import { usePanelRef } from "react-resizable-panels";

const chapters = ["Getting started", "Theming", "Components", "Accessibility"];

export default function ResizableCollapsible() {
  const sidebar = usePanelRef();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="grid w-full max-w-xl gap-4">
      <Button
        className="justify-self-start"
        icon={collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
        onClick={() =>
          collapsed ? sidebar.current?.expand() : sidebar.current?.collapse()
        }
        size="sm"
      >
        {collapsed ? "Show contents" : "Hide contents"}
      </Button>
      <Surface className="h-64 overflow-hidden rounded-2xl">
        <ResizablePanelGroup>
          <ResizablePanel
            className="grid content-start gap-2 p-5 text-sm"
            collapsible
            defaultSize="30"
            minSize="20"
            onResize={() =>
              setCollapsed(sidebar.current?.isCollapsed() ?? false)
            }
            panelRef={sidebar}
          >
            <p className="font-medium text-foreground">Contents</p>
            {chapters.map((chapter) => (
              <p className="truncate text-muted-foreground" key={chapter}>
                {chapter}
              </p>
            ))}
          </ResizablePanel>
          <ResizableHandle aria-label="Resize contents" withHandle />
          <ResizablePanel className="grid content-start gap-2 p-5 text-sm">
            <p className="font-medium text-foreground">Theming</p>
            <p className="text-muted-foreground leading-relaxed">
              Brand colours, type and spacing live in one tokens file, so a new
              theme is a single import.
            </p>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Surface>
    </div>
  );
}
