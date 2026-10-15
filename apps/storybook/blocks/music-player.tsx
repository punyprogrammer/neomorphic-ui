import { Button } from "@neomorphic-react/ui/button";
import { Card, CardContent } from "@neomorphic-react/ui/card";
import { Dial } from "@neomorphic-react/ui/dial";
import { Slider } from "@neomorphic-react/ui/slider";
import { Surface } from "@neomorphic-react/ui/surface";
import { Toggle } from "@neomorphic-react/ui/toggle";
import { cn } from "@neomorphic-react/ui/utils";
import {
  Heart,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2,
} from "lucide-react";
import { useEffect, useId, useState } from "react";

import { albumArt } from "./images";

interface Track {
  artist: string;
  /** Length in seconds. */
  duration: number;
  /** Hue of the generated album art. */
  hue: number;
  title: string;
}

const TRACKS: Track[] = [
  { title: "Midnight City", artist: "Neon Harbour", duration: 214, hue: 280 },
  { title: "Paper Planes", artist: "The Lanterns", duration: 187, hue: 20 },
  { title: "Low Tide", artist: "Saltwater", duration: 245, hue: 190 },
];

// The kit's music orange, darkened to 3:1 against the surface.
const ORANGE =
  "[--dial-fill:oklch(0.64_0.17_50)] [--slider-fill:oklch(0.64_0.17_50)] [--toggle-on:oklch(0.51_0.16_45)]";

const clock = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

interface MusicPlayerProps {
  className?: string;
  /** Start playing on mount. */
  defaultPlaying?: boolean;
  tracks?: Track[];
}

/**
 * The kit's music app (`3:731`): round album art in a raised frame, a seek
 * `Slider`, the transport as raised buttons around a play `Toggle`, and a
 * volume `Dial`. Playback is simulated with a one-second timer.
 */
function MusicPlayer({
  className,
  defaultPlaying = false,
  tracks = TRACKS,
}: MusicPlayerProps) {
  const id = useId();
  const [index, setIndex] = useState(0);
  const [position, setPosition] = useState(0);
  const [playing, setPlaying] = useState(defaultPlaying);
  const [liked, setLiked] = useState<Set<number>>(() => new Set([0]));
  const [volume, setVolume] = useState(64);
  const track = tracks[index] as Track;

  function skip(by: number) {
    setIndex((current) => (current + by + tracks.length) % tracks.length);
    setPosition(0);
  }

  function setLike(on: boolean) {
    setLiked((current) => {
      const next = new Set(current);
      if (on) {
        next.add(index);
      } else {
        next.delete(index);
      }
      return next;
    });
  }

  useEffect(() => {
    if (!playing) {
      return;
    }
    const timer = setInterval(() => setPosition((p) => p + 1), 1000);
    return () => clearInterval(timer);
  }, [playing]);

  // At the end of a track, move on to the next one.
  useEffect(() => {
    if (position >= track.duration) {
      setIndex((current) => (current + 1) % tracks.length);
      setPosition(0);
    }
  }, [position, track.duration, tracks.length]);

  return (
    <Card
      className={cn("w-80 rounded-3xl", ORANGE, className)}
      render={<section aria-labelledby={`${id}-title`} />}
    >
      <CardContent className="grid justify-items-center gap-6">
        <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
          Now playing
        </p>

        <Surface className="p-2.5" shape="circle">
          <img
            alt={`${track.title} cover art`}
            className="size-44 rounded-full"
            height={176}
            src={albumArt(track.hue)}
            width={176}
          />
        </Surface>

        <div className="flex w-full items-center gap-3">
          <div className="grid min-w-0 flex-1 gap-0.5">
            <h2
              className="truncate font-medium text-foreground text-lg"
              id={`${id}-title`}
            >
              {track.title}
            </h2>
            <p className="truncate text-muted-foreground text-sm">
              {track.artist}
            </p>
          </div>
          <Toggle
            aria-label="Like"
            className="[--toggle-on:var(--color-destructive)]"
            iconFill
            onPressedChange={setLike}
            pressed={liked.has(index)}
            size="sm"
          >
            <Heart />
          </Toggle>
        </div>

        <div className="grid w-full gap-2">
          <Slider
            aria-label="Seek"
            max={track.duration}
            onValueChange={(value) => setPosition(value as number)}
            size="sm"
            value={position}
          />
          <div className="flex justify-between text-muted-foreground text-xs tabular-nums">
            <span>{clock(position)}</span>
            <span>
              <span className="sr-only">Remaining </span>-
              {clock(track.duration - position)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Button
            aria-label="Previous track"
            icon={<SkipBack className="fill-current" />}
            onClick={() => skip(-1)}
            shape="pill"
          />
          <Toggle
            aria-label="Play"
            className="size-16"
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
            aria-label="Next track"
            icon={<SkipForward className="fill-current" />}
            onClick={() => skip(1)}
            shape="pill"
          />
        </div>

        <div className="flex items-center gap-4 text-muted-foreground">
          <Volume1 aria-hidden="true" className="size-4" />
          <Dial
            aria-label="Volume"
            onValueChange={setVolume}
            size="sm"
            value={volume}
          >
            {volume}
          </Dial>
          <Volume2 aria-hidden="true" className="size-4" />
        </div>
      </CardContent>
    </Card>
  );
}

export type { MusicPlayerProps, Track };
export { MusicPlayer };
