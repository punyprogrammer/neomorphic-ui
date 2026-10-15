"use client";

import { Chip } from "@neomorphic-react/ui/chip";
import { Check, Clock, FilePen } from "lucide-react";

export default function ChipDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Chip icon={<Check />} variant="success">
        Paid
      </Chip>
      <Chip icon={<Clock />} variant="warning">
        Due soon
      </Chip>
      <Chip icon={<FilePen />} variant="inset">
        Draft
      </Chip>
    </div>
  );
}
