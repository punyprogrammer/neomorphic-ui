"use client";

import { Badge } from "@neomorphic-react/ui/badge";
import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { Checkbox } from "@neomorphic-react/ui/checkbox";
import { Chip } from "@neomorphic-react/ui/chip";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@neomorphic-react/ui/code-block";
import { Dial } from "@neomorphic-react/ui/dial";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@neomorphic-react/ui/input-group";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@neomorphic-react/ui/progress";
import { RadioGroup, RadioGroupItem } from "@neomorphic-react/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@neomorphic-react/ui/select";
import { Slider, SliderLabel } from "@neomorphic-react/ui/slider";
import { Surface } from "@neomorphic-react/ui/surface";
import { Switch } from "@neomorphic-react/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@neomorphic-react/ui/tabs";
import { Toggle } from "@neomorphic-react/ui/toggle";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@neomorphic-react/ui/toggle-group";
import {
  Bell,
  Check,
  CircleCheck,
  Clock,
  Heart,
  RotateCcw,
  Search,
  Star,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { PageHeader } from "@/components/page-header";
import { contrast, type Oklch, oklch } from "@/lib/contrast";

interface ThemeParams {
  depth: number;
  font: FontKey;
  hue: number;
  lightness: number;
  primaryChroma: number;
  primaryHue: number;
  primaryLightness: number;
  radius: number;
  shadow: number;
  tint: number;
}

type FontKey =
  | "inter"
  | "manrope"
  | "jakarta"
  | "plex-sans"
  | "dm-sans"
  | "poppins";

const FONTS: { value: FontKey; label: string }[] = [
  { value: "inter", label: "Inter" },
  { value: "manrope", label: "Manrope" },
  { value: "jakarta", label: "Plus Jakarta Sans" },
  { value: "plex-sans", label: "IBM Plex Sans" },
  { value: "dm-sans", label: "DM Sans" },
  { value: "poppins", label: "Poppins" },
];

// The same values as the page themes in themes.css.
const PRESETS: Record<string, ThemeParams> = {
  porcelain: {
    lightness: 0.962,
    tint: 0.004,
    hue: 265,
    primaryHue: 262,
    primaryChroma: 0.02,
    primaryLightness: 0.4,
    depth: 2,
    radius: 0.75,
    shadow: 0.24,
    font: "inter",
  },
  sage: {
    lightness: 0.966,
    tint: 0.007,
    hue: 165,
    primaryHue: 172,
    primaryChroma: 0.09,
    primaryLightness: 0.47,
    depth: 2.5,
    radius: 1,
    shadow: 0.24,
    font: "manrope",
  },
  lilac: {
    lightness: 0.968,
    tint: 0.005,
    hue: 295,
    primaryHue: 285,
    primaryChroma: 0.11,
    primaryLightness: 0.47,
    depth: 2,
    radius: 1.1,
    shadow: 0.22,
    font: "jakarta",
  },
  graphite: {
    lightness: 0.968,
    tint: 0.003,
    hue: 250,
    primaryHue: 255,
    primaryChroma: 0.05,
    primaryLightness: 0.42,
    depth: 1.5,
    radius: 0.5,
    shadow: 0.22,
    font: "plex-sans",
  },
  linen: {
    lightness: 0.97,
    tint: 0.007,
    hue: 80,
    primaryHue: 55,
    primaryChroma: 0.035,
    primaryLightness: 0.38,
    depth: 2,
    radius: 0.75,
    shadow: 0.22,
    font: "dm-sans",
  },
  mist: {
    lightness: 0.963,
    tint: 0.007,
    hue: 225,
    primaryHue: 235,
    primaryChroma: 0.08,
    primaryLightness: 0.46,
    depth: 3,
    radius: 1.25,
    shadow: 0.26,
    font: "poppins",
  },
};

/** Every token the library reads, derived from a handful of parameters. */
function tokens(p: ThemeParams) {
  const surface: Oklch = { l: p.lightness, c: p.tint, h: p.hue };
  const ink = Math.min(p.tint * 4, 0.03);
  const foreground: Oklch = { l: 0.43, c: ink, h: p.hue };
  const mutedForeground: Oklch = { l: 0.52, c: ink, h: p.hue };
  const primary: Oklch = {
    l: p.primaryLightness,
    c: p.primaryChroma,
    h: p.primaryHue,
  };
  const shade: Oklch = { l: 0.4, c: Math.min(p.tint * 7, 0.06), h: p.hue };

  const vars: Record<string, string> = {
    "--background": oklch(surface),
    "--foreground": oklch(foreground),
    "--muted": oklch({ ...surface, l: surface.l - 0.03, c: surface.c * 1.4 }),
    "--muted-foreground": oklch(mutedForeground),
    "--primary": oklch(primary),
    "--border": oklch({ ...surface, l: surface.l - 0.065, c: surface.c * 1.7 }),
    "--neu-dark": oklch(shade, p.shadow),
    "--neu-depth": `${p.depth}px`,
    "--neu-convex-from": oklch({
      ...surface,
      l: Math.min(surface.l + 0.013, 0.995),
      c: surface.c * 0.7,
    }),
    "--neu-convex-to": oklch({
      ...surface,
      l: surface.l - 0.025,
      c: surface.c * 1.4,
    }),
    "--neu-backdrop": oklch(shade, 0.16),
    "--radius": `${p.radius}rem`,
    "--font-sans": `var(--font-${p.font}), ui-sans-serif, system-ui, sans-serif`,
  };

  return {
    vars,
    checks: [
      { label: "Text", ratio: contrast(foreground, surface), min: 4.5 },
      {
        label: "Muted text",
        ratio: contrast(mutedForeground, surface),
        min: 4.5,
      },
      { label: "Primary button", ratio: contrast(surface, primary), min: 4.5 },
    ],
  };
}

const css = (vars: Record<string, string>) =>
  `:root {\n${Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n")}\n}`;

export function ThemeStudio() {
  const [preset, setPreset] = useState<string[]>(["porcelain"]);
  const [params, setParams] = useState<ThemeParams>(
    PRESETS.porcelain as ThemeParams
  );
  const { vars, checks } = useMemo(() => tokens(params), [params]);

  // Runtime theming: tokens on <html> reach every component, portaled
  // popups included. Removed again when leaving the page.
  useEffect(() => {
    const root = document.documentElement;
    for (const [key, value] of Object.entries(vars)) {
      root.style.setProperty(key, value);
    }
    return () => {
      for (const key of Object.keys(vars)) {
        root.style.removeProperty(key);
      }
    };
  }, [vars]);

  function update<K extends keyof ThemeParams>(key: K, value: ThemeParams[K]) {
    setPreset([]);
    setParams((current) => ({ ...current, [key]: value }));
  }

  function choosePreset(name: string) {
    setPreset([name]);
    setParams(PRESETS[name] as ThemeParams);
  }

  const code = css(vars);

  return (
    <div className="grid min-w-0 gap-10">
      <PageHeader
        actions={
          <Button
            icon={<RotateCcw />}
            onClick={() => choosePreset("porcelain")}
          >
            Reset
          </Button>
        }
        description="Every colour, shadow and corner in the library comes from a few CSS variables. Move the controls: the whole page, menus included, re-themes live."
        eyebrow="Runtime theming"
        title="Theme studio"
      />

      <div className="grid items-start gap-8 lg:grid-cols-[22rem_minmax(0,1fr)]">
        <Card className="lg:sticky lg:top-6">
          <CardHeader>
            <CardTitle>Tokens</CardTitle>
            <CardDescription>
              Start from a page theme, then adjust
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <ToggleGroup
              aria-label="Preset"
              className="grid w-full grid-cols-3"
              onValueChange={(next) => next[0] && choosePreset(next[0])}
              size="sm"
              value={preset}
            >
              {Object.keys(PRESETS).map((name) => (
                <ToggleGroupItem className="capitalize" key={name} value={name}>
                  {name}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>

            <Control
              label="Surface hue"
              max={360}
              min={0}
              onChange={(v) => update("hue", v)}
              output={`${params.hue}°`}
              step={1}
              value={params.hue}
            />
            <Control
              label="Surface tint"
              max={0.02}
              min={0}
              onChange={(v) => update("tint", v)}
              output={params.tint.toFixed(3)}
              step={0.001}
              value={params.tint}
            />
            <Control
              label="Surface lightness"
              max={0.985}
              min={0.93}
              onChange={(v) => update("lightness", v)}
              output={params.lightness.toFixed(3)}
              step={0.001}
              value={params.lightness}
            />
            <Control
              label="Primary hue"
              max={360}
              min={0}
              onChange={(v) => update("primaryHue", v)}
              output={`${params.primaryHue}°`}
              step={1}
              value={params.primaryHue}
            />
            <Control
              label="Primary colourfulness"
              max={0.15}
              min={0}
              onChange={(v) => update("primaryChroma", v)}
              output={params.primaryChroma.toFixed(3)}
              step={0.005}
              value={params.primaryChroma}
            />
            <Control
              label="Depth"
              max={5}
              min={0.5}
              onChange={(v) => update("depth", v)}
              output={`${params.depth}px`}
              step={0.25}
              value={params.depth}
            />
            <Control
              label="Shadow strength"
              max={0.45}
              min={0.08}
              onChange={(v) => update("shadow", v)}
              output={`${Math.round(params.shadow * 100)}%`}
              step={0.01}
              value={params.shadow}
            />
            <Control
              label="Radius"
              max={2}
              min={0}
              onChange={(v) => update("radius", v)}
              output={`${params.radius}rem`}
              step={0.125}
              value={params.radius}
            />

            <Select
              items={FONTS}
              onValueChange={(value) => update("font", value as FontKey)}
              value={params.font}
            >
              <SelectTrigger aria-label="Font" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FONTS.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
          <CardFooter className="flex-wrap gap-2">
            {checks.map(({ label, ratio, min }) => {
              const pass = ratio >= min;
              return (
                <Chip
                  icon={pass ? <Check /> : <X />}
                  key={label}
                  size="sm"
                  variant={pass ? "inset" : "destructive"}
                >
                  {label} {ratio.toFixed(1)}:1
                  <span className="sr-only">
                    {pass ? ", passes AA" : ", fails AA"}
                  </span>
                </Chip>
              );
            })}
          </CardFooter>
        </Card>

        <div className="grid gap-8">
          <Preview />
          <CodeBlock>
            <CodeBlockHeader>
              <CodeBlockTitle>theme.css overrides</CodeBlockTitle>
              <CodeBlockActions>
                <CodeBlockCopyButton value={code} />
              </CodeBlockActions>
            </CodeBlockHeader>
            <CodeBlockContent lineNumbers>{code}</CodeBlockContent>
          </CodeBlock>
        </div>
      </div>
    </div>
  );
}

interface ControlProps {
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  output: string;
  step: number;
  value: number;
}

function Control({
  label,
  max,
  min,
  onChange,
  output,
  step,
  value,
}: ControlProps) {
  return (
    <Slider
      max={max}
      min={min}
      onValueChange={(next) => onChange(next as number)}
      size="sm"
      step={step}
      value={value}
    >
      <div className="flex items-center justify-between text-sm">
        <SliderLabel>{label}</SliderLabel>
        <span className="text-muted-foreground tabular-nums">{output}</span>
      </div>
    </Slider>
  );
}

/** A spread of components that read the tokens, to judge a theme by. */
function Preview() {
  const [volume, setVolume] = useState(48);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Controls</CardTitle>
          <CardDescription>
            Raised at rest, pressed in when active
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button>Default</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Toggle aria-label="Like" defaultPressed iconFill>
              <Heart />
            </Toggle>
            <Toggle aria-label="Star" iconFill>
              <Star />
            </Toggle>
            <Toggle aria-label="Notifications" shape="rounded">
              <Bell />
            </Toggle>
            <Switch aria-label="Wi-Fi" defaultChecked />
            <Checkbox aria-label="Agree" defaultChecked />
          </div>
          <RadioGroup className="flex gap-6" defaultValue="weekly">
            {["Daily", "Weekly", "Monthly"].map((label) => (
              <label
                className="flex cursor-pointer items-center gap-2 text-foreground text-sm"
                key={label}
              >
                <RadioGroupItem value={label.toLowerCase()} />
                {label}
              </label>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Inputs</CardTitle>
          <CardDescription>Wells that deepen on focus</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <InputGroup shape="pill">
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput aria-label="Search" placeholder="Search" />
          </InputGroup>
          <Tabs defaultValue="week">
            <TabsList aria-label="Period">
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
          <Progress value={62}>
            <div className="flex justify-between">
              <ProgressLabel>Storage</ProgressLabel>
              <ProgressValue />
            </div>
          </Progress>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Status</CardTitle>
          <CardDescription>Colour kept for meaning</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Chip>Draft</Chip>
          <Chip variant="inset">Archived</Chip>
          <Chip
            className="text-emerald-700"
            icon={<CircleCheck />}
            variant="inset"
          >
            Paid
          </Chip>
          <Chip className="text-amber-700" icon={<Clock />} variant="inset">
            Due soon
          </Chip>
          <Badge count={3} variant="primary" />
          <Badge dot variant="success" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Depth</CardTitle>
          <CardDescription>Raised, flat and inset surfaces</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <Surface className="size-16" />
          <Surface className="size-16" elevation="inset" />
          <Surface className="size-16" shape="circle" depth="lg" />
          <Dial
            aria-label="Volume"
            onValueChange={setVolume}
            size="sm"
            value={volume}
          >
            {volume}
          </Dial>
        </CardContent>
      </Card>
    </div>
  );
}
