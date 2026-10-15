"use client";

import { DatePicker } from "@neomorphic-react/ui/date-picker";
import { Field, FieldLabel } from "@neomorphic-react/ui/field";

export default function DatePickerDemo() {
  return (
    <Field className="w-full max-w-64">
      <FieldLabel htmlFor="date-picker-demo">Departure</FieldLabel>
      <DatePicker className="w-full" id="date-picker-demo" />
    </Field>
  );
}
