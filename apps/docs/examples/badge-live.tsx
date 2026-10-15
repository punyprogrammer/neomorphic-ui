"use client";

import { Badge, BadgeAnchor } from "@neomorphic-react/ui/badge";
import { Button } from "@neomorphic-react/ui/button";
import { Bell, Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function BadgeLive() {
  const [count, setCount] = useState(3);
  return (
    <div className="flex items-center gap-8">
      <BadgeAnchor>
        <Button
          aria-label={`Notifications, ${count} unread`}
          icon={<Bell />}
          size="lg"
        />
        <Badge count={count} placement="top-end" variant="destructive" />
      </BadgeAnchor>
      <div className="flex items-center gap-3">
        <Button
          aria-label="Add notification"
          icon={<Plus />}
          onClick={() => setCount((value) => value + 1)}
          shape="pill"
          size="sm"
        />
        <Button
          aria-label="Remove notification"
          icon={<Minus />}
          onClick={() => setCount((value) => Math.max(0, value - 1))}
          shape="pill"
          size="sm"
        />
        <Button onClick={() => setCount(0)} size="sm" variant="ghost">
          Clear
        </Button>
      </div>
    </div>
  );
}
