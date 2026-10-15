"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { Progress, ProgressLabel } from "@neomorphic-react/ui/progress";
import { Flame, Footprints, Timer } from "lucide-react";

const TEAL = "[--progress-fill:oklch(0.58_0.1_172)]";
const CORAL = "[--progress-fill:oklch(0.64_0.14_35)]";

const goals = [
  {
    label: "Steps",
    icon: Footprints,
    value: 8432,
    goal: 10_000,
    unit: "steps",
    tone: TEAL,
  },
  {
    label: "Active minutes",
    icon: Timer,
    value: 38,
    goal: 45,
    unit: "min",
    tone: TEAL,
  },
  {
    label: "Calories",
    icon: Flame,
    value: 1620,
    goal: 2400,
    unit: "kcal",
    tone: CORAL,
  },
];

const number = new Intl.NumberFormat("en-US");

export default function ProgressInContext() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Today's goals</CardTitle>
        <CardDescription>Resets at midnight</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {goals.map(({ label, icon: Icon, value, goal, unit, tone }) => (
          <Progress className={tone} key={label} max={goal} value={value}>
            <div className="flex items-center justify-between gap-3">
              <ProgressLabel className="flex items-center gap-2">
                <Icon aria-hidden="true" className="size-4" />
                {label}
              </ProgressLabel>
              <span className="text-muted-foreground text-sm tabular-nums">
                <span className="font-semibold text-foreground">
                  {number.format(value)}
                </span>{" "}
                / {number.format(goal)} {unit}
              </span>
            </div>
          </Progress>
        ))}
      </CardContent>
    </Card>
  );
}
