"use client";

import { Label } from "@neomorphic-react/ui/label";
import { RadioGroup, RadioGroupItem } from "@neomorphic-react/ui/radio-group";

const sizes = [
  { size: "sm", label: "Small" },
  { size: "md", label: "Medium" },
  { size: "lg", label: "Large" },
] as const;

export default function RadioGroupSizes() {
  return (
    <div className="flex flex-wrap gap-12">
      {sizes.map(({ size, label }) => (
        <RadioGroup
          aria-label={`Plan, ${label.toLowerCase()}`}
          defaultValue="pro"
          key={size}
          size={size}
        >
          <Label className="gap-3 font-normal">
            <RadioGroupItem value="free" />
            Free
          </Label>
          <Label className="gap-3 font-normal">
            <RadioGroupItem value="pro" />
            Pro
          </Label>
          <Label className="gap-3 font-normal">
            <RadioGroupItem value="team" />
            Team
          </Label>
        </RadioGroup>
      ))}
    </div>
  );
}
