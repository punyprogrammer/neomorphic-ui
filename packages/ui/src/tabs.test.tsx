import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

function Trip(
  props: Partial<React.ComponentProps<typeof Tabs>> & {
    variant?: "default" | "line";
  }
) {
  const { variant, ...rest } = props;
  return (
    <Tabs defaultValue="outbound" {...rest}>
      <TabsList aria-label="Legs" variant={variant}>
        <TabsTrigger value="outbound">Outbound</TabsTrigger>
        <TabsTrigger value="return">Return</TabsTrigger>
        <TabsTrigger disabled value="extras">
          Extras
        </TabsTrigger>
      </TabsList>
      <TabsContent value="outbound">Lisbon to Porto</TabsContent>
      <TabsContent value="return">Porto to Lisbon</TabsContent>
      <TabsContent value="extras">Seats</TabsContent>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("renders a labelled tab list with the default tab selected", () => {
    render(<Trip />);
    expect(screen.getByRole("tablist", { name: "Legs" })).toHaveAttribute(
      "data-variant",
      "default"
    );
    const outbound = screen.getByRole("tab", { name: "Outbound" });
    expect(outbound).toHaveAttribute("aria-selected", "true");
    expect(outbound).toHaveAttribute("data-slot", "tabs-trigger");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Lisbon to Porto");
  });

  it("switches panels on click", () => {
    const onValueChange = vi.fn();
    render(<Trip onValueChange={onValueChange} />);
    fireEvent.click(screen.getByRole("tab", { name: "Return" }));
    expect(onValueChange).toHaveBeenCalledWith("return", expect.anything());
    expect(screen.getByRole("tab", { name: "Return" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Porto to Lisbon");
  });

  it("marks the active tab with colour as well as depth", () => {
    render(<Trip />);
    expect(screen.getByRole("tab", { name: "Outbound" }).className).toContain(
      "data-active:text-[var(--tabs-active,var(--color-primary))]"
    );
  });

  it("keeps disabled tabs out of reach", () => {
    render(<Trip />);
    const extras = screen.getByRole("tab", { name: "Extras" });
    expect(extras).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(extras);
    expect(extras).toHaveAttribute("aria-selected", "false");
  });

  it("lays out vertically and in the line style", () => {
    render(<Trip orientation="vertical" variant="line" />);
    const list = screen.getByRole("tablist");
    expect(list).toHaveAttribute("aria-orientation", "vertical");
    expect(list).toHaveAttribute("data-variant", "line");
    expect(list).not.toHaveClass("shadow-neu");
  });
});
