"use client";

import type * as React from "react";
import { createContext, useContext, useId, useMemo } from "react";
import {
  Legend,
  type LegendPayload,
  ResponsiveContainer,
  Tooltip,
  type TooltipPayload,
  type TooltipPayloadEntry,
} from "recharts";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

/**
 * Names, colours and icons for a chart's series, keyed by `dataKey` (or by
 * the value of `nameKey`). Each key becomes `--color-<key>`,
 * `--fill-<key>` (a BarMeter gradient) and `--area-<key>` (a fading area
 * gradient) on the container, so series can use `fill="var(--fill-sales)"`.
 */
type ChartConfig = Record<
  string,
  {
    /** Any CSS colour; the `--chart-1`…`--chart-5` tokens read well. */
    color?: string;
    icon?: React.ComponentType;
    label?: React.ReactNode;
  }
>;

interface ChartContextValue {
  config: ChartConfig;
}

const ChartContext = createContext<ChartContextValue | null>(null);

/** The config of the surrounding `ChartContainer`. */
function useChart() {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

const UNSAFE_KEY = /[^\w-]/g;

function cssKey(key: string) {
  return key.replace(UNSAFE_KEY, "_");
}

// ---------------------------------------------------------------------------
// ChartContainer
// ---------------------------------------------------------------------------

interface ChartContainerProps extends React.ComponentProps<"div"> {
  /** A Recharts chart (`AreaChart`, `BarChart`, `PieChart`…). */
  children: React.ComponentProps<typeof ResponsiveContainer>["children"];
  config: ChartConfig;
  /**
   * Props for the `ResponsiveContainer` that sizes the chart to the box.
   * Size the box with `className` (it defaults to `aspect-video`).
   */
  responsiveProps?: Omit<
    React.ComponentProps<typeof ResponsiveContainer>,
    "children"
  >;
}

/**
 * Sizes a Recharts chart, styles its axes, grid and cursor for the surface,
 * and turns `config` into colour variables. Place it on a Card: the chart
 * itself is drawn flat.
 */
function ChartContainer({
  children,
  className,
  config,
  id,
  responsiveProps,
  style,
  ...props
}: ChartContainerProps) {
  const uid = useId();
  const chartId = `chart-${(id ?? uid).replace(UNSAFE_KEY, "")}`;
  const context = useMemo(() => ({ config }), [config]);
  const entries = Object.entries(config).filter(([, item]) => item.color);

  const variables: Record<string, string> = {};
  for (const [key, item] of entries) {
    const name = cssKey(key);
    variables[`--color-${name}`] = item.color as string;
    variables[`--fill-${name}`] = `url(#${chartId}-fill-${name})`;
    variables[`--area-${name}`] = `url(#${chartId}-area-${name})`;
  }

  return (
    <ChartContext.Provider value={context}>
      <div
        className={cn(
          "relative flex aspect-video justify-center text-xs",
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-polar-angle-axis-tick_text]:fill-muted-foreground",
          "[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-[var(--neu-dark)] [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-[var(--neu-dark)]",
          "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-[var(--neu-dark)] [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-[var(--neu-dark)]/40",
          "[&_.recharts-radial-bar-background-sector]:fill-[var(--neu-dark)]/40 [&_.recharts-reference-line_[stroke='#ccc']]:stroke-[var(--neu-dark)]",
          "[&_.recharts-dot[stroke='#fff']]:stroke-background [&_.recharts-sector[stroke='#fff']]:stroke-background",
          "[&_.recharts-layer]:outline-none [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        data-chart={chartId}
        data-slot="chart"
        id={id}
        style={{ ...variables, ...style } as React.CSSProperties}
        {...props}
      >
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute size-0"
          focusable="false"
        >
          <defs>
            {entries.map(([key]) => {
              const name = cssKey(key);
              return (
                <linearGradient
                  id={`${chartId}-fill-${name}`}
                  key={`fill-${name}`}
                  x1="0"
                  x2="0"
                  y1="1"
                  y2="0"
                >
                  <stop
                    offset="0%"
                    stopColor={`color-mix(in oklab, var(--color-${name}) 55%, black)`}
                  />
                  <stop offset="100%" stopColor={`var(--color-${name})`} />
                </linearGradient>
              );
            })}
            {entries.map(([key]) => {
              const name = cssKey(key);
              return (
                <linearGradient
                  id={`${chartId}-area-${name}`}
                  key={`area-${name}`}
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={`var(--color-${name})`}
                    stopOpacity={0.5}
                  />
                  <stop
                    offset="95%"
                    stopColor={`var(--color-${name})`}
                    stopOpacity={0.04}
                  />
                </linearGradient>
              );
            })}
          </defs>
        </svg>
        <ResponsiveContainer {...responsiveProps}>
          {children}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Payload helpers
// ---------------------------------------------------------------------------

type PayloadEntry = TooltipPayloadEntry | LegendPayload;

function readString(source: unknown, key: string) {
  if (source && typeof source === "object" && key in source) {
    const value = (source as Record<string, unknown>)[key];
    return typeof value === "string" ? value : undefined;
  }
}

/** The config entry for a tooltip or legend item. */
function getItemConfig(config: ChartConfig, item: PayloadEntry, key: string) {
  const configKey =
    readString(item, key) ?? readString(item.payload, key) ?? key;
  return config[configKey] ?? config[key];
}

// ---------------------------------------------------------------------------
// ChartTooltip
// ---------------------------------------------------------------------------

/** Recharts' `Tooltip`; pass `content={<ChartTooltipContent />}`. */
const ChartTooltip = Tooltip;

type ValueFormatter = (
  value: TooltipPayloadEntry["value"],
  name: TooltipPayloadEntry["name"],
  item: TooltipPayloadEntry,
  index: number,
  payload: TooltipPayload
) => React.ReactNode;

// Recharts clones `content` with its own props, so only these reach the DOM.
interface ChartTooltipContentProps
  extends Pick<React.ComponentProps<"div">, "className" | "style"> {
  active?: boolean;
  /** Overrides the indicator colour for every row. */
  color?: string;
  /** Replaces each row's value and name. */
  formatter?: ValueFormatter;
  /** @default false */
  hideIndicator?: boolean;
  /** @default false */
  hideLabel?: boolean;
  /**
   * `dot` for points and slices, `line` for a bar beside each row, `dashed`
   * for dashed series.
   * @default "dot"
   */
  indicator?: "dot" | "line" | "dashed";
  label?: React.ReactNode;
  labelClassName?: string;
  labelFormatter?: (
    label: React.ReactNode,
    payload: TooltipPayload
  ) => React.ReactNode;
  /** Payload field holding the config key for the label. */
  labelKey?: string;
  /** Payload field holding the config key for each row's name. */
  nameKey?: string;
  payload?: TooltipPayload;
}

/** A small raised card listing the hovered series. */
function ChartTooltipContent({
  active,
  className,
  color,
  formatter,
  hideIndicator = false,
  hideLabel = false,
  indicator = "dot",
  label,
  labelClassName,
  labelFormatter,
  labelKey,
  nameKey,
  payload,
  style,
}: ChartTooltipContentProps) {
  const { config } = useChart();

  if (!(active && payload?.length)) {
    return null;
  }

  let heading: React.ReactNode = null;
  if (!hideLabel) {
    const [first] = payload;
    const key = `${labelKey ?? first?.dataKey ?? first?.name ?? "value"}`;
    const itemConfig = first ? getItemConfig(config, first, key) : undefined;
    const value =
      !labelKey && typeof label === "string"
        ? (config[label]?.label ?? label)
        : itemConfig?.label;
    const content = labelFormatter ? labelFormatter(value, payload) : value;
    heading = content ? (
      <div className={cn("font-medium", labelClassName)}>{content}</div>
    ) : null;
  }

  // A single line or dashed row carries the heading beside its value.
  const nested = payload.length === 1 && indicator !== "dot";
  const topHeading = nested ? null : heading;
  const rowHeading = nested ? heading : null;

  return (
    <div
      className={cn(
        "inset-shadow-neu-flat grid min-w-32 items-start gap-1.5 rounded-xl bg-neu-convex px-3 py-2 text-foreground text-xs shadow-neu",
        className
      )}
      data-slot="chart-tooltip"
      style={style}
    >
      {topHeading}
      <div className="grid gap-1.5">
        {payload
          .filter((item) => item.type !== "none")
          .map((item, index) => (
            <TooltipRow
              color={color}
              config={config}
              formatter={formatter}
              heading={rowHeading}
              hideIndicator={hideIndicator}
              index={index}
              indicator={indicator}
              item={item}
              key={`${item.dataKey ?? item.name ?? index}`}
              nameKey={nameKey}
              nested={nested}
              payload={payload}
            />
          ))}
      </div>
    </div>
  );
}

interface TooltipRowProps
  extends Pick<
    ChartTooltipContentProps,
    "color" | "formatter" | "hideIndicator" | "indicator" | "nameKey"
  > {
  config: ChartConfig;
  heading: React.ReactNode;
  index: number;
  item: TooltipPayloadEntry;
  nested: boolean;
  payload: TooltipPayload;
}

function formatValue(value: TooltipPayloadEntry["value"]) {
  return typeof value === "number" ? value.toLocaleString() : `${value}`;
}

function TooltipRow({
  color,
  config,
  formatter,
  heading,
  hideIndicator,
  index,
  indicator,
  item,
  nameKey,
  nested,
  payload,
}: TooltipRowProps) {
  const key = `${nameKey ?? item.name ?? item.dataKey ?? "value"}`;
  const itemConfig = getItemConfig(config, item, key);
  const Icon = itemConfig?.icon;
  const indicatorColor =
    color ??
    itemConfig?.color ??
    readString(item.payload, "fill") ??
    item.color ??
    item.fill;
  const custom =
    formatter && item.value !== undefined && item.name !== undefined;

  let marker: React.ReactNode = null;
  if (Icon) {
    marker = <Icon />;
  } else if (!hideIndicator) {
    marker = (
      <span
        className={cn(
          "shrink-0 rounded-[2px] border-(--indicator) bg-(--indicator)",
          indicator === "dot" && "size-2.5 rounded-full",
          indicator === "line" && "w-1",
          indicator === "dashed" &&
            "w-0 border-[1.5px] border-dashed bg-transparent",
          nested && indicator === "dashed" && "my-0.5"
        )}
        data-slot="chart-tooltip-indicator"
        style={{ "--indicator": indicatorColor } as React.CSSProperties}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex w-full flex-wrap items-stretch gap-2 [&>svg]:size-3 [&>svg]:text-muted-foreground",
        indicator === "dot" && "items-center"
      )}
      data-slot="chart-tooltip-item"
    >
      {custom ? (
        formatter?.(item.value, item.name, item, index, payload)
      ) : (
        <>
          {marker}
          <div
            className={cn(
              "flex flex-1 justify-between gap-4 leading-none",
              nested ? "items-end" : "items-center"
            )}
          >
            <div className="grid gap-1.5">
              {heading}
              <span className="text-muted-foreground">
                {itemConfig?.label ?? item.name}
              </span>
            </div>
            {item.value === undefined ? null : (
              <span className="font-medium font-mono tabular-nums">
                {formatValue(item.value)}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// ChartLegend
// ---------------------------------------------------------------------------

/** Recharts' `Legend`; pass `content={<ChartLegendContent />}`. */
const ChartLegend = Legend;

interface ChartLegendContentProps
  extends Pick<React.ComponentProps<"div">, "className" | "style"> {
  /** @default false */
  hideIcon?: boolean;
  /** Payload field holding the config key for each entry. */
  nameKey?: string;
  payload?: readonly LegendPayload[];
  /** @default "bottom" */
  verticalAlign?: "top" | "middle" | "bottom";
}

/** A row of colour swatches (or config icons) and labels. */
function ChartLegendContent({
  className,
  hideIcon = false,
  nameKey,
  payload,
  style,
  verticalAlign = "bottom",
}: ChartLegendContentProps) {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
      data-slot="chart-legend"
      style={style}
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item) => {
          const key = `${nameKey ?? item.dataKey ?? "value"}`;
          const itemConfig = getItemConfig(config, item, key);
          return (
            <div
              className="flex items-center gap-1.5 text-muted-foreground [&>svg]:size-3"
              data-slot="chart-legend-item"
              key={`${item.value}`}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <span
                  className="size-2.5 shrink-0 rounded-full shadow-neu-sm"
                  style={{ backgroundColor: itemConfig?.color ?? item.color }}
                />
              )}
              {itemConfig?.label ?? item.value}
            </div>
          );
        })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  ChartConfig,
  ChartContainerProps,
  ChartLegendContentProps,
  ChartTooltipContentProps,
};
export {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  useChart,
};
