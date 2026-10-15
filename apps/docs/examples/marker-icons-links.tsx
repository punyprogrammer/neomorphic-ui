"use client";

import { Marker, MarkerContent, MarkerIcon } from "@neomorphic-react/ui/marker";
import { Lock, PhoneMissed } from "lucide-react";

export default function MarkerIconsLinks() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Marker>
        <MarkerIcon>
          <Lock />
        </MarkerIcon>
        <MarkerContent>
          Messages are end-to-end encrypted.{" "}
          <a href="#privacy">How encryption works</a>
        </MarkerContent>
      </Marker>
      <Marker>
        <MarkerIcon className="text-destructive">
          <PhoneMissed />
        </MarkerIcon>
        <MarkerContent>
          Missed call from Jonah at 18:40. <a href="#call">Call back</a>
        </MarkerContent>
      </Marker>
    </div>
  );
}
