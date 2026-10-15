"use client";

import {
  TypographyLarge,
  TypographyLead,
  TypographyMuted,
  TypographyP,
  TypographySmall,
} from "@neomorphic-react/ui/typography";

export default function TypographyText() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-5">
      <TypographyLead>
        A week on the coast, with a day in Porto and two in Lisbon.
      </TypographyLead>
      <TypographyLarge>Departs Friday, 21:40</TypographyLarge>
      <TypographyP>
        Trains run every hour from Porto Campanhã. Seats are reserved, so keep
        your ticket to hand when the conductor comes through.
      </TypographyP>
      <TypographySmall>Updated 2 hours ago</TypographySmall>
      <TypographyMuted>
        Prices include a seat reservation and one bag.
      </TypographyMuted>
    </div>
  );
}
