"use client";

import { Toggle } from "@neomorphic-react/ui/toggle";
import { Bookmark, Heart, Star } from "lucide-react";

export default function ToggleDemo() {
  return (
    <div className="flex items-center gap-8">
      <Toggle
        aria-label="Like"
        className="[--toggle-on:var(--color-destructive)]"
        defaultPressed
        iconFill
        size="lg"
      >
        <Heart />
      </Toggle>
      <Toggle
        aria-label="Favourite"
        className="[--toggle-on:oklch(0.6_0.13_80)]"
        iconFill
        size="lg"
      >
        <Star />
      </Toggle>
      <Toggle
        aria-label="Bookmark"
        className="[--toggle-on:oklch(0.52_0.14_150)]"
        iconFill
        size="lg"
      >
        <Bookmark />
      </Toggle>
    </div>
  );
}
