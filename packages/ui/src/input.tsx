"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

// Text, placeholder and native parts; shared with the bare controls inside
// an `InputGroup`, which draws the well itself. The search field's native
// clear button is hidden: add an `InputGroupButton` for one.
const inputControlClassName =
  "w-full min-w-0 bg-transparent text-foreground outline-none file:me-3 file:inline-flex file:h-full file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none";

// The kit's search field: a well pressed into the surface. Focus deepens the
// well and adds the outline; read-only is shallower. Both shadow slots are
// always set.
const inputVariants = cva(
  `${inputControlClassName} inset-shadow-neu flex bg-background shadow-neu-flat transition-[box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)] read-only:inset-shadow-neu-sm focus-visible:inset-shadow-neu-lg focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2 disabled:opacity-50 aria-invalid:ring-1 aria-invalid:ring-destructive/70 data-invalid:ring-1 data-invalid:ring-destructive/70`,
  {
    variants: {
      size: {
        sm: "h-8 text-sm",
        md: "h-10 text-sm",
        lg: "h-12 text-base",
      },
      shape: {
        rounded: "rounded-lg",
        pill: "rounded-full",
      },
    },
    compoundVariants: [
      { shape: "rounded", size: "sm", className: "px-3" },
      { shape: "rounded", size: "md", className: "px-4" },
      { shape: "rounded", size: "lg", className: "px-5" },
      { shape: "pill", size: "sm", className: "px-4" },
      { shape: "pill", size: "md", className: "px-5" },
      { shape: "pill", size: "lg", className: "px-6" },
    ],
    defaultVariants: {
      size: "md",
      shape: "rounded",
    },
  }
);

// ---------------------------------------------------------------------------
// Input
// ---------------------------------------------------------------------------

interface InputProps
  extends Omit<InputPrimitive.Props, "className" | "size">,
    VariantProps<typeof inputVariants> {
  className?: string;
  /** The native `size` attribute: the visible width in characters. */
  htmlSize?: number;
  /**
   * Corner treatment. `pill` is the kit's search field; `rounded` matches
   * `Textarea` and `Select` in forms.
   * @default "rounded"
   */
  shape?: "rounded" | "pill";
  /** @default "md" (40px) */
  size?: "sm" | "md" | "lg";
}

/**
 * A single-line text field, built on Base UI so it joins a `Field`. Pair it
 * with a `<label htmlFor>`; for icons or buttons inside the well, use
 * `InputGroup`.
 */
function Input({
  className,
  size = "md",
  shape = "rounded",
  htmlSize,
  type = "text",
  ...props
}: InputProps) {
  return (
    <InputPrimitive
      className={cn(inputVariants({ size, shape }), className)}
      data-shape={shape}
      data-size={size}
      data-slot="input"
      size={htmlSize}
      type={type}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { InputProps };
export { Input, inputControlClassName, inputVariants };
