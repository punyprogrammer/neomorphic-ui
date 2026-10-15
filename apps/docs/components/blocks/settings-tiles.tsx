"use client";

import { Slider, SliderLabel, SliderValue } from "@neomorphic-react/ui/slider";
import { Surface } from "@neomorphic-react/ui/surface";
import { Switch } from "@neomorphic-react/ui/switch";
import { Toggle } from "@neomorphic-react/ui/toggle";
import { cn } from "@neomorphic-react/ui/utils";
import {
  Bluetooth,
  Fingerprint,
  type LucideIcon,
  Moon,
  Plane,
  Sun,
  Wifi,
} from "lucide-react";
import { useId, useState } from "react";

type TileKey = "touchId" | "airplane" | "wifi" | "bluetooth";

// Kit hues darkened to 3:1 on the surface, so colour still marks "on".
const TILES: { key: TileKey; label: string; icon: LucideIcon; tone: string }[] =
  [
    {
      key: "touchId",
      label: "Touch ID",
      icon: Fingerprint,
      tone: "[--toggle-on:oklch(0.52_0.14_150)]",
    },
    {
      key: "airplane",
      label: "Airplane mode",
      icon: Plane,
      tone: "[--toggle-on:oklch(0.52_0.14_240)]",
    },
    {
      key: "wifi",
      label: "Wi-Fi",
      icon: Wifi,
      tone: "[--toggle-on:oklch(0.5_0.17_262)]",
    },
    {
      key: "bluetooth",
      label: "Bluetooth",
      icon: Bluetooth,
      tone: "[--toggle-on:oklch(0.5_0.17_262)]",
    },
  ];

type Settings = Record<TileKey, boolean>;

const DEFAULTS: Settings = {
  touchId: true,
  airplane: false,
  wifi: true,
  bluetooth: true,
};

// Radios go off with airplane mode, as on a phone.
const RADIOS: TileKey[] = ["wifi", "bluetooth"];

function applyToggle(settings: Settings, key: TileKey, on: boolean): Settings {
  const next = { ...settings, [key]: on };
  if (key === "airplane" && on) {
    for (const radio of RADIOS) {
      next[radio] = false;
    }
  }
  if (RADIOS.includes(key) && on) {
    next.airplane = false;
  }
  return next;
}

interface SettingsTilesProps {
  className?: string;
  defaultSettings?: Partial<Settings>;
  /** Called with every setting after any change. */
  onSettingsChange?: (settings: Settings) => void;
}

/**
 * The kit's combined widgets (`3:71`): Touch ID and airplane-mode tiles, as
 * large rounded `Toggle`s that sink and colour when on, plus a brightness
 * `Slider` and a dark-mode `Switch`.
 */
function SettingsTiles({
  className,
  defaultSettings,
  onSettingsChange,
}: SettingsTilesProps) {
  const id = useId();
  const [settings, setSettings] = useState<Settings>({
    ...DEFAULTS,
    ...defaultSettings,
  });

  function toggle(key: TileKey, on: boolean) {
    const next = applyToggle(settings, key, on);
    setSettings(next);
    onSettingsChange?.(next);
  }

  return (
    <section
      aria-labelledby={`${id}-title`}
      className={cn("grid w-full max-w-md gap-6", className)}
    >
      <h2 className="sr-only" id={`${id}-title`}>
        Quick settings
      </h2>
      <div className="grid grid-cols-2 gap-6">
        {TILES.map(({ key, label, icon: Icon, tone }) => (
          <Surface
            className="flex items-center gap-4 rounded-2xl p-4"
            key={key}
          >
            <Toggle
              aria-label={label}
              className={cn("size-14 shrink-0", tone)}
              onPressedChange={(on) => toggle(key, on)}
              pressed={settings[key]}
              shape="rounded"
            >
              <Icon className="size-6" />
            </Toggle>
            <span
              aria-hidden="true"
              className="font-medium text-muted-foreground text-xs uppercase leading-snug tracking-wide"
              data-slot="tile-status"
            >
              {label}
              <br />
              <span className={settings[key] ? "text-foreground" : undefined}>
                {settings[key] ? "Active" : "Inactive"}
              </span>
            </span>
          </Surface>
        ))}
      </div>

      <Surface className="grid gap-5 rounded-2xl p-5">
        <Slider defaultValue={70}>
          <div className="flex items-center justify-between">
            <SliderLabel className="flex items-center gap-2">
              <Sun aria-hidden="true" className="size-4" />
              Brightness
            </SliderLabel>
            <SliderValue />
          </div>
        </Slider>
        <label className="flex cursor-pointer items-center gap-2 font-medium text-foreground text-sm">
          <Moon aria-hidden="true" className="size-4" />
          <span className="flex-1">Night shift</span>
          <Switch />
        </label>
      </Surface>
    </section>
  );
}

export type { Settings, SettingsTilesProps };
export { SettingsTiles };
