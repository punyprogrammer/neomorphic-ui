"use client";

import {
  ChevronDown as ChevronDownIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ChevronUp as ChevronUpIcon,
} from "lucide-react";
import type * as React from "react";
import { useEffect, useRef } from "react";
import {
  type ChevronProps,
  type DayButtonProps,
  DayPicker,
  getDefaultClassNames,
  type RootProps,
} from "react-day-picker";

import { buttonVariants } from "./button";
import { surfaceVariants } from "./surface";
import { cn } from "./utils";

// Built once: every month renders ~42 day buttons that read from it.
const defaultClassNames = getDefaultClassNames();

// ---------------------------------------------------------------------------
// Day tones
// ---------------------------------------------------------------------------

// Days lie flat on the surface and rise on hover. Today sits in a sunken well
// with a dot beneath the number; a selected day (or either end of a range) is
// raised and filled. Every tone sets BOTH shadow slots so moving between them
// eases instead of snapping.
const PLAIN_DAY =
  "inset-shadow-neu-flat shadow-neu-flat enabled:hover:bg-neu-convex enabled:hover:shadow-neu-sm enabled:active:inset-shadow-neu-sm enabled:active:bg-none enabled:active:shadow-neu-flat";
const TODAY =
  "inset-shadow-neu-sm font-semibold shadow-neu-flat after:absolute after:bottom-[18%] after:size-1 after:rounded-full after:bg-[var(--calendar-fill,var(--color-primary))]";
const SELECTED_DAY =
  "inset-shadow-neu-flat bg-[var(--calendar-fill,var(--color-primary))] font-semibold text-[var(--calendar-fill-foreground,var(--color-primary-foreground))] shadow-neu-sm";

// The band behind a range: a tint of the fill, rounded off at either end.
const RANGE_BAND =
  "bg-[color-mix(in_oklab,var(--calendar-fill,var(--color-primary))_12%,transparent)]";

// ---------------------------------------------------------------------------
// Parts
// ---------------------------------------------------------------------------

function CalendarRoot({ className, rootRef, ...props }: RootProps) {
  return (
    <div className={className} data-slot="calendar" ref={rootRef} {...props} />
  );
}

function CalendarChevron({ className, orientation }: ChevronProps) {
  const Icon = {
    left: ChevronLeftIcon,
    right: ChevronRightIcon,
    up: ChevronUpIcon,
    down: ChevronDownIcon,
  }[orientation ?? "left"];
  return <Icon aria-hidden="true" className={cn("size-4", className)} />;
}

/**
 * One day of the month grid. Swap it through `components={{ DayButton }}` to
 * add content (prices, event dots) while keeping the tones.
 */
