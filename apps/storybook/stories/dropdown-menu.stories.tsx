import { Button } from "@neomorphic-react/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@neomorphic-react/ui/dropdown-menu";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Copy, MoreHorizontal, Pencil, Share2, Trash2 } from "lucide-react";
import { useState } from "react";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

const RENAME_RE = /Rename/;

const meta = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    docs: {
      description: {
        component: `
Actions and options behind a button, in a raised popup. The highlighted item
sinks into the card; checked items carry a mark in the primary colour.

\`\`\`tsx
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@neomorphic-react/ui/dropdown-menu";

<DropdownMenu>
  <DropdownMenuTrigger render={<Button />}>Options</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Rename</DropdownMenuItem>
    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
\`\`\`

Parts: \`Group\` + \`Label\`, \`Separator\`, \`CheckboxItem\` (stays open),
\`RadioGroup\` + \`RadioItem\` (closes on pick), \`Sub\` + \`SubTrigger\` +
\`SubContent\`, and \`Shortcut\` for a key hint (visual only). Arrow keys move
through the items, typing jumps to a match, Escape closes and returns focus.
The same parts make up \`ContextMenu\` and \`Menubar\`.
`,
      },
    },
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex min-h-96 justify-center p-10">
      <DropdownMenu {...args}>
        <DropdownMenuTrigger
          render={
            <Button aria-label="Trip options" icon={<MoreHorizontal />} />
          }
        />
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Spring in Porto</DropdownMenuLabel>
            <DropdownMenuItem>
              <Pencil />
              Rename
              <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy />
              Duplicate
              <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Share2 />
                Share
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Copy link</DropdownMenuItem>
                <DropdownMenuItem>Email</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <Trash2 />
            Delete trip
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", {
      name: "Trip options",
    });
    await userEvent.click(trigger);
    const menu = await screen.findByRole("menu");
    await userEvent.keyboard("{ArrowDown}");
    const rename = within(menu).getByRole("menuitem", { name: RENAME_RE });
    await waitFor(() => expect(rename).toHaveAttribute("data-highlighted"));
    await expect(getComputedStyle(rename).boxShadow).toContain("inset");
    await userEvent.keyboard("{ArrowDown}{ArrowDown}{ArrowRight}");
    await expect(
      await screen.findByRole("menuitem", { name: "Copy link" })
    ).toBeInTheDocument();
    await userEvent.keyboard("{Escape}{Escape}");
    await waitFor(() => expect(trigger).toHaveFocus());
  },
};

function ViewMenu() {
  const [showPrices, setShowPrices] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [sort, setSort] = useState("departure");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button />}>View</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Show</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={showPrices}
            onCheckedChange={setShowPrices}
          >
            Prices
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showMap}
            onCheckedChange={setShowMap}
          >
            Map
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            onValueChange={(value) => setSort(value as string)}
            value={sort}
          >
            <DropdownMenuRadioItem value="departure">
              Departure
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="price">Price</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="duration">
              Duration
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const CheckboxAndRadio: Story = {
  render: () => (
    <div className="flex min-h-96 justify-center p-10">
      <ViewMenu />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", { name: "View" });
    await userEvent.click(trigger);
    const map = await screen.findByRole("menuitemcheckbox", { name: "Map" });
    await userEvent.click(map);
    await expect(map).toHaveAttribute("aria-checked", "true");
    await userEvent.click(screen.getByRole("menuitemradio", { name: "Price" }));
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument()
    );
    await userEvent.click(trigger);
    await expect(
      await screen.findByRole("menuitemradio", { name: "Price" })
    ).toHaveAttribute("aria-checked", "true");
    await userEvent.keyboard("{Escape}");
  },
};
