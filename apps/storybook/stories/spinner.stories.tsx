import { Spinner } from "@neomorphic-react/ui/spinner";
import { Surface } from "@neomorphic-react/ui/surface";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component: `
The kit's loader: a ring-shaped groove around a raised hub, with an arc
running around the groove.

\`\`\`tsx
import { Spinner } from "@neomorphic-react/ui/spinner";

<Spinner />
<Spinner aria-label="Loading messages" size="lg" />
\`\`\`

It is a \`role="status"\` named "Loading"; pass \`aria-label\` to say what is
loading. Set \`--spinner-fill\` to recolour the arc. The arc holds still under
reduced motion.
`,
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  args: {
    size: "md",
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="p-10">
      <Spinner {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const spinner = within(canvasElement).getByRole("status", {
      name: "Loading",
    });
    await expect(getComputedStyle(spinner).boxShadow).not.toBe("none");
    const hub = spinner.querySelector('[data-slot="spinner-hub"]') as Element;
    await expect(getComputedStyle(hub).boxShadow).not.toBe("none");
  },
};

/** The kit's loader at its full size. */
export const KitReplica: Story = {
  render: () => (
    <div className="p-12">
      <Spinner size="lg" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-8 p-10">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Spinner aria-label={`Loading (${size})`} key={size} size={size} />
      ))}
    </div>
  ),
};

/** `--spinner-fill` recolours the arc. */
export const CustomFill: Story = {
  render: () => (
    <div className="flex items-center gap-8 p-10">
      <Spinner className="[--spinner-fill:oklch(0.54_0.22_350)]" />
      <Spinner className="[--spinner-fill:oklch(0.62_0.19_45)]" />
      <Spinner className="[--spinner-fill:var(--color-success)]" />
    </div>
  ),
};

/** Standing in for content while it loads, named for what it waits on. */
export const InCard: Story = {
  render: () => (
    <div className="p-12">
      <Surface className="grid h-48 w-72 place-items-center content-center gap-4 p-6">
        <Spinner aria-label="Loading messages" />
        <p aria-hidden="true" className="text-muted-foreground text-sm">
          Loading messages…
        </p>
      </Surface>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole("status", { name: "Loading messages" })
    ).toBeVisible();
  },
};
