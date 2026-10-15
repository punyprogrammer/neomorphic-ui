"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@neomorphic-react/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@neomorphic-react/ui/popover";
import { Slider } from "@neomorphic-react/ui/slider";
import { Surface } from "@neomorphic-react/ui/surface";
import { toast } from "@neomorphic-react/ui/toast";
import { Toggle } from "@neomorphic-react/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@neomorphic-react/ui/tooltip";
import { cn } from "@neomorphic-react/ui/utils";
import {
  Bookmark,
  Laptop,
  ListOrdered,
  ListVideo,
  Maximize2,
  MicVocal,
  MonitorSpeaker,
  Moon,
  Pause,
  PictureInPicture2,
  Play,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
  Speaker,
  Tv,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import { type ReactElement, type ReactNode, useState } from "react";

import { clock } from "@/lib/podcasts";

import { Cover } from "./bits";
import { type Panel, usePlayer } from "./player-context";

const SPEEDS = [0.5, 0.8, 1, 1.2, 1.5, 2];
const SLEEP = [5, 15, 30, 45, 60];

export function PlayerBar({ onFullscreen }: { onFullscreen: () => void }) {
  const player = usePlayer();
  const { episode, show } = player;
  const saved = player.saved.includes(episode.id);
  const level = player.muted ? 0 : player.volume;
  const VolumeIcon = level === 0 ? VolumeX : level < 50 ? Volume1 : Volume2;

  return (
    <Surface
      className="grid h-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)]"
      render={<section aria-label="Player" />}
    >
      <div className="flex min-w-0 items-center gap-3">
        <button
          aria-label={`Open ${show.title}`}
          className="shrink-0 rounded-[calc(var(--radius)*0.6)]"
          onClick={() => player.navigate({ kind: "show", id: show.id })}
          type="button"
        >
          <Cover className="size-14" sizes="56px" src={show.cover} />
        </button>
        <div className="min-w-0">
          <p className="truncate font-semibold text-foreground text-sm">
            {episode.title}
          </p>
          <p className="truncate text-muted-foreground text-xs">{show.title}</p>
        </div>
        <Toggle
          aria-label="Save to Your Episodes"
          iconFill
          onPressedChange={() => player.toggleSaved(episode.id)}
          pressed={saved}
          size="sm"
        >
          <Bookmark />
        </Toggle>
      </div>

      <div className="grid gap-1.5 max-md:order-last max-md:col-span-2">
        <div className="flex items-center justify-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  aria-label={`Playback speed, ${player.speed}×`}
                  className="w-14 font-mono text-xs tabular-nums"
                  size="sm"
                  variant="ghost"
                >
                  {player.speed}×
                </Button>
              }
            />
            <DropdownMenuContent side="top">
              <DropdownMenuRadioGroup
                onValueChange={(value) => player.setSpeed(Number(value))}
                value={String(player.speed)}
              >
                <DropdownMenuLabel>Playback speed</DropdownMenuLabel>
                {SPEEDS.map((speed) => (
                  <DropdownMenuRadioItem key={speed} value={String(speed)}>
                    {speed}×{speed === 1 ? " (normal)" : ""}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Hint label="Back 15 seconds">
            <Button
              aria-label="Back 15 seconds"
              icon={<RotateCcw />}
              onClick={() => player.skip(-15)}
              size="sm"
              variant="ghost"
            />
          </Hint>
          <Hint label="Previous">
            <Button
              aria-label="Previous"
              icon={<SkipBack className="fill-current" />}
              onClick={player.previous}
              size="sm"
              variant="ghost"
            />
          </Hint>
          <Button
            aria-label={player.playing ? "Pause" : "Play"}
            className="mx-1 size-11"
            icon={
              player.playing ? (
                <Pause className="fill-current" />
              ) : (
                <Play className="fill-current" />
              )
            }
            onClick={player.toggle}
            shape="pill"
            variant="primary"
          />
          <Hint label="Next">
            <Button
              aria-label="Next"
              disabled={player.queue.length === 0}
              icon={<SkipForward className="fill-current" />}
              onClick={player.next}
              size="sm"
              variant="ghost"
            />
          </Hint>
          <Hint label="Forward 15 seconds">
            <Button
              aria-label="Forward 15 seconds"
              icon={<RotateCw />}
              onClick={() => player.skip(15)}
              size="sm"
              variant="ghost"
            />
          </Hint>
          <SleepTimer />
        </div>
        <div className="flex items-center gap-3">
          <span className="w-14 text-end font-mono text-muted-foreground text-xs tabular-nums">
            {clock(player.position)}
          </span>
          <Slider
            aria-label="Seek"
            aria-valuetext={`${clock(player.position)} of ${clock(episode.duration)}`}
            className="flex-1"
            max={episode.duration}
            onValueChange={(value) => player.seek(value as number)}
            size="sm"
            value={Math.min(player.position, episode.duration)}
          />
          <span className="w-14 font-mono text-muted-foreground text-xs tabular-nums">
            -{clock(episode.duration - player.position)}
          </span>
        </div>
      </div>

      <div className="hidden items-center justify-end gap-1 md:flex">
        <PanelToggle icon={<MicVocal />} label="Now playing view" panel="now" />
        <PanelToggle icon={<ListVideo />} label="Chapters" panel="chapters" />
        <PanelToggle icon={<ListOrdered />} label="Queue" panel="queue" />
        <ConnectDevice />
        <Toggle
          aria-label="Mute"
          className="ms-1"
          onPressedChange={player.toggleMute}
          pressed={player.muted}
          size="sm"
        >
          <VolumeIcon />
        </Toggle>
        <Slider
          aria-label="Volume"
          aria-valuetext={`${level}%`}
          className="w-24 [--slider-fill:var(--foreground)] lg:w-28"
          onValueChange={(value) => player.setVolume(value as number)}
          size="sm"
          value={level}
        />
        <Hint label="Open Miniplayer">
          <Button
            aria-label="Open Miniplayer"
            icon={<PictureInPicture2 />}
            onClick={() =>
              toast({
                title: "Miniplayer",
                description: "Pop-out playback works in the desktop app.",
              })
            }
            size="sm"
            variant="ghost"
          />
        </Hint>
        <Hint label="Full screen">
          <Button
            aria-label="Full screen"
            icon={<Maximize2 />}
            onClick={onFullscreen}
            size="sm"
            variant="ghost"
          />
        </Hint>
      </div>
    </Surface>
  );
}

function Hint({ children, label }: { children: ReactElement; label: string }) {
  return (
    <Tooltip>
      <TooltipTrigger render={children} />
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

function PanelToggle({
  icon,
  label,
  panel,
}: {
  icon: ReactNode;
  label: string;
  panel: Exclude<Panel, null>;
}) {
  const player = usePlayer();
  const pressed = player.panel === panel;

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Toggle
            aria-label={label}
            className={cn(pressed && "text-primary")}
            onPressedChange={(next) => player.setPanel(next ? panel : null)}
            pressed={pressed}
            size="sm"
          >
            {icon}
          </Toggle>
        }
      />
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

function SleepTimer() {
  const player = usePlayer();
  const remaining = (player.episode.duration - player.position) / player.speed;
  const left =
    player.sleepAt === null
      ? null
      : Math.max(Math.ceil((player.sleepAt - Date.now()) / 60_000), 0);

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            aria-label={
              left === null
                ? "Sleep timer, off"
                : `Sleep timer, ${left} min left`
            }
            className={cn(left !== null && "text-primary")}
            icon={<Moon className={cn(left !== null && "fill-current")} />}
            size="sm"
            variant="ghost"
          />
        }
      />
      <PopoverContent className="w-60" side="top">
        <PopoverHeader>
          <PopoverTitle>Sleep timer</PopoverTitle>
          <PopoverDescription>
            {left === null
              ? "Pause playback after…"
              : `Stopping in ${left} min`}
          </PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-1 pt-2">
          {SLEEP.map((minutes) => (
            <SleepOption
              key={minutes}
              label={`${minutes} minutes`}
              onSelect={() => player.setSleep(minutes)}
            />
          ))}
          <SleepOption
            label="End of episode"
            onSelect={() => player.setSleep(remaining / 60)}
          />
          {left !== null ? (
            <SleepOption
              label="Turn off timer"
              onSelect={() => player.setSleep(null)}
            />
          ) : null}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function SleepOption({
  label,
  onSelect,
}: {
  label: string;
  onSelect: () => void;
}) {
  return (
    <Button
      className="justify-start normal-case tracking-normal"
      fullWidth
      onClick={() => {
        onSelect();
        toast({ title: "Sleep timer", description: label });
      }}
      size="sm"
      variant="ghost"
    >
      {label}
    </Button>
  );
}

const DEVICES = [
  { id: "browser", label: "This web browser", icon: Laptop },
  { id: "speaker", label: "Living room speaker", icon: Speaker },
  { id: "tv", label: "Bedroom TV", icon: Tv },
];

function ConnectDevice() {
  const [device, setDevice] = useState("browser");
  const active = DEVICES.find((d) => d.id === device) ?? DEVICES[0];

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            aria-label={`Connect to a device, playing on ${active.label}`}
            className={cn(device !== "browser" && "text-primary")}
            icon={<MonitorSpeaker />}
            size="sm"
            variant="ghost"
          />
        }
      />
      <PopoverContent align="end" className="w-72" side="top">
        <PopoverHeader>
          <PopoverTitle>Connect to a device</PopoverTitle>
          <PopoverDescription>Listening on {active.label}</PopoverDescription>
        </PopoverHeader>
        <ul className="grid gap-1 pt-2">
          {DEVICES.map(({ id, icon: Icon, label }) => (
            <li key={id}>
              <button
                aria-pressed={id === device}
                className={cn(
                  "flex w-full items-center gap-3 rounded-[var(--radius)] p-2.5 text-start text-sm transition-colors hover:bg-muted",
                  id === device ? "text-primary" : "text-foreground"
                )}
                onClick={() => {
                  setDevice(id);
                  toast({ title: `Playing on ${label}` });
                }}
                type="button"
              >
                <Icon className="size-5" />
                <span className="flex-1 font-medium">{label}</span>
                {id === device ? (
                  <span className="text-xs">Connected</span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
