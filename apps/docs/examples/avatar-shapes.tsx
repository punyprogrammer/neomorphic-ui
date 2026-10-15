"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@neomorphic-react/ui/avatar";
import { Hotel } from "lucide-react";
import { portrait } from "@/components/blocks/images";

export default function AvatarShapes() {
  return (
    <div className="grid gap-6">
      <div className="flex items-center gap-6">
        <Avatar size="lg">
          <AvatarImage alt="Kofi Mensah" src={portrait(140)} />
          <AvatarFallback>KM</AvatarFallback>
        </Avatar>
        <Avatar shape="rounded" size="lg">
          <AvatarImage alt="Kofi Mensah" src={portrait(140)} />
          <AvatarFallback>KM</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center gap-4">
        <Avatar shape="rounded" size="lg">
          <AvatarFallback>
            <Hotel aria-hidden="true" />
          </AvatarFallback>
        </Avatar>
        <div className="grid gap-0.5">
          <p className="font-medium text-foreground text-sm">Hotel Mulia</p>
          <p className="text-muted-foreground text-xs">Nusa Dua · 3 nights</p>
        </div>
      </div>
    </div>
  );
}
