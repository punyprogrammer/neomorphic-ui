"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@neomorphic-react/ui/avatar";
import { Button } from "@neomorphic-react/ui/button";
import { Input } from "@neomorphic-react/ui/input";
import { Slider } from "@neomorphic-react/ui/slider";
import { Surface } from "@neomorphic-react/ui/surface";
import { Toggle } from "@neomorphic-react/ui/toggle";
import { cn } from "@neomorphic-react/ui/utils";
import {
  ArrowLeft,
  Heart,
  Menu,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useEffect, useId, useState } from "react";

import { portrait, scenicThumb, skyScene } from "./images";

const BLUE =
  "[--slider-fill:oklch(0.55_0.17_262)] [--toggle-on:oklch(0.55_0.17_262)] text-[oklch(0.45_0.14_262)]";

const RECOMMENDED = [
  { title: "Preconceptions", duration: "5 - 20 min", hue: 210 },
  { title: "Quiet Morning", duration: "10 - 15 min", hue: 195 },
];

const COURSES = [
  { title: "Navigating Change", duration: "5 - 20 min", hue: 200 },
  { title: "Managing Anxiety", duration: "10 - 25 min", hue: 230 },
  { title: "Finding Focus", duration: "8 - 18 min", hue: 175 },
];

const SESSION = {
  title: "Happiness",
  subtitle: "Session 2",
  duration: 606,
};

const clock = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

interface PanelProps {
  className?: string;
}

/**
 * Mindfulness discovery phone: recessed search, recommended cards, courses.
 */
