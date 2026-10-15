"use client";

import { GripVertical as GripVerticalIcon } from "lucide-react";
import {
  type GroupProps,
  type PanelProps,
  Group as ResizableGroupPrimitive,
  Panel as ResizablePanelPrimitive,
  Separator as ResizableSeparatorPrimitive,
  type SeparatorProps,
} from "react-resizable-panels";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// ResizablePanelGroup / ResizablePanel
// ---------------------------------------------------------------------------

type ResizablePanelGroupProps = GroupProps;

/**
 * Lays out `ResizablePanel`s in a row (`orientation="horizontal"`, the
 * default) or a column, split by `ResizableHandle`s. Sizes are pixels as
 * numbers and percentages as strings (`defaultSize="30"`).
 */
function ResizablePanelGroup({
  className,
  ...props
}: ResizablePanelGroupProps) {
  return (
    <ResizableGroupPrimitive
      className={cn("flex size-full", className)}
      data-slot="resizable-panel-group"
      {...props}
    />
  );
}

type ResizablePanelProps = PanelProps;

function ResizablePanel(props: ResizablePanelProps) {
  return <ResizablePanelPrimitive data-slot="resizable-panel" {...props} />;
}

// ---------------------------------------------------------------------------
// ResizableHandle
// ---------------------------------------------------------------------------

interface ResizableHandleProps extends SeparatorProps {
  /**
   * Show a raised grip on the groove; it presses in while dragged.
   * @default false
   */
  withHandle?: boolean;
}

// A groove between panels with a wider invisible hit area. It turns primary
// while hovered, focused or dragged; arrow keys resize, Enter collapses.
function ResizableHandle({
  className,
  withHandle = false,
  ...props
}: ResizableHandleProps) {
  return (
    <ResizableSeparatorPrimitive
      className={cn(
        "group/resizable-handle relative flex w-px shrink-0 items-center justify-center bg-[var(--neu-dark)] shadow-[1px_0_0_var(--neu-light)] outline-none transition-colors duration-[var(--duration-fast)]",
        "after:absolute after:inset-y-0 after:start-1/2 after:w-3 after:-translate-x-1/2 rtl:after:translate-x-1/2",
        "aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:shadow-[0_1px_0_var(--neu-light)] aria-[orientation=horizontal]:after:inset-x-0 aria-[orientation=horizontal]:after:inset-y-auto aria-[orientation=horizontal]:after:start-0 aria-[orientation=horizontal]:after:h-3 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2",
        "data-[separator=active]:bg-primary data-[separator=focus]:bg-primary data-[separator=hover]:bg-primary data-[separator=disabled]:opacity-50",
        "focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2",
        className
      )}
      data-slot="resizable-handle"
      {...props}
    >
      {withHandle ? (
        <div
          className="inset-shadow-neu-flat z-10 flex h-8 w-3.5 shrink-0 items-center justify-center rounded-full bg-neu-convex text-muted-foreground shadow-neu-sm transition-[box-shadow,color] duration-[var(--duration-fast)] group-aria-[orientation=horizontal]/resizable-handle:rotate-90 group-data-[separator=active]/resizable-handle:inset-shadow-neu-sm group-data-[separator=active]/resizable-handle:bg-none group-data-[separator=active]/resizable-handle:text-primary group-data-[separator=focus]/resizable-handle:text-primary group-data-[separator=active]/resizable-handle:shadow-neu-flat"
          data-slot="resizable-handle-grip"
        >
          <GripVerticalIcon aria-hidden="true" className="size-3" />
        </div>
      ) : null}
    </ResizableSeparatorPrimitive>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  ResizableHandleProps,
  ResizablePanelGroupProps,
  ResizablePanelProps,
};
export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
