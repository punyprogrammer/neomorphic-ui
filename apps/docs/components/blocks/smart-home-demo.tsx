"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@neomorphic-react/ui/avatar";
import { Badge, BadgeAnchor } from "@neomorphic-react/ui/badge";
import { Button } from "@neomorphic-react/ui/button";
import { Slider } from "@neomorphic-react/ui/slider";
import { Surface } from "@neomorphic-react/ui/surface";
import { Toggle } from "@neomorphic-react/ui/toggle";
import { cn } from "@neomorphic-react/ui/utils";
import {
  Bell,
  Clock3,
  Fan,
  Grid2x2,
  LayoutGrid,
  Monitor,
  Plus,
  Power,
  Settings,
  Snowflake,
  Sun,
  Thermometer,
  User,
  Wifi,
} from "lucide-react";
import { useId, useState } from "react";

import { portrait } from "./images";

const ORANGE =
  "[--slider-fill:oklch(0.7_0.17_50)] [--toggle-on:oklch(0.68_0.17_50)]";

const DEVICES = [
  { key: "tv", label: "Smart Tv", icon: Monitor, active: false },
  { key: "wifi", label: "Wifi", icon: Wifi, active: true },
  { key: "temp", label: "Temperature", icon: Thermometer, active: false },
  { key: "add", label: "Add more", icon: Plus, active: false },
] as const;

const NAV = [
  { key: "home", label: "Home", icon: LayoutGrid },
  { key: "profile", label: "Profile", icon: User },
  { key: "settings", label: "Settings", icon: Settings },
  { key: "alerts", label: "Notifications", icon: Bell },
] as const;

interface SmartHomeDemoProps {
  className?: string;
}

/**
 * Smart-home pair: device dashboard with a temperature slider, and a detail
 * screen with a vertical slider and mode toggles.
 */
function SmartHomeDemo({ className }: SmartHomeDemoProps) {
  const id = useId();
  const [homeTemp, setHomeTemp] = useState(20);
  const [setpoint, setSetpoint] = useState(25);
  const [power, setPower] = useState(true);
  const [cooling, setCooling] = useState(true);
  const [turbo, setTurbo] = useState(false);
  const [nav, setNav] = useState("home");

  return (
    <div
      className={cn("grid w-full gap-8 lg:grid-cols-2", ORANGE, className)}
      data-slot="smart-home-demo"
    >
      <Surface
        className="mx-auto grid w-full max-w-sm gap-6 rounded-[2rem] p-5"
        render={<section aria-labelledby={`${id}-home`} />}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="grid gap-1">
            <h2
              className="font-semibold text-2xl text-foreground tracking-tight"
              id={`${id}-home`}
            >
              Home
            </h2>
            <p className="text-muted-foreground text-sm">
              Your connected rooms
            </p>
          </div>
          <BadgeAnchor>
            <Avatar size="md">
              <AvatarImage alt="" src={portrait(12)} />
              <AvatarFallback>AG</AvatarFallback>
            </Avatar>
            <Badge
              className="bg-[oklch(0.7_0.17_50)] text-white"
              count={3}
              overlap="circular"
              placement="top-end"
              size="sm"
            />
          </BadgeAnchor>
        </div>

        <ul className="grid grid-cols-2 gap-4">
          {DEVICES.map(({ key, label, icon: Icon, active }) => (
            <li key={key}>
              <Surface className="relative grid justify-items-center gap-3 rounded-2xl p-5">
                {active ? (
                  <span
                    aria-hidden="true"
                    className="absolute end-3 top-3 size-2 rounded-full bg-[oklch(0.7_0.17_50)]"
                  />
                ) : null}
                <Icon aria-hidden="true" className="size-7 text-foreground" />
                <span className="font-medium text-foreground text-sm">
                  {label}
                </span>
              </Surface>
            </li>
          ))}
        </ul>

        <div className="grid gap-3">
          <div className="flex items-baseline justify-between">
            <p className="font-medium text-foreground">Temperature</p>
            <p className="font-semibold text-foreground tabular-nums">
              {homeTemp}°C
            </p>
          </div>
          <Slider
            aria-label="Home temperature"
            max={32}
            min={16}
            onValueChange={(value) => setHomeTemp(value as number)}
            size="md"
            value={homeTemp}
          />
          <p className="text-end text-muted-foreground text-xs tabular-nums">
            32°C
          </p>
        </div>

        <NavBar nav={nav} onNavChange={setNav} />
      </Surface>

      <Surface
        className="mx-auto grid w-full max-w-sm gap-6 rounded-[2rem] p-5"
        render={<section aria-labelledby={`${id}-temp`} />}
      >
        <div className="grid gap-1">
          <h2
            className="font-semibold text-2xl text-foreground tracking-tight"
            id={`${id}-temp`}
          >
            Temperature
          </h2>
          <p className="text-muted-foreground text-sm">Living room climate</p>
        </div>

        <div className="grid justify-items-center gap-1 text-center">
          <p className="font-semibold text-5xl text-foreground tabular-nums tracking-tight">
            {setpoint}°c
          </p>
          <p className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <Sun
              aria-hidden="true"
              className="size-4 text-[oklch(0.75_0.14_75)]"
            />
            32°C Outside
          </p>
        </div>

        <div className="grid grid-cols-[auto_1fr] items-stretch gap-6 px-2">
          <div className="grid justify-items-center gap-4 self-center">
            <Toggle
              aria-label="Power"
              className="size-14"
              onPressedChange={setPower}
              pressed={power}
              shape="pill"
            >
              <Power className="size-5" />
            </Toggle>
            <Toggle
              aria-label="Cooling mode"
              onPressedChange={setCooling}
              pressed={cooling}
              shape="rounded"
              size="sm"
            >
              <Snowflake />
            </Toggle>
            <Button
              aria-label="Set timer"
              icon={<Clock3 />}
              shape="rounded"
              size="md"
            />
            <Toggle
              aria-label="Turbo mode"
              onPressedChange={setTurbo}
              pressed={turbo}
              shape="rounded"
              size="sm"
            >
              <Fan />
            </Toggle>
          </div>

          <div className="flex min-h-56 justify-center py-2">
            <Slider
              aria-label="Set temperature"
              className="h-full"
              max={32}
              min={16}
              onValueChange={(value) => setSetpoint(value as number)}
              orientation="vertical"
              size="lg"
              value={setpoint}
            />
          </div>
        </div>

        <NavBar nav={nav} onNavChange={setNav} />
      </Surface>
    </div>
  );
}

function NavBar({
  nav,
  onNavChange,
}: {
  nav: string;
  onNavChange: (key: string) => void;
}) {
  return (
    <nav aria-label="Smart home" className="grid grid-cols-4 gap-3">
      {NAV.map(({ key, label, icon: Icon }) => (
        <Button
          aria-label={label}
          aria-pressed={nav === key}
          className={cn(nav === key && "shadow-neu-lg")}
          icon={
            key === "home" ? (
              <Grid2x2 className="size-5" />
            ) : (
              <Icon className="size-5" />
            )
          }
          key={key}
          onClick={() => onNavChange(key)}
          shape="rounded"
          size="md"
        />
      ))}
    </nav>
  );
}

export type { SmartHomeDemoProps };
export { SmartHomeDemo };
