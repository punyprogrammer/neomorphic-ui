"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@neomorphic-react/ui/select";
import { Code, Megaphone, Palette, PenTool } from "lucide-react";

const categories = [
  { label: "Design", value: "design", icon: Palette },
  { label: "Engineering", value: "engineering", icon: Code },
  { label: "Marketing", value: "marketing", icon: Megaphone },
  { label: "Writing", value: "writing", icon: PenTool },
];

export default function SelectDemo() {
  return (
    <Select items={categories} name="category">
      <div className="grid gap-2">
        <SelectLabel>Category</SelectLabel>
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
      </div>
      <SelectContent>
        {categories.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            <item.icon aria-hidden="true" className="text-muted-foreground" />
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
