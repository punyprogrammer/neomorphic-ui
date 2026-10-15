import { Surface } from "@neomorphic-react/ui/surface";
import { Switch } from "@neomorphic-react/ui/switch";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bluetooth, Moon, Plane, Wifi } from "lucide-react";
import { expect, userEvent, waitFor, within } from "storybook/test";

// The control fades itself when disabled; the label only dims its text.
const LABEL =
  "flex cursor-pointer items-center gap-3 text-sm has-data-disabled:cursor-not-allowed has-data-disabled:text-foreground/50";

/** Gaps between the thumb and the track's start and end edges, in px. */
function thumbInsets(control: Element) {
  const track = control.getBoundingClientRect();
  const thumb = (
    control.querySelector('[data-slot="switch-thumb"]') as Element
  ).getBoundingClientRect();
  return {
    left: Math.round(thumb.left - track.left),
    right: Math.round(track.right - thumb.right),
  };
}

const meta = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: `
The kit's switch: off, the track is a well with a raised thumb at the start;
on, it fills dark and the thumb slides to the end (mirrored right-to-left).
A hidden native input carries the value, so it submits with forms.

\`\`\`tsx
import { Switch } from "@neomorphic-react/ui/switch";

<label className="flex items-center gap-3">
  <Switch defaultChecked name="wifi" />
  Wi-Fi
</label>
\`\`\`

Use a switch for settings that take effect at once; for choices confirmed with
a submit button, use \`Checkbox\`. Wrap it with its text in a \`<label>\` or give
it an \`aria-label\`; the name stays the same whether it's on or off.
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
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="p-10">
      <label className={LABEL}>
        <Switch {...args} />
        Wi-Fi
      </label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole("switch", { name: "Wi-Fi" });
    await expect(thumbInsets(control).left).toBe(2);
    await userEvent.click(canvas.getByText("Wi-Fi"));
    await expect(control).toHaveAttribute("aria-checked", "true");
    // The thumb ends flush with the far padding.
    await waitFor(() => expect(thumbInsets(control).right).toBe(2));
  },
};

/** The kit's pair: off and on. */
export const KitReplica: Story = {
  render: () => (
    <div className="flex items-center gap-10 p-12">
      <Switch aria-label="Off" />
      <Switch aria-label="On" defaultChecked />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="grid w-fit grid-cols-2 gap-x-12 gap-y-5 p-10">
      <label className={LABEL}>
        <Switch />
        Off
      </label>
      <label className={LABEL}>
        <Switch defaultChecked />
        On
      </label>
      <label className={LABEL}>
        <Switch disabled />
        Disabled
      </label>
      <label className={LABEL}>
        <Switch defaultChecked disabled />
        Disabled on
      </label>
      <label className={LABEL}>
        <Switch aria-invalid />
        Invalid
      </label>
    </div>
  ),
};

/** Thumb travel is computed per size; each lands flush at both ends. */
export const Sizes: Story = {
  render: () => (
    <div className="grid w-fit gap-5 p-10">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div className="flex items-center gap-6" key={size}>
          <Switch aria-label={`${size} off`} size={size} />
          <Switch aria-label={`${size} on`} defaultChecked size={size} />
          <span className="text-muted-foreground text-xs">{size}</span>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const insets = (["sm", "md", "lg"] as const).flatMap((size) => [
      thumbInsets(canvas.getByRole("switch", { name: `${size} off` })).left,
      thumbInsets(canvas.getByRole("switch", { name: `${size} on` })).right,
    ]);
    await expect(insets).toEqual([2, 2, 2, 2, 2, 2]);
  },
};

/** Right-to-left: off starts at the right, on slides left. */
export const RightToLeft: Story = {
  render: () => (
    <div className="flex items-center gap-10 p-10" dir="rtl">
      <Switch aria-label="RTL off" />
      <Switch aria-label="RTL on" defaultChecked />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      thumbInsets(canvas.getByRole("switch", { name: "RTL off" })).right
    ).toBe(2);
    await expect(
      thumbInsets(canvas.getByRole("switch", { name: "RTL on" })).left
    ).toBe(2);
  },
};

const SETTINGS = [
  { name: "Wi-Fi", icon: Wifi, on: true },
  { name: "Bluetooth", icon: Bluetooth, on: true },
  { name: "Airplane mode", icon: Plane, on: false },
  { name: "Do not disturb", icon: Moon, on: false },
];

/** A settings card: each row's whole label toggles its switch. */
export const SettingsList: Story = {
  render: () => (
    <div className="p-10">
      <Surface className="grid w-80 gap-1 p-3">
        {SETTINGS.map(({ name, icon: Icon, on }) => (
          <label
            className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-3 text-sm"
            key={name}
          >
            <Icon aria-hidden="true" className="size-4 text-muted-foreground" />
            <span className="flex-1">{name}</span>
            <Switch defaultChecked={on} />
          </label>
        ))}
      </Surface>
    </div>
  ),
};
