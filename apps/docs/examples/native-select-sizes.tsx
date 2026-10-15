"use client";

import {
  NativeSelect,
  NativeSelectOption,
} from "@neomorphic-react/ui/native-select";

const sizes = ["sm", "md", "lg"] as const;

export default function NativeSelectSizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {sizes.map((size) => (
        <NativeSelect
          aria-label={`Quantity, ${size}`}
          defaultValue="1"
          key={size}
          size={size}
        >
          <NativeSelectOption value="1">1 ticket</NativeSelectOption>
          <NativeSelectOption value="2">2 tickets</NativeSelectOption>
          <NativeSelectOption value="3">3 tickets</NativeSelectOption>
        </NativeSelect>
      ))}
    </div>
  );
}
