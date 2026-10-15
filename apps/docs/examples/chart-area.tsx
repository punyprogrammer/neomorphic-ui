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
  ChartTooltip,
  ChartTooltipContent,
} from "@neomorphic-react/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const data = [
  { month: "January", web: 412, app: 268 },
  { month: "February", web: 380, app: 301 },
  { month: "March", web: 455, app: 342 },
  { month: "April", web: 431, app: 398 },
  { month: "May", web: 470, app: 446 },
  { month: "June", web: 498, app: 512 },
];

const config = {
  web: { label: "Website", color: "var(--chart-1)" },
  app: { label: "App", color: "var(--chart-3)" },
} satisfies ChartConfig;

export default function ChartArea() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Orders by channel</CardTitle>
        <CardDescription>Stacked, January to June</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-64 w-full" config={config}>
          <AreaChart data={data} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="month"
              tickFormatter={(value: string) => value.slice(0, 3)}
              tickLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="app"
              fill="var(--area-app)"
              stackId="orders"
              stroke="var(--color-app)"
              strokeWidth={2}
              type="natural"
            />
            <Area
              dataKey="web"
              fill="var(--area-web)"
              stackId="orders"
              stroke="var(--color-web)"
              strokeWidth={2}
              type="natural"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
