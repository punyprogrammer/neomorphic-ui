import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "./combobox";

const stations = ["Lisbon", "Porto", "Coimbra", "Faro", "Braga"];

function Stations({
  onValueChange,
  ...props
}: {
  defaultValue?: string;
  disabled?: boolean;
  onValueChange?: (value: string | null) => void;
  showClear?: boolean;
}) {
  const { showClear, disabled, ...root } = props;
  return (
    <Combobox items={stations} onValueChange={onValueChange} {...root}>
      <ComboboxInput
        aria-label="Station"
        disabled={disabled}
        showClear={showClear}
      />
      <ComboboxContent>
        <ComboboxEmpty>No stations found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

function Chips() {
  const anchor = useComboboxAnchor();
  return (
    <Combobox defaultValue={["Porto"]} items={stations} multiple>
      <ComboboxChips ref={anchor}>
        <ComboboxValue>
          {(values: string[]) => (
            <>
              {values.map((value) => (
                <ComboboxChip key={value} removeLabel={`Remove ${value}`}>
                  {value}
                </ComboboxChip>
              ))}
              <ComboboxChipsInput aria-label="Stops" />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

describe("Combobox", () => {
  it("renders the input in an InputGroup well", () => {
    render(<Stations />);
    const input = screen.getByRole("combobox", { name: "Station" });
    expect(input).toHaveAttribute("data-slot", "input-group-control");
    expect(input.closest('[data-slot="input-group"]')).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Show options" })
    ).toBeInTheDocument();
  });

  it("filters as you type and shows the empty state", async () => {
    const user = userEvent.setup();
    render(<Stations />);
    const input = screen.getByRole("combobox", { name: "Station" });
    await user.type(input, "po");
    await waitFor(() =>
      expect(screen.getByRole("option", { name: "Porto" })).toBeInTheDocument()
    );
    expect(screen.queryByRole("option", { name: "Faro" })).toBeNull();
    await user.clear(input);
    await user.type(input, "zzz");
    await waitFor(() =>
      expect(screen.getByText("No stations found.")).toBeInTheDocument()
    );
  });

  it("opens on the first item and selects with the keyboard", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Stations onValueChange={onValueChange} />);
    const input = screen.getByRole("combobox", { name: "Station" });
    input.focus();
    await user.keyboard("{ArrowDown}");
    await waitFor(() =>
      expect(screen.getByRole("listbox")).toBeInTheDocument()
    );
    await user.keyboard("{ArrowDown}{Enter}");
    expect(onValueChange).toHaveBeenCalledWith("Porto", expect.anything());
    expect(input).toHaveValue("Porto");
  });

  it("clears the value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Stations defaultValue="Faro" onValueChange={onValueChange} showClear />
    );
    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect(onValueChange).toHaveBeenCalledWith(null, expect.anything());
  });

  it("disables the input and its buttons", () => {
    render(<Stations disabled />);
    expect(screen.getByRole("combobox", { name: "Station" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Show options" })).toBeDisabled();
  });

  it("renders groups with labels", async () => {
    const user = userEvent.setup();
    const groups = [
      { value: "North", items: ["Porto", "Braga"] },
      { value: "South", items: ["Faro"] },
    ];
    render(
      <Combobox items={groups}>
        <ComboboxInput aria-label="Station" />
        <ComboboxContent>
          <ComboboxList>
            {(group: (typeof groups)[number]) => (
              <ComboboxGroup items={group.items} key={group.value}>
                <ComboboxLabel>{group.value}</ComboboxLabel>
                <ComboboxCollection>
                  {(item: string) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxCollection>
              </ComboboxGroup>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    );
    await user.click(screen.getByRole("combobox", { name: "Station" }));
    await waitFor(() =>
      expect(screen.getByRole("group", { name: "South" })).toBeInTheDocument()
    );
    expect(screen.getByText("North")).toHaveAttribute(
      "data-slot",
      "combobox-label"
    );
  });

  it("shows multiple values as removable chips", async () => {
    const user = userEvent.setup();
    render(<Chips />);
    const chip = screen
      .getByText("Porto")
      .closest('[data-slot="combobox-chip"]');
    expect(chip).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Remove Porto" }));
    await waitFor(() =>
      expect(
        document.querySelector('[data-slot="combobox-chip"]')
      ).not.toBeInTheDocument()
    );
  });
});
