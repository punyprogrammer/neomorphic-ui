"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

// `separator` and `border` draw grooves, like `Separator`, so a date or "New
// messages" line reads as cut into the surface.
const markerVariants = cva(
  "group/marker relative flex min-h-4 w-full items-center gap-2 text-start text-muted-foreground text-sm [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "",
        separator:
          "before:me-1 before:h-px before:min-w-0 before:flex-1 before:bg-neu-dark before:shadow-[0_1px_0_var(--neu-light)] after:ms-1 after:h-px after:min-w-0 after:flex-1 after:bg-neu-dark after:shadow-[0_1px_0_var(--neu-light)]",
        border:
          "border-neu-dark border-b pb-2 shadow-[0_1px_0_var(--neu-light)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// ---------------------------------------------------------------------------
// Marker
// ---------------------------------------------------------------------------

interface MarkerProps
  extends useRender.ComponentProps<"div">,
    VariantProps<typeof markerVariants> {
  /**
   * Sweep a shine across the text, for work in progress ("Thinking…").
   * @default false
   */
  shimmer?: boolean;
  /**
   * `default` is a quiet line of text, `separator` centres it between two
   * grooves (a date), `border` underlines it with one (a section start).
   * @default "default"
   */
  variant?: "default" | "separator" | "border";
}

/**
 * A line of status in a transcript: a date, "Maya joined", "Thinking…". It
 * isn't a `role="separator"`; for live progress give it `role="status"` so
 * the change is announced.
 */
function Marker({
  className,
  render,
  shimmer = false,
  variant = "default",
  ...props
}: MarkerProps) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      { className: cn(markerVariants({ variant }), className) },
      props
    ),
    state: { slot: "marker", variant, shimmer },
  });
}

// ---------------------------------------------------------------------------
// Parts
// ---------------------------------------------------------------------------

type MarkerIconProps = React.ComponentProps<"span">;

/** A decorative icon or `Spinner` before the text. */
function MarkerIcon({ className, ...props }: MarkerIconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-4 shrink-0 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      data-slot="marker-icon"
      {...props}
    />
  );
}

type MarkerContentProps = React.ComponentProps<"span">;

/** The marker's text. */
function MarkerContent({ className, ...props }: MarkerContentProps) {
  return (
    <span
      className={cn(
        "wrap-break-word group-data-shimmer/marker:neu-shimmer-text min-w-0 group-data-[variant=separator]/marker:flex-none group-data-[variant=separator]/marker:text-center",
        className
      )}
      data-slot="marker-content"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { MarkerContentProps, MarkerIconProps, MarkerProps };
export { Marker, MarkerContent, MarkerIcon, markerVariants };
