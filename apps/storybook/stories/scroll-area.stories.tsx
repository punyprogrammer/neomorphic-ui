import { ScrollArea } from "@neomorphic-react/ui/scroll-area";
import { Separator } from "@neomorphic-react/ui/separator";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";

import { landscape } from "../blocks/images";

const meta = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  parameters: {
    docs: {
      description: {
        component: `
A scroll container with themed scrollbars: a groove with a raised pill thumb,
shown while the pointer is over the area or it's scrolling. Give it a height (or
a width for \`horizontal\`).

\`\`\`tsx
import { ScrollArea } from "@neomorphic-react/ui/scroll-area";

<ScrollArea className="h-72 w-56 rounded-xl" fade>
  {stops.map((stop) => <p key={stop}>{stop}</p>)}
</ScrollArea>
\`\`\`

\`fade\` softens an edge that has more to scroll to. When content overflows, the
viewport is focusable so keyboard users can scroll it.
`,
      },
    },
  },
  argTypes: {
    fade: { control: "boolean" },
  },
  args: {
    fade: true,
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const STOPS = Array.from({ length: 30 }, (_, i) => `Stop ${i + 1}`);

export const Default: Story = {
  render: (args) => (
    <div className="p-10">
      <ScrollArea
        {...args}
        className="inset-shadow-neu-sm h-72 w-56 rounded-xl bg-background shadow-neu-flat"
      >
        <div className="p-4">
          <h4 className="mb-4 font-medium text-sm">Coast line</h4>
          {STOPS.map((stop) => (
            <div key={stop}>
              <div className="text-sm">{stop}</div>
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const viewport = canvasElement.querySelector(
      '[data-slot="scroll-area-viewport"]'
    ) as HTMLElement;
    await expect(viewport.scrollHeight).toBeGreaterThan(viewport.clientHeight);
    // Overflowing, so keyboard users can focus it to scroll.
    await expect(viewport).toHaveAttribute("tabindex", "0");
    viewport.scrollTo({ top: viewport.scrollHeight });
    const thumb = canvasElement.querySelector(
      '[data-slot="scroll-area-thumb"]'
    ) as HTMLElement;
    await waitFor(() =>
      expect(thumb.getBoundingClientRect().top).toBeGreaterThan(
        viewport.getBoundingClientRect().top + 20
      )
    );
  },
};

const PLACES = [
  ["Porto", "#a7c7e7", "#f2d8b5", "#6f8f72"],
  ["Lisbon", "#b9d3f0", "#f4e0c0", "#7d9c88"],
  ["Faro", "#9fd0e0", "#f5e4c6", "#6e8f9a"],
  ["Sintra", "#c3d3ea", "#dfd6c5", "#5e7a63"],
  ["Évora", "#d6dff0", "#ead7b4", "#8a8a6a"],
  ["Coimbra", "#b2c9e6", "#efdcbf", "#728f80"],
] as const;

export const Horizontal: Story = {
  render: () => (
    <div className="p-10">
      <ScrollArea className="w-96 rounded-xl" fade orientation="horizontal">
        <div className="flex w-max gap-4 p-4">
          {PLACES.map(([name, sky, sand, hills]) => (
            <figure className="shrink-0" key={name}>
              <img
                alt={name}
                className="h-28 w-40 rounded-lg object-cover shadow-neu"
                src={landscape(sky, sand, hills)}
              />
              <figcaption className="pt-2 text-muted-foreground text-xs">
                {name}
              </figcaption>
            </figure>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
};
