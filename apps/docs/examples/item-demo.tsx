"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@neomorphic-react/ui/item";
import { Bell } from "lucide-react";

export default function ItemDemo() {
  return (
    <Item className="max-w-md" variant="raised">
      <ItemMedia variant="icon">
        <Bell aria-hidden="true" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Notifications</ItemTitle>
        <ItemDescription>Trip reminders and price alerts</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm">Manage</Button>
      </ItemActions>
    </Item>
  );
}
