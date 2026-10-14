import {
  BarMeter,
  BarMeterItem,
  BarMeterLabel,
  BarMeterValue,
} from "@neomorphic-ui/react/bar-meter";
import { Surface } from "@neomorphic-ui/react/surface";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CloudSun } from "lucide-react";
import { expect, within } from "storybook/test";

const WEEK = [
  ["Mon", 24],
  ["Tue", 28],
  ["Wed", 31],
  ["Thu", 26],
  ["Fri", 19],
  ["Sat", 22],
  ["Sun", 29],
] as const;

const CELSIUS = { style: "unit", unit: "celsius" } as const;

// The kit's weather fill: blue at the foot, warming to yellow at the top.
const WEATHER =
  "[--bar-meter-fill-start:oklch(0.62_0.14_245)] [--bar-meter-fill:oklch(0.86_0.16_90)]";

const meta = {
  title: "Components/BarMeter",
  component: BarMeter,
  parameters: {
    docs: {
      description: {
        component: `
A row of vertical bars, like the kit's weather week. Each \`BarMeterItem\` is a
meter: a well with a raised fill rising from its foot, a reading above and a
label below.

\`\`\`tsx
import {
  BarMeter, BarMeterItem, BarMeterLabel, BarMeterValue,
} from "@neomorphic-ui/react/bar-meter";

<BarMeter aria-label="Highs this week">
  <BarMeterItem format={{ style: "unit", unit: "celsius" }} max={40} value={24}>
    <BarMeterValue />
    <BarMeterLabel>Mon</BarMeterLabel>
  </BarMeterItem>
  …
</BarMeter>
\`\`\`

The fill fades from \`--bar-meter-fill-start\` to \`--bar-meter-fill\` (default: a
darker \`--primary\` to \`--primary\`). Set \`--bar-meter-height\` on the group to
change the bars' height.
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
} satisfies Meta<typeof BarMeter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="p-10">
      <BarMeter aria-label="Highs this week" {...args}>
        {WEEK.map(([day, high]) => (
          <BarMeterItem format={CELSIUS} key={day} max={40} value={high}>
            <BarMeterValue />
            <BarMeterLabel>{day}</BarMeterLabel>
          </BarMeterItem>
        ))}
      </BarMeter>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const wednesday = canvas.getByRole("meter", { name: "Wed" });
    await expect(wednesday).toHaveAttribute("aria-valuetext", "31°C");
    const track = wednesday.querySelector(
      '[data-slot="bar-meter-track"]'
    ) as Element;
    const fill = wednesday.querySelector(
      '[data-slot="bar-meter-fill"]'
    ) as Element;
    const ratio =
      fill.getBoundingClientRect().height /
      track.getBoundingClientRect().height;
    await expect(ratio).toBeCloseTo(31 / 40, 1);
  },
};

/** The kit's weather card. */
export const KitReplica: Story = {
  render: () => (
    <div className="p-12">
      <Surface className="grid w-[26rem] gap-6 p-6">
        <div className="flex items-center justify-between text-foreground">
          <div>
            <p className="font-medium text-3xl tabular-nums">24°</p>
            <p className="text-muted-foreground text-sm">
              Kolkata · Partly cloudy
            </p>
          </div>
          <CloudSun aria-hidden="true" className="size-10" />
        </div>
        <BarMeter
          aria-label="Highs this week"
          className={`justify-between ${WEATHER}`}
        >
          {WEEK.map(([day, high]) => (
            <BarMeterItem format={CELSIUS} key={day} max={40} value={high}>
              <BarMeterValue />
              <BarMeterLabel>{day}</BarMeterLabel>
            </BarMeterItem>
          ))}
        </BarMeter>
      </Surface>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-16 p-10">
      {(["sm", "md", "lg"] as const).map((size) => (
        <BarMeter aria-label={`Size ${size}`} key={size} size={size}>
          {[40, 75, 55].map((value, index) => (
            <BarMeterItem key={index} value={value}>
              <BarMeterLabel>{size}</BarMeterLabel>
            </BarMeterItem>
          ))}
        </BarMeter>
      ))}
    </div>
  ),
};

/** Percentages by default; a custom height on the group. */
export const Storage: Story = {
  render: () => (
    <div className="p-10">
      <BarMeter
        aria-label="Storage by type"
        className="[--bar-meter-height:12rem]"
        size="lg"
      >
        {(
          [
            ["Photos", 62],
            ["Apps", 23],
            ["Docs", 8],
            ["Other", 3],
          ] as const
        ).map(([label, value]) => (
          <BarMeterItem key={label} value={value}>
            <BarMeterValue />
            <BarMeterLabel>{label}</BarMeterLabel>
          </BarMeterItem>
        ))}
      </BarMeter>
    </div>
  ),
};
