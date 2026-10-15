"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@neomorphic-react/ui/combobox";

const languages = [
  "Català",
  "Dansk",
  "Deutsch",
  "English",
  "Español",
  "Français",
  "Italiano",
  "Nederlands",
  "Norsk",
  "Polski",
  "Português",
  "Suomi",
  "Svenska",
];

export default function ComboboxSearchableSelect() {
  return (
    <Combobox defaultValue="English" items={languages}>
      <ComboboxTrigger aria-label="Language" className="w-56">
        <ComboboxValue />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput
          aria-label="Search languages"
          placeholder="Search"
          showTrigger={false}
          size="sm"
        />
        <ComboboxEmpty>No languages found.</ComboboxEmpty>
        <ComboboxList>
          {(language: string) => (
            <ComboboxItem key={language} value={language}>
              {language}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
