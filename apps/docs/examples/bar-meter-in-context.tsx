"use client";

import {
  BarMeter,
  BarMeterItem,
  BarMeterLabel,
  BarMeterValue,
} from "@neomorphic-react/ui/bar-meter";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { Chip } from "@neomorphic-react/ui/chip";
import { Flame } from "lucide-react";

const goal = 60;

const week = [
  ["Mon", 72],
  ["Tue", 45],
  ["Wed", 64],
  ["Thu", 88],
  ["Fri", 30],
  ["Sat", 95],
  ["Sun", 61],
] as const;

const minutes = {
  style: "unit",
  unit: "minute",
  unitDisplay: "narrow",
} as const;

export default function BarMeterInContext() {
  const met = week.filter(([, value]) => value >= goal).length;
  const total = week.reduce((sum, [, value]) => sum + value, 0);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Active minutes</CardTitle>
        <CardDescription>{total} minutes this week</CardDescription>
        <CardAction>
          <Chip icon={<Flame />} size="sm" variant="primary">
            {met} of 7 days
          </Chip>
        </CardAction>
      </CardHeader>
      <CardContent>
        <BarMeter
          aria-label={`Active minutes each day, goal ${goal}`}
          className="justify-between"
          size="sm"
        >
          {week.map(([day, value]) => (
            <BarMeterItem
              format={minutes}
              getAriaValueText={(_, active) => `${active} minutes`}
              key={day}
              max={120}
              value={value}
            >
              <BarMeterValue />
              <BarMeterLabel>{day}</BarMeterLabel>
            </BarMeterItem>
          ))}
        </BarMeter>
      </CardContent>
    </Card>
  );
}
