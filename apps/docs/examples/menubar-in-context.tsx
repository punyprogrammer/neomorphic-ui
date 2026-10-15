"use client";

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@neomorphic-react/ui/menubar";
import { Surface } from "@neomorphic-react/ui/surface";
import { cn } from "@neomorphic-react/ui/utils";
import { useState } from "react";

const note =
  "Take the 9:09 from Santa Apolónia to Porto Campanhã, then the local train to São Bento. Leave bags at the hotel and walk down to the Ribeira for lunch by the river.";

const sizes = { sm: "text-sm", md: "text-base", lg: "text-lg" };

export default function MenubarInContext() {
  const [size, setSize] = useState<keyof typeof sizes>("md");
  const [serif, setSerif] = useState(false);
  const [wordCount, setWordCount] = useState(true);

  return (
    <Surface className="flex w-full max-w-lg flex-col gap-4 rounded-2xl p-4">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New note <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>Duplicate</MenubarItem>
            <MenubarSeparator />
            <MenubarItem variant="destructive">Delete note</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Format</MenubarTrigger>
          <MenubarContent>
            <MenubarGroup>
              <MenubarLabel>Text size</MenubarLabel>
              <MenubarRadioGroup onValueChange={setSize} value={size}>
                <MenubarRadioItem value="sm">Small</MenubarRadioItem>
                <MenubarRadioItem value="md">Medium</MenubarRadioItem>
                <MenubarRadioItem value="lg">Large</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarCheckboxItem checked={serif} onCheckedChange={setSerif}>
              Serif font
            </MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem
              checked={wordCount}
              onCheckedChange={setWordCount}
            >
              Word count
            </MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <article className="grid gap-2 px-1">
        <h3 className="font-semibold text-foreground">Day 2: Porto</h3>
        <p
          className={cn(
            "text-muted-foreground leading-relaxed",
            sizes[size],
            serif && "font-serif"
          )}
        >
          {note}
        </p>
        {wordCount ? (
          <p className="text-muted-foreground text-xs tabular-nums">
            {note.split(" ").length} words
          </p>
        ) : null}
      </article>
    </Surface>
  );
}
