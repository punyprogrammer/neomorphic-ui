"use client";

import {
  BarMeter,
  BarMeterItem,
  BarMeterLabel,
  BarMeterValue,
} from "@neomorphic-react/ui/bar-meter";
import { Separator } from "@neomorphic-react/ui/separator";
import { Surface } from "@neomorphic-react/ui/surface";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@neomorphic-react/ui/toggle-group";
import { cn } from "@neomorphic-react/ui/utils";
import { CloudSun, Droplets, Sun, Wind } from "lucide-react";
import { useId, useState } from "react";

type Unit = "celsius" | "fahrenheit";

interface DayForecast {
  day: string;
  /** The day's high, in °C (bars run from −10 °C to 40 °C). */
  high: number;
}

const WEEK: DayForecast[] = [
  { day: "Mon", high: 24 },
  { day: "Tue", high: 28 },
  { day: "Wed", high: 31 },
  { day: "Thu", high: 26 },
  { day: "Fri", high: 19 },
  { day: "Sat", high: 22 },
  { day: "Sun", high: 29 },
];

// The kit's weather fill: blue at the foot, warming to yellow at the top.
const WEATHER =
  "[--bar-meter-fill-start:oklch(0.62_0.14_245)] [--bar-meter-fill:oklch(0.86_0.16_90)]";

const toUnit = (celsius: number, unit: Unit) =>
  unit === "celsius" ? celsius : Math.round((celsius * 9) / 5 + 32);

interface WeatherWidgetProps {
  city?: string;
  className?: string;
  condition?: string;
  /** Current temperature, in °C. */
  current?: number;
  /** Humidity, as a percentage. */
  humidity?: number;
  /** UV index. */
  uv?: number;
  week?: DayForecast[];
  /** Wind speed, in km/h. */
  wind?: number;
}

/**
 * The kit's weather card (`3:71`): today's reading, a °C/°F switch, today's
 * conditions in a well, and the week's highs as `BarMeter` bars.
 */
function WeatherWidget({
  city = "Kolkata",
  className,
  condition = "Partly cloudy",
  current = 24,
  humidity = 62,
  uv = 5,
  week = WEEK,
  wind = 12,
}: WeatherWidgetProps) {
  const id = useId();
  const [unit, setUnit] = useState<Unit>("celsius");
  const format = { style: "unit", unit } as const;
  const symbol = unit === "celsius" ? "°C" : "°F";

  return (
    <Surface
      className={cn("grid w-full max-w-md gap-6 rounded-3xl p-6", className)}
      render={<section aria-labelledby={`${id}-city`} />}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="grid gap-1">
          <h2 className="font-medium text-foreground text-sm" id={`${id}-city`}>
            {city}
          </h2>
          <p className="font-medium text-5xl text-foreground tabular-nums">
            {toUnit(current, unit)}°<span className="sr-only">{symbol}</span>
          </p>
          <p className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <CloudSun aria-hidden="true" className="size-4" />
            {condition}
          </p>
        </div>
        <ToggleGroup
          aria-label="Temperature unit"
          onValueChange={(next) => next.length > 0 && setUnit(next[0] as Unit)}
          shape="pill"
          size="sm"
          value={[unit]}
        >
          <ToggleGroupItem
            aria-label="Celsius"
            className="px-3"
            value="celsius"
          >
            °C
          </ToggleGroupItem>
          <ToggleGroupItem
            aria-label="Fahrenheit"
            className="px-3"
            value="fahrenheit"
          >
            °F
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <Surface
        className="flex items-center justify-around rounded-2xl px-4 py-3 text-sm"
        depth="sm"
        elevation="inset"
        render={<dl />}
      >
        <div className="grid justify-items-center gap-1">
          <dt className="flex items-center gap-1 text-muted-foreground text-xs">
            <Droplets aria-hidden="true" className="size-3.5" />
            Humidity
          </dt>
          <dd className="font-medium text-foreground tabular-nums">
            {humidity}%
          </dd>
        </div>
        <Separator className="h-8" orientation="vertical" />
        <div className="grid justify-items-center gap-1">
          <dt className="flex items-center gap-1 text-muted-foreground text-xs">
            <Wind aria-hidden="true" className="size-3.5" />
            Wind
          </dt>
          <dd className="font-medium text-foreground tabular-nums">
            {wind} km/h
          </dd>
        </div>
        <Separator className="h-8" orientation="vertical" />
        <div className="grid justify-items-center gap-1">
          <dt className="flex items-center gap-1 text-muted-foreground text-xs">
            <Sun aria-hidden="true" className="size-3.5" />
            UV
          </dt>
          <dd className="font-medium text-foreground tabular-nums">{uv}</dd>
        </div>
      </Surface>

      <BarMeter
        aria-label="Highs this week"
        className={cn("justify-between", WEATHER)}
      >
        {week.map(({ day, high }) => (
          <BarMeterItem
            format={format}
            key={day}
            max={toUnit(40, unit)}
            min={toUnit(-10, unit)}
            value={toUnit(high, unit)}
          >
            <BarMeterValue />
            <BarMeterLabel>{day}</BarMeterLabel>
          </BarMeterItem>
        ))}
      </BarMeter>
    </Surface>
  );
}

export type { DayForecast, WeatherWidgetProps };
export { WeatherWidget };
