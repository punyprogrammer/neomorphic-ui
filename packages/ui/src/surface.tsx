"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

// Each elevation sets BOTH shadow slots, with `-flat` in the unused one, so a
// consumer transition between elevations interpolates instead of snapping.
const surfaceVariants = cva(
  "bg-background text-foreground transition-[box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)]",
  {
    variants: {
      elevation: {
        raised: "inset-shadow-neu-flat bg-neu-convex",
        inset: "shadow-neu-flat",
        flat: "inset-shadow-neu-flat shadow-neu-flat",
      },
      depth: {
        sm: "",
        md: "",
        lg: "",
      },
      shape: {
        square: "rounded-sm",
        rounded: "rounded-lg",
        pill: "rounded-full",
        circle: "aspect-square rounded-full",
      },
    },
    compoundVariants: [
      { elevation: "raised", depth: "sm", className: "shadow-neu-sm" },
      { elevation: "raised", depth: "md", className: "shadow-neu" },
      { elevation: "raised", depth: "lg", className: "shadow-neu-lg" },
      { elevation: "inset", depth: "sm", className: "inset-shadow-neu-sm" },
      { elevation: "inset", depth: "md", className: "inset-shadow-neu" },
      { elevation: "inset", depth: "lg", className: "inset-shadow-neu-lg" },
    ],
    defaultVariants: {
      elevation: "raised",
      depth: "md",
      shape: "rounded",
    },
  }
);

// ---------------------------------------------------------------------------
// Surface
// ---------------------------------------------------------------------------

interface SurfaceProps
  extends useRender.ComponentProps<"div">,
    VariantProps<typeof surfaceVariants> {
  /**
   * How deep the shadow reaches. Scales from the theme's `--neu-depth`.
   * @default "md"
   */
  depth?: "sm" | "md" | "lg";
  /**
   * Whether the surface is extruded from the page, pressed into it, or level
   * with it.
   * @default "raised"
   */
  elevation?: "raised" | "inset" | "flat";
  /**
   * Corner treatment. `square` keeps a small radius, as in the kit.
   * @default "rounded"
   */
  shape?: "square" | "rounded" | "pill" | "circle";
}

function Surface({
  className,
  elevation = "raised",
  depth = "md",
  shape = "rounded",
  render,
  ...props
}: SurfaceProps) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      {
        className: cn(surfaceVariants({ elevation, depth, shape }), className),
      },
      props
    ),
    state: { slot: "surface", elevation, depth, shape },
  });
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { SurfaceProps };
export { Surface, surfaceVariants };
