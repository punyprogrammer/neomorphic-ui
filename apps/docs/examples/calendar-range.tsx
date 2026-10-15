"use client";

import { Calendar, type DateRange } from "@neomorphic-react/ui/calendar";
import { useState } from "react";

export default function CalendarRange() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2026, 6, 14),
    to: new Date(2026, 6, 19),
  });

  return (
    <Calendar
      defaultMonth={new Date(2026, 6)}
      mode="range"
      numberOfMonths={2}
      onSelect={setRange}
      selected={range}
    />
  );
}
