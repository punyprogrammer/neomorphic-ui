"use client";

import { Badge } from "@neomorphic-react/ui/badge";
import { Button } from "@neomorphic-react/ui/button";
import { Inbox, Mail } from "lucide-react";

export default function BadgeInButton() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Button icon={<Inbox />}>
        Inbox
        <Badge count={12} variant="inset" />
      </Button>
      <Button icon={<Mail />} variant="primary">
        Unread
        <Badge count={3} />
      </Button>
    </div>
  );
}
