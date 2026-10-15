"use client";

import {
  Command,
  CommandCollection,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@neomorphic-react/ui/command";
import {
  Calculator,
  Calendar,
  CreditCard,
  type LucideIcon,
  Settings,
  Smile,
  UserRound,
} from "lucide-react";

interface Action {
  icon: LucideIcon;
  label: string;
  shortcut?: string;
  value: string;
}

const groups: { value: string; items: Action[] }[] = [
  {
    value: "Suggestions",
    items: [
      { value: "calendar", label: "Calendar", icon: Calendar },
      { value: "emoji", label: "Search emoji", icon: Smile },
      { value: "calculator", label: "Calculator", icon: Calculator },
    ],
  },
  {
    value: "Settings",
    items: [
      { value: "profile", label: "Profile", icon: UserRound, shortcut: "⌘P" },
      { value: "billing", label: "Billing", icon: CreditCard, shortcut: "⌘B" },
      { value: "settings", label: "Settings", icon: Settings, shortcut: "⌘S" },
    ],
  },
];

export default function CommandGroups() {
  return (
    <Command className="max-w-sm" items={groups}>
      <CommandInput
        aria-label="Search"
        placeholder="Type a command or search"
      />
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandList>
        {(group: (typeof groups)[number]) => (
          <CommandGroup
            heading={group.value}
            items={group.items}
            key={group.value}
          >
            <CommandCollection>
              {(item: Action) => (
                <CommandItem key={item.value} value={item}>
                  <item.icon />
                  {item.label}
                  {item.shortcut ? (
                    <CommandShortcut>{item.shortcut}</CommandShortcut>
                  ) : null}
                </CommandItem>
              )}
            </CommandCollection>
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}
