import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "./native-select";

function Example(props: React.ComponentProps<typeof NativeSelect>) {
  return (
    <NativeSelect aria-label="Seat" {...props}>
      <NativeSelectOptGroup label="Cabin">
        <NativeSelectOption value="aisle">Aisle</NativeSelectOption>
        <NativeSelectOption value="window">Window</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  );
}

describe("NativeSelect", () => {
  it("is a native combobox in an inset well", () => {
    render(<Example />);
    const select = screen.getByRole("combobox", { name: "Seat" });
    expect(select.tagName).toBe("SELECT");
    expect(select).toHaveClass("inset-shadow-neu", "shadow-neu-flat");
  });

  it("changes value natively", async () => {
    render(<Example />);
    const select = screen.getByRole("combobox", { name: "Seat" });
    await userEvent.selectOptions(select, "window");
    expect(select).toHaveValue("window");
  });

  it("puts className on the wrapper and size on both", () => {
    render(<Example className="w-60" size="sm" />);
    const select = screen.getByRole("combobox");
    expect(select.parentElement).toHaveClass("w-60");
    expect(select).toHaveAttribute("data-size", "sm");
    expect(select).toHaveClass("h-8");
  });

  it("hides the caret from assistive tech", () => {
    const { container } = render(<Example />);
    expect(
      container.querySelector('[data-slot="native-select-icon"]')
    ).toHaveAttribute("aria-hidden", "true");
  });
});
