"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@neomorphic-react/ui/avatar";
import { portrait } from "@/components/blocks/images";

const travellers = [
  { initials: "AL", hue: 210 },
  { initials: "MR", hue: 30 },
  { initials: "KM", hue: 140 },
];

export default function AvatarGroupExample() {
  return (
    <div className="grid justify-items-center gap-6">
      <AvatarGroup aria-label="6 travellers">
        {travellers.map(({ initials, hue }) => (
          <Avatar key={initials}>
            <AvatarImage alt="" src={portrait(hue)} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        ))}
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
      <AvatarGroup aria-label="4 editors">
        {["NV", "RK", "TS"].map((initials) => (
          <Avatar key={initials} size="lg">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        ))}
        <AvatarGroupCount>+1</AvatarGroupCount>
      </AvatarGroup>
    </div>
  );
}
