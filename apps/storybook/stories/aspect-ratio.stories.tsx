import { AspectRatio } from "@neomorphic-ui/react/aspect-ratio";
import { Card, CardContent, CardTitle } from "@neomorphic-ui/react/card";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { landscape } from "../blocks/images";

const COAST = landscape("#9cc8e8", "#f1dcb4", "#7a9a7e");
const TRAIL = landscape("#c9d6ee", "#d8d2c4", "#6d7f95");

const meta = {
  title: "Components/AspectRatio",
  component: AspectRatio,
  parameters: {
    docs: {
      description: {
        component: `
Holds an image, video or map at a fixed shape at any width. Images and videos
fill the frame and crop to fit.

\`\`\`tsx
import { AspectRatio } from "@neomorphic-ui/react/aspect-ratio";

<AspectRatio className="rounded-xl" ratio={16 / 9}>
  <img alt="Lisbon at dusk" src="…" />
</AspectRatio>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    ratio: {
      control: "select",
      options: [1, 4 / 3, 16 / 9, 21 / 9],
    },
  },
  args: {
    ratio: 16 / 9,
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-96 p-10">
      <AspectRatio {...args} className="rounded-xl shadow-neu">
        <img alt="A coastal town" src={COAST} />
      </AspectRatio>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const frame = canvasElement.querySelector(
      '[data-slot="aspect-ratio"]'
    ) as HTMLElement;
    const { width, height } = frame.getBoundingClientRect();
    await expect(Math.round((width / height) * 100)).toBe(
      Math.round((16 / 9) * 100)
    );
  },
};

export const InACard: Story = {
  render: () => (
    <div className="p-10">
      <Card className="w-72 overflow-hidden">
        <AspectRatio ratio={4 / 3}>
          <img alt="Mountain trail" src={TRAIL} />
        </AspectRatio>
        <CardContent>
          <CardTitle>Mountain trail</CardTitle>
        </CardContent>
      </Card>
    </div>
  ),
};
