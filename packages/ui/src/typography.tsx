import { useRender } from "@base-ui/react/use-render";
import type * as React from "react";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

// Headings use `--font-heading` when the theme sets one (the kit's Sofia
// Pro), else the body font.
const HEADING = "[font-family:var(--font-heading,inherit)] text-foreground";

type TypographyProps<Tag extends keyof React.JSX.IntrinsicElements> =
  useRender.ComponentProps<Tag>;

/**
 * Each part renders its own element and takes `render` for another one,
 * e.g. `<TypographyH2 render={<h1 />}>` for an `h1` styled as `h2`.
 */
function createTypography<Tag extends keyof React.JSX.IntrinsicElements>(
  tag: Tag,
  slot: string,
  baseClassName: string
) {
  function Typography({ className, render, ...props }: TypographyProps<Tag>) {
    return useRender({
      defaultTagName: tag,
      render,
      props: { ...props, className: cn(baseClassName, className as string) },
      state: { slot },
    });
  }
  return Typography;
}

// ---------------------------------------------------------------------------
// Parts
// ---------------------------------------------------------------------------

const TypographyH1 = createTypography(
  "h1",
  "typography-h1",
  `${HEADING} scroll-m-20 text-balance font-bold text-4xl tracking-tight`
);

const TypographyH2 = createTypography(
  "h2",
  "typography-h2",
  `${HEADING} scroll-m-20 font-semibold text-3xl tracking-tight first:mt-0`
);

const TypographyH3 = createTypography(
  "h3",
  "typography-h3",
  `${HEADING} scroll-m-20 font-semibold text-2xl tracking-tight`
);

const TypographyH4 = createTypography(
  "h4",
  "typography-h4",
  `${HEADING} scroll-m-20 font-semibold text-xl tracking-tight`
);

const TypographyP = createTypography(
  "p",
  "typography-p",
  "text-foreground leading-7 [&:not(:first-child)]:mt-6"
);

/** An intro paragraph, larger and quieter than body text. */
const TypographyLead = createTypography(
  "p",
  "typography-lead",
  "text-muted-foreground text-xl"
);

const TypographyLarge = createTypography(
  "div",
  "typography-large",
  "font-semibold text-foreground text-lg"
);

const TypographySmall = createTypography(
  "small",
  "typography-small",
  "font-medium text-foreground text-sm leading-none"
);

const TypographyMuted = createTypography(
  "p",
  "typography-muted",
  "text-muted-foreground text-sm"
);

/** A quotation in a shallow well, marked by a primary rule at its start. */
const TypographyBlockquote = createTypography(
  "blockquote",
  "typography-blockquote",
  "inset-shadow-neu-sm mt-6 rounded-lg border-primary border-s-2 bg-background px-5 py-3 text-foreground italic shadow-neu-flat"
);

const TypographyList = createTypography(
  "ul",
  "typography-list",
  "my-6 ms-6 list-disc text-foreground [&>li]:mt-2"
);

/** Code in running text, pressed into the line like a tiny well. */
const TypographyInlineCode = createTypography(
  "code",
  "typography-inline-code",
  "inset-shadow-neu-sm relative rounded-sm bg-background px-[0.375rem] py-[0.125rem] font-medium font-mono text-[0.875em] text-foreground shadow-neu-flat"
);

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { TypographyProps };
export {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyInlineCode,
  TypographyLarge,
  TypographyLead,
  TypographyList,
  TypographyMuted,
  TypographyP,
  TypographySmall,
};
