"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@neomorphic-react/ui/card";
import { Chip } from "@neomorphic-react/ui/chip";
import {
  TypographyH3,
  TypographyInlineCode,
  TypographyList,
  TypographyMuted,
  TypographyP,
} from "@neomorphic-react/ui/typography";

export default function TypographyInContext() {
  return (
    <Card className="w-full max-w-lg" render={<article />}>
      <CardHeader>
        <TypographyH3 render={(props) => <h2 {...props} />}>
          What's new in Trips
        </TypographyH3>
        <TypographyMuted>Released 14 October 2026</TypographyMuted>
        <CardAction>
          <Chip size="sm" variant="primary">
            v2.4
          </Chip>
        </CardAction>
      </CardHeader>
      <CardContent>
        <TypographyP>
          Shared trips now stay in sync for everyone on the booking, and seat
          changes show up on your ticket within a minute.
        </TypographyP>
        <TypographyList className="my-4">
          <li>Invite travel companions from the trip page</li>
          <li>Offline tickets for every leg of the journey</li>
          <li>Faster search across past bookings</li>
        </TypographyList>
        <TypographyMuted>
          Set <TypographyInlineCode>sync=off</TypographyInlineCode> in your trip
          settings to keep a trip to yourself.
        </TypographyMuted>
      </CardContent>
    </Card>
  );
}
