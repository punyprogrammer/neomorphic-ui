"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@neomorphic-react/ui/select";
import { useState } from "react";

const ranges = [
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
  { label: "Year to date", value: "ytd" },
];

const revenue: Record<string, { total: number; change: number }> = {
  "7d": { total: 18_420, change: 4.2 },
  "30d": { total: 76_900, change: 12.5 },
  "90d": { total: 214_300, change: 8.1 },
  ytd: { total: 702_150, change: 15.7 },
};

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function SelectInContext() {
  const [range, setRange] = useState("30d");
  const { total, change } = revenue[range] ?? { total: 0, change: 0 };
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Revenue</CardTitle>
        <CardDescription>All channels, before refunds</CardDescription>
        <CardAction>
          <Select
            items={ranges}
            onValueChange={(value) => setRange(value as string)}
            value={range}
          >
            <SelectTrigger aria-label="Date range" className="w-40" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              {ranges.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-1">
        <p className="font-semibold text-3xl text-foreground tabular-nums">
          {usd.format(total)}
        </p>
        <p className="text-muted-foreground text-sm">
          Up {change}% on the previous period
        </p>
      </CardContent>
    </Card>
  );
}
