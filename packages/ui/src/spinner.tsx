"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

// The kit's loader: a ring-shaped groove (a well with a raised hub in its
// middle) with an arc running around it.
const spinnerVariants = cva(
  "relative inline-flex shrink-0 rounded-full bg-background align-middle shadow-neu-flat",
  {
    variants: {
      size: {
        sm: "inset-shadow-neu-sm size-6",
        md: "inset-shadow-neu-sm size-10",
        lg: "inset-shadow-neu size-16",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// The groove is the outer 22% of the radius; the arc rides its centre line.
const GROOVE = 22;
const ARC_RADIUS = 50 - GROOVE / 2;

// ---------------------------------------------------------------------------
// Spinner
// ---------------------------------------------------------------------------

interface SpinnerProps
  extends Omit<useRender.ComponentProps<"span">, "children">,
    VariantProps<typeof spinnerVariants> {
  /** @default "md" (40px) */
  size?: "sm" | "md" | "lg";
}

/**
 * An indeterminate loading indicator. It is a `role="status"` named
 * "Loading"; pass `aria-label` to say what is loading. With `aria-hidden`
 * (inside a control that already reports `aria-busy`) it is only decoration.
 * The arc is `--primary`; set `--spinner-fill` for another colour.
 */
function Spinner({ className, size = "md", render, ...props }: SpinnerProps) {
  const hidden =
    props["aria-hidden"] === true || props["aria-hidden"] === "true";
  return useRender({
    defaultTagName: "span",
    render,
    props: mergeProps<"span">(
      {
        "aria-label": hidden ? undefined : "Loading",
        className: cn(spinnerVariants({ size }), className),
        role: hidden ? undefined : "status",
        children: (
          <>
            <svg
              aria-hidden="true"
              className="absolute inset-0 size-full animate-spin motion-reduce:animate-none"
              data-slot="spinner-arc"
              fill="none"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                pathLength={100}
                r={ARC_RADIUS}
                stroke="var(--spinner-fill, var(--color-primary))"
                strokeDasharray="25 75"
                strokeLinecap="round"
                strokeWidth={GROOVE / 2}
              />
            </svg>
            <span
              aria-hidden="true"
              className="absolute inset-[22%] inset-shadow-neu-flat rounded-full bg-neu-convex shadow-neu-sm"
              data-slot="spinner-hub"
            />
          </>
        ),
      },
      props
    ),
    state: { slot: "spinner", size },
  });
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { SpinnerProps };
export { Spinner, spinnerVariants };
