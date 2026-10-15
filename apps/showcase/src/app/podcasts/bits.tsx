"use client";

import { Button } from "@neomorphic-react/ui/button";
import { cn } from "@neomorphic-react/ui/utils";
import { Pause, Play } from "lucide-react";
import Image from "next/image";

import { usePlayer } from "./player-context";

export function Cover({
  className,
  eager = false,
  sizes,
  src,
}: {
  className?: string;
  /** Load straight away, for covers that are the focus of the view. */
  eager?: boolean;
  sizes: string;
  src: string;
}) {
  return (
    <span
      className={cn(
        "relative block aspect-square shrink-0 overflow-hidden rounded-[calc(var(--radius)*0.6)] bg-muted",
        className
      )}
    >
      <Image
        alt=""
        className="object-cover"
        fill
        loading={eager ? "eager" : "lazy"}
        sizes={sizes}
        src={src}
      />
    </span>
  );
}

/** Three bouncing bars beside whatever is playing. */
export function Equalizer({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("flex h-3.5 items-end gap-0.5 text-primary", className)}
    >
      {[0, 0.25, 0.5].map((delay) => (
        <span
          className="block h-full w-[3px] animate-eq rounded-full bg-current"
          key={delay}
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </span>
  );
}

/** The round primary play button; plays or pauses `episodeId`. */
export function PlayFab({
  className,
  episodeId,
  label,
  size = "md",
}: {
  className?: string;
  episodeId: string;
  label: string;
  size?: "sm" | "md" | "lg";
}) {
  const { current, playing, play } = usePlayer();
  const active = current === episodeId && playing;

  return (
    <Button
      aria-label={`${active ? "Pause" : "Play"} ${label}`}
      className={cn("rounded-full", className)}
      icon={
        active ? (
          <Pause className="fill-current" />
        ) : (
          <Play className="fill-current" />
        )
      }
      onClick={(event) => {
        event.stopPropagation();
        play(episodeId);
      }}
      shape="pill"
      size={size}
      variant="primary"
    />
  );
}
