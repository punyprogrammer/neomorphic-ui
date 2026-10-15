"use client";

import { Toggle } from "@neomorphic-react/ui/toggle";
import { Bluetooth, Wifi } from "lucide-react";

export default function ToggleShapes() {
  return (
    <div className="grid justify-items-center gap-8">
      <div className="flex items-center gap-6">
        <Toggle aria-label="Wi-Fi" defaultPressed size="lg">
          <Wifi />
        </Toggle>
        <Toggle aria-label="Wi-Fi" defaultPressed shape="rounded" size="lg">
          <Wifi />
        </Toggle>
      </div>
      <div className="flex items-center gap-6">
        <Toggle className="px-5">
          <Bluetooth />
          Bluetooth
        </Toggle>
        <Toggle className="px-5" shape="rounded">
          <Bluetooth />
          Bluetooth
        </Toggle>
      </div>
    </div>
  );
}
