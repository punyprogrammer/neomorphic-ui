"use client";

import { Badge } from "@neomorphic-react/ui/badge";
import {
  Item,
  ItemContent,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemSeparator,
  ItemTitle,
} from "@neomorphic-react/ui/item";
import { RotateCcw } from "lucide-react";

export default function ItemHeaderFooter() {
  return (
    <ItemGroup aria-label="Recent transactions" className="max-w-md gap-0">
      <Item size="sm">
        <ItemHeader>
          <span>Today, 09:12</span>
          <Badge size="sm" variant="success">
            Paid
          </Badge>
        </ItemHeader>
        <ItemContent>
          <ItemTitle>Airport taxi</ItemTitle>
        </ItemContent>
        <ItemContent>
          <ItemTitle className="tabular-nums">−$32.00</ItemTitle>
        </ItemContent>
      </Item>
      <ItemSeparator />
      <Item size="sm">
        <ItemHeader>
          <span>Yesterday, 21:40</span>
        </ItemHeader>
        <ItemContent>
          <ItemTitle>Hotel deposit</ItemTitle>
        </ItemContent>
        <ItemContent>
          <ItemTitle className="tabular-nums">−$120.00</ItemTitle>
        </ItemContent>
        <ItemFooter>
          <RotateCcw aria-hidden="true" />
          Refunded on check-out
        </ItemFooter>
      </Item>
    </ItemGroup>
  );
}
