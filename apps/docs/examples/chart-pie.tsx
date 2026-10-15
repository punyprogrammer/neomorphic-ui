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
import { Label, Pie, PieChart } from "recharts";

const data = [
  { type: "photos", gigabytes: 48, fill: "var(--color-photos)" },
  { type: "videos", gigabytes: 36, fill: "var(--color-videos)" },
  { type: "apps", gigabytes: 22, fill: "var(--color-apps)" },
  { type: "documents", gigabytes: 14, fill: "var(--color-documents)" },
  { type: "other", gigabytes: 8, fill: "var(--color-other)" },
];

const config = {
  gigabytes: { label: "GB" },
  photos: { label: "Photos", color: "var(--chart-1)" },
  videos: { label: "Videos", color: "var(--chart-2)" },
  apps: { label: "Apps", color: "var(--chart-3)" },
  documents: { label: "Documents", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
} satisfies ChartConfig;

export default function ChartPie() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Storage</CardTitle>
        <CardDescription>128 GB used of 256 GB</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="mx-auto aspect-square h-72" config={config}>
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent hideLabel nameKey="type" />}
              cursor={false}
            />
            <Pie
              data={data}
              dataKey="gigabytes"
              innerRadius={64}
              nameKey="type"
              strokeWidth={4}
            >
              <Label
                className="fill-foreground font-semibold text-2xl"
                position="center"
                value="128 GB"
              />
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="type" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
