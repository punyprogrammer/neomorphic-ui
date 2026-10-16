"use client";

import { Button } from "@neomorphic-react/ui/button";
import { Surface } from "@neomorphic-react/ui/surface";
import { cn } from "@neomorphic-react/ui/utils";
import {
  CalendarDays,
  ChevronDown,
  Plus,
  ScreenShare,
  Video,
} from "lucide-react";
import { useEffect, useId, useState } from "react";

import { juiceGlass } from "./images";

const ACTIONS = [
  {
    key: "new",
    label: "New Meeting",
    icon: Video,
    accent: true,
    chevron: true,
  },
  { key: "join", label: "Join", icon: Plus, accent: false, chevron: false },
  {
    key: "schedule",
    label: "Schedule",
    icon: CalendarDays,
    accent: false,
    chevron: false,
  },
  {
    key: "share",
    label: "Share Screen",
    icon: ScreenShare,
    accent: false,
    chevron: true,
  },
] as const;

function formatClock(date: Date) {
  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

interface MeetingHubProps {
  className?: string;
}

/**
 * Zoom-style meeting home: 2×2 raised action tiles beside an inset well with
 * the live clock and an empty-day illustration.
 */
function MeetingHub({ className }: MeetingHubProps) {
  const id = useId();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Surface
      className={cn(
        "mx-auto grid w-full max-w-3xl gap-8 rounded-[2rem] p-6 sm:grid-cols-2 sm:items-stretch sm:p-8",
        className
      )}
      render={<section aria-labelledby={`${id}-title`} />}
    >
      <h2 className="sr-only" id={`${id}-title`}>
        Meeting hub
      </h2>

      <ul className="grid grid-cols-2 content-center gap-x-6 gap-y-8 self-center">
        {ACTIONS.map(({ key, label, icon: Icon, accent, chevron }) => (
          <li className="grid justify-items-center gap-3" key={key}>
            <Button
              aria-label={label}
              className={cn("size-20", accent && "text-[oklch(0.55_0.18_255)]")}
              icon={<Icon className="size-8" />}
              shape="rounded"
              size="lg"
            />
            <span className="flex items-center gap-1 font-medium text-foreground text-sm">
              {label}
              {chevron ? (
                <ChevronDown
                  aria-hidden="true"
                  className="size-3.5 text-muted-foreground"
                />
              ) : null}
            </span>
          </li>
        ))}
      </ul>

      <Surface
        className="grid justify-items-center gap-6 rounded-[1.75rem] px-6 py-8 text-center"
        elevation="inset"
        depth="md"
      >
        <div className="grid gap-1">
          <p className="font-semibold text-3xl text-foreground tabular-nums tracking-tight">
            {formatClock(now)}
          </p>
          <p className="text-muted-foreground text-sm">{formatDate(now)}</p>
        </div>
        <img
          alt=""
          className="size-28 object-contain"
          height={120}
          src={juiceGlass()}
          width={120}
        />
        <p className="text-muted-foreground text-sm">
          No upcoming meetings today
        </p>
      </Surface>
    </Surface>
  );
}

export type { MeetingHubProps };
export { MeetingHub };
