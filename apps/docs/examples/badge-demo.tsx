"use client";

import { Badge, BadgeAnchor } from "@neomorphic-react/ui/badge";
import { Button } from "@neomorphic-react/ui/button";
import { Bell, ShoppingCart } from "lucide-react";

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-10">
      <BadgeAnchor>
        <Button
          aria-label="Notifications, 3 unread"
          icon={<Bell />}
          size="lg"
        />
        <Badge count={3} placement="top-end" variant="primary" />
      </BadgeAnchor>
      <BadgeAnchor>
        <Button aria-label="Cart, 17 items" icon={<ShoppingCart />} size="lg" />
        <Badge count={17} placement="top-end" />
      </BadgeAnchor>
      <div className="flex items-center gap-4">
        <Badge variant="inset">Beta</Badge>
        <Badge variant="primary">New</Badge>
        <Badge count={128} />
      </div>
    </div>
  );
}
