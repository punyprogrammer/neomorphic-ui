"use client";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";

import { popupClassName } from "./popup";
import { cn } from "./utils";

// ---------------------------------------------------------------------------
// HoverCard / HoverCardTrigger
// ---------------------------------------------------------------------------

type HoverCardProps = PreviewCardPrimitive.Root.Props;

/**
 * A preview of a link's destination, shown on hover or keyboard focus. Keep
 * it supplementary: touch users and screen readers may never see it.
 */
function HoverCard(props: HoverCardProps) {
  return <PreviewCardPrimitive.Root data-slot="hover-card" {...props} />;
}

type HoverCardTriggerProps = PreviewCardPrimitive.Trigger.Props;

/**
 * Renders an `<a>`. `delay` (default 600ms) and `closeDelay` (default 300ms)
 * set how long the pointer must rest or leave before the card changes.
 */
function HoverCardTrigger({ className, ...props }: HoverCardTriggerProps) {
  return (
    <PreviewCardPrimitive.Trigger
      className={cn(
        "rounded-sm font-medium text-primary underline-offset-3 hover:underline focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2",
        className
      )}
      data-slot="hover-card-trigger"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// HoverCardContent
// ---------------------------------------------------------------------------

interface HoverCardContentProps extends PreviewCardPrimitive.Popup.Props {
  /** @default "center" */
  align?: PreviewCardPrimitive.Positioner.Props["align"];
  /** @default 0 */
  alignOffset?: number;
  /** @default "bottom" */
  side?: PreviewCardPrimitive.Positioner.Props["side"];
  /** @default 10 */
  sideOffset?: number;
}

/** A raised card, like `PopoverContent`, without focus management. */
function HoverCardContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 10,
  ...props
}: HoverCardContentProps) {
  return (
    <PreviewCardPrimitive.Portal>
      <PreviewCardPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        className="isolate z-[var(--z-popover)]"
        side={side}
        sideOffset={sideOffset}
      >
        <PreviewCardPrimitive.Popup
          className={cn(
            popupClassName,
            "w-72 max-w-(--available-width) rounded-xl p-5 text-sm",
            className
          )}
          data-slot="hover-card-content"
          {...props}
        />
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { HoverCardContentProps, HoverCardProps, HoverCardTriggerProps };
export { HoverCard, HoverCardContent, HoverCardTrigger };
