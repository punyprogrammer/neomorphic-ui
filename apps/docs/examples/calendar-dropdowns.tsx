"use client";

import { Calendar } from "@neomorphic-react/ui/calendar";

function formatMonthDropdown(month: Date) {
  return month.toLocaleString("en-GB", { month: "short" });
}

export default function CalendarDropdowns() {
  return (
    <Calendar
      captionLayout="dropdown"
      defaultMonth={new Date(1990, 3)}
      endMonth={new Date(2010, 11)}
      formatters={{ formatMonthDropdown }}
      mode="single"
      startMonth={new Date(1930, 0)}
    />
  );
}
