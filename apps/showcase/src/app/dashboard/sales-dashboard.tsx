"use client";

import { Avatar, AvatarImage } from "@neomorphic-react/ui/avatar";
import { Badge } from "@neomorphic-react/ui/badge";
import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Chip } from "@neomorphic-react/ui/chip";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@neomorphic-react/ui/item";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@neomorphic-react/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@neomorphic-react/ui/select";
import { Surface } from "@neomorphic-react/ui/surface";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@neomorphic-react/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@neomorphic-react/ui/tabs";
import { toast } from "@neomorphic-react/ui/toast";
import {
  ArrowDownRight,
  ArrowUpRight,
  Download,
  type LucideIcon,
  Receipt,
  ShoppingBag,
  Users,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import { PageHeader } from "@/components/page-header";
import { PEOPLE } from "@/lib/photos";

// Trend colour is the one place this page needs green and red; both stay
// as text on a pressed-in chip rather than as loud fills.
const UP = "text-[oklch(0.48_0.11_155)]";
const DOWN = "text-[oklch(0.52_0.15_25)]";

const RANGES = [
  { value: "30d", label: "Last 30 days" },
  { value: "qtd", label: "Quarter to date" },
  { value: "ytd", label: "Year to date" },
];

interface Kpi {
  change: number;
  icon: LucideIcon;
  label: string;
  value: string;
}

const KPIS: Kpi[] = [
  { label: "Revenue", value: "$482.6k", change: 12.4, icon: Wallet },
  { label: "Orders", value: "3,912", change: 4.1, icon: ShoppingBag },
  { label: "Average order", value: "$123.40", change: -1.8, icon: Receipt },
  { label: "New customers", value: "864", change: 9.7, icon: Users },
];

const REVENUE = [
  { month: "Jan", current: 31, previous: 26 },
  { month: "Feb", current: 34, previous: 29 },
  { month: "Mar", current: 39, previous: 31 },
  { month: "Apr", current: 37, previous: 33 },
  { month: "May", current: 42, previous: 34 },
  { month: "Jun", current: 46, previous: 37 },
  { month: "Jul", current: 44, previous: 39 },
  { month: "Aug", current: 51, previous: 40 },
  { month: "Sep", current: 56, previous: 43 },
];

const revenueConfig = {
  current: { label: "2026", color: "var(--chart-1)" },
  previous: { label: "2025", color: "var(--chart-5)" },
} satisfies ChartConfig;

const CHANNELS = [
  { channel: "online", revenue: 241, fill: "var(--color-online)" },
  { channel: "retail", revenue: 132, fill: "var(--color-retail)" },
  { channel: "partners", revenue: 74, fill: "var(--color-partners)" },
  { channel: "wholesale", revenue: 36, fill: "var(--color-wholesale)" },
];

const channelConfig = {
  revenue: { label: "Revenue ($k)" },
  online: { label: "Online", color: "var(--chart-1)" },
  retail: { label: "Retail", color: "var(--chart-2)" },
  partners: { label: "Partners", color: "var(--chart-3)" },
  wholesale: { label: "Wholesale", color: "var(--chart-4)" },
} satisfies ChartConfig;

const REGIONS = [
  { region: "North America", value: 82 },
  { region: "Europe", value: 67 },
  { region: "Asia Pacific", value: 91 },
  { region: "Latin America", value: 48 },
];

const REPS = [
  {
    name: "Priya Raman",
    region: "APAC",
    revenue: "$68.2k",
    avatar: PEOPLE.priya,
  },
  {
    name: "Marcus Hale",
    region: "North America",
    revenue: "$61.9k",
    avatar: PEOPLE.marcus,
  },
  {
    name: "Sofia Brandt",
    region: "Europe",
    revenue: "$54.3k",
    avatar: PEOPLE.sofia,
  },
];

type Status = "paid" | "pending" | "refunded";

const STATUS: Record<
  Status,
  { label: string; variant: "success" | "warning" | "destructive" }
> = {
  paid: { label: "Paid", variant: "success" },
  pending: { label: "Pending", variant: "warning" },
  refunded: { label: "Refunded", variant: "destructive" },
};

const ORDERS: {
  id: string;
  customer: string;
  date: string;
  channel: string;
  status: Status;
  amount: number;
}[] = [
  {
    id: "#10482",
    customer: "Northwind Traders",
    date: "15 Oct",
    channel: "Online",
    status: "paid",
    amount: 1840,
  },
  {
    id: "#10481",
    customer: "Bluebird Studio",
    date: "15 Oct",
    channel: "Partners",
    status: "pending",
    amount: 642.5,
  },
  {
    id: "#10480",
    customer: "Harbour & Co.",
    date: "14 Oct",
    channel: "Retail",
    status: "paid",
    amount: 289,
  },
  {
    id: "#10479",
    customer: "Kestrel Labs",
    date: "14 Oct",
    channel: "Online",
    status: "refunded",
    amount: 118.9,
  },
  {
    id: "#10478",
    customer: "Oakline Supply",
    date: "13 Oct",
    channel: "Wholesale",
    status: "paid",
    amount: 4210,
  },
];

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function SalesDashboard() {
  const [range, setRange] = useState("qtd");
  const [metric, setMetric] = useState("revenue");
  const total = CHANNELS.reduce((sum, c) => sum + c.revenue, 0);

  return (
    <div className="grid gap-8">
      <PageHeader
        actions={
          <>
            <Select
              items={RANGES}
              onValueChange={(value) => setRange(value as string)}
              value={range}
            >
              <SelectTrigger aria-label="Date range" className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {RANGES.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              icon={<Download />}
              onClick={() =>
                toast.promise(
                  new Promise((resolve) => setTimeout(resolve, 1400)),
                  {
                    loading: "Preparing export…",
                    success: "sales-q3-2026.csv is ready",
                    error: "Export failed",
                  }
                )
              }
              variant="primary"
            >
              Export
            </Button>
          </>
        }
        description="Revenue is ahead of plan for the quarter, led by online and APAC."
        eyebrow="Ledger · Q3 2026"
        title="Sales overview"
      />

      <section
        aria-label="Key figures"
        className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
      >
        {KPIS.map(({ label, value, change, icon: Icon }) => {
          const up = change >= 0;
          return (
            <Surface className="grid gap-4 p-5" key={label}>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-sm">{label}</p>
                <Surface
                  className="grid size-9 place-items-center"
                  depth="sm"
                  elevation="inset"
                >
                  <Icon aria-hidden="true" className="size-4" />
                </Surface>
              </div>
              <div className="flex items-end justify-between gap-3">
                <p className="font-semibold text-2xl text-foreground tabular-nums tracking-tight">
                  {value}
                </p>
                <Chip
                  className={up ? UP : DOWN}
                  icon={up ? <ArrowUpRight /> : <ArrowDownRight />}
                  size="sm"
                  variant="inset"
                >
                  <span className="sr-only">{up ? "Up" : "Down"} </span>
                  {Math.abs(change)}%
                </Chip>
              </div>
            </Surface>
          );
        })}
      </section>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>
              Thousands of dollars, this year against last
            </CardDescription>
            <CardAction>
              <Tabs
                onValueChange={(v) => setMetric(v as string)}
                value={metric}
              >
                <TabsList aria-label="Metric" variant="line">
                  <TabsTrigger value="revenue">Revenue</TabsTrigger>
                  <TabsTrigger value="margin">Margin</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardAction>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-72 w-full" config={revenueConfig}>
              <AreaChart
                accessibilityLayer
                data={
                  metric === "revenue"
                    ? REVENUE
                    : REVENUE.map((r) => ({
                        month: r.month,
                        current: Math.round(r.current * 0.38),
                        previous: Math.round(r.previous * 0.34),
                      }))
                }
                margin={{ left: 0, right: 8 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  axisLine={false}
                  dataKey="month"
                  tickLine={false}
                  tickMargin={8}
                />
                <YAxis axisLine={false} tickLine={false} width={32} />
                <ChartTooltip
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  dataKey="previous"
                  fill="transparent"
                  stroke="var(--color-previous)"
                  strokeDasharray="5 4"
                  strokeWidth={1.5}
                  type="monotone"
                />
                <Area
                  dataKey="current"
                  fill="var(--area-current)"
                  stroke="var(--color-current)"
                  strokeWidth={2}
                  type="monotone"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>By channel</CardTitle>
            <CardDescription>Quarter to date</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="mx-auto aspect-square h-64"
              config={channelConfig}
            >
              <PieChart>
                <ChartTooltip
                  content={<ChartTooltipContent hideLabel nameKey="channel" />}
                />
                <Pie
                  data={CHANNELS}
                  dataKey="revenue"
                  innerRadius={64}
                  nameKey="channel"
                  paddingAngle={2}
                  strokeWidth={0}
                >
                  <Label
                    content={({ viewBox }) =>
                      viewBox && "cx" in viewBox ? (
                        <text
                          dominantBaseline="middle"
                          textAnchor="middle"
                          x={viewBox.cx}
                          y={viewBox.cy}
                        >
                          <tspan
                            className="fill-foreground font-semibold text-2xl"
                            x={viewBox.cx}
                            y={viewBox.cy}
                          >
                            ${total}k
                          </tspan>
                          <tspan
                            className="fill-muted-foreground text-xs"
                            x={viewBox.cx}
                            y={(viewBox.cy ?? 0) + 22}
                          >
                            total
                          </tspan>
                        </text>
                      ) : null
                    }
                  />
                </Pie>
                <ChartLegend
                  content={
                    <ChartLegendContent
                      className="flex-wrap"
                      nameKey="channel"
                    />
                  }
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Regional targets</CardTitle>
            <CardDescription>Share of the Q3 quota closed</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            {REGIONS.map(({ region, value }) => (
              <Progress
                className="[--progress-fill:var(--chart-1)]"
                key={region}
                size="sm"
                value={value}
              >
                <div className="flex justify-between">
                  <ProgressLabel>{region}</ProgressLabel>
                  <ProgressValue />
                </div>
              </Progress>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent orders</CardTitle>
            <CardDescription>
              The last five across every channel
            </CardDescription>
            <CardAction>
              <Button size="sm" variant="ghost">
                View all
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <Table variant="inset">
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Channel
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-end">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ORDERS.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-xs">
                      {order.id}
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-foreground">
                        {order.customer}
                      </span>
                      <span className="block text-muted-foreground text-xs">
                        {order.date}
                      </span>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {order.channel}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-2">
                        <Badge
                          dot
                          size="sm"
                          variant={STATUS[order.status].variant}
                        />
                        {STATUS[order.status].label}
                      </span>
                    </TableCell>
                    <TableCell className="text-end font-medium tabular-nums">
                      {usd.format(order.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Top performers</CardTitle>
            <CardDescription>Closed revenue this quarter</CardDescription>
          </CardHeader>
          <CardContent>
            <ItemGroup
              aria-label="Top performers"
              className="grid gap-4 md:grid-cols-3"
            >
              {REPS.map((rep, index) => (
                <Item key={rep.name} variant="raised">
                  <ItemMedia>
                    <Avatar>
                      <AvatarImage alt="" src={rep.avatar} />
                    </Avatar>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{rep.name}</ItemTitle>
                    <ItemDescription>{rep.region}</ItemDescription>
                  </ItemContent>
                  <ItemActions className="grid justify-items-end gap-1">
                    <span className="font-semibold text-foreground tabular-nums">
                      {rep.revenue}
                    </span>
                    <Badge
                      size="sm"
                      variant={index === 0 ? "primary" : "inset"}
                    >
                      #{index + 1}
                    </Badge>
                  </ItemActions>
                </Item>
              ))}
            </ItemGroup>
          </CardContent>
          <CardFooter className="text-muted-foreground text-sm">
            Showing {RANGES.find((r) => r.value === range)?.label.toLowerCase()}
            .
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