function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: DayButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (modifiers.focused) {
      ref.current?.focus();
    }
  }, [modifiers.focused]);

  const rangeEnd = modifiers.range_start || modifiers.range_end;
  const selected = modifiers.selected && !modifiers.range_middle;
  let tone = PLAIN_DAY;
  if (selected) {
    tone = SELECTED_DAY;
  } else if (modifiers.today) {
    tone = TODAY;
  }

  return (
    <button
      className={cn(
        "relative flex size-(--cell-size) cursor-pointer items-center justify-center rounded-full text-foreground text-sm tabular-nums outline-none transition-[box-shadow,background-color,color] duration-[var(--duration-base)] ease-[var(--ease-out)] focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-foreground/40 disabled:line-through",
        modifiers.outside && !selected && "text-muted-foreground/70",
        tone,
        className
      )}
      data-day={day.isoDate}
      data-range-end={modifiers.range_end || undefined}
      data-range-middle={modifiers.range_middle || undefined}
      data-range-start={modifiers.range_start || undefined}
      data-selected={selected || undefined}
      data-selected-single={(selected && !rangeEnd) || undefined}
      data-slot="calendar-day-button"
      data-today={modifiers.today || undefined}
      ref={ref}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Calendar
// ---------------------------------------------------------------------------

const NAV_BUTTON = cn(
  buttonVariants({ size: "sm", shape: "pill", iconOnly: true }),
  "size-(--cell-size) aria-disabled:inset-shadow-neu-flat aria-disabled:cursor-not-allowed aria-disabled:bg-none aria-disabled:text-foreground/40 aria-disabled:shadow-neu-flat aria-disabled:hover:shadow-neu-flat"
);

// Short names keep the month pill narrow enough to sit between the nav buttons.
function formatMonthDropdown(month: Date) {
  return month.toLocaleString("default", { month: "short" });
}

type CalendarProps = React.ComponentProps<typeof DayPicker>;

/**
 * A month grid for picking a day, several days or a range, built on
 * react-day-picker (every DayPicker prop passes through), raised from the page
 * like a `Surface` (`bg-transparent shadow-neu-flat` lays it flat inside a card).
 * Days lie flat and
 * rise on hover, today sits in a sunken well, and selected days are raised
 * and filled with `--primary`. Days are buttons only once there's a `mode`
 * (`single`, `multiple` or `range`). Set `--calendar-fill` (and
 * `--calendar-fill-foreground`) for another colour, and `--cell-size` to
 * resize the grid.
 */
function Calendar({
  className,
  classNames,
  components,
  formatters,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      className={cn(
        surfaceVariants(),
        "w-fit rounded-2xl p-4 [--cell-size:--spacing(9)]",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-6 md:flex-row",
          defaultClassNames.months
        ),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 z-10 flex items-center justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(NAV_BUTTON, defaultClassNames.button_previous),
        button_next: cn(NAV_BUTTON, defaultClassNames.button_next),
        month_caption: cn(
          "flex h-(--cell-size) items-center justify-center px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        caption_label: cn(
          "flex select-none items-center gap-1 font-medium text-sm",
          defaultClassNames.caption_label
        ),
        dropdowns: cn(
          "flex items-center justify-center gap-2",
          defaultClassNames.dropdowns
        ),
        // A raised pill showing the choice, with the native <select> laid
        // invisibly over it so the platform picker still opens.
        dropdown_root: cn(
          "relative inset-shadow-neu-flat inline-flex h-8 items-center rounded-full bg-neu-convex px-3 shadow-neu-sm transition-[box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:shadow-neu has-focus-visible:outline-2 has-focus-visible:outline-ring/50 has-focus-visible:outline-offset-2",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute inset-0 cursor-pointer appearance-none opacity-0",
          defaultClassNames.dropdown
        ),
        month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "w-(--cell-size) flex-1 select-none font-medium text-muted-foreground text-xs",
          defaultClassNames.weekday
        ),
        week: cn("mt-1 flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "w-(--cell-size) select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "flex w-(--cell-size) select-none items-center justify-center text-muted-foreground text-xs",
          defaultClassNames.week_number
        ),
        day: cn(
          "relative grid flex-1 place-items-center p-0",
          defaultClassNames.day
        ),
        range_start: cn(
          "rounded-s-full",
          RANGE_BAND,
          defaultClassNames.range_start
        ),
        range_middle: cn(
          "first:rounded-s-full last:rounded-e-full",
          RANGE_BAND,
          defaultClassNames.range_middle
        ),
        range_end: cn(
          "rounded-e-full",
          RANGE_BAND,
          defaultClassNames.range_end
        ),
        today: defaultClassNames.today,
        outside: defaultClassNames.outside,
        disabled: defaultClassNames.disabled,
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: CalendarRoot,
        Chevron: CalendarChevron,
        DayButton: CalendarDayButton,
        ...components,
      }}
      formatters={{ formatMonthDropdown, ...formatters }}
      showOutsideDays={showOutsideDays}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { DateRange } from "react-day-picker";
export type { CalendarProps };
export { Calendar, CalendarDayButton };
