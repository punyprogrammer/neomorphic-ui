"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import type * as React from "react";
import { useCallback, useRef, useState } from "react";
import type { DateRange } from "react-day-picker";

import { Button } from "./button";
import { Calendar, type CalendarProps } from "./calendar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./input-group";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { selectTriggerVariants } from "./select";
import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Shared
// ---------------------------------------------------------------------------

const mediumDate = new Intl.DateTimeFormat(undefined, { dateStyle: "medium" });

function defaultFormatDate(date: Date) {
  return mediumDate.format(date);
}

function defaultFormatRange(range: DateRange) {
  if (!range.from) {
    return "";
  }
  return range.to
    ? mediumDate.formatRange(range.from, range.to)
    : `${mediumDate.format(range.from)} –`;
}

const ISO_DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

// ISO `yyyy-mm-dd` as a local date (`new Date` would read it as UTC), then
// whatever the platform's `Date` parser accepts.
function defaultParseDate(text: string) {
  const iso = ISO_DATE_RE.exec(text.trim());
  if (iso) {
    return new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));
  }
  const time = Date.parse(text);
  return Number.isNaN(time) ? undefined : new Date(time);
}

function toIsoDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function sameDay(a: Date | undefined, b: Date | undefined) {
  return a != null && b != null && a.toDateString() === b.toDateString();
}

/** Mirrors a prop when it's given, else keeps its own state. */
function useControllable<T>(
  value: T | undefined,
  defaultValue: T,
  onChange: ((next: T) => void) | undefined,
  controlled: boolean
) {
  const [own, setOwn] = useState(defaultValue);
  const current = controlled ? (value as T) : own;
  const set = useCallback(
    (next: T) => {
      if (!controlled) {
        setOwn(next);
      }
      onChange?.(next);
    },
    [controlled, onChange]
  );
  return [current, set] as const;
}

// A flat calendar on the popup's raised card.
const CALENDAR_IN_POPUP =
  "inset-shadow-neu-flat bg-transparent bg-none p-1 shadow-neu-flat";

// The kit's raised field trigger, in sentence case so dates read naturally.
const triggerClassName = (size: "sm" | "md" | "lg") =>
  cn(
    selectTriggerVariants({ size }),
    "justify-start font-normal normal-case tracking-normal",
    size === "sm" ? "text-xs" : "text-sm"
  );

type CalendarPassThrough = Omit<
  CalendarProps,
  "mode" | "selected" | "onSelect" | "required" | "month" | "onMonthChange"
>;

interface DatePreset<T> {
  label: string;
  value: T;
}

interface PresetListProps<T> {
  isActive: (value: T) => boolean;
  onPick: (value: T) => void;
  presets: DatePreset<T>[];
}

// A column of quick picks beside the calendar, split off by a groove. The
// one matching the value is pressed in.
function PresetList<T>({ isActive, onPick, presets }: PresetListProps<T>) {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const preset = presets[Number(event.currentTarget.dataset.index)];
      if (preset) {
        onPick(preset.value);
      }
    },
    [onPick, presets]
  );
  return (
    <div
      className="flex flex-col gap-1 border-[var(--neu-dark)] pe-3 sm:border-e sm:shadow-[1px_0_0_var(--neu-light)]"
      data-slot="date-picker-presets"
    >
      {presets.map((preset, index) => (
        <Button
          aria-pressed={isActive(preset.value)}
          className="justify-start font-normal normal-case tracking-normal aria-pressed:inset-shadow-neu-sm aria-pressed:text-primary aria-pressed:shadow-neu-flat"
          data-index={index}
          key={preset.label}
          onClick={handleClick}
          size="sm"
          variant="ghost"
        >
          {preset.label}
        </Button>
      ))}
    </div>
  );
}

interface TriggerPartsProps {
  "aria-label"?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  placeholder: string;
  size: "sm" | "md" | "lg";
  text: string;
}

function DateTrigger({
  className,
  disabled,
  placeholder,
  size,
  text,
  ...props
}: TriggerPartsProps) {
  return (
    <PopoverTrigger
      className={cn(triggerClassName(size), className)}
      data-placeholder={text ? undefined : ""}
      data-slot="date-picker-trigger"
      disabled={disabled}
      {...props}
    >
      <CalendarIcon aria-hidden="true" className="size-4 shrink-0" />
      <span className="truncate">{text || placeholder}</span>
    </PopoverTrigger>
  );
}

// ---------------------------------------------------------------------------
// DatePicker
// ---------------------------------------------------------------------------

interface DatePickerProps {
  /** Names the trigger when there's no visible label. */
  "aria-label"?: string;
  /** Props for the `Calendar`, such as `disabled` days or `startMonth`. */
  calendarProps?: CalendarPassThrough;
  /** Classes for the trigger. */
  className?: string;
  defaultValue?: Date;
  disabled?: boolean;
  /**
   * How the chosen date reads in the trigger.
   * @default medium date in the user's locale, "12 May 2026"
   */
  formatDate?: (date: Date) => string;
  id?: string;
  /** Adds a hidden input holding the date as `yyyy-mm-dd`. */
  name?: string;
  onValueChange?: (date: Date | undefined) => void;
  /** @default "Pick a date" */
  placeholder?: string;
  /** Quick picks, such as Today and Tomorrow, beside the calendar. */
  presets?: DatePreset<Date>[];
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  value?: Date;
}

