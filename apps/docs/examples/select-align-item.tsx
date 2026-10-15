"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@neomorphic-react/ui/select";

const languages = [
  { label: "English", value: "en" },
  { label: "Français", value: "fr" },
  { label: "Deutsch", value: "de" },
  { label: "Español", value: "es" },
  { label: "हिन्दी", value: "hi" },
  { label: "日本語", value: "ja" },
];

export default function SelectAlignItem() {
  return (
    <Select defaultValue="es" items={languages}>
      <div className="grid gap-2">
        <SelectLabel>Language</SelectLabel>
        <SelectTrigger className="w-56">
          <SelectValue />
        </SelectTrigger>
      </div>
      <SelectContent alignItemWithTrigger>
        {languages.map((language) => (
          <SelectItem key={language.value} value={language.value}>
            {language.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
