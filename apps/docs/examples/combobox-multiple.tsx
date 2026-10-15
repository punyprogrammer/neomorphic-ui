"use client";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@neomorphic-react/ui/combobox";

const labels = [
  "Bug",
  "Design",
  "Documentation",
  "Accessibility",
  "Performance",
  "Good first issue",
  "Needs review",
];

export default function ComboboxMultiple() {
  const anchor = useComboboxAnchor();

  return (
    <Combobox defaultValue={["Bug", "Accessibility"]} items={labels} multiple>
      <ComboboxChips className="w-full max-w-sm" ref={anchor}>
        <ComboboxValue>
          {(values: string[]) => (
            <>
              {values.map((value) => (
                <ComboboxChip key={value} removeLabel={`Remove ${value}`}>
                  {value}
                </ComboboxChip>
              ))}
              <ComboboxChipsInput
                aria-label="Labels"
                placeholder={values.length ? "" : "Add labels"}
              />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No labels found.</ComboboxEmpty>
        <ComboboxList>
          {(label: string) => (
            <ComboboxItem key={label} value={label}>
              {label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
