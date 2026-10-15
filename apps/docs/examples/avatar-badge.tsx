"use client";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@neomorphic-react/ui/avatar";
import { portrait } from "@/components/blocks/images";

export default function AvatarBadgeExample() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <div className="flex items-center gap-3">
        <Avatar size="lg">
          <AvatarImage alt="" src={portrait(140)} />
          <AvatarFallback>GH</AvatarFallback>
          <AvatarBadge />
        </Avatar>
        <span className="text-foreground text-sm">Grace · online</span>
      </div>
      <div className="flex items-center gap-3">
        <Avatar shape="rounded" size="lg">
          <AvatarFallback>KJ</AvatarFallback>
          <AvatarBadge className="bg-warning" />
        </Avatar>
        <span className="text-foreground text-sm">Katherine · away</span>
      </div>
      <div className="flex items-center gap-3">
        <Avatar size="lg">
          <AvatarFallback>AT</AvatarFallback>
          <AvatarBadge className="bg-muted-foreground" />
        </Avatar>
        <span className="text-foreground text-sm">Alan · offline</span>
      </div>
    </div>
  );
}
