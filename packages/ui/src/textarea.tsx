"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

// The kit's message field: a well pressed into the surface. Focus deepens
// the well and adds the outline; both shadow slots are always set.
const textareaVariants = cva(
  "inset-shadow-neu flex min-h-28 w-full rounded-lg bg-background px-4 py-3 text-foreground text-sm shadow-neu-flat outline-none transition-[box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)] placeholder:text-muted-foreground read-only:inset-shadow-neu-sm focus-visible:inset-shadow-neu-lg focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-1 aria-invalid:ring-destructive/70",
  {
    variants: {
      autoResize: {
        // Grows with its content (`field-sizing`); cap it with `max-h-*`.
        true: "field-sizing-content resize-none",
        false: "resize-y",
      },
    },
    defaultVariants: {
      autoResize: false,
    },
  }
);

// ---------------------------------------------------------------------------
// Textarea
// ---------------------------------------------------------------------------

interface TextareaProps
  extends React.ComponentProps<"textarea">,
    VariantProps<typeof textareaVariants> {
  /**
   * Grow with the content instead of showing a resize handle. Browsers
   * without `field-sizing` keep the fixed height and scroll.
   * @default false
   */
  autoResize?: boolean;
}

/** A multi-line text field. Pair it with a `<label htmlFor>`. */
function Textarea({ className, autoResize = false, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(textareaVariants({ autoResize }), className)}
      data-slot="textarea"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { TextareaProps };
export { Textarea, textareaVariants };
