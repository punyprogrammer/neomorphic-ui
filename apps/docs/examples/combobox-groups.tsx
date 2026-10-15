"use client";

import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
} from "@neomorphic-react/ui/combobox";
import { InputGroupAddon } from "@neomorphic-react/ui/input-group";
import { Globe } from "lucide-react";

interface Region {
  items: string[];
  value: string;
}

const regions: Region[] = [
  { value: "Europe", items: ["London", "Paris", "Berlin", "Helsinki"] },
  {
    value: "Americas",
    items: ["New York", "Chicago", "São Paulo", "Vancouver"],
  },
  {
    value: "Asia Pacific",
    items: ["Singapore", "Tokyo", "Sydney", "Auckland"],
  },
];

export default function ComboboxGroups() {
  return (
    <Combobox items={regions}>
      <ComboboxInput
        aria-label="Time zone"
        className="w-full max-w-72"
        placeholder="Search cities"
      >
        <InputGroupAddon>
          <Globe />
        </InputGroupAddon>
      </ComboboxInput>
      <ComboboxContent>
        <ComboboxEmpty>No cities found.</ComboboxEmpty>
        <ComboboxList>
          {(region: Region) => (
            <ComboboxGroup items={region.items} key={region.value}>
              <ComboboxLabel>{region.value}</ComboboxLabel>
              <ComboboxCollection>
                {(city: string) => (
                  <ComboboxItem key={city} value={city}>
                    {city}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
