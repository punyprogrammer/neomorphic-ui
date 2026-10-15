"use client";

import { useState } from "react";
import { BoardingTicket } from "@/components/blocks/boarding-ticket";
import { ChatThread } from "@/components/blocks/chat-thread";
import { MusicPlayer } from "@/components/blocks/music-player";
import { NewsletterSignup } from "@/components/blocks/newsletter-signup";
import { PaymentMethods } from "@/components/blocks/payment-methods";
import { SettingsTiles } from "@/components/blocks/settings-tiles";
import { WeatherWidget } from "@/components/blocks/weather-widget";
import { ThemePicker } from "@/components/theme-picker";
import type { ThemePreset } from "@/lib/showcase";

/**
 * Live blocks built only from library components, under a theme picker that
 * re-themes all of them at once.
 */
export function HomeBlocks() {
  const [theme, setTheme] = useState<ThemePreset>("porcelain");
  return (
    <section aria-labelledby="blocks-heading" className="grid gap-8">
      <div className="grid justify-items-center gap-4">
        <h2 className="sr-only" id="blocks-heading">
          Live examples
        </h2>
        <ThemePicker onValueChange={setTheme} value={theme} />
      </div>
      <div
        className="rounded-[2rem] px-4 py-10 transition-colors duration-500 sm:px-8"
        data-theme={theme}
      >
        <div className="mx-auto max-w-6xl columns-1 gap-10 md:columns-2 xl:columns-3 [&>*]:mx-auto [&>*]:mb-10 [&>*]:max-w-full [&>*]:break-inside-avoid">
          <MusicPlayer />
          <SettingsTiles />
          <WeatherWidget />
          <ChatThread />
          <PaymentMethods />
          <NewsletterSignup />
          <BoardingTicket />
        </div>
      </div>
    </section>
  );
}
