"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

// Counts, dots, and short labels only: icon + label pills belong to `Chip`.
// Fills pair each token with its `-foreground` (AA at badge text sizes);
// `--success` and `--warning` fail as text on the surface, so they are fills.
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 select-none items-center justify-center whitespace-nowrap rounded-full font-medium tabular-nums leading-none",
  {
    variants: {
      variant: {
        default:
          "inset-shadow-neu-flat bg-neu-convex text-foreground shadow-neu-sm",
        inset:
          "inset-shadow-neu-sm bg-background text-foreground shadow-neu-flat",
        primary: "bg-primary text-primary-foreground shadow-neu-sm",
        destructive: "bg-destructive text-destructive-foreground shadow-neu-sm",
        success: "bg-success text-success-foreground shadow-neu-sm",
        warning: "bg-warning text-warning-foreground shadow-neu-sm",
      },
      size: {
        sm: "h-4 min-w-4 px-1 text-[10px]",
        md: "h-5 min-w-5 px-1.5 text-[11px]",
        lg: "h-6 min-w-6 px-2 text-xs",
      },
      dot: {
        true: "min-w-0 px-0",
        false: "",
      },
      // Centres the badge on the anchor's corner, so any badge size lines up.
      placement: {
        "top-end":
          "pointer-events-none absolute end-0 top-0 z-10 translate-x-1/2 -translate-y-1/2 rtl:-translate-x-1/2",
        "top-start":
          "pointer-events-none absolute start-0 top-0 z-10 -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2",
        "bottom-end":
          "pointer-events-none absolute end-0 bottom-0 z-10 translate-x-1/2 translate-y-1/2 rtl:-translate-x-1/2",
        "bottom-start":
          "pointer-events-none absolute start-0 bottom-0 z-10 -translate-x-1/2 translate-y-1/2 rtl:translate-x-1/2",
      },
      // A circle's corner is empty; move onto its edge (1 − 1/√2 ≈ 14.6%).
      overlap: {
        rectangular: "",
        circular: "",
      },
    },
    compoundVariants: [
      { dot: true, size: "sm", className: "size-2" },
      { dot: true, size: "md", className: "size-2.5" },
      { dot: true, size: "lg", className: "size-3" },
      {
        overlap: "circular",
        placement: "top-end",
        className: "end-[14.6%] top-[14.6%]",
      },
      {
        overlap: "circular",
        placement: "top-start",
        className: "start-[14.6%] top-[14.6%]",
      },
      {
        overlap: "circular",
        placement: "bottom-end",
        className: "end-[14.6%] bottom-[14.6%]",
      },
      {
        overlap: "circular",
        placement: "bottom-start",
        className: "start-[14.6%] bottom-[14.6%]",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      dot: false,
      overlap: "rectangular",
    },
  }
);

// ---------------------------------------------------------------------------
// Badge
// ---------------------------------------------------------------------------

interface BadgeProps
  extends useRender.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  /**
   * A number to show. Above `max` it reads `max+`; zero hides the badge
   * unless `showZero`. `children` take precedence.
   */
  count?: number;
  /** A small dot with no content: "something new", no number. */
  dot?: boolean;
  /** @default 99 */
  max?: number;
  /**
   * Shape of the anchor the badge sits on. `circular` moves a placed badge
   * onto a round anchor's edge instead of its empty bounding-box corner.
   * @default "rectangular"
   */
  overlap?: "rectangular" | "circular";
  /**
   * Pins the badge to a corner of the nearest `BadgeAnchor`. `start` and `end`
   * follow the writing direction. A placed badge is `aria-hidden` by default:
   * put the count in the anchored control's accessible name instead.
   */
  placement?: "top-end" | "top-start" | "bottom-end" | "bottom-start";
  /** Show the badge when `count` is 0. */
  showZero?: boolean;
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

function formatCount(count: number, max: number) {
  return count > max ? `${max}+` : String(count);
}

function Badge({
  className,
  variant = "default",
  size = "md",
  count,
  max = 99,
  showZero = false,
  dot = false,
  placement,
  overlap = "rectangular",
  children,
  render,
  ...props
}: BadgeProps) {
  let content = children;
  if (content == null && !dot && count !== undefined) {
    content = formatCount(count, max);
  }
  const hidden =
    children == null && count !== undefined && count <= 0 && !showZero;

  const element = useRender({
    defaultTagName: "span",
    render,
    props: mergeProps<"span">(
      {
        "aria-hidden": placement ? true : undefined,
        className: cn(
          badgeVariants({ variant, size, dot, placement, overlap }),
          className
        ),
        children: dot ? undefined : content,
      },
      props
    ),
    state: { slot: "badge", variant, size, placement, dot },
  });

  return hidden ? null : element;
}

// ---------------------------------------------------------------------------
// BadgeAnchor
// ---------------------------------------------------------------------------

type BadgeAnchorProps = useRender.ComponentProps<"span">;

/** Positioning context for badges with a `placement`. */
function BadgeAnchor({ className, render, ...props }: BadgeAnchorProps) {
  return useRender({
    defaultTagName: "span",
    render,
    props: mergeProps<"span">(
      { className: cn("relative inline-flex w-fit shrink-0", className) },
      props
    ),
    state: { slot: "badge-anchor" },
  });
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { BadgeAnchorProps, BadgeProps };
export { Badge, BadgeAnchor, badgeVariants };
