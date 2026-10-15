"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@neomorphic-react/ui/input-group";
import { Mail } from "lucide-react";

const sizes = [
  { size: "sm", label: "Small" },
  { size: "md", label: "Medium" },
  { size: "lg", label: "Large" },
] as const;

export default function InputGroupSizes() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      {sizes.map(({ size, label }) => (
        <InputGroup key={size} shape="pill" size={size}>
          <InputGroupAddon>
            <Mail />
          </InputGroupAddon>
          <InputGroupInput
            aria-label={`Email (${label.toLowerCase()})`}
            placeholder={label}
            type="email"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="default">Join</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      ))}
    </div>
  );
}
