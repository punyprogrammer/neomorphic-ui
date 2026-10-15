"use client";

import { AspectRatio } from "@neomorphic-react/ui/aspect-ratio";
import { Skeleton } from "@neomorphic-react/ui/skeleton";
import { MapPin } from "lucide-react";

export default function AspectRatioContent() {
  return (
    <div className="grid w-full max-w-lg grid-cols-2 items-start gap-6">
      <AspectRatio className="rounded-xl" ratio={4 / 3}>
        <Skeleton className="size-full rounded-xl" />
      </AspectRatio>
      <AspectRatio
        className="inset-shadow-neu-sm rounded-xl bg-background shadow-neu-flat"
        ratio={4 / 3}
      >
        <div className="flex size-full flex-col items-center justify-center gap-2 text-muted-foreground text-sm">
          <MapPin className="size-6" />
          Map unavailable offline
        </div>
      </AspectRatio>
    </div>
  );
}
