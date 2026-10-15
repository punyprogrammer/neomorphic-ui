"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { Chip } from "@neomorphic-react/ui/chip";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@neomorphic-react/ui/item";
import { CreditCard, Landmark, Plus, Wallet } from "lucide-react";

const methods = [
  {
    name: "Visa Platinum",
    number: "4821",
    balance: "$2,340.18",
    icon: CreditCard,
    isDefault: true,
  },
  { name: "Mastercard", number: "9910", balance: "$812.02", icon: Wallet },
  {
    name: "HDFC Savings",
    number: "1173",
    balance: "$14,005.60",
    icon: Landmark,
  },
];

export default function ItemInContext() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Payment methods</CardTitle>
        <CardDescription>Charged in this order when you book</CardDescription>
        <CardAction>
          <Button
            aria-label="Add a payment method"
            icon={<Plus />}
            shape="pill"
            size="sm"
          />
        </CardAction>
      </CardHeader>
      <CardContent>
        <ItemGroup aria-label="Payment methods" className="gap-3">
          {methods.map(({ name, number, balance, icon: Icon, isDefault }) => (
            <Item key={number} variant="raised">
              <ItemMedia variant="icon">
                <Icon aria-hidden="true" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  {name}
                  {isDefault ? (
                    <Chip size="sm" variant="inset">
                      Default
                    </Chip>
                  ) : null}
                </ItemTitle>
                <ItemDescription>•••• {number}</ItemDescription>
              </ItemContent>
              <ItemContent>
                <ItemTitle className="tabular-nums">{balance}</ItemTitle>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
}
