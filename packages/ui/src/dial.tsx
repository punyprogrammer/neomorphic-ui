"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { useCallback, useId, useState } from "react";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Geometry
// ---------------------------------------------------------------------------

// The arc runs clockwise through 270°, from 225° (bottom-left, measured
// clockwise from 12 o'clock) to 135° (bottom-right), leaving a gap below.
const SWEEP = 270;
const START = 225;
// The knob covers all but the outer 18% of the radius; the arc rides the
// middle of that groove (in a 100-unit viewBox).
const GROOVE = 18;
const ARC_RADIUS = 50 - GROOVE / 2;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function snap(value: number, min: number, max: number, step: number) {
  const decimals = (String(step).split(".")[1] ?? "").length;
  const snapped = Math.round((value - min) / step) * step + min;
  return clamp(Number(snapped.toFixed(decimals)), min, max);
}

// Near the centre the angle swings wildly with tiny moves, so ignore it.
const DEAD_CENTRE = 0.15;

/** The share of the sweep under a pointer, given the current share. */
function pointerRatio(event: React.PointerEvent<HTMLElement>, current: number) {
  const rect = event.currentTarget.getBoundingClientRect();
  const dx = event.clientX - (rect.left + rect.width / 2);
  const dy = event.clientY - (rect.top + rect.height / 2);
  if (Math.hypot(dx, dy) < (DEAD_CENTRE * rect.width) / 2) {
    return current;
  }
  const angle = ((Math.atan2(dx, -dy) * 180) / Math.PI + 360) % 360;
  const along = (angle - START + 360) % 360;
  if (along <= SWEEP) {
    return along / SWEEP;
  }
  // In the gap below the arc, hold the end the pointer came from rather than
  // jumping across to the other one.
  return current >= 0.5 ? 1 : 0;
}

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const dialVariants = cva(
  "group/dial relative inset-shadow-neu inline-grid shrink-0 cursor-pointer touch-none select-none place-items-center rounded-full bg-background shadow-neu-flat data-disabled:cursor-not-allowed data-disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "size-24 text-sm",
        md: "size-32 text-base",
        lg: "size-36 text-base sm:size-40 sm:text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ---------------------------------------------------------------------------
// Dial
// ---------------------------------------------------------------------------

interface DialProps
  extends Omit<
      React.ComponentProps<"div">,
      "children" | "defaultValue" | "onChange"
    >,
    VariantProps<typeof dialVariants> {
  /** Shown in the middle of the knob, such as the value. */
  children?: React.ReactNode;
  /** The value when uncontrolled. @default min */
  defaultValue?: number;
  disabled?: boolean;
  /** Says the value in words, such as "40 percent". */
  getAriaValueText?: (value: number) => string;
  /** Page Up / Page Down step. @default 10 */
  largeStep?: number;
  /** @default 100 */
  max?: number;
  /** @default 0 */
  min?: number;
  /** Submits the value with a form under this name. */
  name?: string;
  /** Called on every change, during a drag too. */
  onValueChange?: (value: number) => void;
  /** Called once a drag or key press settles on a value. */
  onValueCommitted?: (value: number) => void;
  /** @default "md" (128px) */
  size?: "sm" | "md" | "lg";
  /** @default 1 */
  step?: number;
  /** The value when controlled. */
  value?: number;
}

/**
 * A circular value control, like the kit's volume knob: a raised knob in a
 * ring-shaped well, with an arc in the groove filled to the value. Drag
 * around the ring or use the arrow keys (Page Up/Down, Home, End). The arc is
 * `--dial-fill`, fading from `--dial-fill-start` (default a darker
 * `--primary` to `--primary`). Name it with `aria-label` or
 * `aria-labelledby`; both go to the knob, which is the slider.
 */
function Dial({
  className,
  children,
  value: valueProp,
  defaultValue,
  onValueChange,
  onValueCommitted,
  min = 0,
  max = 100,
  step = 1,
  largeStep = 10,
  disabled = false,
  name,
  size = "md",
  getAriaValueText,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...props
}: DialProps) {
  const gradientId = `dial-fill-${useId().replace(/[^\w-]/g, "")}`;
  const [internal, setInternal] = useState(defaultValue ?? min);
  const [dragging, setDragging] = useState(false);
  const value = clamp(valueProp ?? internal, min, max);
  const ratio = max > min ? (value - min) / (max - min) : 0;

  const setValue = useCallback(
    (next: number) => {
      if (next === value) {
        return;
      }
      if (valueProp === undefined) {
        setInternal(next);
      }
      onValueChange?.(next);
    },
    [value, valueProp, onValueChange]
  );

  const updateFromPointer = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const next = pointerRatio(event, ratio);
      if (next === ratio) {
        return value;
      }
      const nextValue = snap(min + next * (max - min), min, max, step);
      setValue(nextValue);
      return nextValue;
    },
    [ratio, value, min, max, step, setValue]
  );

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (disabled || event.button !== 0) {
        return;
      }
      event.preventDefault();
      event.currentTarget.setPointerCapture?.(event.pointerId);
      event.currentTarget
        .querySelector<HTMLElement>('[data-slot="dial-knob"]')
        ?.focus();
      setDragging(true);
      updateFromPointer(event);
    },
    [disabled, updateFromPointer]
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (dragging) {
        updateFromPointer(event);
      }
    },
    [dragging, updateFromPointer]
  );

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging) {
        return;
      }
      setDragging(false);
      onValueCommitted?.(updateFromPointer(event));
    },
    [dragging, onValueCommitted, updateFromPointer]
  );

  const handleLostPointerCapture = useCallback(() => setDragging(false), []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const steps: Record<string, number> = {
        ArrowUp: value + step,
        ArrowRight: value + step,
        ArrowDown: value - step,
        ArrowLeft: value - step,
        PageUp: value + largeStep,
        PageDown: value - largeStep,
        Home: min,
        End: max,
      };
      if (disabled || !(event.key in steps)) {
        return;
      }
      event.preventDefault();
      const next = snap(steps[event.key], min, max, step);
      setValue(next);
      onValueCommitted?.(next);
    },
    [value, step, largeStep, min, max, disabled, setValue, onValueCommitted]
  );

  const sweep = ratio * SWEEP;
  const fill = "var(--dial-fill, var(--color-primary))";

  return (
    <div
      className={cn(dialVariants({ size }), className)}
      data-disabled={disabled || undefined}
      data-dragging={dragging || undefined}
      data-size={size}
      data-slot="dial"
      onLostPointerCapture={handleLostPointerCapture}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      {...props}
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 size-full"
        data-slot="dial-arc"
        fill="none"
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
            <stop
              offset="0"
              style={{
                stopColor: `var(--dial-fill-start, color-mix(in oklab, ${fill} 55%, black))`,
              }}
            />
            <stop offset="1" style={{ stopColor: fill }} />
          </linearGradient>
        </defs>
        <g transform={`rotate(${START - 90} 50 50)`}>
          <circle
            className="stroke-neu-dark"
            cx="50"
            cy="50"
            pathLength={360}
            r={ARC_RADIUS}
            strokeDasharray={`${SWEEP} 360`}
            strokeLinecap="round"
            strokeWidth={2}
          />
          {sweep > 0 ? (
            <circle
              cx="50"
              cy="50"
              data-slot="dial-fill"
              pathLength={360}
              r={ARC_RADIUS}
              stroke={`url(#${gradientId})`}
              strokeDasharray={`${sweep} 360`}
              strokeLinecap="round"
              strokeWidth={6}
            />
          ) : null}
        </g>
      </svg>
      <div
        aria-describedby={ariaDescribedBy}
        aria-disabled={disabled || undefined}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-orientation="horizontal"
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value}
        aria-valuetext={getAriaValueText?.(value)}
        className="absolute inset-[18%] inset-shadow-neu-flat grid place-items-center rounded-full bg-neu-convex font-medium text-foreground tabular-nums shadow-neu outline-none transition-[box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)] focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2 group-data-dragging/dial:inset-shadow-neu-sm group-data-dragging/dial:shadow-neu-sm"
        data-slot="dial-knob"
        onKeyDown={handleKeyDown}
        role="slider"
        tabIndex={disabled ? -1 : 0}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0"
          data-slot="dial-indicator"
          style={{ transform: `rotate(${START + sweep}deg)` }}
        >
          <span
            className="absolute top-[10%] left-1/2 size-1.5 -translate-x-1/2 rounded-full"
            style={{ backgroundColor: fill }}
          />
        </span>
        <span className="relative">{children}</span>
      </div>
      {name ? <input name={name} type="hidden" value={value} /> : null}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { DialProps };
export { Dial, dialVariants };
