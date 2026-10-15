"use client";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@neomorphic-react/ui/item";
import { Plane } from "lucide-react";

export default function ItemSizes() {
  return (
    <div className="grid w-full max-w-md gap-4">
      {(["md", "sm"] as const).map((size) => (
        <Item key={size} size={size} variant="raised">
          <ItemMedia variant="icon">
            <Plane aria-hidden="true" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Flight to Bengaluru</ItemTitle>
            <ItemDescription>Wed, 21 October · 07:10</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  );
}