function MindfulnessHome({ className }: PanelProps) {
  const id = useId();
  const [query, setQuery] = useState("");

  return (
    <Surface
      className={cn(
        "mx-auto grid h-full w-full max-w-sm gap-5 rounded-[2rem] p-5",
        BLUE,
        className
      )}
      render={<section aria-labelledby={`${id}-home`} />}
    >
      <div className="flex items-center justify-between">
        <Button
          aria-label="Open menu"
          icon={<Menu />}
          shape="rounded"
          size="sm"
          variant="ghost"
        />
        <h2 className="sr-only" id={`${id}-home`}>
          Mindfulness home
        </h2>
        <Avatar size="sm">
          <AvatarImage alt="" src={portrait(35)} />
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative min-w-0 flex-1">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            aria-label="Search for mindfulness"
            className="ps-10"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for mindfulness"
            shape="pill"
            type="search"
            value={query}
          />
        </div>
        <Button
          aria-label="Filter"
          icon={<SlidersHorizontal />}
          shape="rounded"
          size="md"
        />
      </div>

      <div className="grid gap-3">
        <div className="flex items-baseline justify-between">
          <h3 className="font-semibold text-foreground">Recommended</h3>
          <button
            className="font-medium text-[oklch(0.5_0.16_262)] text-sm"
            type="button"
          >
            See all
          </button>
        </div>
        <ul className="grid grid-cols-2 gap-3">
          {RECOMMENDED.map((item) => (
            <li key={item.title}>
              <Surface className="grid gap-2 overflow-hidden rounded-2xl p-2.5">
                <img
                  alt=""
                  className="aspect-square w-full rounded-xl object-cover"
                  height={120}
                  src={scenicThumb(item.hue)}
                  width={120}
                />
                <div className="grid gap-0.5 px-0.5">
                  <p className="truncate font-medium text-foreground text-sm">
                    {item.title}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {item.duration}
                  </p>
                </div>
              </Surface>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-3">
        <div className="flex items-baseline justify-between">
          <h3 className="font-semibold text-foreground">Courses</h3>
          <button
            className="font-medium text-[oklch(0.5_0.16_262)] text-sm"
            type="button"
          >
            See all
          </button>
        </div>
        <ul className="grid gap-3">
          {COURSES.map((course) => (
            <li key={course.title}>
              <Surface className="flex items-center gap-3 rounded-2xl p-2.5">
                <img
                  alt=""
                  className="size-14 shrink-0 rounded-xl object-cover"
                  height={56}
                  src={scenicThumb(course.hue)}
                  width={56}
                />
                <div className="grid min-w-0 gap-0.5">
                  <p className="truncate font-medium text-foreground text-sm">
                    {course.title}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {course.duration}
                  </p>
                </div>
              </Surface>
            </li>
          ))}
        </ul>
      </div>
    </Surface>
  );
}

interface MindfulnessPlayerProps extends PanelProps {
  defaultPlaying?: boolean;
}

/**
 * Now-playing phone: art frame, seek slider, rewind / pause / forward.
 */
function MindfulnessPlayer({
  className,
  defaultPlaying = false,
}: MindfulnessPlayerProps) {
  const id = useId();
  const [position, setPosition] = useState(261);
  const [playing, setPlaying] = useState(defaultPlaying);
  const [liked, setLiked] = useState(true);

  useEffect(() => {
    if (!playing) {
      return;
    }
    const timer = setInterval(() => setPosition((p) => p + 1), 1000);
    return () => clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    if (position >= SESSION.duration) {
      setPosition(0);
      setPlaying(false);
    }
  }, [position]);

  function seekBy(delta: number) {
    setPosition((p) => Math.min(SESSION.duration, Math.max(0, p + delta)));
  }

  return (
    <Surface
      className={cn(
        "mx-auto grid h-full w-full max-w-sm content-start gap-6 rounded-[2rem] p-5",
        BLUE,
        className
      )}
      render={<section aria-labelledby={`${id}-player`} />}
    >
      <div className="flex items-center justify-between">
        <Button
          aria-label="Back"
          icon={<ArrowLeft />}
          shape="rounded"
          size="sm"
          variant="ghost"
        />
        <p className="font-semibold text-foreground text-xs uppercase tracking-[0.14em]">
          Playing now
        </p>
        <Toggle
          aria-label="Favourite"
          className="[--toggle-on:oklch(0.55_0.17_262)]"
          iconFill
          onPressedChange={setLiked}
          pressed={liked}
          size="sm"
        >
          <Heart />
        </Toggle>
      </div>

      <Surface
        className="mx-auto aspect-square w-[min(100%,14rem)] overflow-hidden p-3"
        elevation="inset"
        shape="rounded"
        style={{ borderRadius: "42% 48% 40% 52% / 48% 40% 52% 44%" }}
      >
        <img
          alt=""
          className="size-full object-cover"
          height={240}
          src={skyScene()}
          style={{ borderRadius: "inherit" }}
          width={240}
        />
      </Surface>

      <div className="grid justify-items-center gap-1 text-center">
        <h2
          className="font-semibold text-2xl text-foreground tracking-tight"
          id={`${id}-player`}
        >
          {SESSION.title}
        </h2>
        <p className="text-muted-foreground text-sm">{SESSION.subtitle}</p>
      </div>

      <div className="grid gap-2">
        <div className="flex justify-between text-muted-foreground text-xs tabular-nums">
          <span>{clock(position)}</span>
          <span>{clock(SESSION.duration)}</span>
        </div>
        <Slider
          aria-label="Seek"
          max={SESSION.duration}
          onValueChange={(value) => setPosition(value as number)}
          size="sm"
          value={position}
        />
      </div>

      <div className="flex items-center justify-center gap-6">
        <Button
          aria-label="Rewind 15 seconds"
          icon={<RotateCcw className="text-[oklch(0.5_0.16_262)]" />}
          onClick={() => seekBy(-15)}
          shape="pill"
          size="md"
        />
        <Toggle
          aria-label={playing ? "Pause" : "Play"}
          className="size-16 text-[oklch(0.5_0.16_262)]"
          onPressedChange={setPlaying}
          pressed={playing}
        >
          {playing ? (
            <Pause className="size-6 fill-current" />
          ) : (
            <Play className="size-6 fill-current" />
          )}
        </Toggle>
        <Button
          aria-label="Forward 15 seconds"
          icon={<RotateCw className="text-[oklch(0.5_0.16_262)]" />}
          onClick={() => seekBy(15)}
          shape="pill"
          size="md"
        />
      </div>
    </Surface>
  );
}

export type { MindfulnessPlayerProps, PanelProps as MindfulnessPanelProps };
export { MindfulnessHome, MindfulnessPlayer };
