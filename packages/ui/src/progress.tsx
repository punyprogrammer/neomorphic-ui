"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

// A well, like the kit's PROGRESS card; `lg` is the kit's bar.
const progressTrackVariants = cva(
  "relative w-full overflow-hidden bg-background shadow-neu-flat",
  {
    variants: {
      size: {
        sm: "inset-shadow-neu-sm h-2 rounded-full",
        md: "inset-shadow-neu-sm h-3 rounded-full",
        lg: "inset-shadow-neu h-10 rounded-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ---------------------------------------------------------------------------
// Progress
// ---------------------------------------------------------------------------

interface ProgressProps
  extends ProgressPrimitive.Root.Props,
    VariantProps<typeof progressTrackVariants> {
  /** @default "md" (12px bar) */
  size?: "sm" | "md" | "lg";
  /**
   * Print the value inside the fill, as the kit does; it moves just past the
   * fill's end while the fill is too narrow to hold it. Meant for `lg`.
   * @default false
   */
  valueInside?: boolean;
}

/**
 * `value` from `min` to `max` (0–100), or `null` while the amount is
 * unknown. The fill is `--primary`; set `--progress-fill` (and
 * `--progress-fill-foreground` for `valueInside`) for another colour. Put a
 * `ProgressLabel` (and `ProgressValue`) in `children` to sit above the bar.
 */
function Progress({
  className,
  children,
  size = "md",
  valueInside = false,
  ...props
}: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      className={cn("grid w-full gap-2", className)}
      data-size={size}
      data-slot="progress"
      {...props}
    >
      {children}
      <ProgressPrimitive.Track
        className={progressTrackVariants({ size })}
        data-slot="progress-track"
      >
        <ProgressPrimitive.Indicator
          className="@container relative rounded-[inherit] bg-linear-to-r from-[color-mix(in_oklab,var(--progress-fill,var(--color-primary))_55%,black)] to-[var(--progress-fill,var(--color-primary))] shadow-neu-sm transition-[width] duration-[var(--duration-slow)] ease-[var(--ease-out)] data-indeterminate:h-full data-indeterminate:w-1/3 data-indeterminate:animate-neu-progress motion-reduce:data-indeterminate:animate-none"
          data-slot="progress-indicator"
        >
          {valueInside ? (
            <ProgressPrimitive.Value
              className="absolute inset-y-0 @max-[3.5rem]:start-full start-0 @max-[3.5rem]:end-auto end-0 flex items-center justify-center whitespace-nowrap @max-[3.5rem]:ps-2 font-medium @max-[3.5rem]:text-foreground text-[var(--progress-fill-foreground,var(--color-primary-foreground))] text-sm tabular-nums"
              data-slot="progress-value"
            />
          ) : null}
        </ProgressPrimitive.Indicator>
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  );
}

// ---------------------------------------------------------------------------
// ProgressLabel / ProgressValue
// ---------------------------------------------------------------------------

type ProgressLabelProps = ProgressPrimitive.Label.Props;

/** Names the progress bar; Base UI wires it up. */
function ProgressLabel({ className, ...props }: ProgressLabelProps) {
  return (
    <ProgressPrimitive.Label
      className={cn("font-medium text-foreground text-sm", className)}
      data-slot="progress-label"
      {...props}
    />
  );
}

type ProgressValueProps = ProgressPrimitive.Value.Props;

/** The value as a percentage, or formatted with the bar's `format`. */
function ProgressValue({ className, ...props }: ProgressValueProps) {
  return (
    <ProgressPrimitive.Value
      className={cn("text-muted-foreground text-sm tabular-nums", className)}
      data-slot="progress-value"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { ProgressLabelProps, ProgressProps, ProgressValueProps };
export { Progress, ProgressLabel, ProgressValue, progressTrackVariants };
