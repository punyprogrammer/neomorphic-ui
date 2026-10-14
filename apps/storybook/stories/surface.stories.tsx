import { Surface } from "@neomorphic-ui/react/surface";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

const meta = {
  title: "Components/Surface",
  component: Surface,
  parameters: {
    docs: {
      description: {
        component: `
The base neomorphic primitive: a block of the page surface that is extruded
from it (\`raised\`), pressed into it (\`inset\`) or level with it (\`flat\`).
Every other component's depth comes from the same shadow scale.

\`\`\`tsx
import { Surface } from "@neomorphic-ui/react/surface";

<Surface className="p-6">Raised panel</Surface>
<Surface elevation="inset" shape="pill" className="h-12 w-48" />
<Surface render={<section aria-label="Stats" />}>...</Surface>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    elevation: {
      control: "inline-radio",
      options: ["raised", "inset", "flat"],
    },
    depth: { control: "inline-radio", options: ["sm", "md", "lg"] },
    shape: {
      control: "inline-radio",
      options: ["square", "rounded", "pill", "circle"],
    },
  },
  args: {
    elevation: "raised",
    depth: "md",
    shape: "rounded",
  },
} satisfies Meta<typeof Surface>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="p-10">
      <Surface {...args} className="flex size-40 items-center justify-center">
        <span className="font-bold text-sm uppercase tracking-wide">
          {args.elevation}
        </span>
      </Surface>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const surface = canvasElement.querySelector('[data-slot="surface"]');
    await expect(surface).toHaveAttribute("data-elevation", "raised");
    await expect(getComputedStyle(surface as Element).boxShadow).not.toBe(
      "none"
    );
  },
};

const SHAPES = [
  { shape: "square", className: "size-12" },
  { shape: "rounded", className: "size-12" },
  { shape: "circle", className: "size-12" },
  { shape: "square", className: "h-11 w-36" },
  { shape: "rounded", className: "h-11 w-36" },
  { shape: "pill", className: "h-11 w-36" },
] as const;

/** The kit's "Basic States" panel: each shape raised, then inset. */
export const BasicStates: Story = {
  render: () => (
    <div className="flex flex-col gap-10 p-10">
      {(["raised", "inset"] as const).map((elevation) => (
        <div className="flex flex-wrap items-center gap-8" key={elevation}>
          {SHAPES.map(({ shape, className }, i) => (
            <Surface
              aria-label={`${elevation} ${shape}`}
              className={className}
              elevation={elevation}
              key={`${elevation}-${i}`}
              role="img"
              shape={shape}
            />
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Elevations: Story = {
  render: () => (
    <div className="flex flex-wrap gap-10 p-10">
      {(["raised", "inset", "flat"] as const).map((elevation) => (
        <Surface
          className="flex size-32 items-center justify-center text-sm"
          elevation={elevation}
          key={elevation}
        >
          {elevation}
        </Surface>
      ))}
    </div>
  ),
};

export const Depths: Story = {
  render: () => (
    <div className="flex flex-col gap-10 p-10">
      {(["raised", "inset"] as const).map((elevation) => (
        <div className="flex flex-wrap gap-10" key={elevation}>
          {(["sm", "md", "lg"] as const).map((depth) => (
            <Surface
              className="flex size-28 items-center justify-center text-sm"
              depth={depth}
              elevation={elevation}
              key={depth}
            >
              {elevation} · {depth}
            </Surface>
          ))}
        </div>
      ))}
    </div>
  ),
};

/** Raised → pressed on click: both shadow slots ease rather than snap. */
export const PressTransition: Story = {
  render: () => (
    <div className="p-10">
      <Surface
        className="flex size-24 cursor-pointer select-none items-center justify-center text-sm active:inset-shadow-neu active:shadow-neu-flat"
        render={<button type="button" />}
      >
        Press
      </Surface>
    </div>
  ),
};

export const AsSection: Story = {
  render: () => (
    <div className="p-10">
      <Surface
        className="flex w-72 flex-col gap-1 p-6"
        render={<section aria-label="Room temperature" />}
      >
        <span className="text-muted-foreground text-sm">Living room</span>
        <span className="font-bold text-4xl">22°C</span>
      </Surface>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const section = canvasElement.querySelector("section");
    await expect(section).toHaveAttribute("data-slot", "surface");
  },
};
