"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  type ComboboxInputProps,
  ComboboxItem,
  ComboboxList,
} from "@neomorphic-react/ui/combobox";

const fruits = [
  "Apple",
  "Apricot",
  "Banana",
  "Blueberry",
  "Cherry",
  "Mango",
  "Peach",
];

function FruitCombobox(props: ComboboxInputProps) {
  return (
    <Combobox items={fruits}>
      <ComboboxInput className="w-full" placeholder="Search fruit" {...props} />
      <ComboboxContent>
        <ComboboxList>
          {(fruit: string) => (
            <ComboboxItem key={fruit} value={fruit}>
              {fruit}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export default function ComboboxSizes() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-4">
      <FruitCombobox aria-label="Small" size="sm" />
      <FruitCombobox aria-label="Medium" />
      <FruitCombobox aria-label="Large" size="lg" />
      <FruitCombobox aria-label="Pill" shape="pill" />
    </div>
  );
}
