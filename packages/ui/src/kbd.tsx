import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

// A small raised key cap. Inside a `Tooltip` or a menu item it stays raised
// on the popup's own surface.
const kbdVariants = cva(
  "pointer-events-none inset-shadow-neu-flat inline-flex w-fit select-none items-center justify-center gap-1 rounded-md bg-neu-convex font-medium font-sans text-foreground shadow-neu-sm [&_svg:not([class*='size-'])]:size-3",
  {
    variants: {
      size: {
        sm: "h-5 min-w-5 px-1 text-[0.6875rem]",
        md: "h-6 min-w-6 px-1.5 text-xs",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ---------------------------------------------------------------------------
// Kbd / KbdGroup
// ---------------------------------------------------------------------------

interface KbdProps
  extends React.ComponentProps<"kbd">,
    VariantProps<typeof kbdVariants> {
  /** @default "md" */
  size?: "sm" | "md";
}

/**
 * One key, such as `⌘` or `K`. Symbols aren't read reliably by screen
 * readers: give a symbol key an `aria-label` ("Command").
 */
function Kbd({ className, size = "md", ...props }: KbdProps) {
  return (
    <kbd
      className={cn(kbdVariants({ size }), className)}
      data-size={size}
      data-slot="kbd"
      {...props}
    />
  );
}

type KbdGroupProps = React.ComponentProps<"kbd">;

/** A chord or sequence of keys, e.g. `⌘` `K`. */
function KbdGroup({ className, ...props }: KbdGroupProps) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center gap-1 font-sans text-muted-foreground text-xs",
        className
      )}
      data-slot="kbd-group"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { KbdGroupProps, KbdProps };
export { Kbd, KbdGroup, kbdVariants };
