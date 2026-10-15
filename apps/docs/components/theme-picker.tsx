"use client";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@neomorphic-react/ui/toggle-group";
import { cn } from "@neomorphic-react/ui/utils";
import { type ThemePreset, themePresets } from "@/lib/showcase";

interface ThemePickerProps {
  className?: string;
  onValueChange: (value: ThemePreset) => void;
  value: ThemePreset;
}

/** Picks one of the theme presets; each item shows its surface and primary. */
export function ThemePicker({
  className,
  onValueChange,
  value,
}: ThemePickerProps) {
  return (
    <ToggleGroup
      aria-label="Theme"
      className={cn("flex-wrap justify-center", className)}
      onValueChange={(next) => {
        const [selected] = next as ThemePreset[];
        if (selected) {
          onValueChange(selected);
        }
      }}
      shape="pill"
      size="sm"
      value={[value]}
    >
      {themePresets.map((preset) => (
        <ToggleGroupItem
          className="gap-2 px-3"
          key={preset.id}
          value={preset.id}
        >
          <span
            aria-hidden="true"
            className="size-3.5 rounded-full outline-1 outline-foreground/10 -outline-offset-1"
            style={{
              background: `linear-gradient(135deg, ${preset.swatch[0]} 50%, ${preset.swatch[1]} 50%)`,
            }}
          />
          {preset.name}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
