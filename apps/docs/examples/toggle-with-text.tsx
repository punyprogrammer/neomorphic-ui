"use client";

import { Toggle } from "@neomorphic-react/ui/toggle";
import { Mic, Volume2, Wifi } from "lucide-react";

export default function ToggleWithText() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <Toggle className="px-5">
        <Mic />
        Mute
      </Toggle>
      <Toggle className="px-5" defaultPressed>
        <Volume2 />
        Sound
      </Toggle>
      <Toggle
        className="px-5 [--toggle-on:oklch(0.52_0.14_240)]"
        defaultPressed
        shape="rounded"
      >
        <Wifi />
        Wi-Fi
      </Toggle>
    </div>
  );
}
