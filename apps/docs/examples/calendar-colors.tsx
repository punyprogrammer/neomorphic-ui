"use client";

import { Calendar } from "@neomorphic-react/ui/calendar";

export default function CalendarColors() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8">
      <Calendar
        className="[--calendar-fill-foreground:var(--color-success-foreground)] [--calendar-fill:var(--color-success)]"
        defaultMonth={new Date(2026, 4)}
        mode="range"
        selected={{ from: new Date(2026, 4, 11), to: new Date(2026, 4, 15) }}
      />
      <Calendar
        className="[--cell-size:--spacing(7)]"
        defaultMonth={new Date(2026, 4)}
        mode="single"
        selected={new Date(2026, 4, 22)}
      />
    </div>
  );
}
