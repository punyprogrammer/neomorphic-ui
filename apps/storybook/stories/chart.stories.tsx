import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@neomorphic-ui/react/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@neomorphic-ui/react/chart";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  XAxis,
  YAxis,
} from "recharts";
import { expect, userEvent, waitFor, within } from "storybook/test";

const MONTHS = [
  { month: "January", rail: 186, coach: 80 },
  { month: "February", rail: 305, coach: 200 },
  { month: "March", rail: 237, coach: 120 },
  { month: "April", rail: 73, coach: 190 },
  { month: "May", rail: 209, coach: 130 },
  { month: "June", rail: 214, coach: 140 },
];

const config = {
  rail: { label: "Rail", color: "var(--chart-1)" },
  coach: { label: "Coach", color: "var(--chart-2)" },
} satisfies ChartConfig;

const ROUTES = [
  { route: "lisbon", trips: 275, fill: "var(--color-lisbon)" },
  { route: "porto", trips: 200, fill: "var(--color-porto)" },
  { route: "faro", trips: 187, fill: "var(--color-faro)" },
  { route: "coimbra", trips: 173, fill: "var(--color-coimbra)" },
  { route: "braga", trips: 90, fill: "var(--color-braga)" },
];

const routeConfig = {
  trips: { label: "Trips" },
  lisbon: { label: "Lisbon", color: "var(--chart-1)" },
  porto: { label: "Porto", color: "var(--chart-2)" },
  faro: { label: "Faro", color: "var(--chart-3)" },
  coimbra: { label: "Coimbra", color: "var(--chart-4)" },
  braga: { label: "Braga", color: "var(--chart-5)" },
} satisfies ChartConfig;

const shortMonth = (value: string) => value.slice(0, 3);

const meta = {
  title: "Components/Chart",
  component: ChartContainer,
  args: { config, children: <BarChart /> },
  parameters: {
    docs: {
      description: {
        component: `
Recharts charts drawn flat on a raised Card, with the kit's tooltip and
legend. \`ChartContainer\` sizes the chart and turns \`config\` into colour
variables.

\`\`\`tsx
import {
  type ChartConfig, ChartContainer, ChartLegend, ChartLegendContent,
  ChartTooltip, ChartTooltipContent,
} from "@neomorphic-ui/react/chart";
import { Bar, BarChart, XAxis } from "recharts";

const config = {
  rail: { label: "Rail", color: "var(--chart-1)" },
} satisfies ChartConfig;

<ChartContainer config={config} className="h-64 w-full">
  <BarChart data={data}>
    <XAxis dataKey="month" />
    <ChartTooltip content={<ChartTooltipContent />} />
    <ChartLegend content={<ChartLegendContent />} />
    <Bar dataKey="rail" fill="var(--fill-rail)" radius={8} />
  </BarChart>
</ChartContainer>
\`\`\`

Each config key becomes three variables on the container:

- \`--color-<key>\`: the plain colour, for lines, dots and slices.
- \`--fill-<key>\`: a BarMeter gradient, darker at the base, for bars.
- \`--area-<key>\`: the colour fading to nothing, for areas.

Keys with spaces or symbols use \`_\` in the variable names. The tooltip is a
small raised card; \`indicator\` is \`dot\`, \`line\` or \`dashed\`, and
\`hideLabel\` / \`hideIndicator\` trim it. The legend reads its labels from
the config.
`,
      },
    },
  },
} satisfies Meta<typeof ChartContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const Frame = ({
  children,
  description,
  title,
}: {
  children: React.ReactNode;
  description: string;
  title: string;
}) => (
  <div className="p-10">
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  </div>
);

async function hoverChart(canvasElement: HTMLElement) {
  const surface = await waitFor(
    () => {
      const element = canvasElement.querySelector(".recharts-surface");
      expect(element).not.toBeNull();
      return element as Element;
    },
    { timeout: 4000 }
  );
  const box = surface.getBoundingClientRect();
  await userEvent.pointer({
    coords: {
      clientX: box.left + box.width / 2,
      clientY: box.top + box.height / 2,
    },
    target: surface,
  });
  return waitFor(
    () => {
      const tooltip = canvasElement.querySelector(
        '[data-slot="chart-tooltip"]'
      );
      expect(tooltip).toBeVisible();
      return tooltip as HTMLElement;
    },
    { timeout: 4000 }
  );
}

/** Bars filled like a BarMeter, darker at the base. */
export const BarDefault: Story = {
  name: "Bar",
  render: () => (
    <Frame description="January – June" title="Trips by mode">
      <ChartContainer className="h-64 w-full" config={config}>
        <BarChart accessibilityLayer data={MONTHS}>
          <CartesianGrid vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="month"
            tickFormatter={shortMonth}
            tickLine={false}
            tickMargin={10}
          />
          <ChartTooltip
            content={<ChartTooltipContent indicator="dashed" />}
            cursor={false}
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="rail" fill="var(--fill-rail)" radius={8} />
          <Bar dataKey="coach" fill="var(--fill-coach)" radius={8} />
        </BarChart>
      </ChartContainer>
    </Frame>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(
      () =>
        expect(
          canvasElement.querySelectorAll(".recharts-bar-rectangle")
        ).toHaveLength(12),
      { timeout: 4000 }
    );
    await expect(canvas.getByText("Rail")).toBeVisible();
    await expect(canvas.getByText("Coach")).toBeVisible();
    const tooltip = await hoverChart(canvasElement);
    await expect(tooltip).toHaveClass("bg-neu-convex", "shadow-neu");
    await expect(within(tooltip).getByText("Rail")).toBeVisible();
  },
};

