"use client";

import { Chip } from "@neomorphic-react/ui/chip";
import { Surface } from "@neomorphic-react/ui/surface";
import {
  ArrowDownRight,
  ArrowUpRight,
  Receipt,
  ShoppingBag,
  Wallet,
} from "lucide-react";

const UP = "text-[oklch(0.48_0.11_155)]";
const DOWN = "text-[oklch(0.52_0.15_25)]";

const STATS = [
  { label: "Revenue", value: "$482.6k", change: 12.4, icon: Wallet },
  { label: "Orders", value: "3,912", change: 4.1, icon: ShoppingBag },
  { label: "Average order", value: "$123.40", change: -1.8, icon: Receipt },
];

export default function ChipInContext() {
  return (
    <div className="grid w-full max-w-2xl gap-6 sm:grid-cols-3">
      {STATS.map(({ label, value, change, icon: Icon }) => {
        const up = change >= 0;
        return (
          <Surface className="grid gap-4 p-5" key={label}>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-sm">{label}</p>
              <Surface
                className="grid size-9 place-items-center"
                depth="sm"
                elevation="inset"
              >
                <Icon aria-hidden="true" className="size-4" />
              </Surface>
            </div>
            <div className="flex items-end justify-between gap-3">
              <p className="font-semibold text-2xl text-foreground tabular-nums tracking-tight">
                {value}
              </p>
              <Chip
                className={up ? UP : DOWN}
                icon={up ? <ArrowUpRight /> : <ArrowDownRight />}
                size="sm"
                variant="inset"
              >
                <span className="sr-only">{up ? "Up" : "Down"} </span>
                {Math.abs(change)}%
              </Chip>
            </div>
          </Surface>
        );
      })}
    </div>
  );
}
