"use client";

import { Avatar, AvatarFallback } from "@neomorphic-react/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@neomorphic-react/ui/hover-card";

export default function HoverCardDemo() {
  return (
    <p className="text-muted-foreground text-sm">
      Hosted by{" "}
      <HoverCard>
        <HoverCardTrigger href="#ines-almeida">Inês Almeida</HoverCardTrigger>
        <HoverCardContent>
          <div className="flex gap-4">
            <Avatar>
              <AvatarFallback>IA</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="font-semibold text-foreground">Inês Almeida</p>
              <p className="text-muted-foreground">
                Guides walking tours of Alfama. Hosting since 2019.
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </p>
  );
}