/** Stacked areas fading to the surface. */
export const AreaStacked: Story = {
  name: "Area",
  render: () => (
    <Frame description="Passengers, stacked" title="Monthly travel">
      <ChartContainer className="h-64 w-full" config={config}>
        <AreaChart
          accessibilityLayer
          data={MONTHS}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="month"
            tickFormatter={shortMonth}
            tickLine={false}
            tickMargin={8}
          />
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
          <Area
            dataKey="coach"
            fill="var(--area-coach)"
            stackId="a"
            stroke="var(--color-coach)"
            strokeWidth={2}
            type="natural"
          />
          <Area
            dataKey="rail"
            fill="var(--area-rail)"
            stackId="a"
            stroke="var(--color-rail)"
            strokeWidth={2}
            type="natural"
          />
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
    </Frame>
  ),
  play: async ({ canvasElement }) => {
    await waitFor(
      () =>
        expect(canvasElement.querySelectorAll(".recharts-area")).toHaveLength(
          2
        ),
      { timeout: 4000 }
    );
    const tooltip = await hoverChart(canvasElement);
    await expect(
      tooltip.querySelectorAll('[data-slot="chart-tooltip-item"]')
    ).toHaveLength(2);
  },
};

/** Lines with dots, labelled by the config. */
export const LineDots: Story = {
  name: "Line",
  render: () => (
    <Frame description="January – June" title="Trips by mode">
      <ChartContainer className="h-64 w-full" config={config}>
        <LineChart
          accessibilityLayer
          data={MONTHS}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="month"
            tickFormatter={shortMonth}
            tickLine={false}
            tickMargin={8}
          />
          <YAxis axisLine={false} tickLine={false} width={32} />
          <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
          <Line
            dataKey="rail"
            dot={{ fill: "var(--color-rail)" }}
            stroke="var(--color-rail)"
            strokeWidth={2}
            type="monotone"
          />
          <Line
            dataKey="coach"
            dot={{ fill: "var(--color-coach)" }}
            stroke="var(--color-coach)"
            strokeDasharray="5 4"
            strokeWidth={2}
            type="monotone"
          />
        </LineChart>
      </ChartContainer>
    </Frame>
  ),
  play: async ({ canvasElement }) => {
    await waitFor(
      () =>
        expect(canvasElement.querySelectorAll(".recharts-line")).toHaveLength(
          2
        ),
      { timeout: 4000 }
    );
    const tooltip = await hoverChart(canvasElement);
    await expect(within(tooltip).getByText("Coach")).toBeVisible();
  },
};

/** A donut with the total in the middle; slices name themselves. */
export const PieDonut: Story = {
  name: "Pie",
  render: () => (
    <Frame description="Trips by destination" title="Routes">
      <ChartContainer
        className="mx-auto aspect-square h-72"
        config={routeConfig}
      >
        <PieChart>
          <ChartTooltip
            content={<ChartTooltipContent hideLabel nameKey="route" />}
            cursor={false}
          />
          <Pie
            data={ROUTES}
            dataKey="trips"
            innerRadius={64}
            nameKey="route"
            strokeWidth={4}
          >
            <Label
              className="fill-foreground font-semibold text-2xl"
              position="center"
              value="925"
            />
          </Pie>
          <ChartLegend content={<ChartLegendContent nameKey="route" />} />
        </PieChart>
      </ChartContainer>
    </Frame>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(
      () =>
        expect(canvasElement.querySelectorAll(".recharts-sector")).toHaveLength(
          5
        ),
      { timeout: 4000 }
    );
    await expect(canvas.getByText("Lisbon")).toBeVisible();
    await expect(canvas.getByText("Braga")).toBeVisible();
    await expect(canvas.getByText("925")).toBeVisible();
  },
};

/** Two series over a polar grid. */
export const RadarDefault: Story = {
  name: "Radar",
  render: () => (
    <Frame description="January – June" title="Seasonality">
      <ChartContainer className="mx-auto aspect-square h-72" config={config}>
        <RadarChart data={MONTHS}>
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
          <PolarAngleAxis dataKey="month" tickFormatter={shortMonth} />
          <PolarGrid />
          <Radar
            dataKey="rail"
            fill="var(--color-rail)"
            fillOpacity={0.4}
            stroke="var(--color-rail)"
          />
          <Radar
            dataKey="coach"
            fill="var(--color-coach)"
            fillOpacity={0.25}
            stroke="var(--color-coach)"
          />
          <ChartLegend content={<ChartLegendContent />} />
        </RadarChart>
      </ChartContainer>
    </Frame>
  ),
  play: async ({ canvasElement }) => {
    await waitFor(
      () =>
        expect(
          canvasElement.querySelectorAll(".recharts-radar-polygon")
        ).toHaveLength(2),
      { timeout: 4000 }
    );
    await expect(within(canvasElement).getByText("Rail")).toBeVisible();
  },
};

/** Radial bars on a sunken track. */
export const Radial: Story = {
  render: () => (
    <Frame description="Trips by destination" title="Routes">
      <ChartContainer
        className="mx-auto aspect-square h-72"
        config={routeConfig}
      >
        <RadialBarChart
          data={ROUTES}
          endAngle={380}
          innerRadius={36}
          outerRadius={120}
          startAngle={-90}
        >
          <ChartTooltip
            content={<ChartTooltipContent hideLabel nameKey="route" />}
            cursor={false}
          />
          <PolarRadiusAxis axisLine={false} tick={false} />
          <RadialBar background cornerRadius={8} dataKey="trips" />
        </RadialBarChart>
      </ChartContainer>
    </Frame>
  ),
  play: async ({ canvasElement }) => {
    await waitFor(
      () =>
        expect(
          canvasElement.querySelectorAll(".recharts-radial-bar-sector")
        ).toHaveLength(5),
      { timeout: 4000 }
    );
  },
};
