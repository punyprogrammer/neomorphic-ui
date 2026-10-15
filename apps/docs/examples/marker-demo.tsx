"use client";

import { Marker, MarkerContent, MarkerIcon } from "@neomorphic-react/ui/marker";
import { UserPlus } from "lucide-react";

export default function MarkerDemo() {
  return (
    <Marker className="max-w-sm">
      <MarkerIcon>
        <UserPlus />
      </MarkerIcon>
      <MarkerContent>Marcus joined the chat</MarkerContent>
    </Marker>
  );
}
