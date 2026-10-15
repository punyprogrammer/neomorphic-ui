import { Button } from "@neomorphic-react/ui/button";
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
} from "@neomorphic-react/ui/command";
import { Kbd } from "@neomorphic-react/ui/kbd";
import { Toaster, toast } from "@neomorphic-react/ui/toast";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CalendarPlus,
  Coins,
  type LucideIcon,
  Map as MapIcon,
  Search,
  Ticket,
  TrainFront,
  UserRound,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

interface Action {
  icon: LucideIcon;
  label: string;
  shortcut?: string;
  value: string;
}

interface Group {
  items: Action[];
  value: string;
}

const GROUPS: Group[] = [
  {
    value: "Trips",
    items: [
      {
        value: "new",
        label: "Plan a new trip",
        icon: CalendarPlus,
        shortcut: "⌘N",
      },
      { value: "tickets", label: "My tickets", icon: Ticket, shortcut: "⌘T" },
      { value: "map", label: "Route map", icon: MapIcon },
      { value: "timetable", label: "Timetables", icon: TrainFront },
    ],
  },
  {
    value: "Account",
    items: [
      { value: "profile", label: "Profile", icon: UserRound, shortcut: "⌘P" },
      { value: "currency", label: "Change currency", icon: Coins },
    ],
  },
];

const TICKETS_RE = /My tickets/;
const CURRENCY_RE = /Change currency/;
const PROFILE_RE = /Profile/;
const NEW_TRIP_RE = /Plan a new trip/;
const SEARCH_RE = /Search/;

const meta = {
  title: "Components/Command",
  component: Command,
  parameters: {
    docs: {
      description: {
        component: `
An always-open search list: type to filter, arrows to move, Enter to run the
highlighted item. The search is an \`InputGroup\` well and the highlighted
row sinks into the card in the primary colour. Built on Base UI
Autocomplete (not \`cmdk\`), so pass \`items\` (or groups of \`items\`) for
it to filter.

\`\`\`tsx
import {
  Command, CommandCollection, CommandEmpty, CommandGroup, CommandInput,
  CommandItem, CommandList, CommandShortcut,
} from "@neomorphic-react/ui/command";

<Command items={groups}>
  <CommandInput aria-label="Search" placeholder="Search actions" />
  <CommandEmpty>No results.</CommandEmpty>
  <CommandList>
    {(group) => (
      <CommandGroup heading={group.value} items={group.items} key={group.value}>
        <CommandCollection>
          {(item) => (
            <CommandItem key={item.value} onClick={run} value={item}>
              {item.label}
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
          )}
        </CommandCollection>
      </CommandGroup>
    )}
  </CommandList>
</Command>
\`\`\`

\`CommandDialog\` puts it in a Dialog near the top of the screen for a ⌘K
palette; wire the shortcut yourself and close it from each item. Running an
item leaves the query as typed.
`,
      },
    },
  },
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

function ActionItem({
  item,
  onRun,
}: {
  item: Action;
  onRun: (item: Action) => void;
}) {
  const Icon = item.icon;
  const handleClick = useCallback(() => onRun(item), [item, onRun]);
  return (
    <CommandItem onClick={handleClick} value={item}>
      <Icon />
      {item.label}
      {item.shortcut ? (
        <CommandShortcut>{item.shortcut}</CommandShortcut>
      ) : null}
    </CommandItem>
  );
}

function Palette({ onRun }: { onRun: (item: Action) => void }) {
  return (
    <Command items={GROUPS}>
      <CommandInput aria-label="Search actions" placeholder="Search actions" />
      <CommandEmpty>No actions match.</CommandEmpty>
      <CommandList>
        {(group: Group) => (
          <CommandGroup
            heading={group.value}
            items={group.items}
            key={group.value}
          >
            <CommandCollection>
              {(item: Action) => (
                <ActionItem item={item} key={item.value} onRun={onRun} />
              )}
            </CommandCollection>
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}

function notify(item: Action) {
  toast(item.label);
}

export const Default: Story = {
  render: () => (
    <div className="flex justify-center p-10">
      <Toaster />
      <div className="w-96">
        <Palette onRun={notify} />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox", { name: "Search actions" });
    await expect(canvas.getAllByRole("option")).toHaveLength(6);
    await expect(
      canvas.getByRole("option", { name: NEW_TRIP_RE })
    ).toHaveAttribute("data-highlighted");
    await userEvent.type(input, "ti");
    await waitFor(() =>
      expect(canvas.getByRole("option", { name: TICKETS_RE })).toHaveAttribute(
        "data-highlighted"
      )
    );
    await userEvent.keyboard("{Enter}");
    await expect(
      await screen.findByRole("dialog", { name: "My tickets" })
    ).toHaveAttribute("data-slot", "toast");
    await expect(input).toHaveValue("ti");
    await userEvent.clear(input);
    await userEvent.type(input, "qqq");
    await expect(await canvas.findByText("No actions match.")).toBeVisible();
    await userEvent.clear(input);
    toast.dismiss();
  },
};

function PaletteDialog() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((current) => !current);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);
  const run = useCallback((item: Action) => {
    setOpen(false);
    toast(item.label);
  }, []);
  const openPalette = useCallback(() => setOpen(true), []);
  return (
    <>
      <Toaster />
      <Button icon={<Search />} onClick={openPalette}>
        Search <Kbd className="ms-1">⌘K</Kbd>
      </Button>
      <CommandDialog onOpenChange={setOpen} open={open}>
        <Palette onRun={run} />
      </CommandDialog>
    </>
  );
}

export const Dialog: Story = {
  render: () => (
    <div className="flex min-h-[32rem] items-start justify-center p-10">
      <PaletteDialog />
    </div>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.keyboard("{Meta>}k{/Meta}");
    const dialog = await screen.findByRole("dialog", {
      name: "Command palette",
    });
    const input = within(dialog).getByRole("combobox", {
      name: "Search actions",
    });
    await waitFor(() => expect(input).toHaveFocus());
    await userEvent.type(input, "curr");
    await waitFor(() =>
      expect(
        within(dialog).getByRole("option", { name: CURRENCY_RE })
      ).toHaveAttribute("data-highlighted")
    );
    await userEvent.keyboard("{Enter}");
    await waitFor(
      () =>
        expect(
          screen.queryByRole("dialog", { name: "Command palette" })
        ).not.toBeInTheDocument(),
      { timeout: 4000 }
    );
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: SEARCH_RE })
    );
    const reopened = await screen.findByRole("dialog", {
      name: "Command palette",
    });
    await userEvent.click(
      within(reopened).getByRole("option", { name: PROFILE_RE })
    );
    await waitFor(
      () =>
        expect(
          screen.queryByRole("dialog", { name: "Command palette" })
        ).not.toBeInTheDocument(),
      { timeout: 4000 }
    );
    toast.dismiss();
  },
};
