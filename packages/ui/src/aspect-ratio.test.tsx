import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AspectRatio } from "./aspect-ratio";

const WIDE_RE = /^1\.777\d*( \/ 1)?$/;
const SQUARE_RE = /^1( \/ 1)?$/;

describe("AspectRatio", () => {
  it("holds its ratio and crops images to fill", () => {
    render(
      <AspectRatio data-testid="frame" ratio={16 / 9}>
        <img alt="Beach" height={90} src="beach.jpg" width={160} />
      </AspectRatio>
    );
    const frame = screen.getByTestId("frame");
    expect(frame.style.aspectRatio).toMatch(WIDE_RE);
    expect(frame).toHaveClass("[&>img]:object-cover", "overflow-hidden");
  });

  it("is square by default and merges style", () => {
    render(<AspectRatio data-testid="frame" style={{ maxWidth: 200 }} />);
    const frame = screen.getByTestId("frame");
    expect(frame.style.aspectRatio).toMatch(SQUARE_RE);
    expect(frame.style.maxWidth).toBe("200px");
  });
});
