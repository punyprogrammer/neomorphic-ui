"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@neomorphic-react/ui/select";

const priorities = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Urgent", value: "urgent" },
];

const sizes = ["sm", "md", "lg"] as const;

export default function SelectSizes() {
  return (
    <div className="grid gap-6">
      {sizes.map((size) => (
        <Select defaultValue="medium" items={priorities} key={size}>
          <SelectTrigger
            aria-label={`Priority, ${size}`}
            className="w-56"
            size={size}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {priorities.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </div>
  );
}
