"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { cva, type VariantProps } from "class-variance-authority";
import { Check as CheckIcon, Minus as MinusIcon } from "lucide-react";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

// The kit's selection controls: an empty control is a well pressed into the
// surface, a selected one rises out of it carrying a dark mark. Shared with
// `RadioGroupItem`. Every state sets both shadow slots so changes ease.
const checkboxVariants = cva(
  "peer relative inset-shadow-neu-sm inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm bg-background text-primary shadow-neu-flat outline-none transition-[box-shadow,background-color,color] duration-[var(--duration-base)] ease-[var(--ease-out)] after:absolute after:-inset-2 hover:inset-shadow-neu focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2 aria-invalid:text-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/70 data-checked:inset-shadow-neu-flat data-indeterminate:inset-shadow-neu-flat data-disabled:cursor-not-allowed data-readonly:cursor-default data-checked:bg-neu-convex data-indeterminate:bg-neu-convex data-disabled:opacity-50 data-checked:shadow-neu-sm data-indeterminate:shadow-neu-sm",
  {
    variants: {
      size: {
        sm: "size-5 [&_svg]:size-3",
        md: "size-6 [&_svg]:size-3.5",
        lg: "size-7 [&_svg]:size-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// Scales the mark in and out as the control changes state.
const checkboxIndicatorClassName =
  "flex items-center justify-center transition-[transform,opacity] duration-[var(--duration-fast)] ease-[var(--ease-out)] data-ending-style:scale-50 data-starting-style:scale-50 data-ending-style:opacity-0 data-starting-style:opacity-0";

// ---------------------------------------------------------------------------
// Checkbox
// ---------------------------------------------------------------------------

interface CheckboxProps
  extends CheckboxPrimitive.Root.Props,
    VariantProps<typeof checkboxVariants> {
  /** @default "md" */
  size?: "sm" | "md" | "lg";
}

/**
 * A checkbox with a hidden native input, so it submits with forms. Wrap it
 * with its text in a `<label>`, or give it an `aria-label`.
 */
function Checkbox({ className, size = "md", ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      className={cn(checkboxVariants({ size }), className)}
      data-size={size}
      data-slot="checkbox"
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={checkboxIndicatorClassName}
        data-slot="checkbox-indicator"
      >
        {/* By state, not prop: Base UI also derives indeterminate itself. */}
        <CheckIcon
          aria-hidden="true"
          className="in-data-indeterminate:hidden"
          strokeWidth={3}
        />
        <MinusIcon
          aria-hidden="true"
          className="in-data-indeterminate:block hidden"
          strokeWidth={3}
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { CheckboxProps };
export { Checkbox, checkboxIndicatorClassName, checkboxVariants };
