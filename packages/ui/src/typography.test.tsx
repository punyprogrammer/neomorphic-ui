import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyInlineCode,
  TypographyList,
  TypographyMuted,
} from "./typography";

function renderH1(props: React.ComponentProps<"h1">) {
  return <h1 {...props} />;
}

describe("Typography", () => {
  it("renders headings at their level", () => {
    render(
      <>
        <TypographyH1>Title</TypographyH1>
        <TypographyH2>Section</TypographyH2>
      </>
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Title"
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveAttribute(
      "data-slot",
      "typography-h2"
    );
  });

  it("swaps the element through render, keeping the style", () => {
    render(<TypographyH2 render={renderH1}>Page</TypographyH2>);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveClass("text-3xl");
  });

  it("presses quotes and inline code into the surface", () => {
    render(
      <>
        <TypographyBlockquote>Quote</TypographyBlockquote>
        <TypographyInlineCode>pnpm</TypographyInlineCode>
      </>
    );
    expect(screen.getByText("Quote").tagName).toBe("BLOCKQUOTE");
    expect(screen.getByText("Quote")).toHaveClass(
      "inset-shadow-neu-sm",
      "shadow-neu-flat",
      "border-primary"
    );
    expect(screen.getByText("pnpm").tagName).toBe("CODE");
    expect(screen.getByText("pnpm")).toHaveClass("inset-shadow-neu-sm");
  });

  it("renders lists and lets className override", () => {
    render(
      <>
        <TypographyList>
          <li>One</li>
        </TypographyList>
        <TypographyMuted className="text-xs">Note</TypographyMuted>
      </>
    );
    expect(screen.getByRole("list")).toHaveClass("list-disc");
    expect(screen.getByText("Note")).toHaveClass("text-xs");
    expect(screen.getByText("Note")).not.toHaveClass("text-sm");
  });
});
