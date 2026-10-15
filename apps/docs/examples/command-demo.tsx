"use client";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@neomorphic-react/ui/command";

const actions = [
  "New document",
  "Open recent",
  "Invite a teammate",
  "Change theme",
  "Keyboard shortcuts",
  "Sign out",
];

export default function CommandDemo() {
  return (
    <Command className="max-w-sm" items={actions}>
      <CommandInput aria-label="Search actions" placeholder="Search actions" />
      <CommandEmpty>No actions found.</CommandEmpty>
      <CommandList>
        {(action: string) => (
          <CommandItem key={action} value={action}>
            {action}
          </CommandItem>
        )}
      </CommandList>
    </Command>
  );
}
