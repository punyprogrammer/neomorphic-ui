"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

// Buttons at rest: `:not(:active):not([aria-pressed=true])` lifts these rules
// above Button's own rest and hover shadows while leaving its pressed classes
// untouched, so a held or toggled segment still sinks into the slab.
const REST = "[&>[data-slot=button]:not(:active):not([aria-pressed=true])]";

// Segments drop their own shadow and convex fill; the group is one raised
// slab, like a single Button, split by grooves.
const buttonGroupVariants = cva(
  [
    "inset-shadow-neu-flat inline-flex w-fit items-stretch bg-neu-convex shadow-neu",
    `${REST}:shadow-neu-flat ${REST}:inset-shadow-neu-flat`,
    "[&>[data-slot=button]:is([data-variant=default],[data-variant=destructive])]:bg-none [&>[data-slot=button]:is([data-variant=default],[data-variant=destructive])]:bg-transparent",
    "[&>*]:focus-visible:z-10 [&>[data-slot=button]]:rounded-none",
    // Groove: a dark line with a highlight on its lit side.
    "[&>[data-slot]~[data-slot]]:before:pointer-events-none [&>[data-slot]~[data-slot]]:before:absolute [&>[data-slot]~[data-slot]]:before:bg-[var(--neu-dark)] [&>[data-slot]~[data-slot]]:before:content-['']",
  ],
  {
    variants: {
      orientation: {
        horizontal:
          "[&>[data-slot]:first-child]:rounded-s-[inherit] [&>[data-slot]:last-child]:rounded-e-[inherit] [&>[data-slot]~[data-slot]]:before:inset-y-1/4 [&>[data-slot]~[data-slot]]:before:start-0 [&>[data-slot]~[data-slot]]:before:w-px [&>[data-slot]~[data-slot]]:before:shadow-[1px_0_0_var(--neu-light)]",
        vertical:
          "flex-col [&>[data-slot]:first-child]:rounded-t-[inherit] [&>[data-slot]:last-child]:rounded-b-[inherit] [&>[data-slot]~[data-slot]]:before:inset-x-1/4 [&>[data-slot]~[data-slot]]:before:top-0 [&>[data-slot]~[data-slot]]:before:h-px [&>[data-slot]~[data-slot]]:before:shadow-[0_1px_0_var(--neu-light)]",
      },
      shape: {
        rounded: "rounded-lg",
        pill: "rounded-full",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      shape: "rounded",
    },
  }
);

// ---------------------------------------------------------------------------
// ButtonGroup
// ---------------------------------------------------------------------------

interface ButtonGroupProps
  extends useRender.ComponentProps<"div">,
    VariantProps<typeof buttonGroupVariants> {
  /** @default "horizontal" */
  orientation?: "horizontal" | "vertical";
  /**
   * Outer corners of the slab; the first and last segments follow them.
   * @default "rounded" (the kit's ‹ › stepper)
   */
  shape?: "rounded" | "pill";
}

/**
 * Joins `Button`s (and `ButtonGroupText`) into one raised slab. It's a
 * `role="group"`: give it an `aria-label` naming what the buttons control.
 */
function ButtonGroup({
  className,
  orientation = "horizontal",
  shape = "rounded",
  render,
  ...props
}: ButtonGroupProps) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      {
        role: "group",
        className: cn(buttonGroupVariants({ orientation, shape }), className),
      },
      props
    ),
    state: { slot: "button-group", orientation, shape },
  });
}

// ---------------------------------------------------------------------------
// ButtonGroupText
// ---------------------------------------------------------------------------

type ButtonGroupTextProps = useRender.ComponentProps<"span">;

/** A non-interactive segment, such as a "2 / 5" page readout. */
function ButtonGroupText({
  className,
  render,
  ...props
}: ButtonGroupTextProps) {
  return useRender({
    defaultTagName: "span",
    render,
    props: mergeProps<"span">(
      {
        className: cn(
          "relative flex select-none items-center justify-center gap-2 px-3 font-medium text-foreground text-sm tabular-nums [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
          className
        ),
      },
      props
    ),
    state: { slot: "button-group-text" },
  });
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { ButtonGroupProps, ButtonGroupTextProps };
export { ButtonGroup, ButtonGroupText, buttonGroupVariants };
