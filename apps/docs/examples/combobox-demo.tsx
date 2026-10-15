"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@neomorphic-react/ui/combobox";
import { Field, FieldLabel } from "@neomorphic-react/ui/field";

const offices = [
  "Amsterdam",
  "Berlin",
  "Dublin",
  "Lisbon",
  "London",
  "Madrid",
  "Paris",
  "Stockholm",
];

export default function ComboboxDemo() {
  return (
    <Field className="w-full max-w-72">
      <FieldLabel htmlFor="combobox-demo">Office</FieldLabel>
      <Combobox items={offices}>
        <ComboboxInput
          id="combobox-demo"
          placeholder="Search offices"
          showClear
        />
        <ComboboxContent>
          <ComboboxEmpty>No offices found.</ComboboxEmpty>
          <ComboboxList>
            {(office: string) => (
              <ComboboxItem key={office} value={office}>
                {office}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  );
}
