"use client";

import { Chip } from "@neomorphic-react/ui/chip";
import {
  Check,
  CircleAlert,
  Clock,
  FilePen,
  Send,
  Sparkles,
} from "lucide-react";

const VARIANTS = [
  { variant: "default", icon: Sparkles, label: "New" },
  { variant: "inset", icon: FilePen, label: "Draft" },
  { variant: "primary", icon: Send, label: "Sent" },
  { variant: "success", icon: Check, label: "Paid" },
  { variant: "warning", icon: Clock, label: "Due soon" },
  { variant: "destructive", icon: CircleAlert, label: "Overdue" },
] as const;

export default function ChipVariants() {
  return (
    <div className="flex max-w-md flex-wrap items-center justify-center gap-4">
      {VARIANTS.map(({ variant, icon: Icon, label }) => (
        <Chip icon={<Icon />} key={variant} variant={variant}>
          {label}
        </Chip>
      ))}
    </div>
  );
}
