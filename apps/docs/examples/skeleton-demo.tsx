"use client";

import { Skeleton } from "@neomorphic-react/ui/skeleton";

export default function SkeletonDemo() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading profile"
      className="flex w-full max-w-xs items-center gap-4"
    >
      <Skeleton className="size-12" shape="circle" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="w-3/4" shape="line" />
        <Skeleton className="w-1/2" shape="line" />
      </div>
    </section>
  );
}
