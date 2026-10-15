"use client";

import {
  type DatePreset,
  type DateRange,
  DateRangePicker,
} from "@neomorphic-react/ui/date-picker";
import { Field, FieldLabel } from "@neomorphic-react/ui/field";

function daysFromToday(days: number) {
  const today = new Date();
  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + days
  );
}

export default function DatePickerRange() {
  const presets: DatePreset<DateRange>[] = [
    {
      label: "Next 3 nights",
      value: { from: daysFromToday(0), to: daysFromToday(3) },
    },
    {
      label: "Next week",
      value: { from: daysFromToday(0), to: daysFromToday(7) },
    },
    {
      label: "Next fortnight",
      value: { from: daysFromToday(0), to: daysFromToday(14) },
    },
  ];

  return (
    <Field className="w-full max-w-72">
      <FieldLabel htmlFor="date-picker-range">Stay</FieldLabel>
      <DateRangePicker
        calendarProps={{ disabled: { before: daysFromToday(0) } }}
        className="w-full"
        id="date-picker-range"
        placeholder="Check-in to check-out"
        presets={presets}
      />
    </Field>
  );
}
