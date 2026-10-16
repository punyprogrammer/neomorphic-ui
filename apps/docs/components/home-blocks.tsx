"use client";

import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "@neomorphic-react/ui/carousel";
import { useCallback, useEffect, useState } from "react";
import { MeetingHub } from "@/components/blocks/meeting-hub";
import {
  MindfulnessHome,
  MindfulnessPlayer,
} from "@/components/blocks/mindfulness-demo";
import {
  SmartHomeDashboard,
  SmartHomeTemperature,
} from "@/components/blocks/smart-home-demo";
import { ThemePicker } from "@/components/theme-picker";
import type { ThemePreset } from "@/lib/showcase";

const SLIDES = [
  { id: "mindfulness-home", label: "Mindfulness home", Panel: MindfulnessHome },
  {
    id: "mindfulness-player",
    label: "Mindfulness player",
    Panel: MindfulnessPlayer,
  },
  { id: "meeting-hub", label: "Meeting hub", Panel: MeetingHub },
  {
    id: "smart-home",
    label: "Smart home",
    Panel: SmartHomeDashboard,
  },
  {
    id: "temperature",
    label: "Temperature control",
    Panel: SmartHomeTemperature,
  },
] as const;

const AUTOPLAY_MS = 5000;

/**
 * Live blocks built only from library components, under a theme picker that
 * re-themes all of them at once. Shown two-up in a looping carousel.
 */
export function HomeBlocks() {
  const [theme, setTheme] = useState<ThemePreset>("porcelain");
  const [paused, setPaused] = useState(false);
  const pause = useCallback(() => setPaused(true), []);
  const resume = useCallback(() => setPaused(false), []);

  return (
    <section aria-labelledby="blocks-heading" className="grid gap-10">
      <div className="grid justify-items-center gap-4">
        <ThemePicker onValueChange={setTheme} value={theme} />
      </div>
      <div
        className="grid gap-8 rounded-[2rem] px-2 py-6 transition-colors duration-500 sm:gap-10 sm:px-6 sm:py-10"
        data-theme={theme}
      >
        <div className="mx-auto grid max-w-2xl gap-3 px-4 text-center">
          <h2
            className="font-semibold text-3xl text-foreground tracking-tight sm:text-4xl"
            id="blocks-heading"
          >
            Soft screens, real components
          </h2>
          <p className="text-balance text-muted-foreground">
            A few compositions built only from the library. Switch a theme and
            every surface, control, and accent updates together.
          </p>
        </div>
        <Carousel
          aria-label="Live component examples"
          className="mx-auto w-full min-w-0 max-w-5xl px-2 sm:px-12"
          gap="1.5rem"
          onMouseEnter={pause}
          onMouseLeave={resume}
          onPointerEnter={pause}
          onPointerLeave={resume}
          opts={{ align: "start", loop: true, skipSnaps: false }}
        >
          <BlocksAutoplay paused={paused} />
          <CarouselContent>
            {SLIDES.map(({ id, label, Panel }, index) => (
              <CarouselItem
                aria-label={`${label}, ${index + 1} of ${SLIDES.length}`}
                className="basis-full md:basis-1/2"
                key={id}
              >
                <div className="flex h-full justify-center">
                  <Panel />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="max-md:hidden" />
          <CarouselNext className="max-md:hidden" />
          <CarouselIndicator className="mt-6" />
        </Carousel>
      </div>
    </section>
  );
}

function BlocksAutoplay({ paused }: { paused: boolean }) {
  const { api } = useCarousel();

  useEffect(() => {
    if (!api || paused) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) {
      return;
    }

    const advance = () => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    };

    // Wait until Embla has measured slides (loop needs real widths).
    let timer = window.setInterval(advance, AUTOPLAY_MS);

    const reset = () => {
      window.clearInterval(timer);
      timer = window.setInterval(advance, AUTOPLAY_MS);
    };

    api.on("reInit", reset);
    api.on("pointerUp", reset);

    return () => {
      window.clearInterval(timer);
      api.off("reInit", reset);
      api.off("pointerUp", reset);
    };
  }, [api, paused]);

  return null;
}
