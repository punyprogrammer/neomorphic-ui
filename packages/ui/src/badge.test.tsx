import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge, BadgeAnchor } from "./badge";

describe("Badge", () => {
  it("renders children in a span", () => {
    render(<Badge data-testid="badge">New</Badge>);
    const badge = screen.getByTestId("badge");
    expect(badge.tagName).toBe("SPAN");
    expect(badge).toHaveTextContent("New");
  });

  it("exposes its parts API through data attributes", () => {
    render(<Badge data-testid="badge">1</Badge>);
    const badge = screen.getByTestId("badge");
    expect(badge).toHaveAttribute("data-slot", "badge");
    expect(badge).toHaveAttribute("data-variant", "default");
    expect(badge).toHaveAttribute("data-size", "md");
  });

  it("is raised by default", () => {
    render(<Badge data-testid="badge">1</Badge>);
    expect(screen.getByTestId("badge")).toHaveClass(
      "bg-neu-convex",
      "shadow-neu-sm",
      "inset-shadow-neu-flat"
    );
  });

  it.each([
    ["inset", ["inset-shadow-neu-sm", "shadow-neu-flat"]],
    ["primary", ["bg-primary", "text-primary-foreground"]],
    ["destructive", ["bg-destructive", "text-destructive-foreground"]],
    ["success", ["bg-success", "text-success-foreground"]],
    ["warning", ["bg-warning", "text-warning-foreground"]],
  ] as const)("pairs the %s variant's fill and text", (variant, classes) => {
    render(
      <Badge data-testid="badge" variant={variant}>
        1
      </Badge>
    );
    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass(...classes);
    expect(badge).not.toHaveClass("bg-neu-convex");
  });

  describe("count", () => {
    it("shows the number", () => {
      render(<Badge count={3} data-testid="badge" />);
      expect(screen.getByTestId("badge")).toHaveTextContent("3");
    });

    it("caps at max", () => {
      render(<Badge count={120} data-testid="badge" />);
      expect(screen.getByTestId("badge")).toHaveTextContent("99+");
    });

    it("honours a custom max", () => {
      render(<Badge count={17} data-testid="badge" max={9} />);
      expect(screen.getByTestId("badge")).toHaveTextContent("9+");
    });

    it("hides at zero", () => {
      render(<Badge count={0} data-testid="badge" />);
      expect(screen.queryByTestId("badge")).not.toBeInTheDocument();
    });

    it("shows zero with showZero", () => {
      render(<Badge count={0} data-testid="badge" showZero />);
      expect(screen.getByTestId("badge")).toHaveTextContent("0");
    });

    it("prefers children over count", () => {
      render(
        <Badge count={5} data-testid="badge">
          Five
        </Badge>
      );
      expect(screen.getByTestId("badge")).toHaveTextContent("Five");
    });
  });

  describe("dot", () => {
    it("renders an empty dot sized to the badge size", () => {
      render(<Badge count={4} data-testid="badge" dot size="lg" />);
      const badge = screen.getByTestId("badge");
      expect(badge).toBeEmptyDOMElement();
      expect(badge).toHaveClass("size-3");
      expect(badge).toHaveAttribute("data-dot");
    });
  });

  describe("placement", () => {
    it("pins to the anchor corner and hides from assistive tech", () => {
      render(
        <BadgeAnchor data-testid="anchor">
          <button aria-label="Notifications, 3 unread" type="button" />
          <Badge count={3} data-testid="badge" placement="top-end" />
        </BadgeAnchor>
      );
      const badge = screen.getByTestId("badge");
      expect(screen.getByTestId("anchor")).toHaveClass("relative");
      expect(badge).toHaveClass("absolute", "top-0", "end-0");
      expect(badge).toHaveAttribute("aria-hidden", "true");
      expect(badge).toHaveAttribute("data-placement", "top-end");
      expect(
        screen.getByRole("button", { name: "Notifications, 3 unread" })
      ).toBeInTheDocument();
    });

    it("flips its offset for right-to-left", () => {
      render(<Badge count={1} data-testid="badge" placement="top-start" />);
      expect(screen.getByTestId("badge")).toHaveClass(
        "start-0",
        "-translate-x-1/2",
        "rtl:translate-x-1/2"
      );
    });

    it("moves onto a circular anchor's edge", () => {
      render(
        <Badge
          count={1}
          data-testid="badge"
          overlap="circular"
          placement="bottom-end"
        />
      );
      const badge = screen.getByTestId("badge");
      expect(badge).toHaveClass("bottom-[14.6%]", "end-[14.6%]");
      expect(badge).not.toHaveClass("bottom-0", "end-0");
    });

    it("lets aria-hidden be overridden", () => {
      render(
        <Badge
          aria-hidden={false}
          count={1}
          data-testid="badge"
          placement="top-end"
        />
      );
      expect(screen.getByTestId("badge")).toHaveAttribute(
        "aria-hidden",
        "false"
      );
    });

    it("stays inline without a placement", () => {
      render(<Badge count={1} data-testid="badge" />);
      const badge = screen.getByTestId("badge");
      expect(badge).not.toHaveClass("absolute");
      expect(badge).not.toHaveAttribute("aria-hidden");
    });
  });

  it("lets className override variant classes", () => {
    render(
      <Badge className="shadow-neu" data-testid="badge">
        1
      </Badge>
    );
    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass("shadow-neu");
    expect(badge).not.toHaveClass("shadow-neu-sm");
  });

  it("renders as another element through the render prop", () => {
    render(
      <Badge render={<a href="/inbox" />} variant="primary">
        Inbox
      </Badge>
    );
    expect(screen.getByRole("link", { name: "Inbox" })).toHaveAttribute(
      "data-slot",
      "badge"
    );
  });
});

describe("BadgeAnchor", () => {
  it("renders a relative inline wrapper", () => {
    render(<BadgeAnchor data-testid="anchor">x</BadgeAnchor>);
    const anchor = screen.getByTestId("anchor");
    expect(anchor).toHaveAttribute("data-slot", "badge-anchor");
    expect(anchor).toHaveClass("relative", "inline-flex");
  });
});
