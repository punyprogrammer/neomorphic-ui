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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from "@neomorphic-react/ui/collapsible";

const lines = [
  { label: "Adult fare × 2", amount: 38 },
  { label: "Seat reservation × 2", amount: 6 },
  { label: "Booking fee", amount: 4.2 },
];

const eur = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
});

export default function CollapsibleInContext() {
  const total = lines.reduce((sum, line) => sum + line.amount, 0);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Lisbon to Porto</CardTitle>
        <CardDescription>Fri 14 Nov, 08:39 · 2 passengers</CardDescription>
      </CardHeader>
      <CardContent>
        <Collapsible>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-muted-foreground text-xs">Total</p>
              <p className="font-semibold text-2xl text-foreground tabular-nums">
                {eur.format(total)}
              </p>
            </div>
            <CollapsibleTrigger className="flex items-center gap-1.5 rounded-md font-medium text-sm outline-none hover:text-primary focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2">
              Price breakdown
              <CollapsibleIndicator />
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <dl className="grid gap-2 pt-4 text-sm">
              {lines.map((line) => (
                <div className="flex justify-between gap-4" key={line.label}>
                  <dt className="text-muted-foreground">{line.label}</dt>
                  <dd className="text-foreground tabular-nums">
                    {eur.format(line.amount)}
                  </dd>
                </div>
              ))}
            </dl>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
      <CardFooter>
        <Button fullWidth variant="primary">
          Continue to payment
        </Button>
      </CardFooter>
    </Card>
  );
}
