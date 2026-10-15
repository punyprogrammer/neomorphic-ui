"use client";

import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@neomorphic-react/ui/menubar";
import { Copy, Pencil, Trash2 } from "lucide-react";

export default function MenubarItems() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Trip</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarLabel inset>Lisbon, 12 to 16 May</MenubarLabel>
            <MenubarItem>
              <Pencil aria-hidden="true" />
              Rename
            </MenubarItem>
            <MenubarItem>
              <Copy aria-hidden="true" />
              Duplicate <MenubarShortcut>⌘D</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled inset>
              Move to shared folder
            </MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarItem variant="destructive">
            <Trash2 aria-hidden="true" />
            Delete trip
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu disabled>
        <MenubarTrigger>Bookings</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Train tickets</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
