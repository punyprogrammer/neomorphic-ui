"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@neomorphic-react/ui/item";
import { Separator } from "@neomorphic-react/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@neomorphic-react/ui/sheet";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

const initialItems = [
  { id: "mug", name: "Stoneware mug", detail: "Sage · 2 × £14.00", total: 28 },
  {
    id: "tea",
    name: "Loose leaf sencha",
    detail: "100g · 1 × £9.50",
    total: 9.5,
  },
  {
    id: "pot",
    name: "Cast iron teapot",
    detail: "0.8L · 1 × £42.00",
    total: 42,
  },
];

export default function SheetInContext() {
  const [items, setItems] = useState(initialItems);
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <Sheet>
      <SheetTrigger render={<Button icon={<ShoppingBag />} />}>
        Basket ({items.length})
      </SheetTrigger>
      <SheetContent size="sm">
        <SheetHeader>
          <SheetTitle>Your basket</SheetTitle>
          <SheetDescription>
            {items.length === 0
              ? "Your basket is empty."
              : "Free delivery on orders over £50."}
          </SheetDescription>
        </SheetHeader>
        <ItemGroup>
          {items.map((item) => (
            <Item key={item.id} size="sm" variant="raised">
              <ItemContent>
                <ItemTitle>{item.name}</ItemTitle>
                <ItemDescription>{item.detail}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button
                  aria-label={`Remove ${item.name}`}
                  icon={<Trash2 />}
                  onClick={() =>
                    setItems((current) =>
                      current.filter(({ id }) => id !== item.id)
                    )
                  }
                  size="sm"
                  variant="ghost"
                />
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
        <SheetFooter>
          <Separator />
          <p className="flex justify-between font-medium">
            <span>Subtotal</span>
            <span className="tabular-nums">{gbp.format(subtotal)}</span>
          </p>
          <Button disabled={items.length === 0} variant="primary">
            Checkout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
