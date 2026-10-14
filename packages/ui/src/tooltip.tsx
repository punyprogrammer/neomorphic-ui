"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// TooltipProvider / Tooltip / TooltipTrigger
// ---------------------------------------------------------------------------

type TooltipProviderProps = TooltipPrimitive.Provider.Props;

/**
 * Shares the open delay across tooltips, so moving between triggers shows
 * the next one at once. Wrap the app (or a toolbar) once.
 */
function TooltipProvider({ delay = 500, ...props }: TooltipProviderProps) {
  return <TooltipPrimitive.Provider delay={delay} {...props} />;
}

type TooltipProps = TooltipPrimitive.Root.Props;

function Tooltip(props: TooltipProps) {
  return <TooltipPrimitive.Root {...props} />;
}

type TooltipTriggerProps = TooltipPrimitive.Trigger.Props;

/**
 * Renders a `<button>`; pass `render={<Button … />}` to use a library button.
 * A tooltip only adds a description: an icon-only trigger still needs its
 * own `aria-label`.
 */
function TooltipTrigger(props: TooltipTriggerProps) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

// ---------------------------------------------------------------------------
// TooltipContent
// ---------------------------------------------------------------------------

interface TooltipContentProps extends TooltipPrimitive.Popup.Props {
  /** @default "center" */
  align?: TooltipPrimitive.Positioner.Props["align"];
  /** @default 0 */
  alignOffset?: number;
  /** @default "top" */
  side?: TooltipPrimitive.Positioner.Props["side"];
  /**
   * Gap from the trigger; room for both the trigger's and the popup's
   * shadows.
   * @default 10
   */
  sideOffset?: number;
}

/**
 * A small raised card on the same surface colour as the page, scaling in
 * from the trigger. There is no arrow: a raised arrow cannot cast a shadow
 * that joins the card's.
 */
function TooltipContent({
  className,
  side = "top",
  sideOffset = 10,
  align = "center",
  alignOffset = 0,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        className="isolate z-[var(--z-tooltip)]"
        side={side}
        sideOffset={sideOffset}
      >
        <TooltipPrimitive.Popup
          className={cn(
            "inset-shadow-neu-flat w-fit max-w-xs origin-(--transform-origin) rounded-lg bg-neu-convex px-3 py-1.5 text-foreground text-xs shadow-neu transition-[opacity,scale] duration-[var(--duration-fast)] ease-[var(--ease-out)] data-ending-style:scale-95 data-starting-style:scale-95 data-ending-style:opacity-0 data-starting-style:opacity-0",
            className
          )}
          data-slot="tooltip-content"
          {...props}
        />
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  TooltipContentProps,
  TooltipProps,
  TooltipProviderProps,
  TooltipTriggerProps,
};
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
