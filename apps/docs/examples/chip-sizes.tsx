"use client";

import { Chip } from "@neomorphic-react/ui/chip";
import { Clock } from "lucide-react";

export default function ChipSizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Chip icon={<Clock />} size="sm" variant="warning">
        Due soon
      </Chip>
      <Chip icon={<Clock />} size="md" variant="warning">
        Due soon
      </Chip>
      <Chip icon={<Clock />} size="lg" variant="warning">
        Due soon
      </Chip>
    </div>
  );
}
