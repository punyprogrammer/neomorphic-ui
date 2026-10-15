"use client";

import {
  TypographyBlockquote,
  TypographyInlineCode,
  TypographyList,
  TypographyP,
} from "@neomorphic-react/ui/typography";

export default function TypographyBlocks() {
  return (
    <div className="w-full max-w-xl">
      <TypographyP>What to pack for the overnight train:</TypographyP>
      <TypographyList>
        <li>A light jacket for the coast</li>
        <li>Snacks, as the dining car closes at 22:00</li>
        <li>A paper copy of your ticket</li>
      </TypographyList>
      <TypographyBlockquote>
        Sleep on the left side of the carriage and you wake up to the sea.
      </TypographyBlockquote>
      <TypographyP>
        Run <TypographyInlineCode>pnpm trips export</TypographyInlineCode> to
        save the list as a PDF.
      </TypographyP>
    </div>
  );
}
