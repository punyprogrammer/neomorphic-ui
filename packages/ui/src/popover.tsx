"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import type * as React from "react";

import { popupClassName } from "./popup";
import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Popover / PopoverTrigger / PopoverClose
// ---------------------------------------------------------------------------

type PopoverProps = PopoverPrimitive.Root.Props;

/** Rich content anchored to a trigger. Focus moves in on open and returns on close. */
function Popover(props: PopoverProps) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

type PopoverTriggerProps = PopoverPrimitive.Trigger.Props;

/** Renders a `<button>`; pass `render={<Button … />}` to use a library button. */
function PopoverTrigger(props: PopoverTriggerProps) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

type PopoverCloseProps = PopoverPrimitive.Close.Props;

function PopoverClose(props: PopoverCloseProps) {
  return <PopoverPrimitive.Close data-slot="popover-close" {...props} />;
}

// ---------------------------------------------------------------------------
// PopoverContent
// ---------------------------------------------------------------------------

interface PopoverContentProps extends PopoverPrimitive.Popup.Props {
  /** @default "center" */
  align?: PopoverPrimitive.Positioner.Props["align"];
  /** @default 0 */
  alignOffset?: number;
  /** An element to position against instead of the trigger. */
  anchor?: PopoverPrimitive.Positioner.Props["anchor"];
  /** @default "bottom" */
  side?: PopoverPrimitive.Positioner.Props["side"];
  /**
   * Gap from the trigger; room for both the trigger's and the popup's
   * shadows.
   * @default 10
   */
  sideOffset?: number;
}

/**
 * A raised card scaling in from its trigger. Like `Tooltip`, it has no
 * arrow: a raised arrow can't cast a shadow that joins the card's.
 */
function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  anchor,
  side = "bottom",
  sideOffset = 10,
  ...props
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="isolate z-[var(--z-popover)]"
        side={side}
        sideOffset={sideOffset}
      >
        <PopoverPrimitive.Popup
          className={cn(
            popupClassName,
            "flex w-72 max-w-(--available-width) flex-col gap-4 rounded-xl p-5 text-sm",
            className
          )}
          data-slot="popover-content"
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

// ---------------------------------------------------------------------------
// PopoverHeader / PopoverTitle / PopoverDescription
// ---------------------------------------------------------------------------

type PopoverHeaderProps = React.ComponentProps<"div">;

function PopoverHeader({ className, ...props }: PopoverHeaderProps) {
  return (
    <div
      className={cn("flex flex-col gap-1", className)}
      data-slot="popover-header"
      {...props}
    />
  );
}

type PopoverTitleProps = PopoverPrimitive.Title.Props;

/** Names the popup for assistive tech. */
function PopoverTitle({ className, ...props }: PopoverTitleProps) {
  return (
    <PopoverPrimitive.Title
      className={cn("font-semibold text-base text-foreground", className)}
      data-slot="popover-title"
      {...props}
    />
  );
}

type PopoverDescriptionProps = PopoverPrimitive.Description.Props;

function PopoverDescription({ className, ...props }: PopoverDescriptionProps) {
  return (
    <PopoverPrimitive.Description
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="popover-description"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  PopoverCloseProps,
  PopoverContentProps,
  PopoverDescriptionProps,
  PopoverHeaderProps,
  PopoverProps,
  PopoverTitleProps,
  PopoverTriggerProps,
};
export {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
};
