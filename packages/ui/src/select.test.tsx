import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select";

const ITEMS = [
  { label: "Design", value: "design" },
  { label: "Engineering", value: "engineering" },
  { label: "Marketing", value: "marketing" },
];

function Category(
  props: Partial<React.ComponentProps<typeof Select<string>>> & {
    size?: "sm" | "md" | "lg";
  }
) {
  const { size, ...rootProps } = props;
  return (
    <Select items={ITEMS} {...rootProps}>
      <SelectLabel>Category</SelectLabel>
      <SelectTrigger size={size}>
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        {ITEMS.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const trigger = () => screen.getByRole("combobox");

describe("Select", () => {
  it("renders a labelled trigger showing the placeholder", () => {
    render(<Category />);
    expect(screen.getByRole("combobox", { name: "Category" })).toBeVisible();
    expect(trigger()).toHaveTextContent("Select category");
    expect(trigger()).toHaveAttribute("data-placeholder");
  });

  it("exposes its parts API through data attributes", () => {
    render(<Category size="lg" />);
    expect(trigger()).toHaveAttribute("data-slot", "select-trigger");
    expect(trigger()).toHaveAttribute("data-size", "lg");
    expect(
      trigger().querySelector('[data-slot="select-value"]')
    ).not.toBeNull();
  });

  it("is raised at rest and pressed in while open, setting both shadow slots", () => {
    render(<Category />);
    expect(trigger()).toHaveClass(
      "shadow-neu",
      "inset-shadow-neu-flat",
      "data-popup-open:shadow-neu-flat",
      "data-popup-open:inset-shadow-neu-sm"
    );
  });

  it("opens a list of options and chooses one by label", async () => {
    const onValueChange = vi.fn();
    render(<Category onValueChange={onValueChange} />);
    await userEvent.click(trigger());
    await waitFor(() =>
      expect(screen.getByRole("listbox")).toBeInTheDocument()
    );
    expect(trigger()).toHaveAttribute("data-popup-open");
    await userEvent.click(screen.getByRole("option", { name: "Engineering" }));
    await waitFor(() => expect(trigger()).toHaveTextContent("Engineering"));
    expect(onValueChange).toHaveBeenCalledWith(
      "engineering",
      expect.anything()
    );
    expect(trigger()).not.toHaveAttribute("data-placeholder");
  });

  it("marks the chosen option", async () => {
    render(<Category defaultValue="marketing" />);
    await userEvent.click(trigger());
    const option = await screen.findByRole("option", { name: "Marketing" });
    expect(option).toHaveAttribute("aria-selected", "true");
    expect(
      option.querySelector('[data-slot="select-item-indicator"]')
    ).not.toBeNull();
  });

  it("does not open when disabled", async () => {
    render(<Category disabled />);
    await userEvent.click(trigger());
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(trigger()).toHaveAttribute("data-disabled");
  });

  it("renders groups with labels and separators", async () => {
    render(
      <Select>
        <SelectTrigger aria-label="Fruit">
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectGroupLabel>Citrus</SelectGroupLabel>
            <SelectItem value="lime">Lime</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectGroupLabel>Berries</SelectGroupLabel>
            <SelectItem value="raspberry">Raspberry</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
    await userEvent.click(trigger());
    expect(
      await screen.findByRole("group", { name: "Citrus" })
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="select-separator"]')
    ).toBeInTheDocument();
  });

  it("lets className override variant classes", () => {
    render(
      <Select>
        <SelectTrigger aria-label="Plain" className="rounded-full">
          <SelectValue />
        </SelectTrigger>
      </Select>
    );
    expect(trigger()).toHaveClass("rounded-full");
    expect(trigger()).not.toHaveClass("rounded-lg");
  });
});
