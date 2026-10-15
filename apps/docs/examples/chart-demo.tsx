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
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const data = [
  { month: "January", solar: 186, grid: 320 },
  { month: "February", solar: 238, grid: 284 },
  { month: "March", solar: 305, grid: 231 },
  { month: "April", solar: 362, grid: 176 },
  { month: "May", solar: 410, grid: 142 },
  { month: "June", solar: 437, grid: 120 },
];

const config = {
  solar: { label: "Solar", color: "var(--chart-5)" },
  grid: { label: "Grid", color: "var(--chart-1)" },
} satisfies ChartConfig;

export default function ChartDemo() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Energy use</CardTitle>
        <CardDescription>January to June, in kWh</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-64 w-full" config={config}>
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="month"
              tickFormatter={(value: string) => value.slice(0, 3)}
              tickLine={false}
              tickMargin={10}
            />
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="solar" fill="var(--fill-solar)" radius={8} />
            <Bar dataKey="grid" fill="var(--fill-grid)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
