"use client";

import { Chip } from "@neomorphic-react/ui/chip";
import { ArrowUpRight, Check } from "lucide-react";

export default function ChipIconPositions() {
  return (
    <div className="grid justify-items-center gap-6">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Chip icon={<Check />} variant="success">
          Paid
        </Chip>
        <Chip icon={<ArrowUpRight />} iconPosition="end">
          12% this week
        </Chip>
        <Chip>No icon</Chip>
      </div>
      <div
        className="flex flex-wrap items-center justify-center gap-4"
        dir="rtl"
      >
        <Chip icon={<Check />} variant="success">
          مدفوع
        </Chip>
        <Chip
          icon={<ArrowUpRight className="rtl:-scale-x-100" />}
          iconPosition="end"
        >
          12% هذا الأسبوع
        </Chip>
      </div>
    </div>
  );
}
