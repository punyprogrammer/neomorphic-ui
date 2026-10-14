import { Field } from "@base-ui/react/field";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Input } from "./input";

describe("Input", () => {
  it("renders a text field named by its label", () => {
    render(
      <>
        <label htmlFor="email">Email</label>
        <Input id="email" />
      </>
    );
    const input = screen.getByRole("textbox", { name: "Email" });
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("data-slot", "input");
    expect(input).toHaveAttribute("data-size", "md");
  });

  it("is a well that deepens on focus, both shadow slots set", () => {
    render(<Input aria-label="Name" />);
    expect(screen.getByRole("textbox")).toHaveClass(
      "inset-shadow-neu",
      "shadow-neu-flat",
      "focus-visible:inset-shadow-neu-lg",
      "read-only:inset-shadow-neu-sm"
    );
  });

  it("sizes and shapes the well; pill is the kit's search field", () => {
    render(<Input aria-label="Search" shape="pill" size="lg" type="search" />);
    const input = screen.getByRole("searchbox");
    expect(input).toHaveClass("h-12", "rounded-full", "px-6");
    expect(input).toHaveAttribute("data-shape", "pill");
  });

  it("maps htmlSize to the native size attribute", () => {
    render(<Input aria-label="Code" htmlSize={6} />);
    expect(screen.getByRole("textbox")).toHaveAttribute("size", "6");
  });

  it("reports value changes through onValueChange", () => {
    const onValueChange = vi.fn();
    render(<Input aria-label="Name" onValueChange={onValueChange} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Ada" },
    });
    expect(onValueChange).toHaveBeenCalledWith("Ada", expect.anything());
  });

  it("shows invalid from aria-invalid or a Field", () => {
    render(
      <Field.Root invalid>
        <Field.Label>Email</Field.Label>
        <Input />
      </Field.Root>
    );
    const input = screen.getByRole("textbox", { name: "Email" });
    expect(input).toHaveAttribute("data-invalid");
    expect(input).toHaveClass(
      "aria-invalid:ring-destructive/70",
      "data-invalid:ring-destructive/70"
    );
  });

  it("lets className override variant classes", () => {
    render(<Input aria-label="Name" className="h-14" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("h-14");
    expect(input).not.toHaveClass("h-10");
  });
});