/**
 * A raised trigger that opens a Calendar in a Popover and closes once a day
 * is picked. Label it with a `<label htmlFor={id}>` or `aria-label`.
 */
function DatePicker(allProps: DatePickerProps) {
  const {
    calendarProps,
    className,
    defaultValue,
    formatDate = defaultFormatDate,
    name,
    onValueChange,
    placeholder = "Pick a date",
    presets,
    size = "md",
    value: valueProp,
    ...props
  } = allProps;
  const controlled = "value" in allProps;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useControllable(
    valueProp,
    defaultValue,
    onValueChange,
    controlled
  );
  const [month, setMonth] = useState<Date | undefined>(value);

  const pick = useCallback(
    (date: Date | undefined) => {
      setValue(date);
      if (date) {
        setMonth(date);
        setOpen(false);
      }
    },
    [setValue]
  );
  const isActive = useCallback((date: Date) => sameDay(date, value), [value]);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <DateTrigger
        className={className}
        placeholder={placeholder}
        size={size}
        text={value ? formatDate(value) : ""}
        {...props}
      />
      {name ? (
        <input
          name={name}
          type="hidden"
          value={value ? toIsoDate(value) : ""}
        />
      ) : null}
      <PopoverContent
        align="start"
        className="w-auto flex-row gap-3 p-3"
        data-slot="date-picker-content"
      >
        {presets?.length ? (
          <PresetList isActive={isActive} onPick={pick} presets={presets} />
        ) : null}
        <Calendar
          {...calendarProps}
          className={cn(CALENDAR_IN_POPUP, calendarProps?.className)}
          mode="single"
          month={month}
          onMonthChange={setMonth}
          onSelect={pick}
          selected={value}
        />
      </PopoverContent>
    </Popover>
  );
}

// ---------------------------------------------------------------------------
// DateRangePicker
// ---------------------------------------------------------------------------

interface DateRangePickerProps
  extends Omit<
    DatePickerProps,
    | "defaultValue"
    | "formatDate"
    | "name"
    | "onValueChange"
    | "presets"
    | "value"
  > {
  defaultValue?: DateRange;
  /**
   * How the range reads in the trigger.
   * @default "12–19 May 2026", via `Intl.DateTimeFormat.formatRange`
   */
  formatRange?: (range: DateRange) => string;
  /** @default 2 */
  numberOfMonths?: number;
  onValueChange?: (range: DateRange | undefined) => void;
  /** Quick picks, such as This week or Next 7 days. */
  presets?: DatePreset<DateRange>[];
  value?: DateRange;
}

/**
 * A raised trigger that opens a range Calendar, two months wide. It stays
 * open while the range is adjusted; a preset picks and closes.
 */
function DateRangePicker(allProps: DateRangePickerProps) {
  const {
    calendarProps,
    className,
    defaultValue,
    formatRange = defaultFormatRange,
    numberOfMonths = 2,
    onValueChange,
    placeholder = "Pick dates",
    presets,
    size = "md",
    value: valueProp,
    ...props
  } = allProps;
  const controlled = "value" in allProps;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useControllable(
    valueProp,
    defaultValue,
    onValueChange,
    controlled
  );
  const [month, setMonth] = useState<Date | undefined>(value?.from);
  const isActive = useCallback(
    (range: DateRange) =>
      sameDay(range.from, value?.from) && sameDay(range.to, value?.to),
    [value]
  );
  const pickPreset = useCallback(
    (range: DateRange) => {
      setValue(range);
      setMonth(range.from);
      setOpen(false);
    },
    [setValue]
  );

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <DateTrigger
        className={className}
        placeholder={placeholder}
        size={size}
        text={value ? formatRange(value) : ""}
        {...props}
      />
      <PopoverContent
        align="start"
        className="w-auto max-w-[calc(100vw-1rem)] flex-col gap-3 p-3 sm:flex-row"
        data-slot="date-picker-content"
      >
        {presets?.length ? (
          <PresetList
            isActive={isActive}
            onPick={pickPreset}
            presets={presets}
          />
        ) : null}
        <Calendar
          {...calendarProps}
          className={cn(CALENDAR_IN_POPUP, calendarProps?.className)}
          mode="range"
          month={month}
          numberOfMonths={numberOfMonths}
          onMonthChange={setMonth}
          onSelect={setValue}
          selected={value}
        />
      </PopoverContent>
    </Popover>
  );
}

// ---------------------------------------------------------------------------
// DatePickerInput
// ---------------------------------------------------------------------------

