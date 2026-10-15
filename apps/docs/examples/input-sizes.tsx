"use client";

import { Input } from "@neomorphic-react/ui/input";

export default function InputSizes() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <Input aria-label="Small" placeholder="Small" size="sm" />
      <Input aria-label="Medium" placeholder="Medium" />
      <Input aria-label="Large" placeholder="Large" size="lg" />
    </div>
  );
}
