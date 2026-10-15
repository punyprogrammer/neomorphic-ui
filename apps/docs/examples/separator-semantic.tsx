"use client";

import { Separator } from "@neomorphic-react/ui/separator";

export default function SeparatorSemantic() {
  return (
    <div className="grid w-full max-w-sm gap-4 text-sm">
      <section className="grid gap-1">
        <h3 className="font-medium text-foreground">Shipping</h3>
        <p className="text-muted-foreground">
          Orders leave our studio within two working days.
        </p>
      </section>
      <Separator decorative={false} />
      <section className="grid gap-1">
        <h3 className="font-medium text-foreground">Returns</h3>
        <p className="text-muted-foreground">
          Send anything back within 30 days for a full refund.
        </p>
      </section>
    </div>
  );
}
