"use client";

import { Badge } from "@neomorphic-react/ui/badge";

const ORDERS = [
  { id: "#3021", status: "Delivered", variant: "success" },
  { id: "#3022", status: "Awaiting stock", variant: "warning" },
  { id: "#3023", status: "Payment failed", variant: "destructive" },
  { id: "#3024", status: "Processing", variant: "inset" },
] as const;

export default function BadgeDots() {
  return (
    <ul className="grid w-64 gap-3 text-sm">
      {ORDERS.map((order) => (
        <li className="flex items-center justify-between gap-4" key={order.id}>
          <span className="font-medium text-foreground tabular-nums">
            {order.id}
          </span>
          <span className="inline-flex items-center gap-2 text-muted-foreground">
            <Badge dot size="sm" variant={order.variant} />
            {order.status}
          </span>
        </li>
      ))}
    </ul>
  );
}
