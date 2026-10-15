"use client";

import { Calendar } from "@neomorphic-react/ui/calendar";
import { useState } from "react";

export default function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 5, 12));

  return (
    <Calendar
      defaultMonth={new Date(2026, 5)}
      mode="single"
      onSelect={setDate}
      selected={date}
    />
  );
}
