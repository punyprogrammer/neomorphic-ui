import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@neomorphic-ui/react/context-menu";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fireEvent, screen, waitFor, within } from "storybook/test";

const meta = {
  title: "Components/ContextMenu",
  component: ContextMenu,
  parameters: {
    docs: {
      description: {
        component: `
A menu opened at the pointer by right-click or long-press. It uses the same
item parts as \`DropdownMenu\`.

\`\`\`tsx
import {
  ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger,
} from "@neomorphic-ui/react/context-menu";

<ContextMenu>
  <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Copy reference</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
\`\`\`

A context menu is a shortcut that nobody can discover by looking: offer the
same actions somewhere visible too, for keyboard and touch users.
`,
      },
    },
  },
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex min-h-96 justify-center p-10">
      <ContextMenu {...args}>
        <ContextMenuTrigger className="inset-shadow-neu flex h-44 w-80 items-center justify-center rounded-xl text-muted-foreground text-sm shadow-neu-flat">
          Right-click the ticket area
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>
            Copy reference
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>Add to calendar</ContextMenuItem>
          <ContextMenuItem disabled>Change seat</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem variant="destructive">Remove ticket</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const area = within(canvasElement).getByText("Right-click the ticket area");
    const rect = area.getBoundingClientRect();
    fireEvent.contextMenu(area, {
      clientX: rect.left + 40,
      clientY: rect.top + 30,
    });
    const menu = await screen.findByRole("menu");
    await expect(menu).toHaveAttribute("data-slot", "context-menu-content");
    await expect(
      within(menu).getByRole("menuitem", { name: "Change seat" })
    ).toHaveAttribute("aria-disabled", "true");
    await waitFor(() =>
      expect(
        Math.abs(menu.getBoundingClientRect().left - (rect.left + 40))
      ).toBeLessThan(12)
    );
    fireEvent.keyDown(menu, { key: "Escape" });
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument()
    );
  },
};
