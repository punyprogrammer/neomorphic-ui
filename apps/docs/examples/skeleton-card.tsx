"use client";

import { Card, CardContent, CardHeader } from "@neomorphic-react/ui/card";
import { Skeleton } from "@neomorphic-react/ui/skeleton";

export default function SkeletonCard() {
  return (
    <Card
      aria-busy="true"
      aria-label="Loading trip"
      className="w-full max-w-xs"
      render={<section />}
    >
      <Skeleton className="mx-6 aspect-video rounded-xl" />
      <CardHeader className="gap-2">
        <Skeleton className="w-2/3" shape="line" />
        <Skeleton className="w-1/3" shape="line" />
      </CardHeader>
      <CardContent className="grid gap-2">
        <Skeleton className="h-3" shape="line" />
        <Skeleton className="h-3" shape="line" />
        <Skeleton className="h-3 w-4/5" shape="line" />
      </CardContent>
    </Card>
  );
}
