import { Dial, type DialProps } from "@neomorphic-ui/react/dial";
import { Surface } from "@neomorphic-ui/react/surface";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Volume1, Volume2 } from "lucide-react";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";

/** A dial that shows its own value in the knob. */
function ReadoutDial({
  defaultValue = 40,
  format = String,
  ...props
}: DialProps & { format?: (value: number) => string }) {
  const [value, setValue] = useState(defaultValue);
  return (
    <Dial {...props} onValueChange={setValue} value={value}>
      {format(value)}
    </Dial>
  );
}

const meta = {
  title: "Components/Dial",
  component: Dial,
  parameters: {
    docs: {
      description: {
        component: `
A circular slider: a raised knob sitting in a round well, with a 270° arc that
fills as the value rises. Drag around the ring, or focus the knob and use the
arrow keys, Page Up/Down, Home and End. From the kit's volume and thermostat
knobs.

\`\`\`tsx
import { Dial } from "@neomorphic-ui/react/dial";

const [volume, setVolume] = useState(40);

<Dial aria-label="Volume" onValueChange={setVolume} value={volume}>
  {volume}
</Dial>
\`\`\`

Whatever you pass as children sits in the middle of the knob. The arc fades
from \`--dial-fill-start\` to \`--dial-fill\` (default: a darker \`--primary\` to
\`--primary\`). Pass \`name\` to submit the value with a form.
`,
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
  args: {
    size: "md",
    disabled: false,
  },
} satisfies Meta<typeof Dial>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="p-10">
      <ReadoutDial aria-label="Volume" {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const knob = canvas.getByRole("slider", { name: "Volume" });
    await expect(knob).toHaveAttribute("aria-valuenow", "40");
    // Focus rather than click: a synthetic click lands at (0, 0) and turns
    // the knob to that angle.
    knob.focus();
    await userEvent.keyboard("{ArrowRight}{ArrowRight}{PageUp}");
    await expect(knob).toHaveAttribute("aria-valuenow", "52");
    await expect(knob).toHaveTextContent("52");
    await expect(getComputedStyle(knob).boxShadow).not.toBe("none");
  },
};

/** The kit's volume knob. */
export const KitReplica: Story = {
  render: () => (
    <div className="p-12">
      <Surface className="grid w-72 justify-items-center gap-6 p-8">
        <p className="font-medium text-foreground text-sm">Volume</p>
        <ReadoutDial aria-label="Volume" defaultValue={64} size="lg" />
        <div className="flex w-full justify-between text-muted-foreground">
          <Volume1 aria-hidden="true" className="size-5" />
          <Volume2 aria-hidden="true" className="size-5" />
        </div>
      </Surface>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-10 p-10">
      {(["sm", "md", "lg"] as const).map((size) => (
        <ReadoutDial
          aria-label={`Size ${size}`}
          defaultValue={60}
          key={size}
          size={size}
        />
      ))}
    </div>
  ),
};

/** Half-degree steps, a custom range, spoken units and a cool-to-warm arc. */
export const Thermostat: Story = {
  render: () => (
    <div className="p-10">
      <ReadoutDial
        aria-label="Temperature"
        className="[--dial-fill-start:oklch(0.62_0.14_245)] [--dial-fill:oklch(0.7_0.17_45)]"
        defaultValue={21.5}
        format={(value) => `${value}°`}
        getAriaValueText={(value) => `${value} degrees Celsius`}
        largeStep={2}
        max={30}
        min={16}
        size="lg"
        step={0.5}
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="p-10">
      <ReadoutDial aria-label="Volume" defaultValue={30} disabled />
    </div>
  ),
};
