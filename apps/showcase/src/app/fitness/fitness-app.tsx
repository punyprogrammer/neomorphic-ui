"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@neomorphic-react/ui/avatar";
import {
  BarMeter,
  BarMeterItem,
  BarMeterLabel,
  BarMeterValue,
} from "@neomorphic-react/ui/bar-meter";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@neomorphic-react/ui/chart";
import { Chip } from "@neomorphic-react/ui/chip";
import { Dial } from "@neomorphic-react/ui/dial";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@neomorphic-react/ui/item";
import { Progress, ProgressLabel } from "@neomorphic-react/ui/progress";
import { Slider, SliderLabel, SliderValue } from "@neomorphic-react/ui/slider";
import { Switch } from "@neomorphic-react/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@neomorphic-react/ui/tabs";
import { toast } from "@neomorphic-react/ui/toast";
import { Toggle } from "@neomorphic-react/ui/toggle";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@neomorphic-react/ui/toggle-group";
import {
  BellRing,
  Bike,
  Check,
  Dumbbell,
  Flame,
  Footprints,
  GlassWater,
  Heart,
  Moon,
  Play,
  Timer,
  Waves,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { PageHeader } from "@/components/page-header";
import { PEOPLE, WORKOUTS as WORKOUT_PHOTOS } from "@/lib/photos";

// Component-level overrides: the fill tokens each component reads. Teal for
// movement, a soft coral only where effort or heat is the point.
const TEAL =
  "[--progress-fill:oklch(0.58_0.1_172)] [--slider-fill:oklch(0.58_0.1_172)]";
const CORAL = "[--progress-fill:oklch(0.64_0.14_35)]";
const WEEK_FILL =
  "[--bar-meter-fill-start:oklch(0.58_0.1_172)] [--bar-meter-fill:oklch(0.82_0.09_165)]";

const GOALS = [
  {
    key: "steps",
    label: "Steps",
    icon: Footprints,
    value: 7240,
    goal: 10_000,
    unit: "steps",
    tone: TEAL,
  },
  {
    key: "minutes",
    label: "Active minutes",
    icon: Timer,
    value: 38,
    goal: 45,
    unit: "min",
    tone: TEAL,
  },
  {
    key: "calories",
    label: "Calories burned",
    icon: Flame,
    value: 1820,
    goal: 2400,
    unit: "kcal",
    tone: CORAL,
  },
];

const WEEK = {
  steps: [
    { day: "Mon", value: 8.2 },
    { day: "Tue", value: 11.4 },
    { day: "Wed", value: 6.1 },
    { day: "Thu", value: 7.2 },
    { day: "Fri", value: 9.8 },
    { day: "Sat", value: 12.6 },
    { day: "Sun", value: 4.3 },
  ],
  minutes: [
    { day: "Mon", value: 42 },
    { day: "Tue", value: 61 },
    { day: "Wed", value: 25 },
    { day: "Thu", value: 38 },
    { day: "Fri", value: 47 },
    { day: "Sat", value: 74 },
    { day: "Sun", value: 18 },
  ],
};

const HEART_RATE = [
  { time: "6am", bpm: 58 },
  { time: "7am", bpm: 92 },
  { time: "8am", bpm: 134 },
  { time: "9am", bpm: 104 },
  { time: "10am", bpm: 76 },
  { time: "11am", bpm: 71 },
  { time: "12pm", bpm: 84 },
  { time: "1pm", bpm: 79 },
  { time: "2pm", bpm: 73 },
  { time: "3pm", bpm: 88 },
];

const heartConfig = {
  bpm: { label: "Heart rate", color: "var(--chart-2)" },
} satisfies ChartConfig;

const WORKOUTS = [
  {
    id: "run",
    title: "Morning tempo run",
    detail: "5.2 km · 28 min · 410 kcal",
    photo: WORKOUT_PHOTOS.run,
    done: true,
  },
  {
    id: "swim",
    title: "Easy swim",
    detail: "1,200 m · 35 min · 320 kcal",
    photo: WORKOUT_PHOTOS.swim,
    done: true,
  },
  {
    id: "strength",
    title: "Upper-body strength",
    detail: "Planned · 6:30 pm · 40 min",
    photo: WORKOUT_PHOTOS.strength,
    done: false,
  },
];

const SESSION_TYPES = [
  { value: "run", label: "Run", icon: Footprints },
  { value: "ride", label: "Ride", icon: Bike },
  { value: "swim", label: "Swim", icon: Waves },
  { value: "lift", label: "Lift", icon: Dumbbell },
];

const number = new Intl.NumberFormat("en-US");

export function FitnessApp() {
  const [range, setRange] = useState<keyof typeof WEEK>("steps");
  const [session, setSession] = useState(["run"]);
  const [duration, setDuration] = useState(45);
  const [favourites, setFavourites] = useState(() => new Set(["run"]));

  const week = WEEK[range];
  const weekMax = range === "steps" ? 14 : 80;
  const sessionLabel =
    SESSION_TYPES.find((type) => type.value === session[0])?.label ?? "Run";

  return (
    <div className="grid min-w-0 gap-10">
      <PageHeader
        actions={
          <>
            <Avatar size="lg">
              <AvatarImage alt="Amara Okafor" src={PEOPLE.amara} />
              <AvatarFallback>AO</AvatarFallback>
            </Avatar>
            <Button
              icon={<Play className="fill-current" />}
              onClick={() =>
                toast.success({
                  title: "Workout started",
                  description: "Tempo run · GPS locked",
                })
              }
              size="lg"
              variant="primary"
            >
              <span className="sm:hidden">Start</span>
              <span className="hidden sm:inline">Start workout</span>
            </Button>
          </>
        }
        description="You're three quarters of the way to today's goals. A short evening session will close the ring."
        eyebrow="Pulse · Thursday, 15 October"
        title="Good afternoon, Amara"
      />

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:row-span-2">
          <CardHeader>
            <CardTitle>Today's goals</CardTitle>
            <CardDescription>Resets at midnight</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-7">
            {GOALS.map(
              ({ key, label, icon: Icon, value, goal, unit, tone }) => (
                <Progress className={tone} key={key} max={goal} value={value}>
                  <div className="flex items-center justify-between gap-3">
                    <ProgressLabel className="flex items-center gap-2">
                      <Icon aria-hidden="true" className="size-4" />
                      {label}
                    </ProgressLabel>
                    <span className="text-muted-foreground text-sm tabular-nums">
                      <span className="font-semibold text-foreground">
                        {number.format(value)}
                      </span>{" "}
                      / {number.format(goal)} {unit}
                    </span>
                  </div>
                </Progress>
              )
            )}

            <Slider className={TEAL} defaultValue={5} max={8} min={0}>
              <div className="flex items-center justify-between">
                <SliderLabel className="flex items-center gap-2">
                  <GlassWater aria-hidden="true" className="size-4" />
                  Water, glasses
                </SliderLabel>
                <SliderValue />
              </div>
            </Slider>
          </CardContent>
          <CardFooter className="grid gap-3 border-0">
            <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
              Reminders
            </p>
            {[
              { label: "Move every hour", icon: BellRing, on: true },
              { label: "Hydration nudges", icon: GlassWater, on: true },
              { label: "Sleep wind-down", icon: Moon, on: false },
            ].map(({ label, icon: Icon, on }) => (
              <label
                className="flex cursor-pointer items-center gap-3 text-foreground text-sm"
                key={label}
              >
                <Icon
                  aria-hidden="true"
                  className="size-4 text-muted-foreground"
                />
                <span className="flex-1">{label}</span>
                <Switch defaultChecked={on} size="sm" />
              </label>
            ))}
          </CardFooter>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>This week</CardTitle>
            <CardDescription>
              {range === "steps"
                ? "Thousands of steps per day"
                : "Active minutes per day"}
            </CardDescription>
            <CardAction>
              <Tabs
                onValueChange={(value) => setRange(value as keyof typeof WEEK)}
                value={range}
              >
                <TabsList aria-label="Measure">
                  <TabsTrigger value="steps">Steps</TabsTrigger>
                  <TabsTrigger value="minutes">Minutes</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardAction>
          </CardHeader>
          <CardContent>
            <BarMeter
              aria-label={
                range === "steps" ? "Steps this week" : "Minutes this week"
              }
              className={`justify-between ${WEEK_FILL}`}
              size="lg"
            >
              {week.map(({ day, value }) => (
                <BarMeterItem
                  format={{ maximumFractionDigits: 1 }}
                  key={day}
                  max={weekMax}
                  min={0}
                  value={value}
                >
                  <BarMeterValue />
                  <BarMeterLabel>{day}</BarMeterLabel>
                </BarMeterItem>
              ))}
            </BarMeter>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Heart rate</CardTitle>
            <CardDescription>
              Resting 58 bpm · peak 134 bpm during your run
            </CardDescription>
            <CardAction>
              <Chip icon={<Heart />} size="sm" variant="inset">
                Zone 2 · 41 min
              </Chip>
            </CardAction>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-56 w-full" config={heartConfig}>
              <AreaChart
                accessibilityLayer
                data={HEART_RATE}
                margin={{ left: 0, right: 8 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  axisLine={false}
                  dataKey="time"
                  tickLine={false}
                  tickMargin={8}
                />
                <YAxis
                  axisLine={false}
                  domain={[40, 150]}
                  tickLine={false}
                  width={32}
                />
                <ChartTooltip
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  dataKey="bpm"
                  fill="var(--area-bpm)"
                  stroke="var(--color-bpm)"
                  strokeWidth={2}
                  type="natural"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Workouts</CardTitle>
            <CardDescription>2 of 3 done today</CardDescription>
          </CardHeader>
          <CardContent>
            <ItemGroup aria-label="Today's workouts" className="gap-4">
              {WORKOUTS.map(({ id, title, detail, photo, done }) => (
                <Item key={id} variant="raised">
                  <ItemMedia variant="image">
                    <Image
                      alt=""
                      className="size-full object-cover"
                      height={96}
                      src={photo.src}
                      width={96}
                    />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{title}</ItemTitle>
                    <ItemDescription>{detail}</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    {done ? (
                      <Chip icon={<Check />} size="sm" variant="success">
                        Done
                      </Chip>
                    ) : (
                      <Chip size="sm" variant="inset">
                        Planned
                      </Chip>
                    )}
                    <Toggle
                      aria-label={`Favourite ${title}`}
                      className="[--toggle-on:oklch(0.58_0.16_20)]"
                      iconFill
                      onPressedChange={(on) =>
                        setFavourites((current) => {
                          const next = new Set(current);
                          if (on) {
                            next.add(id);
                          } else {
                            next.delete(id);
                          }
                          return next;
                        })
                      }
                      pressed={favourites.has(id)}
                      size="sm"
                    >
                      <Heart />
                    </Toggle>
                  </ItemActions>
                </Item>
              ))}
            </ItemGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plan a session</CardTitle>
            <CardDescription>Pick a sport and a duration</CardDescription>
          </CardHeader>
          <CardContent className="grid justify-items-center gap-6">
            <ToggleGroup
              aria-label="Sport"
              onValueChange={(next) => next.length > 0 && setSession(next)}
              value={session}
            >
              {SESSION_TYPES.map(({ value, label, icon: Icon }) => (
                <ToggleGroupItem aria-label={label} key={value} value={value}>
                  <Icon />
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <Dial
              aria-label="Duration in minutes"
              className="[--dial-fill:oklch(0.58_0.1_172)]"
              max={90}
              min={10}
              onValueChange={setDuration}
              size="lg"
              step={5}
              value={duration}
            >
              <span className="grid justify-items-center leading-none">
                <span className="font-semibold text-2xl tabular-nums">
                  {duration}
                </span>
                <span className="text-muted-foreground text-xs">min</span>
              </span>
            </Dial>
          </CardContent>
          <CardFooter>
            <Button
              fullWidth
              onClick={() =>
                toast({
                  title: `${sessionLabel} scheduled`,
                  description: `${duration} minutes, tomorrow at 7:00 am`,
                })
              }
            >
              Schedule {sessionLabel.toLowerCase()}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
