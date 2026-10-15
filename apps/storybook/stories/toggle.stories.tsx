import { Surface } from "@neomorphic-react/ui/surface";
import { Toggle } from "@neomorphic-react/ui/toggle";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Bell,
  Bookmark,
  Fingerprint,
  Heart,
  Mic,
  Plane,
  Star,
  ThumbsUp,
  Volume2,
  Wifi,
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

// Kit hues darkened to 3:1 on the surface (4.5:1 for text), so the colour
// still marks the "on" state.
const TONES = {
  like: "[--toggle-on:var(--color-destructive)]",
  thumb: "[--toggle-on:oklch(0.5_0.17_262)]",
  star: "[--toggle-on:oklch(0.6_0.13_80)]",
  bookmark: "[--toggle-on:oklch(0.52_0.14_150)]",
  sky: "[--toggle-on:oklch(0.52_0.14_240)]",
};

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  parameters: {
    docs: {
      description: {
        component: `
A two-state button. Off it's raised; on it sinks into the surface and its
content takes the \`--toggle-on\` colour (default \`--primary\`). \`iconFill\`
turns an outline icon solid while on.

\`\`\`tsx
import { Toggle } from "@neomorphic-react/ui/toggle";

<Toggle
  aria-label="Like"
  className="[--toggle-on:var(--color-destructive)]"
  iconFill
>
  <Heart />
</Toggle>
\`\`\`

The \`aria-label\` names the setting and stays the same in both states; the
pressed state is announced from \`aria-pressed\`. Set \`--toggle-on\` on the
toggle or any ancestor, and keep it at 3:1 against the surface (4.5:1 for text).
`,
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    shape: { control: "inline-radio", options: ["pill", "rounded"] },
    iconFill: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    size: "lg",
    shape: "pill",
    iconFill: true,
    disabled: false,
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="p-10">
      <Toggle {...args} aria-label="Like" className={TONES.like}>
        <Heart />
      </Toggle>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const toggle = within(canvasElement).getByRole("button", { name: "Like" });
    await expect(isPressedIn(toggle)).toBe(false);
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await waitFor(() => expect(isPressedIn(toggle)).toBe(true));
    // Filled with the like colour, not the default primary.
    const icon = toggle.querySelector("svg") as SVGElement;
    await waitFor(() =>
      expect(getComputedStyle(icon).fill).toBe(getComputedStyle(toggle).color)
    );
    await expect(getComputedStyle(icon).fill).not.toBe("none");
  },
};

/** The kit's social row, all on. */
export const KitReplica: Story = {
  render: () => (
    <div className="flex items-center gap-14 p-12">
      <Toggle
        aria-label="Like"
        className={TONES.like}
        defaultPressed
        iconFill
        size="lg"
      >
        <Heart />
      </Toggle>
      <Toggle
        aria-label="Thumbs up"
        className={TONES.thumb}
        defaultPressed
        iconFill
        size="lg"
      >
        <ThumbsUp />
      </Toggle>
      <Toggle
        aria-label="Favourite"
        className={TONES.star}
        defaultPressed
        iconFill
        size="lg"
      >
        <Star />
      </Toggle>
      <Toggle
        aria-label="Bookmark"
        className={TONES.bookmark}
        defaultPressed
        iconFill
        size="lg"
      >
        <Bookmark />
      </Toggle>
    </div>
  ),
};

/** Off, on, and both disabled. */
export const States: Story = {
  render: () => (
    <div className="flex items-center gap-10 p-10">
      <Toggle aria-label="Off" iconFill size="lg">
        <Star />
      </Toggle>
      <Toggle aria-label="On" defaultPressed iconFill size="lg">
        <Star />
      </Toggle>
      <Toggle aria-label="Disabled off" disabled iconFill size="lg">
        <Star />
      </Toggle>
      <Toggle
        aria-label="Disabled on"
        defaultPressed
        disabled
        iconFill
        size="lg"
      >
        <Star />
      </Toggle>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const states = ["Off", "On", "Disabled off", "Disabled on"].map((name) =>
      isPressedIn(canvas.getByRole("button", { name }))
    );
    await expect(states).toEqual([false, true, false, true]);
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-8 p-10">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Toggle
          aria-label={`Bookmark, ${size}`}
          className={TONES.bookmark}
          defaultPressed={size === "lg"}
          iconFill
          key={size}
          size={size}
        >
          <Bookmark />
        </Toggle>
      ))}
      {(["sm", "md", "lg"] as const).map((size) => (
        <Toggle key={`text-${size}`} size={size}>
          <Bell />
          Alerts
        </Toggle>
      ))}
    </div>
  ),
};

/** Icon + text toggles: the visible text is the accessible name. */
export const WithLabels: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6 p-10">
      <Toggle className="px-5">
        <Mic />
        Mute
      </Toggle>
      <Toggle className="px-5" defaultPressed>
        <Volume2 />
        Sound
      </Toggle>
      <Toggle className={`px-5 ${TONES.sky}`} defaultPressed shape="rounded">
        <Wifi />
        Wi-Fi
      </Toggle>
    </div>
  ),
};

function Tile({
  icon,
  label,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  tone: string;
}) {
  const [on, setOn] = useState(false);
  return (
    <Surface className="flex w-64 items-center gap-5 p-5">
      <Toggle
        aria-label={label}
        className={`size-16 ${tone}`}
        onPressedChange={setOn}
        pressed={on}
        shape="rounded"
      >
        {icon}
      </Toggle>
      <span
        aria-hidden="true"
        className="font-medium text-muted-foreground text-xs uppercase leading-snug tracking-wide"
      >
        {label}
        <br />
        {on ? "active" : "inactive"}
      </span>
    </Surface>
  );
}

/** The kit's airplane tile: a large rounded toggle in a card. */
export const TileToggle: Story = {
  render: () => (
    <div className="flex flex-wrap gap-10 p-12">
      <Tile
        icon={<Plane className="size-7" />}
        label="Airplane mode"
        tone={TONES.sky}
      />
      <Tile
        icon={<Fingerprint className="size-7" />}
        label="Touch ID"
        tone={TONES.bookmark}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const plane = canvas.getByRole("button", { name: "Airplane mode" });
    await userEvent.click(plane);
    await expect(plane).toHaveAttribute("aria-pressed", "true");
    await expect(plane.nextElementSibling?.textContent).toBe(
      "Airplane modeactive"
    );
  },
};
