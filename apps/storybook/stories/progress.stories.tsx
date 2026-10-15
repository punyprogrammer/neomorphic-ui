import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@neomorphic-react/ui/progress";
import { Surface } from "@neomorphic-react/ui/surface";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

// The kit's magenta fill, dark enough that the light value inside it
// measures 4.9:1.
const MAGENTA = "[--progress-fill:oklch(0.54_0.22_350)]";

const meta = {
  title: "Components/Progress",
  component: Progress,
  parameters: {
    docs: {
      description: {
        component: `
The kit's progress bar: a well with a raised fill that darkens toward its
start. \`lg\` is the kit's deep bar and can print the value inside the fill.

\`\`\`tsx
import { Progress, ProgressLabel, ProgressValue } from "@neomorphic-react/ui/progress";

<Progress value={40}>
  <div className="flex justify-between">
    <ProgressLabel>Uploading</ProgressLabel>
    <ProgressValue />
  </div>
</Progress>

<Progress aria-label="Upload" size="lg" value={40} valueInside />
\`\`\`

Pass \`value={null}\` while the amount is unknown. Name it with
\`ProgressLabel\` or \`aria-label\`. Set \`--progress-fill\` to recolour the fill
and \`--progress-fill-foreground\` for the value printed on it.
`,
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    value: { control: { type: "range", min: 0, max: 100 } },
  },
  args: {
    size: "md",
    value: 40,
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-80 p-10">
      <Progress {...args}>
        <div className="flex items-center justify-between">
          <ProgressLabel>Uploading</ProgressLabel>
          <ProgressValue />
        </div>
      </Progress>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const bar = canvas.getByRole("progressbar", { name: "Uploading" });
    await expect(bar).toHaveAttribute("aria-valuenow", "40");
    await expect(canvas.getByText("40%")).toBeVisible();
  },
};

/** The kit's PROGRESS card. */
export const KitReplica: Story = {
  render: () => (
    <div className="p-12">
      <Surface className="grid w-[30rem] gap-4 px-6 pt-5 pb-6">
        <Progress className={MAGENTA} size="lg" value={40} valueInside>
          <ProgressLabel className="justify-self-center font-medium text-xs uppercase tracking-wide">
            Progress
          </ProgressLabel>
        </Progress>
      </Surface>
    </div>
  ),
};

/** The value rides inside the fill, and steps past its end when it won't fit. */
export const ValueInside: Story = {
  render: () => (
    <div className="grid w-96 gap-6 p-10">
      {[4, 40, 100].map((value) => (
        <Progress
          aria-label={`${value} percent`}
          className={MAGENTA}
          key={value}
          size="lg"
          value={value}
          valueInside
        />
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const boxes = (value: number) => {
      const bar = within(canvasElement).getByRole("progressbar", {
        name: `${value} percent`,
      });
      const part = (slot: string) =>
        (
          bar.querySelector(`[data-slot="${slot}"]`) as Element
        ).getBoundingClientRect();
      return { fill: part("progress-indicator"), text: part("progress-value") };
    };
    const low = boxes(4);
    await expect(low.text.left).toBeGreaterThanOrEqual(low.fill.right);
    const mid = boxes(40);
    await expect(mid.text.left).toBeGreaterThanOrEqual(mid.fill.left);
    await expect(mid.text.right).toBeLessThanOrEqual(mid.fill.right);
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="grid w-80 gap-6 p-10">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Progress key={size} size={size} value={65}>
          <div className="flex items-center justify-between">
            <ProgressLabel>{size}</ProgressLabel>
            <ProgressValue />
          </div>
        </Progress>
      ))}
    </div>
  ),
};

/** While the amount is unknown a short fill sweeps the track. */
export const Indeterminate: Story = {
  render: () => (
    <div className="grid w-80 gap-6 p-10">
      <Progress value={null}>
        <ProgressLabel>Syncing</ProgressLabel>
      </Progress>
      <Progress aria-label="Preparing" size="lg" value={null} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const bar = within(canvasElement).getByRole("progressbar", {
      name: "Syncing",
    });
    await expect(bar).toHaveAttribute("data-indeterminate");
    await expect(bar).not.toHaveAttribute("aria-valuenow");
  },
};

/** Steps and a custom format: `min`/`max` set the scale. */
export const Steps: Story = {
  render: () => (
    <div className="w-80 p-10">
      <Progress
        format={{ style: "decimal" }}
        getAriaValueText={(_, value) => `Step ${value} of 4`}
        max={4}
        value={3}
      >
        <div className="flex items-center justify-between">
          <ProgressLabel>Checkout</ProgressLabel>
          <span className="text-muted-foreground text-sm">Step 3 of 4</span>
        </div>
      </Progress>
    </div>
  ),
};
