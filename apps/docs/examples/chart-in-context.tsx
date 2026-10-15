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
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@neomorphic-react/ui/chart";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@neomorphic-react/ui/toggle-group";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const data = [
  { day: "Mon", steps: 8420, minutes: 42 },
  { day: "Tue", steps: 10_310, minutes: 58 },
  { day: "Wed", steps: 6150, minutes: 31 },
  { day: "Thu", steps: 11_920, minutes: 66 },
  { day: "Fri", steps: 9030, minutes: 47 },
  { day: "Sat", steps: 14_480, minutes: 85 },
  { day: "Sun", steps: 7260, minutes: 38 },
];

const config = {
  steps: { label: "Steps", color: "var(--chart-1)" },
  minutes: { label: "Active minutes", color: "var(--chart-2)" },
} satisfies ChartConfig;

type Metric = keyof typeof config;

export default function ChartInContext() {
  const [metric, setMetric] = useState<Metric>("steps");
  const total = data.reduce((sum, day) => sum + day[metric], 0);

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>This week</CardTitle>
        <CardDescription>
          {total.toLocaleString("en-GB")} {config[metric].label.toLowerCase()}
        </CardDescription>
        <CardAction>
          <ToggleGroup
            aria-label="Measure"
            onValueChange={(next) => {
              if (next.length > 0) {
                setMetric(next[0] as Metric);
              }
            }}
            size="sm"
            value={[metric]}
          >
            <ToggleGroupItem value="steps">Steps</ToggleGroupItem>
            <ToggleGroupItem value="minutes">Minutes</ToggleGroupItem>
          </ToggleGroup>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-56 w-full" config={config}>
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="day"
              tickLine={false}
              tickMargin={10}
            />
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            <Bar dataKey={metric} fill={`var(--fill-${metric})`} radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
