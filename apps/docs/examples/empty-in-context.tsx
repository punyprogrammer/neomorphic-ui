"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@neomorphic-react/ui/empty";
import { BellOff } from "lucide-react";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";

const initial = [
  { id: "gate", text: "Gate B12 is now open for boarding" },
  { id: "seat", text: "Your seat moved to 14A" },
  { id: "bag", text: "Bag drop closes in 45 minutes" },
];

export default function EmptyInContext() {
  const [items, setItems] = useState(initial);
  const clearRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLButtonElement>(null);

  function update(next: typeof initial) {
    flushSync(() => setItems(next));
    (next.length ? clearRef : restoreRef).current?.focus();
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardAction>
          <Button
            disabled={items.length === 0}
            onClick={() => update([])}
            ref={clearRef}
            size="sm"
            variant="ghost"
          >
            Clear all
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {items.length > 0 ? (
          <ul className="grid gap-3">
            {items.map((item) => (
              <li className="text-foreground" key={item.id}>
                {item.text}
              </li>
            ))}
          </ul>
        ) : (
          <Empty className="p-4 md:p-6" variant="inset">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <BellOff />
              </EmptyMedia>
              <EmptyTitle>You're all caught up</EmptyTitle>
              <EmptyDescription>
                Gate changes and delays will show up here.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button
                onClick={() => update(initial)}
                ref={restoreRef}
                size="sm"
              >
                Show cleared
              </Button>
            </EmptyContent>
          </Empty>
        )}
      </CardContent>
    </Card>
  );
}
