"use client";

import { OTPField as OTPFieldPrimitive } from "@base-ui/react/otp-field";
import { cva } from "class-variance-authority";
import { Minus as MinusIcon } from "lucide-react";
import type * as React from "react";
import { createContext, useContext } from "react";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// InputOTP
// ---------------------------------------------------------------------------

const InputOTPSizeContext = createContext<"sm" | "md" | "lg">("md");

interface InputOTPProps extends OTPFieldPrimitive.Root.Props {
  /** @default "md" */
  size?: "sm" | "md" | "lg";
}

/**
 * A one-time code split into slots. Set `length`; typing moves to the next
 * slot, Backspace to the previous, and pasting fills them all. Digits only
 * by default (`validationType`). Inside a `Field`, `FieldLabel` names it.
 */
function InputOTP({ className, size = "md", ...props }: InputOTPProps) {
  return (
    <InputOTPSizeContext.Provider value={size}>
      <OTPFieldPrimitive.Root
        className={cn(
          "flex items-center gap-3 data-disabled:opacity-50",
          className
        )}
        data-size={size}
        data-slot="input-otp"
        {...props}
      />
    </InputOTPSizeContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// InputOTPGroup
// ---------------------------------------------------------------------------

type InputOTPGroupProps = React.ComponentProps<"div">;

/** Slots that belong together, e.g. the two halves of a 3–3 code. */
function InputOTPGroup({ className, ...props }: InputOTPGroupProps) {
  return (
    <div
      className={cn("flex items-center gap-2", className)}
      data-slot="input-otp-group"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// InputOTPSlot
// ---------------------------------------------------------------------------

// Each slot is a small `Input` well; the focused slot sinks deeper and
// takes the outline, and a filled slot's character is the mark.
const inputOTPSlotVariants = cva(
  "inset-shadow-neu shrink-0 rounded-lg bg-background text-center font-medium text-foreground tabular-nums caret-primary shadow-neu-flat outline-none transition-[box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)] focus:inset-shadow-neu-lg focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2 disabled:cursor-not-allowed aria-invalid:ring-1 aria-invalid:ring-destructive/70 data-invalid:ring-1 data-invalid:ring-destructive/70",
  {
    variants: {
      size: {
        sm: "h-9 w-8 text-sm",
        md: "h-11 w-10 text-base",
        lg: "h-13 w-12 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

type InputOTPSlotProps = OTPFieldPrimitive.Input.Props;

/** One character; its size comes from `InputOTP`. */
function InputOTPSlot({ className, ...props }: InputOTPSlotProps) {
  const size = useContext(InputOTPSizeContext);
  return (
    <OTPFieldPrimitive.Input
      className={cn(inputOTPSlotVariants({ size }), className)}
      data-slot="input-otp-slot"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// InputOTPSeparator
// ---------------------------------------------------------------------------

type InputOTPSeparatorProps = OTPFieldPrimitive.Separator.Props;

function InputOTPSeparator({
  className,
  children,
  ...props
}: InputOTPSeparatorProps) {
  return (
    <OTPFieldPrimitive.Separator
      className={cn(
        "flex items-center text-muted-foreground [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      data-slot="input-otp-separator"
      {...props}
    >
      {children ?? <MinusIcon aria-hidden="true" />}
    </OTPFieldPrimitive.Separator>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  InputOTPGroupProps,
  InputOTPProps,
  InputOTPSeparatorProps,
  InputOTPSlotProps,
};
export {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  inputOTPSlotVariants,
};
