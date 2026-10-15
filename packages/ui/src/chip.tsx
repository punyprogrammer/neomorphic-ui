"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

// A status label: icon + text in a pill, larger and sentence-case beside
// `Badge` (counts and dots). Fills pair each token with its `-foreground`,
// as in `Badge`; every variant sets both shadow slots.
const chipVariants = cva(
  "inline-flex w-fit shrink-0 select-none items-center justify-center whitespace-nowrap rounded-full font-medium leading-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "inset-shadow-neu-flat bg-neu-convex text-foreground shadow-neu-sm",
        inset:
          "inset-shadow-neu-sm bg-background text-foreground shadow-neu-flat",
        primary:
          "inset-shadow-neu-flat bg-primary text-primary-foreground shadow-neu-sm",
        destructive:
          "inset-shadow-neu-flat bg-destructive text-destructive-foreground shadow-neu-sm",
        success:
          "inset-shadow-neu-flat bg-success text-success-foreground shadow-neu-sm",
        warning:
          "inset-shadow-neu-flat bg-warning text-warning-foreground shadow-neu-sm",
      },
      size: {
        sm: "h-6 gap-1 px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3",
        md: "h-7 gap-1.5 px-3 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-8 gap-1.5 px-3.5 text-sm [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// ---------------------------------------------------------------------------
// Chip
// ---------------------------------------------------------------------------

interface ChipProps
  extends useRender.ComponentProps<"span">,
    VariantProps<typeof chipVariants> {
  /**
   * Any icon element, such as a lucide-react icon. SVGs without a `size-*`
   * class are sized to match the chip. The icon is decorative: the text
   * carries the meaning.
   */
  icon?: React.ReactNode;
  /**
   * Where the icon sits relative to the label; follows the writing direction.
   * @default "start"
   */
  iconPosition?: "start" | "end";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /**
   * `default` is raised from the surface, `inset` pressed into it; the rest
   * are token fills with their `-foreground` text.
   * @default "default"
   */
  variant?:
    | "default"
    | "inset"
    | "primary"
    | "destructive"
    | "success"
    | "warning";
}

/**
 * A status pill with an optional icon: "Paid", "Due soon", "Draft". It is
 * not interactive; for a status that changes while the user watches, render
 * it inside a `role="status"` region.
 */
function Chip({
  className,
  variant = "default",
  size = "md",
  icon,
  iconPosition = "start",
  children,
  render,
  ...props
}: ChipProps) {
  const hasIcon = icon != null && icon !== false;
  const iconNode = hasIcon ? (
    <span aria-hidden="true" className="inline-flex" data-slot="chip-icon">
      {icon}
    </span>
  ) : null;

  return useRender({
    defaultTagName: "span",
    render,
    props: mergeProps<"span">(
      {
        className: cn(chipVariants({ variant, size }), className),
        children: (
          <>
            {iconPosition === "start" ? iconNode : null}
            {children}
            {iconPosition === "end" ? iconNode : null}
          </>
        ),
        "data-icon-position": hasIcon ? iconPosition : undefined,
      } as React.ComponentProps<"span">,
      props
    ),
    state: { slot: "chip", variant, size },
  });
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { ChipProps };
export { Chip, chipVariants };
