import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Textarea } from "./textarea";

function Labelled(props: React.ComponentProps<typeof Textarea>) {
  return (
    <>
      <label htmlFor="message">Message</label>
      <Textarea id="message" placeholder="Your message here…" {...props} />
    </>
  );
}

describe("Textarea", () => {
  it("renders a textarea named by its label", () => {
    render(<Labelled />);
    const field = screen.getByRole("textbox", { name: "Message" });
    expect(field.tagName).toBe("TEXTAREA");
    expect(field).toHaveAttribute("placeholder", "Your message here…");
    expect(field).toHaveAttribute("data-slot", "textarea");
  });

  it("is a well that deepens on focus, setting both shadow slots", () => {
    render(<Labelled />);
    expect(screen.getByRole("textbox")).toHaveClass(
      "inset-shadow-neu",
      "shadow-neu-flat",
      "focus-visible:inset-shadow-neu-lg"
    );
  });

  it("resizes vertically by default", () => {
    render(<Labelled />);
    const field = screen.getByRole("textbox");
    expect(field).toHaveClass("resize-y");
    expect(field).not.toHaveClass("field-sizing-content");
  });

  it("grows with its content when autoResize", () => {
    render(<Labelled autoResize />);
    expect(screen.getByRole("textbox")).toHaveClass(
      "field-sizing-content",
      "resize-none"
    );
  });

  it("forwards native props and events", () => {
    const onChange = vi.fn();
    render(<Labelled maxLength={20} onChange={onChange} rows={6} />);
    const field = screen.getByRole("textbox");
    fireEvent.change(field, { target: { value: "Hello" } });
    expect(onChange).toHaveBeenCalled();
    expect(field).toHaveValue("Hello");
    expect(field).toHaveAttribute("maxlength", "20");
    expect(field).toHaveAttribute("rows", "6");
  });

  it("marks invalid and disabled states", () => {
    render(<Labelled aria-invalid disabled />);
    const field = screen.getByRole("textbox");
    expect(field).toBeDisabled();
    expect(field).toHaveClass("aria-invalid:ring-destructive/70");
  });

  it("forwards its ref", () => {
    const ref = { current: null as HTMLTextAreaElement | null };
    render(<Textarea aria-label="Notes" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("lets className override variant classes", () => {
    render(<Labelled className="min-h-40" />);
    const field = screen.getByRole("textbox");
    expect(field).toHaveClass("min-h-40");
    expect(field).not.toHaveClass("min-h-28");
  });
});
