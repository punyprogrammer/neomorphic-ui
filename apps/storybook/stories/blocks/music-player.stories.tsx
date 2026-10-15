import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { MusicPlayer } from "../../blocks/music-player";

const meta = {
  title: "Blocks/Music Player",
  component: MusicPlayer,
  parameters: {
    docs: {
      description: {
        component: `
The kit's music app (\`3:731\`), built from \`Card\`, \`Surface\`, \`Toggle\`,
\`Button\`, \`Slider\` and \`Dial\`. Play is a toggle (pressed while playing),
previous and next are buttons, the seek slider shows elapsed and remaining
time, and the volume knob is a \`Dial\`. Playback is simulated with a timer.

Source: \`apps/storybook/blocks/music-player.tsx\`.
`,
      },
    },
  },
} satisfies Meta<typeof MusicPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="p-12">
      <MusicPlayer {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const play = canvas.getByRole("button", { name: "Play" });

    await userEvent.click(play);
    await expect(play).toHaveAttribute("aria-pressed", "true");
    const seek = canvas.getByRole("slider", { name: "Seek" });
    await waitFor(() => expect(Number(seek.getAttribute("value"))).toBe(1), {
      timeout: 2000,
    });
    await userEvent.click(play);
    await expect(play).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(canvas.getByRole("button", { name: "Next track" }));
    await expect(
      canvas.getByRole("heading", { name: "Paper Planes" })
    ).toBeVisible();
    await expect(seek).toHaveValue("0");
    // Likes belong to a track: the new one starts unliked.
    await expect(canvas.getByRole("button", { name: "Like" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );

    const volume = canvas.getByRole("slider", { name: "Volume" });
    volume.focus();
    await userEvent.keyboard("{ArrowUp}");
    await expect(volume).toHaveAttribute("aria-valuenow", "65");
  },
};

/** Already playing: the timer advances the seek slider. */
export const Playing: Story = {
  args: { defaultPlaying: true },
  render: (args) => (
    <div className="p-12">
      <MusicPlayer {...args} />
    </div>
  ),
};
