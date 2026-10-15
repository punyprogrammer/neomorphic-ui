"use client";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@neomorphic-react/ui/command";

interface Setting {
  keywords: string[];
  label: string;
  value: string;
}

const settings: Setting[] = [
  {
    value: "appearance",
    label: "Appearance",
    keywords: ["theme", "dark", "light", "colour"],
  },
  {
    value: "notifications",
    label: "Notifications",
    keywords: ["email", "push", "alerts", "sounds"],
  },
  {
    value: "security",
    label: "Password and security",
    keywords: ["two-factor", "passkey", "sign in"],
  },
  {
    value: "region",
    label: "Language and region",
    keywords: ["locale", "time zone", "currency"],
  },
];

function matches(setting: Setting, query: string) {
  const search = query.trim().toLowerCase();
  return [setting.label, ...setting.keywords].some((text) =>
    text.toLowerCase().includes(search)
  );
}

export default function CommandFilter() {
  return (
    <Command className="max-w-sm" filter={matches} items={settings}>
      <CommandInput aria-label="Search settings" placeholder="Try “dark”" />
      <CommandEmpty>No settings match.</CommandEmpty>
      <CommandList>
        {(setting: Setting) => (
          <CommandItem key={setting.value} value={setting}>
            {setting.label}
          </CommandItem>
        )}
      </CommandList>
    </Command>
  );
}
