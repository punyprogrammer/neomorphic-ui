"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@neomorphic-react/ui/command";
import { FilePlus, FolderOpen, Search, UserPlus } from "lucide-react";
import { useState } from "react";

const actions = [
  { value: "new", label: "New document", icon: FilePlus },
  { value: "open", label: "Open project", icon: FolderOpen },
  { value: "invite", label: "Invite a teammate", icon: UserPlus },
];

export default function CommandDialogExample() {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-3">
      <Button icon={<Search />} onClick={() => setOpen(true)}>
        Search commands
      </Button>
      <p className="text-muted-foreground text-sm">
        {last ? `You ran "${last}".` : "Nothing run yet."}
      </p>
      <CommandDialog onOpenChange={setOpen} open={open}>
        <Command items={actions}>
          <CommandInput aria-label="Search commands" placeholder="Search" />
          <CommandEmpty>No commands found.</CommandEmpty>
          <CommandList>
            {(action: (typeof actions)[number]) => (
              <CommandItem
                key={action.value}
                onClick={() => {
                  setLast(action.label);
                  setOpen(false);
                }}
                value={action}
              >
                <action.icon />
                {action.label}
              </CommandItem>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}
