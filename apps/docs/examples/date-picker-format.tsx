"use client";

import { Button } from "@neomorphic-react/ui/button";
import { DatePicker } from "@neomorphic-react/ui/date-picker";
import { Field, FieldLabel } from "@neomorphic-react/ui/field";
import { useState } from "react";

const longDate = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function DatePickerFormat() {
  const [submitted, setSubmitted] = useState("");

  return (
    <form
      action={(formData) => setSubmitted(String(formData.get("start-date")))}
      className="grid w-full max-w-72 gap-4"
    >
      <Field>
        <FieldLabel htmlFor="date-picker-format">Start date</FieldLabel>
        <DatePicker
          className="w-full"
          defaultValue={new Date(2026, 5, 12)}
          formatDate={longDate.format}
          id="date-picker-format"
          name="start-date"
        />
      </Field>
      <Button type="submit" variant="primary">
        Save
      </Button>
      <p aria-live="polite" className="text-muted-foreground text-sm">
        {submitted ? `Sent as start-date=${submitted}` : null}
      </p>
    </form>
  );
}
