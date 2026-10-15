"use client";

import { Button } from "@neomorphic-react/ui/button";
import { Calendar } from "@neomorphic-react/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { useState } from "react";

const firstSlot = new Date(2026, 8, 3);

const longDate = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

export default function CalendarInContext() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 8, 8));

  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle>Delivery day</CardTitle>
        <CardDescription>We deliver Monday to Saturday.</CardDescription>
      </CardHeader>
      <CardContent>
        <Calendar
          className="bg-transparent p-0 shadow-neu-flat"
          defaultMonth={firstSlot}
          disabled={[{ before: firstSlot }, { dayOfWeek: [0] }]}
          mode="single"
          onSelect={setDate}
          selected={date}
          startMonth={firstSlot}
        />
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-3">
        <p className="text-muted-foreground text-sm">
          {date ? longDate.format(date) : "Choose a day for your order."}
        </p>
        <Button disabled={!date} variant="primary">
          Confirm delivery
        </Button>
      </CardFooter>
    </Card>
  );
}
