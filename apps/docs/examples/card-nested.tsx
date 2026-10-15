"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";

const times = [
  { label: "Boarding", time: "06:40" },
  { label: "Departs", time: "07:10" },
];

export default function CardNested() {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <CardTitle>Kolkata to Bengaluru</CardTitle>
        <CardDescription>Wed, 21 October · Gate 12</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {times.map(({ label, time }) => (
          <Card className="text-center" elevation="inset" key={label} size="sm">
            <CardContent className="grid gap-1">
              <span className="text-muted-foreground text-xs uppercase">
                {label}
              </span>
              <span className="font-medium text-2xl tabular-nums">{time}</span>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
