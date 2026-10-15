"use client";

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// ScrollBar
// ---------------------------------------------------------------------------

type ScrollBarProps = ScrollAreaPrimitive.Scrollbar.Props;

// A groove with a raised pill thumb, shown while the pointer is over the
// area or it is scrolling.
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: ScrollBarProps) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      className={cn(
        "inset-shadow-neu-sm m-0.5 flex touch-none select-none rounded-full bg-background p-px opacity-0 shadow-neu-flat transition-opacity duration-[var(--duration-base)] data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-hovering:opacity-100 data-scrolling:opacity-100",
        className
      )}
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        className="relative inset-shadow-neu-flat flex-1 rounded-full bg-neu-convex shadow-neu-sm"
        data-slot="scroll-area-thumb"
      />
    </ScrollAreaPrimitive.Scrollbar>
  );
}

// ---------------------------------------------------------------------------
// ScrollArea
// ---------------------------------------------------------------------------

const FADE = {
  vertical:
    "mask-linear-[to_bottom,transparent_0,black_min(--spacing(8),var(--scroll-area-overflow-y-start)),black_calc(100%_-_min(--spacing(8),var(--scroll-area-overflow-y-end,--spacing(8)))),transparent_100%] mask-no-repeat",
  horizontal:
    "mask-linear-[to_right,transparent_0,black_min(--spacing(8),var(--scroll-area-overflow-x-start)),black_calc(100%_-_min(--spacing(8),var(--scroll-area-overflow-x-end,--spacing(8)))),transparent_100%] mask-no-repeat",
} as const;

interface ScrollAreaProps extends ScrollAreaPrimitive.Root.Props {
  /**
   * Fades content out at an edge that has more to scroll to.
   * @default false
   */
  fade?: boolean;
  /**
   * Which scrollbars to show. Content still scrolls by wheel, touch and
   * keyboard either way.
   * @default "vertical"
   */
  orientation?: "vertical" | "horizontal" | "both";
}

/**
 * A scroll container with themed scrollbars. Give it a height (or width,
 * for `horizontal`). The viewport is focusable when it overflows, so
 * keyboard users can scroll it.
 */
function ScrollArea({
  className,
  children,
  fade = false,
  orientation = "vertical",
  ...props
}: ScrollAreaProps) {
  const vertical = orientation !== "horizontal";
  const horizontal = orientation !== "vertical";
  return (
    <ScrollAreaPrimitive.Root
      className={cn("relative min-h-0 overflow-hidden", className)}
      data-slot="scroll-area"
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        className={cn(
          "size-full overscroll-contain rounded-[inherit] outline-none focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:-outline-offset-2",
          fade && orientation === "vertical" && FADE.vertical,
          fade && orientation === "horizontal" && FADE.horizontal
        )}
        data-slot="scroll-area-viewport"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      {vertical ? <ScrollBar orientation="vertical" /> : null}
      {horizontal ? <ScrollBar orientation="horizontal" /> : null}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { ScrollAreaProps, ScrollBarProps };
export { ScrollArea, ScrollBar };
