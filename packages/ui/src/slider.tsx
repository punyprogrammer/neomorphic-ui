"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

// Tall enough for the thumb, which overhangs the track.
const sliderControlVariants = cva(
  "relative flex w-full cursor-pointer touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-40 data-[orientation=vertical]:w-auto data-disabled:cursor-not-allowed data-[orientation=vertical]:flex-col data-disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-5 data-[orientation=vertical]:w-5",
        md: "h-6 data-[orientation=vertical]:w-6",
        lg: "h-7 data-[orientation=vertical]:w-7",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// A groove in the surface, like the kit's music sliders.
const sliderTrackVariants = cva(
  "relative inset-shadow-neu-sm w-full grow rounded-full bg-background shadow-neu-flat data-[orientation=vertical]:h-full",
  {
    variants: {
      size: {
        sm: "h-1.5 data-[orientation=vertical]:w-1.5",
        md: "h-2 data-[orientation=vertical]:w-2",
        lg: "h-2.5 data-[orientation=vertical]:w-2.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// The kit's pill thumb with three grip grooves; held, it sinks in.
const sliderThumbVariants = cva(
  "inset-shadow-neu-flat flex items-center justify-center gap-[3px] rounded-full bg-neu-convex shadow-neu-sm outline-none transition-[box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:shadow-neu has-focus-visible:outline-2 has-focus-visible:outline-ring/50 has-focus-visible:outline-offset-2 data-dragging:inset-shadow-neu-sm data-[orientation=vertical]:flex-col data-disabled:shadow-neu-sm data-dragging:shadow-neu-flat",
  {
    variants: {
      size: {
        sm: "h-5 w-8 data-[orientation=vertical]:h-8 data-[orientation=vertical]:w-5",
        md: "h-6 w-10 data-[orientation=vertical]:h-10 data-[orientation=vertical]:w-6",
        lg: "h-7 w-12 data-[orientation=vertical]:h-12 data-[orientation=vertical]:w-7",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ---------------------------------------------------------------------------
// Slider
// ---------------------------------------------------------------------------

interface SliderProps
  extends SliderPrimitive.Root.Props,
    VariantProps<typeof sliderControlVariants> {
  /** Names the thumb when there's no `SliderLabel`. */
  "aria-label"?: string;
  /** Names each thumb of a range, e.g. `(i) => ["Min", "Max"][i]`. */
  getAriaLabel?: (index: number) => string;
  /** @default "md" (track 8px, thumb 40 × 24) */
  size?: "sm" | "md" | "lg";
}

/**
 * Pass an array `value`/`defaultValue` for a range: one thumb per value.
 * The fill is `--primary`; set `--slider-fill` for another colour. Put a
 * `SliderLabel` (and `SliderValue`) in `children` to sit above the track.
 */
function Slider({
  className,
  children,
  size = "md",
  thumbAlignment = "edge",
  value,
  defaultValue,
  "aria-label": ariaLabel,
  getAriaLabel,
  ...props
}: SliderProps) {
  const values = value ?? defaultValue;
  const thumbs = Array.isArray(values) ? values.length : 1;
  return (
    <SliderPrimitive.Root
      className={cn(
        "flex w-full flex-col gap-3 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:items-center",
        className
      )}
      data-size={size}
      data-slot="slider"
      defaultValue={defaultValue}
      thumbAlignment={thumbAlignment}
      value={value}
      {...props}
    >
      {children}
      <SliderPrimitive.Control
        className={sliderControlVariants({ size })}
        data-slot="slider-control"
      >
        <SliderPrimitive.Track
          className={sliderTrackVariants({ size })}
          data-slot="slider-track"
        >
          <SliderPrimitive.Indicator
            className="rounded-full bg-linear-to-r from-[color-mix(in_oklab,var(--slider-fill,var(--color-primary))_25%,var(--color-background))] to-[var(--slider-fill,var(--color-primary))] data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full data-[orientation=vertical]:bg-linear-to-t"
            data-slot="slider-indicator"
          />
          {Array.from({ length: thumbs }, (_, index) => (
            <SliderPrimitive.Thumb
              aria-label={ariaLabel}
              className={sliderThumbVariants({ size })}
              data-slot="slider-thumb"
              getAriaLabel={getAriaLabel}
              index={index}
              // biome-ignore lint/suspicious/noArrayIndexKey: thumbs are positional
              key={index}
            >
              <SliderGrip />
              <SliderGrip />
              <SliderGrip />
            </SliderPrimitive.Thumb>
          ))}
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

function SliderGrip() {
  return (
    <span
      aria-hidden="true"
      className="h-2.5 in-data-[orientation=vertical]:h-px in-data-[orientation=vertical]:w-2.5 w-px bg-[var(--neu-dark)] in-data-[orientation=vertical]:shadow-[0_1px_0_var(--neu-light)] shadow-[1px_0_0_var(--neu-light)]"
    />
  );
}

// ---------------------------------------------------------------------------
// SliderLabel / SliderValue
// ---------------------------------------------------------------------------

type SliderLabelProps = SliderPrimitive.Label.Props;

/** Names the slider; Base UI wires it to every thumb. */
function SliderLabel({ className, ...props }: SliderLabelProps) {
  return (
    <SliderPrimitive.Label
      className={cn(
        "font-medium in-data-disabled:text-foreground/50 text-foreground text-sm",
        className
      )}
      data-slot="slider-label"
      {...props}
    />
  );
}

type SliderValueProps = SliderPrimitive.Value.Props;

/** The current value(s), formatted with the slider's `format`. */
function SliderValue({ className, ...props }: SliderValueProps) {
  return (
    <SliderPrimitive.Value
      className={cn(
        "in-data-disabled:text-muted-foreground/50 text-muted-foreground text-sm tabular-nums",
        className
      )}
      data-slot="slider-value"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { SliderLabelProps, SliderProps, SliderValueProps };
export {
  Slider,
  SliderLabel,
  SliderValue,
  sliderControlVariants,
  sliderThumbVariants,
  sliderTrackVariants,
};