interface DatePickerInputProps
  extends Omit<
    React.ComponentProps<typeof InputGroupInput>,
    "defaultValue" | "onChange" | "onValueChange" | "size" | "value"
  > {
  calendarProps?: CalendarPassThrough;
  /** Classes for the well. */
  className?: string;
  defaultValue?: Date;
  /** @default medium date in the user's locale */
  formatDate?: (date: Date) => string;
  onValueChange?: (date: Date | undefined) => void;
  /**
   * Reads typed text as a date, or `undefined` when it isn't one.
   * @default `yyyy-mm-dd`, then the platform's `Date.parse`
   */
  parseDate?: (text: string) => Date | undefined;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  value?: Date;
}

/**
 * A typed date in an `InputGroup` well with a calendar button. Typing a
 * valid date moves the Calendar to it; picking a day writes it back. Text
 * that isn't a date marks the field invalid on blur. Label the input.
 */
function DatePickerInput(allProps: DatePickerInputProps) {
  const {
    calendarProps,
    className,
    defaultValue,
    disabled,
    formatDate = defaultFormatDate,
    name,
    onBlur,
    onKeyDown,
    onValueChange,
    parseDate = defaultParseDate,
    size = "md",
    value: valueProp,
    ...props
  } = allProps;
  const controlled = "value" in allProps;
  const anchorRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useControllable(
    valueProp,
    defaultValue,
    onValueChange,
    controlled
  );
  const [text, setText] = useState(value ? formatDate(value) : "");
  const [invalid, setInvalid] = useState(false);
  const [month, setMonth] = useState<Date | undefined>(value);
  const [lastValue, setLastValue] = useState(value);

  // An outside change to a controlled value rewrites the text.
  if (!sameDay(value, lastValue) && value !== lastValue) {
    setLastValue(value);
    if (!sameDay(value, parseDate(text))) {
      setText(value ? formatDate(value) : "");
      setInvalid(false);
      if (value) {
        setMonth(value);
      }
    }
  }

  // While typing, follow only text that is clearly a whole date, so a
  // lenient parser doesn't jump the calendar about mid-word.
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const next = event.target.value;
      setText(next);
      setInvalid(false);
      const date = parseDate(next);
      if (
        date &&
        (ISO_DATE_RE.test(next.trim()) || formatDate(date) === next.trim())
      ) {
        setValue(date);
        setLastValue(date);
        setMonth(date);
      }
    },
    [formatDate, parseDate, setValue]
  );

  const commit = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed) {
      setInvalid(false);
      setValue(undefined);
      setLastValue(undefined);
      return;
    }
    const date = parseDate(trimmed);
    setInvalid(!date);
    if (date) {
      setText(formatDate(date));
      setMonth(date);
      if (!sameDay(date, value)) {
        setValue(date);
        setLastValue(date);
      }
    }
  }, [formatDate, parseDate, setValue, text, value]);

  const handleBlur = useCallback<NonNullable<DatePickerInputProps["onBlur"]>>(
    (event) => {
      onBlur?.(event);
      commit();
    },
    [commit, onBlur]
  );

  const handleKeyDown = useCallback<
    NonNullable<DatePickerInputProps["onKeyDown"]>
  >(
    (event) => {
      onKeyDown?.(event);
      if (event.key === "Enter") {
        commit();
      } else if (event.key === "ArrowDown" && event.altKey) {
        event.preventDefault();
        setOpen(true);
      }
    },
    [commit, onKeyDown]
  );

  const handleSelect = useCallback(
    (date: Date | undefined) => {
      setValue(date);
      setLastValue(date);
      setText(date ? formatDate(date) : "");
      setInvalid(false);
      if (date) {
        setOpen(false);
      }
    },
    [formatDate, setValue]
  );

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <InputGroup className={className} ref={anchorRef} size={size}>
        <InputGroupInput
          aria-invalid={invalid || undefined}
          data-slot="input-group-control"
          disabled={disabled}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={text}
          {...props}
        />
        {name ? (
          <input
            name={name}
            type="hidden"
            value={value ? toIsoDate(value) : ""}
          />
        ) : null}
        <InputGroupAddon align="inline-end">
          <PopoverTrigger
            aria-label="Open calendar"
            data-slot="date-picker-trigger"
            disabled={disabled}
            render={<InputGroupButton icon={<CalendarIcon />} />}
          />
        </InputGroupAddon>
      </InputGroup>
      <PopoverContent
        align="end"
        anchor={anchorRef}
        className="w-auto p-3"
        data-slot="date-picker-content"
      >
        <Calendar
          {...calendarProps}
          className={cn(CALENDAR_IN_POPUP, calendarProps?.className)}
          mode="single"
          month={month}
          onMonthChange={setMonth}
          onSelect={handleSelect}
          selected={value}
        />
      </PopoverContent>
    </Popover>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { DateRange } from "react-day-picker";
export type {
  DatePickerInputProps,
  DatePickerProps,
  DatePreset,
  DateRangePickerProps,
};
export { DatePicker, DatePickerInput, DateRangePicker };
