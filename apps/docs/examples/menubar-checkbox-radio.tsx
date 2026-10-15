"use client";

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from "@neomorphic-react/ui/menubar";
import { useState } from "react";

export default function MenubarCheckboxRadio() {
  const [showMap, setShowMap] = useState(true);
  const [showPrices, setShowPrices] = useState(false);
  const [sort, setSort] = useState("departure");

  return (
    <div className="flex flex-col items-center gap-6">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked={showMap} onCheckedChange={setShowMap}>
              Show map
            </MenubarCheckboxItem>
            <MenubarCheckboxItem
              checked={showPrices}
              onCheckedChange={setShowPrices}
            >
              Show prices
            </MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Sort</MenubarTrigger>
          <MenubarContent>
            <MenubarGroup>
              <MenubarLabel>Sort trains by</MenubarLabel>
              <MenubarRadioGroup onValueChange={setSort} value={sort}>
                <MenubarRadioItem value="departure">Departure</MenubarRadioItem>
                <MenubarRadioItem value="duration">Duration</MenubarRadioItem>
                <MenubarRadioItem value="price">Price</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarCheckboxItem disabled>
              Direct trains only
            </MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <p className="text-muted-foreground text-sm">
        Map {showMap ? "on" : "off"}, prices {showPrices ? "on" : "off"}, sorted
        by {sort}
      </p>
    </div>
  );
}
