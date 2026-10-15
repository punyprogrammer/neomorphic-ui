import {
  ToggleGroup,
  ToggleGroupItem,
} from "@neomorphic-react/ui/toggle-group";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Grid2x2,
  Italic,
  List,
  Play,
  SkipBack,
  SkipForward,
  Square,
  Underline,
} from "lucide-react";
import { useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";

const TRANSPARENT = /rgba\(0, 0, 0, 0\)/g;
const COLOR = /(?:rgb|hsl|lab|lch|oklab|oklch|color)a?\(/;
const LAYER_SEPARATOR = /,(?![^(]*\))/;

/** True when an `inset` layer of the box-shadow has a visible colour. */
function isPressedIn(element: Element) {
  return getComputedStyle(element)
    .boxShadow.replace(TRANSPARENT, "")
    .split(LAYER_SEPARATOR)
    .some((layer) => layer.includes("inset") && COLOR.test(layer));
}

// The kit's orange, darkened to 4.5:1 on the surface so "ON" stays legible.
const ORANGE = "[--toggle-on:oklch(0.51_0.16_45)]";

const meta = {
  title: "Components/ToggleGroup",
  component: ToggleGroup,
  parameters: {
    docs: {
      description: {
        component: `
A segmented control: one raised slab, like \`ButtonGroup\`, whose pressed items
sink into it. Arrow keys move focus between items; Space or Enter presses.
Single-select by default, \`multiple\` for several. \`--toggle-on\` on the group
colours every pressed item.

\`\`\`tsx
import { ToggleGroup, ToggleGroupItem } from "@neomorphic-react/ui/toggle-group";

const [value, setValue] = useState(["on"]);

<ToggleGroup
  aria-label="Power"
  onValueChange={(next) => next.length > 0 && setValue(next)}
  value={value}
>
  <ToggleGroupItem value="off">Off</ToggleGroupItem>
  <ToggleGroupItem value="on">On</ToggleGroupItem>
</ToggleGroup>
\`\`\`

Clicking the pressed item of a single-select group clears it. A control that
must always have a choice ignores empty changes, as above.
`,
      },
    },
  },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
    shape: { control: "inline-radio", options: ["rounded", "pill"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    multiple: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    orientation: "horizontal",
    shape: "rounded",
    size: "md",
    multiple: false,
    disabled: false,
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="p-10">
      <ToggleGroup {...args} aria-label="View" defaultValue={["grid"]}>
        <ToggleGroupItem aria-label="Grid" value="grid">
          <Grid2x2 />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="List" value="list">
          <List />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};

function PowerSwitch() {
  const [value, setValue] = useState(["on"]);
  return (
    <ToggleGroup
      aria-label="Power"
      className={ORANGE}
      onValueChange={(next) => next.length > 0 && setValue(next)}
      size="lg"
      value={value}
    >
      <ToggleGroupItem className="px-6 font-bold" value="off">
        Off
      </ToggleGroupItem>
      <ToggleGroupItem className="px-6 font-bold" value="on">
        On
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

function Transport() {
  const [value, setValue] = useState(["forward"]);
  const items = [
    ["back", "Previous track", SkipBack],
    ["play", "Play", Play],
    ["stop", "Stop", Square],
    ["forward", "Next track", SkipForward],
  ] as const;
  return (
    <ToggleGroup
      aria-label="Playback"
      className={ORANGE}
      onValueChange={(next) => next.length > 0 && setValue(next)}
      size="lg"
      value={value}
    >
      {items.map(([key, label, Icon]) => (
        <ToggleGroupItem
          aria-label={label}
          className="w-20"
          key={key}
          value={key}
        >
          <Icon className="fill-current" />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

/** The kit's OFF/ON switch and music transport. */
export const KitReplica: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-14 p-12">
      <Transport />
      <PowerSwitch />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const on = canvas.getByRole("button", { name: "On" });
    const off = canvas.getByRole("button", { name: "Off" });
    await expect(isPressedIn(on)).toBe(true);
    await expect(isPressedIn(off)).toBe(false);
    // Pressing the chosen item again keeps it: the switch is never empty.
    await userEvent.click(on);
    await expect(on).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(off);
    await expect(off).toHaveAttribute("aria-pressed", "true");
    await expect(on).toHaveAttribute("aria-pressed", "false");
    await waitFor(() => expect(isPressedIn(off)).toBe(true));
  },
};

/** Arrow keys move focus; Space presses the focused item. */
export const Keyboard: Story = {
  render: () => (
    <div className="p-10">
      <ToggleGroup aria-label="Alignment" defaultValue={["left"]}>
        <ToggleGroupItem aria-label="Align left" value="left">
          <AlignLeft />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Align center" value="center">
          <AlignCenter />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Align right" value="right">
          <AlignRight />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const left = canvas.getByRole("button", { name: "Align left" });
    const center = canvas.getByRole("button", { name: "Align center" });
    await userEvent.click(left);
    await userEvent.click(left);
    await userEvent.keyboard("{ArrowRight}");
    await expect(center).toHaveFocus();
    await userEvent.keyboard(" ");
    await expect(center).toHaveAttribute("aria-pressed", "true");
  },
};

/** `multiple`: each item toggles on its own. */
export const Multiple: Story = {
  render: () => (
    <div className="p-10">
      <ToggleGroup aria-label="Text style" defaultValue={["bold"]} multiple>
        <ToggleGroupItem aria-label="Bold" value="bold">
          <Bold />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Italic" value="italic">
          <Italic />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Underline" value="underline">
          <Underline />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Italic" }));
    const pressed = canvas
      .getAllByRole("button")
      .map((b) => b.getAttribute("aria-pressed"));
    await expect(pressed).toEqual(["true", "true", "false"]);
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-8 p-10">
      {(["sm", "md", "lg"] as const).map((size) => (
        <ToggleGroup
          aria-label={`Range, ${size}`}
          defaultValue={["week"]}
          key={size}
          size={size}
        >
          <ToggleGroupItem className="px-4" value="day">
            Day
          </ToggleGroupItem>
          <ToggleGroupItem className="px-4" value="week">
            Week
          </ToggleGroupItem>
          <ToggleGroupItem className="px-4" value="month">
            Month
          </ToggleGroupItem>
        </ToggleGroup>
      ))}
    </div>
  ),
};

/** Pill slab and vertical stacking; arrows follow the axis. */
export const ShapeAndOrientation: Story = {
  render: () => (
    <div className="flex items-start gap-10 p-10">
      <ToggleGroup aria-label="Range" defaultValue={["week"]} shape="pill">
        <ToggleGroupItem className="px-5" value="day">
          Day
        </ToggleGroupItem>
        <ToggleGroupItem className="px-5" value="week">
          Week
        </ToggleGroupItem>
        <ToggleGroupItem className="px-5" value="month">
          Month
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup
        aria-label="Alignment, vertical"
        defaultValue={["center"]}
        orientation="vertical"
      >
        <ToggleGroupItem aria-label="Top" value="top">
          <AlignLeft className="rotate-90" />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Middle" value="center">
          <AlignCenter className="rotate-90" />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Bottom" value="bottom">
          <AlignRight className="rotate-90" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};
