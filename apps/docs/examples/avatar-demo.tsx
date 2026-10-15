"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@neomorphic-react/ui/avatar";
import { User } from "lucide-react";
import { portrait } from "@/components/blocks/images";

export default function AvatarDemo() {
  return (
    <div className="flex items-center gap-6">
      <Avatar size="lg">
        <AvatarImage alt="Ada Lovelace" src={portrait(210)} />
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>GH</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>
          <User aria-hidden="true" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
