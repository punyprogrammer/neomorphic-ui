"use client";

import {
  TypographyH2,
  TypographyMuted,
  TypographySmall,
} from "@neomorphic-react/ui/typography";

export default function TypographyRender() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-2">
      <TypographyH2 render={(props) => <h1 {...props} />}>
        Your trips
      </TypographyH2>
      <TypographyMuted>Three upcoming, one past.</TypographyMuted>
      <TypographySmall render={<time dateTime="2026-10-16" />}>
        Next departure: 16 October
      </TypographySmall>
    </div>
  );
}
