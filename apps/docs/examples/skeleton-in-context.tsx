"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { Skeleton } from "@neomorphic-react/ui/skeleton";
import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

const trips = [
  { id: "lis", city: "Lisbon", dates: "16 – 19 Oct" },
  { id: "opo", city: "Porto", dates: "2 – 4 Nov" },
  { id: "fao", city: "Faro", dates: "20 – 27 Dec" },
];

export default function SkeletonInContext() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      return;
    }
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Upcoming trips</CardTitle>
        <CardDescription role="status">
          {loading ? "Loading trips" : `${trips.length} trips booked`}
        </CardDescription>
        <CardAction>
          <Button
            aria-label="Refresh"
            icon={<RefreshCw />}
            isLoading={loading}
            onClick={() => setLoading(true)}
            size="sm"
            variant="ghost"
          />
        </CardAction>
      </CardHeader>
      <CardContent>
        <ul aria-busy={loading} className="grid gap-4">
          {trips.map((trip) =>
            loading ? (
              <li className="flex items-center gap-3" key={trip.id}>
                <Skeleton className="size-10" />
                <div className="grid flex-1 gap-2">
                  <Skeleton className="w-1/3" shape="line" />
                  <Skeleton className="h-3 w-1/2" shape="line" />
                </div>
              </li>
            ) : (
              <li className="flex items-center gap-3" key={trip.id}>
                <span className="inset-shadow-neu-flat flex size-10 items-center justify-center rounded-lg bg-neu-convex font-medium text-xs shadow-neu-sm">
                  {trip.id.toUpperCase()}
                </span>
                <div className="grid gap-0.5">
                  <span className="font-medium text-foreground">
                    {trip.city}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {trip.dates}
                  </span>
                </div>
              </li>
            )
          )}
        </ul>
      </CardContent>
    </Card>
  );
}
