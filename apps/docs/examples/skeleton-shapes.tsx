"use client";

import { Skeleton } from "@neomorphic-react/ui/skeleton";

export default function SkeletonShapes() {
  return (
    <div className="flex w-full max-w-md flex-wrap items-center justify-center gap-8">
      <Skeleton className="h-20 w-32" />
      <Skeleton className="w-32" shape="line" />
      <Skeleton className="size-16" shape="circle" />
    </div>
  );
}
