import { Separator } from "@neomorphic-ui/react/separator";
import { Surface } from "@neomorphic-ui/react/surface";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

const meta = {
  title: "Components/Separator",
  component: Separator,
  parameters: {
    docs: {
      description: {
        component: `
A groove cut into the surface: a dark line with a highlight beside it.
\`perforated\` dashes it, like the boarding ticket's tear line.

\`\`\`tsx
import { Separator } from "@neomorphic-ui/react/separator";

<Separator />
<Separator variant="perforated" />
<Separator orientation="vertical" />
\`\`\`

Decorative by default (hidden from assistive tech). Pass
\`decorative={false}\` when it divides content that should be announced as
separate.
`,
      },
    },
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["solid", "perforated"] },
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  },
  args: {
    variant: "solid",
    orientation: "horizontal",
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex h-40 w-80 items-center justify-center p-10">
      <Separator {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const line = canvasElement.querySelector(
      '[data-slot="separator"]'
    ) as Element;
    await expect(line.getBoundingClientRect().width).toBeGreaterThan(0);
    await expect(line).toHaveAttribute("role", "none");
  },
};

/** A boarding pass split by a perforated tear line. */
export const KitReplica: Story = {
  render: () => (
    <div className="p-12">
      <Surface className="grid w-80 gap-5 p-6">
        <div className="flex justify-between text-foreground">
          <div>
            <p className="text-muted-foreground text-xs uppercase">From</p>
            <p className="font-medium text-2xl">CCU</p>
          </div>
          <div className="text-end">
            <p className="text-muted-foreground text-xs uppercase">To</p>
            <p className="font-medium text-2xl">BLR</p>
          </div>
        </div>
        <Separator variant="perforated" />
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Gate 12</span>
          <span className="font-medium text-foreground">Seat 14A</span>
        </div>
      </Surface>
    </div>
  ),
};

/** Announced separators between sections of a settings list. */
export const Semantic: Story = {
  render: () => (
    <div className="grid w-80 gap-4 p-10 text-foreground text-sm">
      <p>Account</p>
      <Separator decorative={false} />
      <p>Notifications</p>
      <Separator decorative={false} />
      <p>Privacy</p>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getAllByRole("separator")).toHaveLength(
      2
    );
  },
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-16 items-center gap-4 p-10 text-foreground text-sm">
      <span>Docs</span>
      <Separator orientation="vertical" />
      <span>Blog</span>
      <Separator orientation="vertical" variant="perforated" />
      <span>Support</span>
    </div>
  ),
};
