"use client";

import { Badge } from "@neomorphic-react/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@neomorphic-react/ui/command";
import {
  Check,
  Circle,
  CircleCheck,
  CircleDashed,
  CircleDot,
  CircleX,
} from "lucide-react";
import { useState } from "react";

const statuses = [
  { value: "backlog", label: "Backlog", icon: CircleDashed },
  { value: "todo", label: "To do", icon: Circle },
  { value: "in-progress", label: "In progress", icon: CircleDot },
  { value: "done", label: "Done", icon: CircleCheck },
  { value: "cancelled", label: "Cancelled", icon: CircleX },
];

export default function CommandInContext() {
  const [status, setStatus] = useState("in-progress");
  const current = statuses.find((item) => item.value === status);

  return (
    <div className="grid w-full max-w-sm gap-4">
      <div className="flex items-start justify-between gap-3 px-1">
        <div className="grid gap-1">
          <p className="text-muted-foreground text-xs">NW-142</p>
          <p className="font-medium text-foreground text-sm">
            Export button does nothing in Safari
          </p>
        </div>
        <Badge size="lg" variant={status === "done" ? "success" : "default"}>
          {current?.label}
        </Badge>
      </div>
      <Command items={statuses}>
        <CommandInput aria-label="Change status" placeholder="Change status" />
        <CommandEmpty>No status matches.</CommandEmpty>
        <CommandList>
          {(item: (typeof statuses)[number]) => (
            <CommandItem
              key={item.value}
              onClick={() => setStatus(item.value)}
              value={item}
            >
              <item.icon />
              {item.label}
              {item.value === status ? (
                <>
                  <Check className="ms-auto text-primary" />
                  <span className="sr-only">(current)</span>
                </>
              ) : null}
            </CommandItem>
          )}
        </CommandList>
      </Command>
    </div>
  );
}
