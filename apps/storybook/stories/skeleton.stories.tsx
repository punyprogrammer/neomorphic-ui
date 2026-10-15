import { Card, CardContent, CardHeader } from "@neomorphic-react/ui/card";
import { Skeleton } from "@neomorphic-react/ui/skeleton";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    docs: {
      description: {
        component: `
A loading placeholder: a shallow well where content will land, with a highlight
sweeping across it (held still under reduced motion). Size it with
\`className\`.

\`\`\`tsx
import { Skeleton } from "@neomorphic-react/ui/skeleton";

<section aria-busy="true" aria-label="Loading trip">
  <Skeleton className="size-12" shape="circle" />
  <Skeleton className="w-48" shape="line" />
</section>
\`\`\`

Skeletons are hidden from assistive tech: mark the loading region with
\`aria-busy\` and a label instead.
`,
      },
    },
  },
  argTypes: {
    shape: { control: "inline-radio", options: ["rect", "line", "circle"] },
  },
  args: {
    shape: "rect",
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="p-10">
      <Skeleton {...args} className="h-24 w-64" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector('[data-slot="skeleton"]');
    await expect(skeleton).toHaveAttribute("aria-hidden", "true");
    await expect(getComputedStyle(skeleton as Element).boxShadow).toContain(
      "inset"
    );
  },
};

export const CardLoading: Story = {
  render: () => (
    <section aria-busy="true" aria-label="Loading trip" className="p-10">
      <Card className="w-80">
        <CardHeader className="flex items-center gap-4">
          <Skeleton className="size-12" shape="circle" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="w-3/4" shape="line" />
            <Skeleton className="w-1/2" shape="line" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    </section>
  ),
  play: async ({ canvasElement }) => {
    await expect(
      canvasElement.querySelectorAll('[data-slot="skeleton"]')
    ).toHaveLength(4);
  },
};
