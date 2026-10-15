import { Button } from "@neomorphic-react/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@neomorphic-react/ui/tooltip";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bookmark, Heart, Share2 } from "lucide-react";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

const meta = {
  title: "Components/Tooltip",
  component: TooltipContent,
  parameters: {
    docs: {
      description: {
        component: `
A short description of a control, shown on hover or focus: a small raised card
on the page's surface colour that scales in from its trigger.

\`\`\`tsx
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@neomorphic-react/ui/tooltip";

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger render={<Button aria-label="Share" icon={<Share2 />} />} />
    <TooltipContent>Share this trip</TooltipContent>
  </Tooltip>
</TooltipProvider>
\`\`\`

A tooltip only adds a description, and touch screens never show it: an
icon-only trigger still needs its own \`aria-label\`. There is no arrow; a raised
arrow can't cast a shadow that joins the card's.
`,
      },
    },
  },
  argTypes: {
    side: {
      control: "inline-radio",
      options: ["top", "right", "bottom", "left"],
    },
  },
  args: {
    side: "top",
  },
} satisfies Meta<typeof TooltipContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex h-48 items-center justify-center p-10">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            render={<Button aria-label="Share" icon={<Share2 />} />}
          />
          <TooltipContent {...args}>Share this trip</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", {
      name: "Share",
    });
    await userEvent.hover(trigger);
    // The popup mounts at opacity 0 and fades in, so wait for it to show.
    const content = await screen.findByText("Share this trip");
    await waitFor(() => expect(content).toBeVisible());
    await userEvent.unhover(trigger);
  },
};

/** One provider for a toolbar: after the first, tooltips open at once. */
export const Toolbar: Story = {
  render: () => (
    <div className="flex h-48 items-center justify-center gap-4 p-10">
      <TooltipProvider>
        {(
          [
            ["Like", Heart],
            ["Save", Bookmark],
            ["Share", Share2],
          ] as const
        ).map(([label, Icon]) => (
          <Tooltip key={label}>
            <TooltipTrigger
              render={
                <Button aria-label={label} icon={<Icon />} shape="pill" />
              }
            />
            <TooltipContent>{label}</TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="flex h-64 items-center justify-center gap-16 p-10">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip defaultOpen key={side}>
          <TooltipTrigger render={<Button size="sm">{side}</Button>} />
          <TooltipContent side={side}>On the {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};
