"use client";

import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
} from "@neomorphic-react/ui/typography";

export default function TypographyHeadings() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <TypographyH1>Plan your trip</TypographyH1>
      <TypographyH2>Getting there</TypographyH2>
      <TypographyH3>By train</TypographyH3>
      <TypographyH4>Night sleepers</TypographyH4>
    </div>
  );
}
