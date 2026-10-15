"use client";

import {
  BarMeter,
  BarMeterItem,
  BarMeterLabel,
  BarMeterValue,
} from "@neomorphic-react/ui/bar-meter";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { Chip } from "@neomorphic-react/ui/chip";
import { Dial } from "@neomorphic-react/ui/dial";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@neomorphic-react/ui/progress";
import { Separator } from "@neomorphic-react/ui/separator";
import { Slider, SliderLabel, SliderValue } from "@neomorphic-react/ui/slider";
import { Surface } from "@neomorphic-react/ui/surface";
import { Switch } from "@neomorphic-react/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@neomorphic-react/ui/tabs";
import { toast } from "@neomorphic-react/ui/toast";
import { Toggle } from "@neomorphic-react/ui/toggle";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@neomorphic-react/ui/toggle-group";
import { cn } from "@neomorphic-react/ui/utils";
import {
  AirVent,
  Blinds,
  Camera,
  Droplets,
  Fan,
  Flame,
  Lamp,
  Lightbulb,
  Lock,
  type LucideIcon,
  Moon,
  Popcorn,
  Power,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Speaker,
  Sun,
  Sunrise,
  Thermometer,
  Tv,
  Wind,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { PageHeader } from "@/components/page-header";
import { INTERIORS, type Photo } from "@/lib/photos";

type Room = "living" | "bedroom" | "kitchen";
type Mode = "heat" | "cool" | "auto" | "off";

// The dial's arc carries the mode: amber while heating, ice blue while
// cooling, the theme's primary otherwise. Colour only where it says something.
const MODE_FILL: Record<Mode, string> = {
  heat: "[--dial-fill:oklch(0.68_0.14_60)]",
  cool: "[--dial-fill:oklch(0.62_0.1_230)]",
  auto: "[--dial-fill:var(--color-primary)]",
  off: "[--dial-fill:var(--color-muted-foreground)]",
};

const LIGHT_ON = "[--toggle-on:oklch(0.62_0.13_75)]";

interface Device {
  icon: LucideIcon;
  key: string;
  label: string;
  tone?: string;
}

const DEVICES: Record<Room, Device[]> = {
  living: [
    { key: "ceiling", label: "Ceiling light", icon: Lightbulb, tone: LIGHT_ON },
    { key: "lamp", label: "Floor lamp", icon: Lamp, tone: LIGHT_ON },
    { key: "tv", label: "Television", icon: Tv },
    { key: "speaker", label: "Speaker", icon: Speaker },
    { key: "purifier", label: "Air purifier", icon: AirVent },
    { key: "blinds", label: "Blinds", icon: Blinds },
  ],
  bedroom: [
    { key: "ceiling", label: "Ceiling light", icon: Lightbulb, tone: LIGHT_ON },
    { key: "lamp", label: "Bedside lamp", icon: Lamp, tone: LIGHT_ON },
    { key: "fan", label: "Ceiling fan", icon: Fan },
    { key: "blinds", label: "Blinds", icon: Blinds },
  ],
  kitchen: [
    { key: "ceiling", label: "Pendants", icon: Lightbulb, tone: LIGHT_ON },
    { key: "hood", label: "Extractor", icon: Wind },
    { key: "speaker", label: "Speaker", icon: Speaker },
  ],
};

const INITIAL_ON: Record<Room, string[]> = {
  living: ["ceiling", "speaker", "purifier"],
  bedroom: ["lamp"],
  kitchen: ["ceiling"],
};

const SCENES = [
  { value: "morning", label: "Morning", icon: Sunrise },
  { value: "focus", label: "Focus", icon: Sparkles },
  { value: "movie", label: "Movie", icon: Popcorn },
  { value: "sleep", label: "Sleep", icon: Moon },
];

const MODES: { value: Mode; label: string; icon: LucideIcon }[] = [
  { value: "heat", label: "Heat", icon: Flame },
  { value: "cool", label: "Cool", icon: Snowflake },
  { value: "auto", label: "Auto", icon: Thermometer },
  { value: "off", label: "Off", icon: Power },
];

const ENERGY = [
  { day: "Mon", kwh: 11.2 },
  { day: "Tue", kwh: 9.6 },
  { day: "Wed", kwh: 12.8 },
  { day: "Thu", kwh: 8.4 },
  { day: "Fri", kwh: 10.1 },
  { day: "Sat", kwh: 14.3 },
  { day: "Sun", kwh: 13.0 },
];

const kwh = { maximumFractionDigits: 0 } as const;

const ROOM_LABEL: Record<Room, string> = {
  living: "Living room",
  bedroom: "Bedroom",
  kitchen: "Kitchen",
};

const ROOM_CAMERA: Record<Room, Photo> = {
  living: INTERIORS.whiteSofa,
  bedroom: INTERIORS.bedroomCalm,
  kitchen: INTERIORS.kitchen,
};

export function SmartHome() {
  const [room, setRoom] = useState<Room>("living");
  const [on, setOn] = useState(INITIAL_ON);
  const [scene, setScene] = useState<string[]>([]);
  const [mode, setMode] = useState<Mode>("heat");
  const [target, setTarget] = useState(22);
  const [warmth, setWarmth] = useState(2700);

  const devices = DEVICES[room];
  const activeCount = Object.values(on).flat().length;

  function toggleDevice(key: string, pressed: boolean) {
    setOn((current) => ({
      ...current,
      [room]: pressed
        ? [...current[room], key]
        : current[room].filter((k) => k !== key),
    }));
  }

  return (
    <div className="grid gap-10">
      <PageHeader
        actions={
          <ToggleGroup
            aria-label="Scene"
            onValueChange={(next) => {
              setScene(next);
              const chosen = SCENES.find((s) => s.value === next[0]);
              if (chosen) {
                toast({ title: `${chosen.label} scene on` });
              }
            }}
            value={scene}
          >
            {SCENES.map(({ value, label, icon: Icon }) => (
              <ToggleGroupItem className="px-4" key={value} value={value}>
                <Icon />
                <span className="hidden sm:inline">{label}</span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        }
        description={`Inside 21.5°, outside 17° and clear. ${activeCount} devices are on.`}
        eyebrow="Haven · Home"
        title="Good evening"
      />

      <Tabs onValueChange={(value) => setRoom(value as Room)} value={room}>
        <TabsList aria-label="Room">
          <TabsTrigger value="living">Living room</TabsTrigger>
          <TabsTrigger value="bedroom">Bedroom</TabsTrigger>
          <TabsTrigger value="kitchen">Kitchen</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:row-span-2">
          <CardHeader>
            <CardTitle>Climate</CardTitle>
            <CardDescription>
              {mode === "off"
                ? "Heating and cooling are off"
                : `Holding ${target}° in the ${room === "living" ? "living room" : room}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid justify-items-center gap-8">
            <Dial
              aria-label="Target temperature"
              className={MODE_FILL[mode]}
              disabled={mode === "off"}
              getAriaValueText={(value) => `${value} degrees`}
              max={30}
              min={16}
              onValueChange={setTarget}
              size="lg"
              step={0.5}
              value={target}
            >
              <span className="grid justify-items-center leading-none">
                <span className="font-semibold text-3xl tabular-nums">
                  {target}°
                </span>
                <span className="mt-1 text-muted-foreground text-xs">
                  target
                </span>
              </span>
            </Dial>

            <ToggleGroup
              aria-label="Mode"
              onValueChange={(next) =>
                next.length > 0 && setMode(next[0] as Mode)
              }
              value={[mode]}
            >
              {MODES.map(({ value, label, icon: Icon }) => (
                <ToggleGroupItem aria-label={label} key={value} value={value}>
                  <Icon />
                </ToggleGroupItem>
              ))}
            </ToggleGroup>

            <Surface
              className="flex w-full items-center justify-around rounded-2xl px-4 py-3 text-sm"
              depth="sm"
              elevation="inset"
              render={<dl />}
            >
              <div className="grid justify-items-center gap-1">
                <dt className="flex items-center gap-1 text-muted-foreground text-xs">
                  <Thermometer aria-hidden="true" className="size-3.5" />
                  Now
                </dt>
                <dd className="font-medium text-foreground tabular-nums">
                  21.5°
                </dd>
              </div>
              <Separator className="h-8" orientation="vertical" />
              <div className="grid justify-items-center gap-1">
                <dt className="flex items-center gap-1 text-muted-foreground text-xs">
                  <Droplets aria-hidden="true" className="size-3.5" />
                  Humidity
                </dt>
                <dd className="font-medium text-foreground tabular-nums">
                  46%
                </dd>
              </div>
              <Separator className="h-8" orientation="vertical" />
              <div className="grid justify-items-center gap-1">
                <dt className="flex items-center gap-1 text-muted-foreground text-xs">
                  <Wind aria-hidden="true" className="size-3.5" />
                  Air
                </dt>
                <dd className="font-medium text-foreground">Good</dd>
              </div>
            </Surface>
          </CardContent>
        </Card>

        <section
          aria-label="Devices"
          className="grid grid-cols-2 content-start gap-6 lg:col-span-2 xl:grid-cols-3"
        >
          {devices.map(({ key, label, icon: Icon, tone }) => {
            const pressed = on[room].includes(key);
            return (
              <Surface
                className="flex items-center gap-4 p-4"
                key={`${room}-${key}`}
              >
                <Toggle
                  aria-label={label}
                  className={cn("size-14 shrink-0", tone)}
                  onPressedChange={(next) => toggleDevice(key, next)}
                  pressed={pressed}
                  shape="rounded"
                >
                  <Icon className="size-6" />
                </Toggle>
                <span aria-hidden="true" className="grid gap-0.5 text-sm">
                  <span className="font-medium text-foreground">{label}</span>
                  <span className="text-muted-foreground text-xs">
                    {pressed ? "On" : "Off"}
                  </span>
                </span>
              </Surface>
            );
          })}
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Lighting</CardTitle>
            <CardDescription>
              Applies to every light in the room
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <Slider
              className="[--slider-fill:oklch(0.7_0.12_80)]"
              defaultValue={70}
            >
              <div className="flex items-center justify-between">
                <SliderLabel className="flex items-center gap-2">
                  <Sun aria-hidden="true" className="size-4" />
                  Brightness
                </SliderLabel>
                <SliderValue />
              </div>
            </Slider>
            <Slider
              className="[--slider-fill:oklch(0.72_0.11_65)]"
              aria-valuetext={`${warmth} kelvin`}
              max={6500}
              min={2200}
              onValueChange={(value) => setWarmth(value as number)}
              step={100}
              value={warmth}
            >
              <div className="flex items-center justify-between">
                <SliderLabel>Colour temperature</SliderLabel>
                <span className="text-muted-foreground text-sm tabular-nums">
                  {warmth} K
                </span>
              </div>
            </Slider>
            <label className="flex cursor-pointer items-center gap-3 text-foreground text-sm">
              <Sparkles
                aria-hidden="true"
                className="size-4 text-muted-foreground"
              />
              <span className="flex-1">Adaptive lighting</span>
              <Switch defaultChecked />
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Energy</CardTitle>
            <CardDescription>Kilowatt-hours per day</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <BarMeter
              aria-label="Energy use this week"
              className="justify-between [--bar-meter-fill-start:oklch(0.55_0.08_235)] [--bar-meter-fill:oklch(0.8_0.06_225)]"
              size="sm"
            >
              {ENERGY.map(({ day, kwh: value }) => (
                <BarMeterItem
                  format={kwh}
                  key={day}
                  max={16}
                  min={0}
                  value={value}
                >
                  <BarMeterValue />
                  <BarMeterLabel>{day}</BarMeterLabel>
                </BarMeterItem>
              ))}
            </BarMeter>
            <Progress
              className="[--progress-fill:oklch(0.7_0.12_80)]"
              size="sm"
              value={64}
            >
              <div className="flex justify-between">
                <ProgressLabel>Covered by solar</ProgressLabel>
                <ProgressValue />
              </div>
            </Progress>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardAction>
              <Chip icon={<ShieldCheck />} size="sm" variant="inset">
                All secure
              </Chip>
            </CardAction>
          </CardHeader>
          <CardContent className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
            <Surface className="relative p-1.5" elevation="inset">
              <span className="relative block aspect-[16/7] overflow-hidden rounded-[calc(var(--radius)*0.8)]">
                <Image
                  alt={ROOM_CAMERA[room].alt}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 640px, 100vw"
                  src={ROOM_CAMERA[room].src}
                />
              </span>
              <Chip
                className="absolute start-4 top-4 bg-background/90"
                icon={<Camera />}
                size="sm"
              >
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-rose-500"
                />
                Live · {ROOM_LABEL[room]}
              </Chip>
            </Surface>
            <div className="grid gap-5">
              {[
                { label: "Front door locked", icon: Lock, checked: true },
                { label: "Cameras recording", icon: Camera, checked: true },
                { label: "Night alarm", icon: Moon, checked: false },
              ].map(({ label, icon: Icon, checked }) => (
                <label
                  className="flex cursor-pointer items-center gap-3 text-foreground text-sm"
                  key={label}
                >
                  <Icon
                    aria-hidden="true"
                    className="size-4 text-muted-foreground"
                  />
                  <span className="flex-1">{label}</span>
                  <Switch defaultChecked={checked} />
                </label>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
