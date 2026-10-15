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
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const data = [
  { week: "6 Oct", email: 124, chat: 210, phone: 48 },
  { week: "13 Oct", email: 138, chat: 196, phone: 52 },
  { week: "20 Oct", email: 101, chat: 238, phone: 39 },
  { week: "27 Oct", email: 117, chat: 254, phone: 44 },
];

const config = {
  email: { label: "Email", color: "var(--chart-1)", icon: Mail },
  chat: { label: "Chat", color: "var(--chart-4)", icon: MessageCircle },
  phone: { label: "Phone", color: "var(--chart-2)", icon: Phone },
} satisfies ChartConfig;

export default function ChartTooltipExample() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Support requests</CardTitle>
        <CardDescription>By channel, October</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-64 w-full" config={config}>
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="week"
              tickLine={false}
              tickMargin={10}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(label) => `Week of ${label}`}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent hideIcon />} />
            <Bar dataKey="email" fill="var(--color-email)" stackId="requests" />
            <Bar dataKey="chat" fill="var(--color-chat)" stackId="requests" />
            <Bar
              dataKey="phone"
              fill="var(--color-phone)"
              radius={[6, 6, 0, 0]}
              stackId="requests"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
