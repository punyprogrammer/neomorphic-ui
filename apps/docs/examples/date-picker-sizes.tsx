"use client";

import { DatePicker } from "@neomorphic-react/ui/date-picker";

export default function DatePickerSizes() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-4">
      <DatePicker aria-label="Small date" className="w-full" size="sm" />
      <DatePicker aria-label="Medium date" className="w-full" />
      <DatePicker aria-label="Large date" className="w-full" size="lg" />
      <DatePicker
        aria-label="Disabled date"
        className="w-full"
        disabled
        placeholder="Not available"
      />
    </div>
  );
}
