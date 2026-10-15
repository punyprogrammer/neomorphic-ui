"use client";

import { Calendar } from "@neomorphic-react/ui/calendar";

const bookingsOpen = new Date(2026, 8, 7);

export default function CalendarDisabled() {
  return (
    <Calendar
      defaultMonth={bookingsOpen}
      disabled={[{ before: bookingsOpen }, { dayOfWeek: [0, 6] }]}
      mode="single"
      startMonth={bookingsOpen}
    />
  );
}
