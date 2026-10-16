"use client";

import { Meter as MeterPrimitive } from "@base-ui/react/meter";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

// The size sets the bars' width; their height is `--bar-meter-height`, which
// a consumer can override on the group.
const barMeterVariants = cva("flex w-full min-w-0 items-end", {
  variants: {
    size: {
      sm: "gap-3 [--bar-meter-height:6rem] [--bar-meter-width:0.5rem]",
      md: "gap-4 [--bar-meter-height:8rem] [--bar-meter-width:0.75rem]",
      lg: "gap-5 [--bar-meter-height:10rem] [--bar-meter-width:1rem]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// ---------------------------------------------------------------------------
// BarMeter
// ---------------------------------------------------------------------------

interface BarMeterProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof barMeterVariants> {
  /** Bar width and default height. @default "md" (12px wide, 128px tall) */
  size?: "sm" | "md" | "lg";
}

/**
 * A row of vertical bars, like the kit's weather week: one
 * `BarMeterItem` per reading. A labelled group; give it an `aria-label`.
 */
function BarMeter({ className, size = "md", ...props }: BarMeterProps) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: a labelled set of meters, not a form fieldset
    <div
      className={cn(barMeterVariants({ size }), className)}
      data-size={size}
      data-slot="bar-meter"
      role="group"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// BarMeterItem
// ---------------------------------------------------------------------------

type BarMeterItemProps = MeterPrimitive.Root.Props;

function share(value: number, min: number, max: number) {
  if (max <= min) {
    return 0;
  }
  return Math.min(Math.max((value - min) / (max - min), 0), 1) * 100;
}

/**
 * One reading from `min` to `max` (0–100): a well with a raised fill rising
 * from its foot. Put a `BarMeterValue` and a `BarMeterLabel` (which names
 * it) in `children`; they sit above and below the bar. The fill fades from
 * `--bar-meter-fill-start` (a darker `--primary`) to `--bar-meter-fill`.
 */
function BarMeterItem({
  className,
  children,
  value,
  min = 0,
  max = 100,
  ...props
}: BarMeterItemProps) {
  const percent = share(value, min, max);
  return (
    <MeterPrimitive.Root
      className={cn("flex flex-col items-center gap-2", className)}
      data-slot="bar-meter-item"
      max={max}
      min={min}
      value={value}
      {...props}
    >
      {children}
      <MeterPrimitive.Track
        className="relative inset-shadow-neu-sm order-2 h-[var(--bar-meter-height,8rem)] w-[var(--bar-meter-width,0.75rem)] overflow-hidden rounded-full bg-background shadow-neu-flat"
        data-slot="bar-meter-track"
      >
        <div
          className="absolute inset-x-0 bottom-0 rounded-full bg-linear-to-t from-[var(--bar-meter-fill-start,color-mix(in_oklab,var(--bar-meter-fill,var(--color-primary))_55%,black))] to-[var(--bar-meter-fill,var(--color-primary))] shadow-neu-sm transition-[height] duration-[var(--duration-slow)] ease-[var(--ease-out)]"
          data-slot="bar-meter-fill"
          style={{
            height:
              percent > 0
                ? `max(var(--bar-meter-width, 0.75rem), ${percent}%)`
                : 0,
          }}
        />
      </MeterPrimitive.Track>
    </MeterPrimitive.Root>
  );
}

// ---------------------------------------------------------------------------
// BarMeterValue / BarMeterLabel
// ---------------------------------------------------------------------------

type BarMeterValueProps = MeterPrimitive.Value.Props;

/** The reading above the bar, formatted with the item's `format`. */
function BarMeterValue({ className, ...props }: BarMeterValueProps) {
  return (
    <MeterPrimitive.Value
      className={cn(
        "order-1 font-medium text-foreground text-xs tabular-nums",
        className
      )}
      data-slot="bar-meter-value"
      {...props}
    />
  );
}

type BarMeterLabelProps = MeterPrimitive.Label.Props;

/** Names the bar, below it; Base UI wires it up. */
function BarMeterLabel({ className, ...props }: BarMeterLabelProps) {
  return (
    <MeterPrimitive.Label
      className={cn("order-3 text-muted-foreground text-xs", className)}
      data-slot="bar-meter-label"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  BarMeterItemProps,
  BarMeterLabelProps,
  BarMeterProps,
  BarMeterValueProps,
};
export {
  BarMeter,
  BarMeterItem,
  BarMeterLabel,
  BarMeterValue,
  barMeterVariants,
};
