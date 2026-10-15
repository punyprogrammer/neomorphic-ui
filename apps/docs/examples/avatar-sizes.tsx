"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@neomorphic-react/ui/avatar";
import { portrait } from "@/components/blocks/images";

export default function AvatarSizes() {
  return (
    <div className="grid gap-6">
      <div className="flex items-center gap-6">
        {(["sm", "md", "lg", "xl"] as const).map((size) => (
          <Avatar key={size} size={size}>
            <AvatarImage alt="" src={portrait(30)} />
            <AvatarFallback>MR</AvatarFallback>
          </Avatar>
        ))}
      </div>
      <div className="flex items-center gap-6">
        {(["sm", "md", "lg", "xl"] as const).map((size) => (
          <Avatar key={size} size={size}>
            <AvatarFallback>MR</AvatarFallback>
          </Avatar>
        ))}
      </div>
    </div>
  );
}
