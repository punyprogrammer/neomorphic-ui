"use client";

import { Toggle } from "@neomorphic-react/ui/toggle";
import { Bookmark, Heart, Star, ThumbsUp } from "lucide-react";

export default function ToggleColors() {
  return (
    <div className="grid justify-items-center gap-8">
      <div className="flex items-center gap-6">
        <Toggle
          aria-label="Like"
          className="[--toggle-on:var(--color-destructive)]"
          defaultPressed
          iconFill
        >
          <Heart />
        </Toggle>
        <Toggle
          aria-label="Thumbs up"
          className="[--toggle-on:oklch(0.5_0.17_262)]"
          defaultPressed
          iconFill
        >
          <ThumbsUp />
        </Toggle>
      </div>
      <div className="flex items-center gap-6 [--toggle-on:oklch(0.52_0.14_150)]">
        <Toggle aria-label="Favourite" defaultPressed iconFill>
          <Star />
        </Toggle>
        <Toggle aria-label="Bookmark" defaultPressed iconFill>
          <Bookmark />
        </Toggle>
      </div>
    </div>
  );
}
