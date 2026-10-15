import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DirectionProvider, useDirection } from "./direction";

function Reader() {
  return <span>{useDirection()}</span>;
}

describe("DirectionProvider", () => {
  it("defaults to ltr", () => {
    render(<Reader />);
    expect(screen.getByText("ltr")).toBeInTheDocument();
  });

  it("tells descendants the direction", () => {
    render(
      <DirectionProvider direction="rtl">
        <Reader />
      </DirectionProvider>
    );
    expect(screen.getByText("rtl")).toBeInTheDocument();
  });
});
