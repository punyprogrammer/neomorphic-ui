"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

// Raised when off, pressed into the surface when on, like Button's
// `aria-pressed`. "On" content takes `--toggle-on` (set on the toggle or any
// ancestor), falling back to `--primary`. Keep a custom colour at 3:1 or more
// against the surface: it marks the state alongside the shadow.
const toggleVariants = cva(
  "relative inline-flex shrink-0 touch-manipulation select-none items-center justify-center whitespace-nowrap font-medium text-muted-foreground uppercase tracking-wide transition-[box-shadow,background-color,color] duration-[var(--duration-base)] ease-[var(--ease-out)] focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-muted-foreground/50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:transition-[fill]",
  {
    variants: {
      variant: {
        default:
          "inset-shadow-neu-flat bg-neu-convex shadow-neu hover:shadow-neu-lg active:inset-shadow-neu-sm active:bg-none active:shadow-neu-flat disabled:inset-shadow-neu-flat disabled:bg-none disabled:shadow-neu-flat aria-pressed:inset-shadow-neu-sm aria-pressed:bg-none aria-pressed:text-[var(--toggle-on,var(--color-primary))] aria-pressed:shadow-neu-flat",
      },
      // Padding squares an icon-only toggle (icon + 2 × padding = height), so
      // `pill` makes it a circle; text toggles grow wider from the same base.
      size: {
        sm: "h-8 min-w-8 gap-1.5 px-[9px] text-xs [&_svg:not([class*='size-'])]:size-3.5",
        md: "h-10 min-w-10 gap-2 px-3 text-sm [&_svg:not([class*='size-'])]:size-4",
        lg: "h-12 min-w-12 gap-2.5 px-3.5 text-base [&_svg:not([class*='size-'])]:size-5",
      },
      shape: {
        pill: "rounded-full",
        rounded: "rounded-lg",
      },
      iconFill: {
        true: "aria-pressed:[&_svg]:fill-current",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "pill",
      iconFill: false,
    },
  }
);

type ToggleVariantsProps = VariantProps<typeof toggleVariants>;

// ---------------------------------------------------------------------------
// Toggle
// ---------------------------------------------------------------------------

interface ToggleProps
  extends TogglePrimitive.Props,
    Omit<ToggleVariantsProps, "variant"> {
  /**
   * Fills the icon while pressed: an outline heart, star or bookmark turns
   * solid. Leave off for icons that read badly filled.
   */
  iconFill?: boolean;
  /**
   * Corner treatment. An icon-only `pill` toggle is a circle, like the kit's
   * social toggles; `rounded` gives a tile.
   * @default "pill"
   */
  shape?: "pill" | "rounded";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
}

/**
 * A two-state button (`aria-pressed`). Icon-only toggles need an
 * `aria-label` naming the setting, which stays the same in both states.
 */
function Toggle({
  className,
  size = "md",
  shape = "pill",
  iconFill = false,
  ...props
}: ToggleProps) {
  return (
    <TogglePrimitive
      className={cn(toggleVariants({ size, shape, iconFill }), className)}
      data-shape={shape}
      data-size={size}
      data-slot="toggle"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { ToggleProps, ToggleVariantsProps };
export { Toggle, toggleVariants };
