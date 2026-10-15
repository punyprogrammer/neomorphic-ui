"use client";

import { Marker, MarkerContent } from "@neomorphic-react/ui/marker";

export default function MarkerVariants() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <Marker>
        <MarkerContent>Maya renamed the chat to "Saturday plans"</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>Today</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerContent>Earlier messages</MarkerContent>
      </Marker>
    </div>
  );
}
