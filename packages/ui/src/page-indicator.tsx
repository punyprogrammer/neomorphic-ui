"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { useCallback } from "react";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const pageIndicatorVariants = cva("inline-flex shrink-0 items-center", {
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

// Every dot sits in a box at least 24px square, so clickable dots meet the
// WCAG 2.5.8 target size. Passive dots keep the same box, and the same spacing.
const pageIndicatorItemVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center rounded-full",
  {
    variants: {
      size: {
        sm: "size-6",
        md: "size-7",
        lg: "size-8",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// The kit's dots: the others are wells, the current one rises out of the
// surface in `--page-indicator-fill`. Colour, not just depth, marks it.
const pageIndicatorDotVariants = cva(
  "inset-shadow-neu-sm rounded-full bg-background shadow-neu-flat transition-[box-shadow,background-color] duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover/page-indicator-item:not-data-current:inset-shadow-neu data-current:inset-shadow-neu-flat data-current:bg-[var(--page-indicator-fill,var(--color-primary))] data-current:shadow-neu-sm",
  {
    variants: {
      size: {
        sm: "size-2",
        md: "size-2.5",
        lg: "size-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ---------------------------------------------------------------------------
// PageIndicator
// ---------------------------------------------------------------------------

interface PageIndicatorProps
  extends Omit<
      useRender.ComponentProps<"div">,
      "children" | "defaultValue" | "onChange"
    >,
    VariantProps<typeof pageIndicatorVariants> {
  /** How many pages there are: one dot each. */
  count: number;
  /**
   * Names a page. Clickable dots are named with it; a passive indicator is
   * named with the current page's.
   * @default (index, count) => `Page ${index + 1} of ${count}`
   */
  getAriaLabel?: (index: number, count: number) => string;
  /**
   * Makes the dots buttons that pick a page, with arrow keys, Home and End
   * moving between them. Without it the indicator is a passive image.
   */
  onValueChange?: (value: number) => void;
  /** @default "horizontal" */
  orientation?: "horizontal" | "vertical";
  /** @default "md" (10px dots) */
  size?: "sm" | "md" | "lg";
  /**
   * The current page, counted from 0.
   * @default 0
   */
  value?: number;
}

function defaultAriaLabel(index: number, count: number) {
  return `Page ${index + 1} of ${count}`;
}

const PREVIOUS_KEYS = {
  horizontal: "ArrowLeft",
  vertical: "ArrowUp",
} as const;
const NEXT_KEYS = {
  horizontal: "ArrowRight",
  vertical: "ArrowDown",
} as const;

/** The page a key moves to, or `null` for keys the indicator ignores. */
function getKeyTarget(
  key: string,
  current: number,
  count: number,
  orientation: "horizontal" | "vertical",
  rtl: boolean
) {
  if (key === "Home") {
    return 0;
  }
  if (key === "End") {
    return count - 1;
  }
  const forward = rtl ? -1 : 1;
  let step = 0;
  if (key === PREVIOUS_KEYS[orientation]) {
    step = -forward;
  } else if (key === NEXT_KEYS[orientation]) {
    step = forward;
  }
  return step === 0 ? null : Math.min(Math.max(current + step, 0), count - 1);
}

/**
 * Dots showing which of `count` pages is current, like the kit's three dots.
 * Passive by default; pass `onValueChange` to let people pick a page, and
 * an `aria-label` naming the group (e.g. "Slides").
 */
function PageIndicator({
  className,
  count,
  value = 0,
  onValueChange,
  getAriaLabel = defaultAriaLabel,
  orientation = "horizontal",
  size = "md",
  render,
  ...props
}: PageIndicatorProps) {
  const current = Math.min(Math.max(value, 0), count - 1);
  const interactive = onValueChange !== undefined;

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const root = event.currentTarget;
    const rtl =
      orientation === "horizontal" &&
      getComputedStyle(root).direction === "rtl";
    const next = getKeyTarget(event.key, current, count, orientation, rtl);
    if (next === null) {
      return;
    }
    event.preventDefault();
    root
      .querySelectorAll<HTMLElement>('[data-slot="page-indicator-item"]')
      [next]?.focus();
    if (next !== current) {
      onValueChange?.(next);
    }
  }

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const index = Number(event.currentTarget.dataset.index);
      if (index !== current) {
        onValueChange?.(index);
      }
    },
    [current, onValueChange]
  );

  const items = Array.from({ length: count }, (_, index) => {
    const isCurrent = index === current;
    const dot = (
      <span
        className={pageIndicatorDotVariants({ size })}
        data-current={isCurrent || undefined}
        data-slot="page-indicator-dot"
      />
    );

    if (!interactive) {
      return (
        <span
          aria-hidden="true"
          className={pageIndicatorItemVariants({ size })}
          data-current={isCurrent || undefined}
          data-slot="page-indicator-item"
          // biome-ignore lint/suspicious/noArrayIndexKey: a dot's position is its identity
          key={index}
        >
          {dot}
        </span>
      );
    }

    return (
      <button
        aria-current={isCurrent ? "true" : undefined}
        aria-label={getAriaLabel(index, count)}
        className={cn(
          pageIndicatorItemVariants({ size }),
          "group/page-indicator-item cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-ring/50"
        )}
        data-current={isCurrent || undefined}
        data-index={index}
        data-slot="page-indicator-item"
        // biome-ignore lint/suspicious/noArrayIndexKey: a dot's position is its identity
        key={index}
        onClick={handleClick}
        tabIndex={isCurrent ? 0 : -1}
        type="button"
      >
        {dot}
      </button>
    );
  });

  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      {
        "aria-label": interactive ? undefined : getAriaLabel(current, count),
        className: cn(pageIndicatorVariants({ orientation }), className),
        onKeyDown: interactive ? handleKeyDown : undefined,
        role: interactive ? "group" : "img",
        children: items,
      },
      props
    ),
    state: { slot: "page-indicator", size, orientation },
  });
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { PageIndicatorProps };
export {
  PageIndicator,
  pageIndicatorDotVariants,
  pageIndicatorItemVariants,
  pageIndicatorVariants,
};
