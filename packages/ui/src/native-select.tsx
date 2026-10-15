"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Triangle as TriangleIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

// The same well as `Input`, with room at the end for the kit's solid caret.
// The browser draws the open list; naming the surface colours on the
// options keeps Chromium from painting it white.
const nativeSelectVariants = cva(
  "inset-shadow-neu w-full min-w-0 cursor-pointer appearance-none bg-background text-foreground shadow-neu-flat outline-none transition-[box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)] focus-visible:inset-shadow-neu-lg focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-1 aria-invalid:ring-destructive/70 [&_optgroup]:bg-background [&_optgroup]:text-foreground [&_option]:bg-background [&_option]:text-foreground",
  {
    variants: {
      size: {
        sm: "h-8 rounded-lg ps-3 pe-8 text-sm",
        md: "h-10 rounded-lg ps-4 pe-10 text-sm",
        lg: "h-12 rounded-lg ps-5 pe-11 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ---------------------------------------------------------------------------
// NativeSelect
// ---------------------------------------------------------------------------

interface NativeSelectProps
  extends Omit<React.ComponentProps<"select">, "size">,
    VariantProps<typeof nativeSelectVariants> {
  /** The native `size` attribute: how many options show at once. */
  htmlSize?: number;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
}

/**
 * A styled native `<select>`: the platform's own picker, best on touch
 * devices and in plain forms. `className` lands on the wrapper, which sizes
 * the control; everything else goes to the `<select>`. For a styled list,
 * use `Select`.
 */
function NativeSelect({
  className,
  size = "md",
  htmlSize,
  ...props
}: NativeSelectProps) {
  return (
    <div
      className={cn("relative w-fit", className)}
      data-size={size}
      data-slot="native-select-wrapper"
    >
      <select
        className={nativeSelectVariants({ size })}
        data-size={size}
        data-slot="native-select"
        size={htmlSize}
        {...props}
      />
      <TriangleIcon
        aria-hidden="true"
        className="pointer-events-none absolute end-4 top-1/2 size-2.5 -translate-y-1/2 rotate-180 fill-current text-foreground"
        data-slot="native-select-icon"
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// NativeSelectOption / NativeSelectOptGroup
// ---------------------------------------------------------------------------

type NativeSelectOptionProps = React.ComponentProps<"option">;

function NativeSelectOption(props: NativeSelectOptionProps) {
  return <option data-slot="native-select-option" {...props} />;
}

type NativeSelectOptGroupProps = React.ComponentProps<"optgroup">;

function NativeSelectOptGroup(props: NativeSelectOptGroupProps) {
  return <optgroup data-slot="native-select-optgroup" {...props} />;
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  NativeSelectOptGroupProps,
  NativeSelectOptionProps,
  NativeSelectProps,
};
export {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
  nativeSelectVariants,
};
