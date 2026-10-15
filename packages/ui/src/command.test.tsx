import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useCallback } from "react";
import { describe, expect, it, vi } from "vitest";

import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "./command";

interface Action {
  label: string;
  value: string;
}

interface Group {
  items: Action[];
  value: string;
}

const CURRENCY_RE = /Change currency/;
const NEW_TRIP_RE = /New trip/;

const groups: Group[] = [
  {
    value: "Trips",
    items: [
      { value: "new-trip", label: "New trip" },
      { value: "open-trip", label: "Open trip" },
    ],
  },
  {
    value: "Settings",
    items: [{ value: "currency", label: "Change currency" }],
  },
];

function RunItem({
  item,
  onRun,
}: {
  item: Action;
  onRun?: (value: string) => void;
}) {
  const handleClick = useCallback(() => onRun?.(item.value), [item, onRun]);
  return (
    <CommandItem onClick={handleClick} value={item}>
      {item.label}
      <CommandShortcut>⌘{item.label[0]}</CommandShortcut>
    </CommandItem>
  );
}

function Palette({ onRun }: { onRun?: (value: string) => void }) {
  return (
    <Command items={groups}>
      <CommandInput aria-label="Search commands" />
      <CommandEmpty>No results.</CommandEmpty>
      <CommandList>
        {(group: Group) => (
          <CommandGroup
            heading={group.value}
            items={group.items}
            key={group.value}
          >
            <CommandCollection>
              {(item: Action) => (
                <RunItem item={item} key={item.value} onRun={onRun} />
              )}
            </CommandCollection>
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}

describe("Command", () => {
  it("renders an always-open list with group headings", () => {
    render(<Palette />);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Trips" })).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(3);
    expect(document.querySelector('[data-slot="command"]')).toBeInTheDocument();
  });

  it("highlights the first match and filters as you type", async () => {
    const user = userEvent.setup();
    render(<Palette />);
    const input = screen.getByRole("combobox", { name: "Search commands" });
    await user.type(input, "curr");
    await waitFor(() => expect(screen.getAllByRole("option")).toHaveLength(1));
    expect(screen.getByRole("option", { name: CURRENCY_RE })).toHaveAttribute(
      "data-highlighted"
    );
    expect(screen.queryByRole("group", { name: "Trips" })).toBeNull();
    await user.clear(input);
    await user.type(input, "zzz");
    await waitFor(() =>
      expect(screen.getByText("No results.")).toBeInTheDocument()
    );
  });

  it("runs the highlighted item on Enter and keeps the query", async () => {
    const user = userEvent.setup();
    const onRun = vi.fn();
    render(<Palette onRun={onRun} />);
    const input = screen.getByRole("combobox", { name: "Search commands" });
    await user.type(input, "trip");
    await user.keyboard("{ArrowDown}{Enter}");
    expect(onRun).toHaveBeenCalledWith("open-trip");
    expect(input).toHaveValue("trip");
  });

  it("runs an item on click", async () => {
    const user = userEvent.setup();
    const onRun = vi.fn();
    render(<Palette onRun={onRun} />);
    await user.click(screen.getByRole("option", { name: NEW_TRIP_RE }));
    expect(onRun).toHaveBeenCalledWith("new-trip");
  });

  it("opens in a dialog with a hidden title and focuses the search", async () => {
    render(
      <CommandDialog open>
        <Palette />
      </CommandDialog>
    );
    const dialog = await screen.findByRole("dialog", {
      name: "Command palette",
    });
    expect(dialog).toContainElement(screen.getByRole("listbox"));
    await waitFor(() =>
      expect(
        screen.getByRole("combobox", { name: "Search commands" })
      ).toHaveFocus()
    );
  });
});
