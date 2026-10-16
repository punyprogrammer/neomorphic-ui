"use client";

import { useState } from "react";
import { MeetingHub } from "@/components/blocks/meeting-hub";
import { MindfulnessDemo } from "@/components/blocks/mindfulness-demo";
import { SmartHomeDemo } from "@/components/blocks/smart-home-demo";
import { ThemePicker } from "@/components/theme-picker";
import type { ThemePreset } from "@/lib/showcase";

/**
 * Live blocks built only from library components, under a theme picker that
 * re-themes all of them at once.
 */
export function HomeBlocks() {
  const [theme, setTheme] = useState<ThemePreset>("porcelain");
  return (
    <section aria-labelledby="blocks-heading" className="grid gap-10">
      <div className="grid justify-items-center gap-4">
        <h2 className="sr-only" id="blocks-heading">
          Live examples
        </h2>
        <ThemePicker onValueChange={setTheme} value={theme} />
      </div>
      <div
        className="grid gap-14 rounded-[2rem] px-4 py-10 transition-colors duration-500 sm:px-8"
        data-theme={theme}
      >
        <MindfulnessDemo />
        <MeetingHub />
        <SmartHomeDemo />
      </div>
    </section>
  );
}
