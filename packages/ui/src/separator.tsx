"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

// A groove cut into the surface: a dark line with a highlight beside it, like
// the dividers in `ButtonGroup` and `Select`. `perforated` draws both lines
// dashed, like the boarding ticket's tear line.
const separatorVariants = cva("shrink-0", {
  variants: {
    variant: {
      solid: "bg-neu-dark",
      perforated: "bg-repeat",
    },
    orientation: {
      horizontal: "",
      vertical: "self-stretch",
    },
  },
  compoundVariants: [
    {
      variant: "solid",
      orientation: "horizontal",
      className: "h-px w-full shadow-[0_1px_0_var(--neu-light)]",
    },
    {
      variant: "solid",
      orientation: "vertical",
      className: "h-full w-px shadow-[1px_0_0_var(--neu-light)]",
    },
    {
      variant: "perforated",
      orientation: "horizontal",
      className:
        "h-0.5 w-full bg-[length:8px_1px] bg-[linear-gradient(to_right,var(--neu-dark)_50%,transparent_0),linear-gradient(to_right,var(--neu-light)_50%,transparent_0)] bg-[position:0_0,0_1px] bg-repeat-x",
    },
    {
      variant: "perforated",
      orientation: "vertical",
      className:
        "h-full w-0.5 bg-[length:1px_8px] bg-[linear-gradient(to_bottom,var(--neu-dark)_50%,transparent_0),linear-gradient(to_bottom,var(--neu-light)_50%,transparent_0)] bg-[position:0_0,1px_0] bg-repeat-y",
    },
  ],
  defaultVariants: {
    variant: "solid",
    orientation: "horizontal",
  },
});

// ---------------------------------------------------------------------------
// Separator
// ---------------------------------------------------------------------------

interface SeparatorProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof separatorVariants> {
  /**
   * Hidden from assistive tech, for purely visual breaks. Set `false` when
   * the line divides content that should be announced as separate.
   * @default true
   */
  decorative?: boolean;
  /** @default "horizontal" */
  orientation?: "horizontal" | "vertical";
  /** @default "solid" */
  variant?: "solid" | "perforated";
}

function Separator({
  className,
  decorative = true,
  orientation = "horizontal",
  variant = "solid",
  ...props
}: SeparatorProps) {
  const semantics = decorative
    ? { role: "none" }
    : {
        role: "separator",
        "aria-orientation":
          orientation === "vertical" ? orientation : undefined,
      };
  return (
    <div
      className={cn(separatorVariants({ variant, orientation }), className)}
      data-orientation={orientation}
      data-slot="separator"
      data-variant={variant}
      {...semantics}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { SeparatorProps };
export { Separator, separatorVariants };
