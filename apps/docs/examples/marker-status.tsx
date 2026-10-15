"use client";

import { Button } from "@neomorphic-react/ui/button";
import { Marker, MarkerContent, MarkerIcon } from "@neomorphic-react/ui/marker";
import { Spinner } from "@neomorphic-react/ui/spinner";
import { useEffect, useState } from "react";

export default function MarkerStatus() {
  const [thinking, setThinking] = useState(true);

  useEffect(() => {
    if (!thinking) {
      return;
    }
    const timeout = setTimeout(() => setThinking(false), 2000);
    return () => clearTimeout(timeout);
  }, [thinking]);

  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-6">
      <Marker role="status" shimmer={thinking}>
        {thinking ? (
          <MarkerIcon>
            <Spinner aria-hidden="true" className="size-4" size="sm" />
          </MarkerIcon>
        ) : null}
        <MarkerContent>
          {thinking ? "Thinking…" : "Thought for 2 seconds"}
        </MarkerContent>
      </Marker>
      <Button onClick={() => setThinking(true)} size="sm">
        Ask again
      </Button>
    </div>
  );
}
