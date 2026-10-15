"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@neomorphic-react/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const data = [
  { day: "Mon", median: 182, slowest: 410 },
  { day: "Tue", median: 176, slowest: 388 },
  { day: "Wed", median: 194, slowest: 465 },
  { day: "Thu", median: 171, slowest: 352 },
  { day: "Fri", median: 205, slowest: 498 },
  { day: "Sat", median: 158, slowest: 301 },
  { day: "Sun", median: 149, slowest: 287 },
];

const config = {
  median: { label: "Median", color: "var(--chart-1)" },
  slowest: { label: "Slowest 5%", color: "var(--chart-2)" },
} satisfies ChartConfig;

export default function ChartLine() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Response time</CardTitle>
        <CardDescription>Checkout API, in milliseconds</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-64 w-full" config={config}>
          <LineChart data={data} margin={{ left: 4, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="day"
              tickLine={false}
              tickMargin={8}
            />
            <YAxis axisLine={false} tickLine={false} width={36} />
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="median"
              dot={{ fill: "var(--color-median)" }}
              stroke="var(--color-median)"
              strokeWidth={2}
              type="monotone"
            />
            <Line
              dataKey="slowest"
              dot={{ fill: "var(--color-slowest)" }}
              stroke="var(--color-slowest)"
              strokeDasharray="5 4"
              strokeWidth={2}
              type="monotone"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
