"use client";

import { Calendar, CalendarDayButton } from "@neomorphic-react/ui/calendar";
import { cn } from "@neomorphic-react/ui/utils";
import type { DayButtonProps } from "react-day-picker";

function fareFor(date: Date) {
  const weekend = date.getDay() === 0 || date.getDay() === 6;
  return weekend ? 64 : 38 + (date.getDate() % 4) * 6;
}

function FareDayButton({ children, className, day, ...props }: DayButtonProps) {
  return (
    <CalendarDayButton
      className={cn("flex-col gap-0.5 leading-none", className)}
      day={day}
      {...props}
    >
      {children}
      {day.outside ? null : (
        <span className="text-[0.625rem] opacity-70">€{fareFor(day.date)}</span>
      )}
    </CalendarDayButton>
  );
}

export default function CalendarCustomDays() {
  return (
    <Calendar
      className="[--cell-size:--spacing(11)]"
      components={{ DayButton: FareDayButton }}
      defaultMonth={new Date(2026, 7)}
      mode="single"
      selected={new Date(2026, 7, 18)}
      showOutsideDays={false}
    />
  );
}
