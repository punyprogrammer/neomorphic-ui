"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@neomorphic-react/ui/dropdown-menu";

const placements = [
  { label: "Align start", side: "bottom", align: "start" },
  { label: "Align centre", side: "bottom", align: "center" },
  { label: "Align end", side: "bottom", align: "end" },
  { label: "Above", side: "top", align: "start" },
] as const;

export default function DropdownMenuPlacement() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {placements.map(({ label, side, align }) => (
        <DropdownMenu key={label}>
          <DropdownMenuTrigger render={<Button />}>{label}</DropdownMenuTrigger>
          <DropdownMenuContent align={align} side={side}>
            <DropdownMenuItem>Later today</DropdownMenuItem>
            <DropdownMenuItem>Tomorrow morning</DropdownMenuItem>
            <DropdownMenuItem>Next week</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </div>
  );
}
