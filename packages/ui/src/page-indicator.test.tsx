import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import { PageIndicator } from "./page-indicator";

const dots = () =>
  Array.from(
    document.querySelectorAll<HTMLElement>('[data-slot="page-indicator-dot"]')
  );

const slideLabel = (index: number, count: number) =>
  `Slide ${index + 1} / ${count}`;

function Pager({ count = 5 }: { count?: number }) {
  const [page, setPage] = useState(0);
  return (
    <PageIndicator
      aria-label="Slides"
      count={count}
      onValueChange={setPage}
      value={page}
    />
  );
}

describe("PageIndicator", () => {
  it("is a passive image named after the current page by default", () => {
    render(<PageIndicator count={3} value={1} />);
    const indicator = screen.getByRole("img", { name: "Page 2 of 3" });
    expect(indicator).toHaveAttribute("data-slot", "page-indicator");
    expect(screen.queryAllByRole("button")).toHaveLength(0);
    expect(dots()).toHaveLength(3);
  });

  it("raises the current dot in colour and leaves the rest as wells", () => {
    render(<PageIndicator count={3} value={1} />);
    const [first, second] = dots();
    expect(second).toHaveAttribute("data-current");
    expect(first).not.toHaveAttribute("data-current");
    expect(first).toHaveClass("inset-shadow-neu-sm", "shadow-neu-flat");
    expect(second).toHaveClass(
      "data-current:shadow-neu-sm",
      "data-current:inset-shadow-neu-flat",
      "data-current:bg-[var(--page-indicator-fill,var(--color-primary))]"
    );
  });

  it("clamps an out-of-range value", () => {
    render(<PageIndicator count={3} value={7} />);
    expect(screen.getByRole("img", { name: "Page 3 of 3" })).toBeVisible();
    expect(dots()[2]).toHaveAttribute("data-current");
  });

  it("names pages with getAriaLabel", () => {
    render(<PageIndicator count={4} getAriaLabel={slideLabel} value={0} />);
    expect(screen.getByRole("img", { name: "Slide 1 / 4" })).toBeVisible();
  });

  it("becomes a group of page buttons with onValueChange", () => {
    const onValueChange = vi.fn();
    render(
      <PageIndicator
        aria-label="Slides"
        count={3}
        onValueChange={onValueChange}
        value={0}
      />
    );
    expect(screen.getByRole("group", { name: "Slides" })).toBeVisible();
    const current = screen.getByRole("button", { name: "Page 1 of 3" });
    expect(current).toHaveAttribute("aria-current", "true");
    expect(current).toHaveAttribute("tabindex", "0");
    const third = screen.getByRole("button", { name: "Page 3 of 3" });
    expect(third).toHaveAttribute("tabindex", "-1");

    fireEvent.click(third);
    expect(onValueChange).toHaveBeenCalledWith(2);
    fireEvent.click(current);
    expect(onValueChange).toHaveBeenCalledTimes(1);
  });

  it("moves between pages with arrow keys, Home and End", () => {
    render(<Pager />);
    const page = (n: number) =>
      screen.getByRole("button", { name: `Page ${n} of 5` });

    page(1).focus();
    fireEvent.keyDown(page(1), { key: "ArrowRight" });
    expect(page(2)).toHaveFocus();
    expect(page(2)).toHaveAttribute("aria-current", "true");

    fireEvent.keyDown(page(2), { key: "End" });
    expect(page(5)).toHaveFocus();
    fireEvent.keyDown(page(5), { key: "ArrowRight" });
    expect(page(5)).toHaveAttribute("aria-current", "true");

    fireEvent.keyDown(page(5), { key: "ArrowLeft" });
    expect(page(4)).toHaveFocus();
    fireEvent.keyDown(page(4), { key: "Home" });
    expect(page(1)).toHaveFocus();
    expect(page(1)).toHaveAttribute("aria-current", "true");
  });

  it("uses up and down arrows when vertical", () => {
    const onValueChange = vi.fn();
    render(
      <PageIndicator
        count={3}
        onValueChange={onValueChange}
        orientation="vertical"
        value={1}
      />
    );
    const current = screen.getByRole("button", { name: "Page 2 of 3" });
    fireEvent.keyDown(current, { key: "ArrowRight" });
    expect(onValueChange).not.toHaveBeenCalled();
    fireEvent.keyDown(current, { key: "ArrowDown" });
    expect(onValueChange).toHaveBeenLastCalledWith(2);
    fireEvent.keyDown(current, { key: "ArrowUp" });
    expect(onValueChange).toHaveBeenLastCalledWith(0);
    expect(screen.getByRole("group")).toHaveAttribute(
      "data-orientation",
      "vertical"
    );
  });

  it("sizes dots inside targets of at least 24px", () => {
    render(<PageIndicator count={2} size="sm" />);
    const item = document.querySelector('[data-slot="page-indicator-item"]');
    expect(item).toHaveClass("size-6");
    expect(dots()[0]).toHaveClass("size-2");
    expect(screen.getByRole("img")).toHaveAttribute("data-size", "sm");
  });

  it("lets className override root classes and render swap the element", () => {
    render(
      <PageIndicator className="flex-col" count={2} render={<section />} />
    );
    const root = screen.getByRole("img");
    expect(root.tagName).toBe("SECTION");
    expect(root).toHaveClass("flex-col");
    expect(root).not.toHaveClass("flex-row");
  });
});
