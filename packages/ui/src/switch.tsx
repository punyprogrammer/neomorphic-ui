"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

// Off, the track is a well (like an empty Checkbox); on, it fills with the
// kit's dark `--primary`. Both shadow slots are set in every state so the
// change eases.
const switchVariants = cva(
  "peer relative inset-shadow-neu-sm inline-flex shrink-0 cursor-pointer touch-manipulation items-center rounded-full bg-background p-0.5 shadow-neu-flat outline-none transition-[box-shadow,background-color] duration-[var(--duration-base)] ease-[var(--ease-out)] after:absolute after:-inset-x-2 after:-inset-y-3 hover:inset-shadow-neu focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2 aria-invalid:ring-1 aria-invalid:ring-destructive/70 data-checked:inset-shadow-neu-flat data-disabled:cursor-not-allowed data-readonly:cursor-default data-checked:bg-primary data-disabled:opacity-50 data-checked:shadow-neu-sm",
  {
    variants: {
      size: {
        sm: "h-5 w-10",
        md: "h-6 w-12",
        lg: "h-7 w-14",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// The thumb travels the track's inner width: width − thumb − 2 × padding.
const switchThumbVariants = cva(
  "pointer-events-none inset-shadow-neu-flat block rounded-full bg-neu-convex shadow-neu-sm transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)]",
  {
    variants: {
      size: {
        sm: "size-4 data-checked:translate-x-5 rtl:data-checked:-translate-x-5",
        md: "size-5 data-checked:translate-x-6 rtl:data-checked:-translate-x-6",
        lg: "size-6 data-checked:translate-x-7 rtl:data-checked:-translate-x-7",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ---------------------------------------------------------------------------
// Switch
// ---------------------------------------------------------------------------

interface SwitchProps
  extends SwitchPrimitive.Root.Props,
    VariantProps<typeof switchVariants> {
  /** @default "md" (48 × 24, the kit's switch) */
  size?: "sm" | "md" | "lg";
}

/**
 * An on/off switch (`role="switch"`) with a hidden native input, so it
 * submits with forms. Use it for settings that apply at once; for choices
 * confirmed later, use `Checkbox`. Wrap it with its text in a `<label>`, or
 * give it an `aria-label`.
 */
function Switch({ className, size = "md", ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      className={cn(switchVariants({ size }), className)}
      data-size={size}
      data-slot="switch"
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={switchThumbVariants({ size })}
        data-slot="switch-thumb"
      />
    </SwitchPrimitive.Root>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { SwitchProps };
export { Switch, switchThumbVariants, switchVariants };
