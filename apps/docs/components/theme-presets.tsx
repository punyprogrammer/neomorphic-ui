"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { Chip } from "@neomorphic-react/ui/chip";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@neomorphic-react/ui/code-block";
import { Input } from "@neomorphic-react/ui/input";
import { Label } from "@neomorphic-react/ui/label";
import { Progress } from "@neomorphic-react/ui/progress";
import { Slider } from "@neomorphic-react/ui/slider";
import { Switch } from "@neomorphic-react/ui/switch";
import { useHighlightedCode } from "@neomorphic-react/ui/use-highlighted-code";
import { CheckIcon } from "lucide-react";
import type * as React from "react";
import { useEffect, useRef, useState } from "react";
import { ThemePicker } from "@/components/theme-picker";
import type { ThemePreset } from "@/lib/showcase";

const TOKENS = [
  "--background",
  "--foreground",
  "--muted",
  "--muted-foreground",
  "--primary",
  "--border",
  "--neu-dark",
  "--neu-convex-from",
  "--neu-convex-to",
  "--neu-backdrop",
] as const;

/**
 * Try the theme presets on a few components, tune depth and radius, and
 * copy the CSS that reproduces the result.
 */
export function ThemePresets() {
  const [preset, setPreset] = useState<ThemePreset>("porcelain");
  const [depth, setDepth] = useState(2);
  const [radius, setRadius] = useState(0.75);
  const [css, setCss] = useState("");
  const previewRef = useRef<HTMLDivElement>(null);

  // Read the preset's tokens back from the preview, so the CSS shown is
  // exactly what's applied.
  useEffect(() => {
    const element = previewRef.current;
    if (element?.dataset.theme !== preset) {
      return;
    }
    const styles = getComputedStyle(element);
    const lines = TOKENS.map(
      (token) => `  ${token}: ${styles.getPropertyValue(token).trim()};`
    );
    lines.push(`  --neu-depth: ${depth}px;`, `  --radius: ${radius}rem;`);
    setCss(`:root {\n${lines.join("\n")}\n}`);
  }, [depth, preset, radius]);

  const { lines } = useHighlightedCode(css, { language: "css" });

  return (
    <div className="not-prose my-8 grid gap-6">
      <ThemePicker
        className="justify-start"
        onValueChange={setPreset}
        value={preset}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="theme-depth">Depth · {depth}px</Label>
          <Slider
            id="theme-depth"
            max={4}
            min={1}
            onValueChange={(value) => setDepth(value as number)}
            size="sm"
            step={0.5}
            value={depth}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="theme-radius">Radius · {radius}rem</Label>
          <Slider
            id="theme-radius"
            max={1.5}
            min={0.25}
            onValueChange={(value) => setRadius(value as number)}
            size="sm"
            step={0.125}
            value={radius}
          />
        </div>
      </div>
      <div
        className="grid gap-6 rounded-2xl p-6 sm:p-8 lg:grid-cols-[1fr_1fr]"
        data-theme={preset}
        ref={previewRef}
        style={
          {
            "--neu-depth": `${depth}px`,
            "--radius": `${radius}rem`,
          } as React.CSSProperties
        }
      >
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Choose what we send you.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Label className="flex items-center justify-between">
              Weekly digest
              <Switch defaultChecked />
            </Label>
            <Label className="flex items-center justify-between">
              Product updates
              <Switch />
            </Label>
            <Input aria-label="Email" placeholder="you@example.com" />
          </CardContent>
          <CardFooter className="gap-3">
            <Button variant="primary">Save</Button>
            <Button variant="ghost">Cancel</Button>
          </CardFooter>
        </Card>
        <div className="grid content-start gap-6">
          <Card size="sm">
            <CardContent className="grid gap-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">Storage</span>
                <Chip icon={<CheckIcon />} size="sm" variant="success">
                  Synced
                </Chip>
              </div>
              <Progress aria-label="Storage used" value={64} />
              <p className="text-muted-foreground text-xs">
                6.4 GB of 10 GB used
              </p>
            </CardContent>
          </Card>
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="primary">Primary</Button>
            <Button variant="destructive">Delete</Button>
          </div>
          <Slider aria-label="Volume" defaultValue={40} />
        </div>
      </div>
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>globals.css</CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton value={css} />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent className="text-[0.8125rem]">
          {lines.map((line, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: lines have no other identity
            <CodeBlockLine key={index}>{line}</CodeBlockLine>
          ))}
        </CodeBlockContent>
      </CodeBlock>
    </div>
  );
}
