"use client";

import { Button } from "@neomorphic-react/ui/button";
import { Slider } from "@neomorphic-react/ui/slider";
import { Pause, Play, RotateCcw, RotateCw, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";

const DURATION = 42 * 60 + 17;

function clock(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

export default function SliderInContext() {
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(754);
  const [volume, setVolume] = useState(70);

  useEffect(() => {
    if (!playing) {
      return;
    }
    const timer = setInterval(() => {
      setPosition((value) => Math.min(value + 1, DURATION));
    }, 1000);
    return () => clearInterval(timer);
  }, [playing]);

  const skip = (seconds: number) =>
    setPosition((value) => Math.min(Math.max(value + seconds, 0), DURATION));

  return (
    <div className="grid w-full max-w-md gap-4">
      <div className="flex items-center justify-center gap-2">
        <Button
          aria-label="Back 15 seconds"
          icon={<RotateCcw />}
          onClick={() => skip(-15)}
          size="sm"
          variant="ghost"
        />
        <Button
          aria-label={playing ? "Pause" : "Play"}
          icon={playing ? <Pause /> : <Play />}
          onClick={() => setPlaying((value) => !value)}
          variant="primary"
        />
        <Button
          aria-label="Forward 15 seconds"
          icon={<RotateCw />}
          onClick={() => skip(15)}
          size="sm"
          variant="ghost"
        />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-12 text-end text-muted-foreground text-xs tabular-nums">
          {clock(position)}
        </span>
        <Slider
          aria-label="Seek"
          max={DURATION}
          onValueChange={(value) => setPosition(value as number)}
          size="sm"
          value={position}
        />
        <span className="w-12 text-muted-foreground text-xs tabular-nums">
          -{clock(DURATION - position)}
        </span>
      </div>
      <div className="flex items-center justify-end gap-3 text-muted-foreground">
        <Volume2 aria-hidden="true" className="size-4 shrink-0" />
        <Slider
          aria-label="Volume"
          className="w-28 [--slider-fill:var(--color-foreground)]"
          onValueChange={(value) => setVolume(value as number)}
          size="sm"
          value={volume}
        />
      </div>
    </div>
  );
}
