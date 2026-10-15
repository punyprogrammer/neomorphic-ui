"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { DatePicker } from "@neomorphic-react/ui/date-picker";
import { Field, FieldLabel } from "@neomorphic-react/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@neomorphic-react/ui/select";
import { useState } from "react";

const slots = ["09:30", "11:00", "13:30", "16:00", "17:30"].map((time) => ({
  label: time,
  value: time,
}));

const longDate = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

export default function DatePickerInContext() {
  const [date, setDate] = useState<Date | undefined>();
  const [slot, setSlot] = useState<string | null>(null);
  const [today] = useState(() => new Date());

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Book a viewing</CardTitle>
        <CardDescription>2 bed flat, Harbour Street</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Field>
          <FieldLabel htmlFor="viewing-date">Date</FieldLabel>
          <DatePicker
            calendarProps={{
              disabled: [{ before: today }, { dayOfWeek: [0] }],
            }}
            className="w-full"
            id="viewing-date"
            onValueChange={setDate}
            value={date}
          />
        </Field>
        <Select items={slots} onValueChange={setSlot} value={slot}>
          <div className="grid gap-2">
            <SelectLabel>Time</SelectLabel>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pick a time" />
            </SelectTrigger>
          </div>
          <SelectContent>
            {slots.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-3">
        <p className="text-muted-foreground text-sm">
          {date && slot
            ? `${longDate.format(date)} at ${slot}`
            : "Viewings run Monday to Saturday."}
        </p>
        <Button disabled={!(date && slot)} variant="primary">
          Request viewing
        </Button>
      </CardFooter>
    </Card>
  );
}
