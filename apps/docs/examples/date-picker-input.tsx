"use client";

import { DatePickerInput } from "@neomorphic-react/ui/date-picker";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@neomorphic-react/ui/field";

export default function DatePickerInputExample() {
  return (
    <Field className="w-full max-w-64">
      <FieldLabel htmlFor="date-picker-input">Date of birth</FieldLabel>
      <DatePickerInput
        calendarProps={{
          captionLayout: "dropdown",
          startMonth: new Date(1920, 0),
        }}
        id="date-picker-input"
        placeholder="yyyy-mm-dd"
      />
      <FieldDescription>
        Type a date, or pick one from the calendar.
      </FieldDescription>
    </Field>
  );
}
