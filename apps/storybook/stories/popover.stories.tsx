import { Button } from "@neomorphic-ui/react/button";
import { Field, FieldLabel } from "@neomorphic-ui/react/field";
import { Input } from "@neomorphic-ui/react/input";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@neomorphic-ui/react/popover";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SlidersHorizontal } from "lucide-react";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

const meta = {
  title: "Components/Popover",
  component: Popover,
  parameters: {
    docs: {
      description: {
        component: `
Rich content anchored to a trigger: a raised card on the page's own surface
that scales in from the trigger. Focus moves into it on open and back to the
trigger on close.

\`\`\`tsx
import {
  Popover, PopoverContent, PopoverDescription, PopoverHeader,
  PopoverTitle, PopoverTrigger,
} from "@neomorphic-ui/react/popover";

<Popover>
  <PopoverTrigger render={<Button />}>Filters</PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Filters</PopoverTitle>
      <PopoverDescription>Narrow the results.</PopoverDescription>
    </PopoverHeader>
    …
  </PopoverContent>
</Popover>
\`\`\`

Like \`Tooltip\`, it has no arrow: a raised arrow can't cast a shadow that
joins the card's. \`side\`, \`align\` and \`sideOffset\` place it; for a
plain hint use \`Tooltip\`, for a list of actions \`DropdownMenu\`.
`,
      },
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex min-h-80 items-start justify-center p-10">
      <Popover {...args}>
        <PopoverTrigger
          render={<Button icon={<SlidersHorizontal />}>Filters</Button>}
        />
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Price range</PopoverTitle>
            <PopoverDescription>Fares per person, one way.</PopoverDescription>
          </PopoverHeader>
          <div className="grid grid-cols-2 gap-3">
            <Field>
              <FieldLabel>Min</FieldLabel>
              <Input defaultValue="10" size="sm" />
            </Field>
            <Field>
              <FieldLabel>Max</FieldLabel>
              <Input defaultValue="80" size="sm" />
            </Field>
          </div>
          <PopoverClose render={<Button size="sm" variant="primary" />}>
            Apply
          </PopoverClose>
        </PopoverContent>
      </Popover>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", {
      name: "Filters",
    });
    await userEvent.click(trigger);
    const popup = await screen.findByRole("dialog", { name: "Price range" });
    await expect(getComputedStyle(popup).boxShadow).not.toBe("none");
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(trigger).toHaveFocus());
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  },
};

export const Sides: Story = {
  render: () => (
    <div className="grid min-h-96 place-items-center p-10">
      <div className="grid grid-cols-2 gap-4">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Popover key={side}>
            <PopoverTrigger render={<Button size="sm" />}>
              {side}
            </PopoverTrigger>
            <PopoverContent className="w-48" side={side}>
              <p>Opens to the {side}.</p>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "right" })
    );
    const popup = await screen.findByText("Opens to the right.");
    await expect(popup.closest("[data-side]")).toHaveAttribute(
      "data-side",
      "right"
    );
  },
};
