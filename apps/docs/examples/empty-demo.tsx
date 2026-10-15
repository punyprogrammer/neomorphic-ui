"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@neomorphic-react/ui/empty";
import { Plane, Plus } from "lucide-react";

export default function EmptyDemo() {
  return (
    <Empty className="max-w-md">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Plane />
        </EmptyMedia>
        <EmptyTitle>No trips yet</EmptyTitle>
        <EmptyDescription>
          Trips you book show up here, with tickets and live updates.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button icon={<Plus />} variant="primary">
          Book a trip
        </Button>
      </EmptyContent>
    </Empty>
  );
}
