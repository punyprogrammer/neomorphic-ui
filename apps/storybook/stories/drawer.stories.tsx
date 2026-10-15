import { Button } from "@neomorphic-ui/react/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@neomorphic-ui/react/drawer";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@neomorphic-ui/react/toggle-group";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

const meta = {
  title: "Components/Drawer",
  component: Drawer,
  parameters: {
    docs: {
      description: {
        component: `
A panel that slides in from an edge and follows the finger: swipe it back
toward its edge to dismiss it. A bottom drawer shows a raised grip.

\`\`\`tsx
import {
  Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter,
  DrawerHeader, DrawerTitle, DrawerTrigger,
} from "@neomorphic-ui/react/drawer";

<Drawer>
  <DrawerTrigger render={<Button />}>Pick a seat</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Seats</DrawerTitle>
      <DrawerDescription>Coach 4</DrawerDescription>
    </DrawerHeader>
    …
  </DrawerContent>
</Drawer>
\`\`\`

\`direction\` is \`bottom\` by default. \`snapPoints\` (fractions of the
viewport, or \`"148px"\` / \`"20rem"\`) let a bottom drawer rest part-open.
The grip is only a cue: Escape, the backdrop and a close button still work
for people who can't swipe.
`,
      },
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

const SEATS = ["12A", "12B", "12C", "12D"];

export const Default: Story = {
  render: (args) => (
    <div className="p-10">
      <Drawer {...args}>
        <DrawerTrigger render={<Button />}>Pick a seat</DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-md">
            <DrawerHeader>
              <DrawerTitle>Seats</DrawerTitle>
              <DrawerDescription>Coach 4, quiet zone</DrawerDescription>
            </DrawerHeader>
            <div className="flex justify-center px-5">
              <ToggleGroup aria-label="Seat" defaultValue={["12A"]}>
                {SEATS.map((seat) => (
                  <ToggleGroupItem key={seat} value={seat}>
                    {seat}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            <DrawerFooter>
              <DrawerClose render={<Button variant="primary" />}>
                Confirm seat
              </DrawerClose>
              <DrawerClose render={<Button variant="ghost" />}>
                Cancel
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", {
      name: "Pick a seat",
    });
    await userEvent.click(trigger);
    const drawer = await screen.findByRole("dialog", { name: "Seats" });
    await expect(drawer).toHaveAttribute("data-swipe-direction", "down");
    await waitFor(
      () =>
        expect(
          Math.round(drawer.getBoundingClientRect().bottom)
        ).toBeLessThanOrEqual(window.innerHeight),
      { timeout: 4000 }
    );
    await userEvent.click(
      within(drawer).getByRole("button", { name: "Cancel" })
    );
    await waitFor(() => expect(trigger).toHaveFocus(), { timeout: 4000 });
  },
};

export const SnapPoints: Story = {
  render: (args) => (
    <div className="p-10">
      <Drawer {...args} snapPoints={["12rem", 1]}>
        <DrawerTrigger render={<Button />}>Trip details</DrawerTrigger>
        <DrawerContent className="h-[calc(100dvh-3rem)]">
          <DrawerHeader>
            <DrawerTitle>Lisbon to Porto</DrawerTitle>
            <DrawerDescription>
              Drag up for the full timetable.
            </DrawerDescription>
          </DrawerHeader>
          <ol className="flex flex-col gap-3 px-5 pb-5 text-sm">
            {[
              "08:00 Lisbon Oriente",
              "09:05 Coimbra B",
              "09:40 Aveiro",
              "10:58 Porto Campanhã",
            ].map((stop) => (
              <li
                className="inset-shadow-neu-sm rounded-lg px-4 py-3 shadow-neu-flat"
                key={stop}
              >
                {stop}
              </li>
            ))}
          </ol>
        </DrawerContent>
      </Drawer>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "Trip details" })
    );
    const drawer = await screen.findByRole("dialog", {
      name: "Lisbon to Porto",
    });
    await waitFor(
      () =>
        expect(drawer.getBoundingClientRect().top).toBeGreaterThan(
          window.innerHeight / 3
        ),
      { timeout: 4000 }
    );
    await userEvent.keyboard("{Escape}");
    await waitFor(
      () => expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
      { timeout: 4000 }
    );
  },
};

export const Side: Story = {
  render: (args) => (
    <div className="p-10">
      <Drawer {...args} direction="right">
        <DrawerTrigger render={<Button />}>Menu</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Menu</DrawerTitle>
            <DrawerDescription>Swipe right to close.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose render={<Button />}>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "Menu" })
    );
    const drawer = await screen.findByRole("dialog", { name: "Menu" });
    await expect(drawer).toHaveAttribute("data-swipe-direction", "right");
    await userEvent.click(
      within(drawer).getByRole("button", { name: "Close" })
    );
    await waitFor(
      () => expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
      { timeout: 4000 }
    );
  },
};
