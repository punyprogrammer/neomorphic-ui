"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { Separator } from "@neomorphic-react/ui/separator";

const lines = [
  { label: "Stoneware vase", amount: 64 },
  { label: "Linen napkins, set of 4", amount: 28 },
  { label: "Shipping", amount: 6 },
];

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const total = lines.reduce((sum, { amount }) => sum + amount, 0);

export default function SeparatorInContext() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Order summary</CardTitle>
        <CardDescription>Order #20418 · 3 items</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 text-sm">
        {lines.map(({ label, amount }) => (
          <div className="flex justify-between" key={label}>
            <span className="text-muted-foreground">{label}</span>
            <span className="text-foreground tabular-nums">
              {usd.format(amount)}
            </span>
          </div>
        ))}
        <Separator className="my-1" variant="perforated" />
        <div className="flex justify-between font-medium text-base text-foreground">
          <span>Total</span>
          <span className="tabular-nums">{usd.format(total)}</span>
        </div>
      </CardContent>
      <Separator />
      <CardFooter>
        <Button className="flex-1" variant="primary">
          Pay {usd.format(total)}
        </Button>
      </CardFooter>
    </Card>
  );
}
