"use client";

import type * as React from "react";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Label
// ---------------------------------------------------------------------------

// Dims with the control it names: a disabled `peer` sibling, a disabled
// `Field`, or a disabled control nested inside it.
const labelClassName =
  "inline-flex select-none items-center gap-2 font-medium text-foreground text-sm leading-none peer-disabled:cursor-not-allowed peer-data-disabled:cursor-not-allowed has-disabled:cursor-not-allowed has-data-disabled:cursor-not-allowed peer-disabled:opacity-50 peer-data-disabled:opacity-50 has-disabled:opacity-50 has-data-disabled:opacity-50 group-data-disabled/field:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0";

type LabelProps = React.ComponentProps<"label">;

/**
 * A native `<label>`. Point `htmlFor` at the control's `id`, or wrap the
 * control (a `Checkbox`, `Switch` or `Radio`) with its text. Inside a
 * `Field`, use `FieldLabel`, which is wired up for you.
 */
function Label({ className, ...props }: LabelProps) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: the consumer passes `htmlFor` or nests the control.
    <label
      className={cn(labelClassName, className)}
      data-slot="label"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { LabelProps };
export { Label, labelClassName };
