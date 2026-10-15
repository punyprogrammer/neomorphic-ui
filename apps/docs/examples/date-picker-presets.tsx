"use client";

import { DatePicker, type DatePreset } from "@neomorphic-react/ui/date-picker";
import { Field, FieldLabel } from "@neomorphic-react/ui/field";

function daysFromToday(days: number) {
  const today = new Date();
  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + days
  );
}

export default function DatePickerPresets() {
  const presets: DatePreset<Date>[] = [
    { label: "Today", value: daysFromToday(0) },
    { label: "Tomorrow", value: daysFromToday(1) },
    { label: "In a week", value: daysFromToday(7) },
    { label: "In a month", value: daysFromToday(30) },
  ];

  return (
    <Field className="w-full max-w-64">
      <FieldLabel htmlFor="date-picker-presets">Remind me</FieldLabel>
      <DatePicker
        calendarProps={{ disabled: { before: daysFromToday(0) } }}
        className="w-full"
        id="date-picker-presets"
        presets={presets}
      />
    </Field>
  );
}
