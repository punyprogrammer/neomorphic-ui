import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

// A shallow well where content will land, with a highlight sweeping across
// it (still under reduced motion). Size it with `className`.
const skeletonVariants = cva(
  "neu-shimmer inset-shadow-neu-sm shrink-0 bg-background shadow-neu-flat",
  {
    variants: {
      shape: {
        rect: "rounded-lg",
        line: "h-4 rounded-full",
        circle: "aspect-square rounded-full",
      },
    },
    defaultVariants: {
      shape: "rect",
    },
  }
);

// ---------------------------------------------------------------------------
// Skeleton
// ---------------------------------------------------------------------------

interface SkeletonProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof skeletonVariants> {
  /**
   * `line` for text, `circle` for an avatar, `rect` for anything else.
   * @default "rect"
   */
  shape?: "rect" | "line" | "circle";
}

/**
 * A loading placeholder, hidden from assistive tech. Mark the region that
 * is loading with `aria-busy`, and announce the result when it lands.
 */
function Skeleton({ className, shape = "rect", ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(skeletonVariants({ shape }), className)}
      data-shape={shape}
      data-slot="skeleton"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { SkeletonProps };
export { Skeleton, skeletonVariants };
