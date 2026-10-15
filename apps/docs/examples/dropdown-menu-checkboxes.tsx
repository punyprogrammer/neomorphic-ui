"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@neomorphic-react/ui/dropdown-menu";
import { useState } from "react";

const sorts = [
  { value: "name", label: "Name" },
  { value: "modified", label: "Date modified" },
  { value: "size", label: "Size" },
];

export default function DropdownMenuCheckboxes() {
  const [hidden, setHidden] = useState(false);
  const [extensions, setExtensions] = useState(true);
  const [sort, setSort] = useState("modified");
  const sortLabel = sorts.find((item) => item.value === sort)?.label;

  return (
    <div className="flex flex-col items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button />}>View</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Show</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={hidden}
              onCheckedChange={setHidden}
            >
              Hidden files
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={extensions}
              onCheckedChange={setExtensions}
            >
              File extensions
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              onValueChange={(value) => setSort(value as string)}
              value={sort}
            >
              {sorts.map((item) => (
                <DropdownMenuRadioItem key={item.value} value={item.value}>
                  {item.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <p className="text-muted-foreground text-sm">
        Sorted by {sortLabel?.toLowerCase()}
        {hidden ? ", hidden files shown" : ""}
      </p>
    </div>
  );
}
