import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button, buttonVariants } from "./button";

const Icon = () => <svg data-testid="icon" />;

function childSlots(button: HTMLElement) {
  return [...button.childNodes].map((node) =>
    node instanceof Element
      ? (node.getAttribute("data-slot") ?? node.textContent)
      : node.textContent
  );
}

describe("Button", () => {
  it("renders a native button with type=button", () => {
    render(<Button>Sign in</Button>);
    const button = screen.getByRole("button", { name: "Sign in" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("data-slot", "button");
  });

  it("calls onClick", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Go</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is raised at rest and pressed while active", () => {
    render(<Button>Go</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "shadow-neu",
      "inset-shadow-neu-flat",
      "bg-neu-convex",
      "active:inset-shadow-neu-sm",
      "active:shadow-neu-flat"
    );
  });

  it.each([
    ["default", "bg-neu-convex"],
    ["primary", "bg-primary"],
    ["destructive", "text-destructive"],
    ["ghost", "shadow-neu-flat"],
  ] as const)("applies the %s variant", (variant, expected) => {
    render(<Button variant={variant}>Go</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass(expected);
    expect(button).toHaveAttribute("data-variant", variant);
  });

  it("is a pill by default", () => {
    render(<Button>Go</Button>);
    expect(screen.getByRole("button")).toHaveClass("rounded-full");
  });

  describe("icon", () => {
    it("accepts any element and hides it from assistive tech", () => {
      render(<Button icon={<Icon />}>Share</Button>);
      const wrapper = screen.getByTestId("icon").parentElement;
      expect(wrapper).toHaveAttribute("data-slot", "button-icon");
      expect(wrapper).toHaveAttribute("aria-hidden", "true");
      expect(screen.getByRole("button")).toHaveAccessibleName("Share");
    });

    it.each([
      ["start", ["button-icon", "Share"]],
      ["top", ["button-icon", "Share"]],
      ["end", ["Share", "button-icon"]],
      ["bottom", ["Share", "button-icon"]],
    ] as const)("places the icon at %s", (iconPosition, order) => {
      render(
        <Button icon={<Icon />} iconPosition={iconPosition}>
          Share
        </Button>
      );
      const button = screen.getByRole("button");
      expect(childSlots(button)).toEqual(order);
      expect(button).toHaveAttribute("data-icon-position", iconPosition);
    });

    it("stacks the icon for top and bottom", () => {
      render(
        <Button icon={<Icon />} iconPosition="top">
          Share
        </Button>
      );
      expect(screen.getByRole("button")).toHaveClass("flex-col");
    });

    it("defaults to the start position", () => {
      render(<Button icon={<Icon />}>Share</Button>);
      expect(screen.getByRole("button")).toHaveAttribute(
        "data-icon-position",
        "start"
      );
    });

    it("omits icon attributes when there is no icon", () => {
      render(<Button iconPosition="top">Share</Button>);
      const button = screen.getByRole("button");
      expect(button).not.toHaveAttribute("data-icon-position");
      expect(button).not.toHaveClass("flex-col");
    });
  });

  describe("icon-only", () => {
    it("is a square tile named by aria-label", () => {
      render(<Button aria-label="Home" icon={<Icon />} />);
      const button = screen.getByRole("button", { name: "Home" });
      expect(button).toHaveAttribute("data-icon-only");
      expect(button).toHaveClass("size-10", "rounded-lg");
    });

    it("is a circle when shape is pill", () => {
      render(<Button aria-label="Add" icon={<Icon />} shape="pill" />);
      expect(screen.getByRole("button")).toHaveClass("size-10", "rounded-full");
    });

    it.each([
      ["sm", "size-8"],
      ["lg", "size-12"],
    ] as const)("sizes the %s tile", (size, expected) => {
      render(<Button aria-label="Home" icon={<Icon />} size={size} />);
      expect(screen.getByRole("button")).toHaveClass(expected);
    });
  });

  describe("loading", () => {
    it("marks the button busy and keeps the label", () => {
      render(<Button isLoading>Save</Button>);
      const button = screen.getByRole("button", { name: "Save" });
      expect(button).toHaveAttribute("aria-busy", "true");
      expect(button).toHaveAttribute("data-loading");
      // jsdom ignores CSS, so check the label is only transparent, not hidden.
      const label = screen.getByText("Save");
      expect(label).toHaveClass("opacity-0");
      expect(label).not.toHaveClass("invisible");
    });

    it("stays focusable and raised: aria-disabled, not disabled", () => {
      render(<Button isLoading>Save</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-disabled", "true");
      expect(button).not.toBeDisabled();
      button.focus();
      expect(button).toHaveFocus();
    });

    it("does not fire onClick", async () => {
      const onClick = vi.fn();
      render(
        <Button isLoading onClick={onClick}>
          Save
        </Button>
      );
      await userEvent.click(screen.getByRole("button"));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  it("goes flat when disabled", () => {
    render(<Button disabled>Go</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:shadow-neu-flat");
  });

  it("spans the container when fullWidth", () => {
    render(<Button fullWidth>Go</Button>);
    expect(screen.getByRole("button")).toHaveClass("w-full");
  });

  it("lets className override variant classes", () => {
    render(<Button className="normal-case shadow-neu-lg">Go</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("shadow-neu-lg", "normal-case");
    expect(button).not.toHaveClass("shadow-neu", "uppercase");
  });

  it("renders another element through the render prop without a type", () => {
    render(
      <Button nativeButton={false} render={<span />}>
        Custom
      </Button>
    );
    const button = screen.getByRole("button", { name: "Custom" });
    expect(button.tagName).toBe("SPAN");
    expect(button).not.toHaveAttribute("type");
  });

  it("styles links through buttonVariants", () => {
    render(
      <a className={buttonVariants({ variant: "primary" })} href="/docs">
        Docs
      </a>
    );
    expect(screen.getByRole("link", { name: "Docs" })).toHaveClass(
      "bg-primary",
      "shadow-neu"
    );
  });
});
