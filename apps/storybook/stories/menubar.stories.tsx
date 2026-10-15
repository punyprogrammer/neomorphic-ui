import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@neomorphic-react/ui/menubar";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

const NEW_TRIP_RE = /New trip/;

const meta = {
  title: "Components/Menubar",
  component: Menubar,
  parameters: {
    docs: {
      description: {
        component: `
A raised slab of menus, as in a desktop app. The open menu's trigger presses
into the slab and takes the primary colour. Menus use the same item parts as
\`DropdownMenu\`.

\`\`\`tsx
import {
  Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger,
} from "@neomorphic-react/ui/menubar";

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New trip</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
\`\`\`

Arrow keys move between the menus; with one open, moving opens the next.
`,
      },
    },
  },
} satisfies Meta<typeof Menubar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="min-h-80 p-10">
      <Menubar {...args}>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New trip <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Open… <MenubarShortcut>⌘O</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Print itinerary</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Undo</MenubarItem>
            <MenubarItem>Redo</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem defaultChecked>Show map</MenubarCheckboxItem>
            <MenubarCheckboxItem>Show prices</MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const file = canvas.getByRole("menuitem", { name: "File" });
    await userEvent.click(file);
    await screen.findByRole("menuitem", { name: NEW_TRIP_RE });
    await expect(getComputedStyle(file).boxShadow).toContain("inset");
    await userEvent.keyboard("{ArrowRight}");
    const edit = canvas.getByRole("menuitem", { name: "Edit" });
    await waitFor(() => expect(edit).toHaveAttribute("data-popup-open"));
    await expect(
      await screen.findByRole("menuitem", { name: "Undo" })
    ).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument()
    );
  },
};
