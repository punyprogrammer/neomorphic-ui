"use client";

import { Bubble, BubbleContent } from "@neomorphic-react/ui/bubble";
import { Marker, MarkerContent, MarkerIcon } from "@neomorphic-react/ui/marker";
import { Spinner } from "@neomorphic-react/ui/spinner";

export default function SpinnerInContext() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Bubble align="end">
        <BubbleContent>Can you summarise this week's standups?</BubbleContent>
      </Bubble>
      <Marker role="status" shimmer>
        <MarkerIcon>
          <Spinner size="sm" />
        </MarkerIcon>
        <MarkerContent>Thinking it through…</MarkerContent>
      </Marker>
    </div>
  );
}
