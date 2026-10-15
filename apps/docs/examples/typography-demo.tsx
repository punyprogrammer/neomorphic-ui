"use client";

import {
  TypographyBlockquote,
  TypographyH2,
  TypographyInlineCode,
  TypographyLead,
  TypographyP,
} from "@neomorphic-react/ui/typography";

export default function TypographyDemo() {
  return (
    <article className="w-full max-w-xl">
      <TypographyH2>The slow road to Lisbon</TypographyH2>
      <TypographyLead className="mt-2">
        Three days, two trains and one missed connection along the Atlantic
        coast.
      </TypographyLead>
      <TypographyP>
        The overnight sleeper leaves at 21:40. Book a berth with{" "}
        <TypographyInlineCode>seat=lower</TypographyInlineCode> if you can; the
        upper bunks run hot.
      </TypographyP>
      <TypographyBlockquote>
        The best part of the trip was the part we hadn't planned.
      </TypographyBlockquote>
    </article>
  );
}
