import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { SettingsTiles } from "../../blocks/settings-tiles";

const meta = {
  title: "Blocks/Settings Tiles",
  component: SettingsTiles,
  parameters: {
    docs: {
      description: {
        component: `
The kit's combined widgets (\`3:71\`): Touch ID and airplane-mode tiles, built
from \`Surface\`, rounded \`Toggle\`s, \`Slider\` and \`Switch\`. Each tile sinks
and takes its colour when on. Turning on airplane mode switches off Wi-Fi and
Bluetooth; turning either radio back on leaves airplane mode.

Source: \`apps/storybook/blocks/settings-tiles.tsx\`.
`,
      },
    },
  },
  args: {
    onSettingsChange: fn(),
  },
} satisfies Meta<typeof SettingsTiles>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="p-12">
      <SettingsTiles {...args} />
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const airplane = canvas.getByRole("button", { name: "Airplane mode" });
    const wifi = canvas.getByRole("button", { name: "Wi-Fi" });
    const bluetooth = canvas.getByRole("button", { name: "Bluetooth" });

    await userEvent.click(airplane);
    await expect(airplane).toHaveAttribute("aria-pressed", "true");
    await expect(wifi).toHaveAttribute("aria-pressed", "false");
    await expect(bluetooth).toHaveAttribute("aria-pressed", "false");
    await expect(args.onSettingsChange).toHaveBeenLastCalledWith({
      touchId: true,
      airplane: true,
      wifi: false,
      bluetooth: false,
    });

    await userEvent.click(wifi);
    await expect(wifi).toHaveAttribute("aria-pressed", "true");
    await expect(airplane).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(canvas.getByText("Night shift"));
    await expect(
      canvas.getByRole("switch", { name: "Night shift" })
    ).toBeChecked();
  },
};

/** Everything off, as after a reset. */
export const AllOff: Story = {
  args: {
    defaultSettings: {
      touchId: false,
      airplane: false,
      wifi: false,
      bluetooth: false,
    },
  },
  render: (args) => (
    <div className="p-12">
      <SettingsTiles {...args} />
    </div>
  ),
};
