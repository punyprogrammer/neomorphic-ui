"use client";

import { Badge, BadgeAnchor } from "@neomorphic-react/ui/badge";
import { Button } from "@neomorphic-react/ui/button";
import { Inbox, MessageCircle, User } from "lucide-react";

const PLACEMENTS = [
  "top-start",
  "top-end",
  "bottom-start",
  "bottom-end",
] as const;

export default function BadgePlacements() {
  return (
    <div className="grid justify-items-center gap-12">
      <div className="flex flex-wrap items-center justify-center gap-12">
        {PLACEMENTS.map((placement) => (
          <BadgeAnchor key={placement}>
            <Button
              aria-label={`Inbox, 4 new (${placement})`}
              icon={<Inbox />}
              size="lg"
            />
            <Badge count={4} placement={placement} variant="primary" />
          </BadgeAnchor>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-12">
        <BadgeAnchor>
          <Button
            aria-label="Messages, 2 unread"
            icon={<MessageCircle />}
            shape="pill"
            size="lg"
          />
          <Badge count={2} placement="top-end" variant="destructive" />
        </BadgeAnchor>
        <BadgeAnchor>
          <Button
            aria-label="Messages, 2 unread"
            icon={<MessageCircle />}
            shape="pill"
            size="lg"
          />
          <Badge
            count={2}
            overlap="circular"
            placement="top-end"
            variant="destructive"
          />
        </BadgeAnchor>
        <BadgeAnchor>
          <Button
            aria-label="Profile, online"
            icon={<User />}
            shape="pill"
            size="lg"
          />
          <Badge
            dot
            overlap="circular"
            placement="bottom-end"
            variant="success"
          />
        </BadgeAnchor>
      </div>
    </div>
  );
}
