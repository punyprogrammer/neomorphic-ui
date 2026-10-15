import { Slider, SliderLabel, SliderValue } from "@neomorphic-react/ui/slider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Volume, Volume2 } from "lucide-react";
import { expect, userEvent, within } from "storybook/test";

// The kit's music-slider orange, darkened to 3:1 against the surface.
const ORANGE = "[--slider-fill:oklch(0.64_0.17_50)]";

/** Gaps between a thumb and the track's start and end edges, in px. */
function thumbInsets(root: Element, index = 0) {
  const track = (
    root.querySelector('[data-slot="slider-track"]') as Element
  ).getBoundingClientRect();
  const thumb = (
    root.querySelectorAll('[data-slot="slider-thumb"]')[index] as Element
  ).getBoundingClientRect();
  return {
    start: Math.round(thumb.left - track.left),
    end: Math.round(track.right - thumb.right),
  };
}

const meta = {
  title: "Components/Slider",
  component: Slider,
  parameters: {
    docs: {
      description: {
        component: `
The kit's music slider: a groove in the surface, a fill that brightens toward
the thumb, and a raised pill thumb with three grip grooves that sinks in while
held. The thumb stays inside the track at both ends.

\`\`\`tsx
import { Slider, SliderLabel, SliderValue } from "@neomorphic-react/ui/slider";

<Slider defaultValue={30}>
  <div className="flex justify-between">
    <SliderLabel>Volume</SliderLabel>
    <SliderValue />
  </div>
</Slider>
\`\`\`

Pass an array for a range (one thumb per value). Name it with \`SliderLabel\`,
\`aria-label\`, or \`getAriaLabel\` per thumb. Keyboard: arrows step, Page
Up/Down take \`largeStep\`, Home/End jump to the ends. Set \`--slider-fill\` to
recolour the fill; keep it at 3:1 against the surface.
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
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-80 p-10">
      <Slider {...args} defaultValue={30}>
        <div className="flex items-center justify-between">
          <SliderLabel>Volume</SliderLabel>
          <SliderValue />
        </div>
      </Slider>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("slider", { name: "Volume" });
    await userEvent.click(input);
    await userEvent.keyboard("{ArrowRight}{ArrowRight}");
    await expect(input).toHaveValue("32");
    await expect(canvas.getByText("32")).toBeVisible();
  },
};

/** The kit's pair of music sliders: at rest, and partway with the fill. */
export const KitReplica: Story = {
  render: () => (
    <div className="grid w-[26rem] gap-8 p-12">
      <Slider aria-label="Position" defaultValue={0} />
      <Slider aria-label="Volume" className={ORANGE} defaultValue={55} />
    </div>
  ),
};

/** The thumb sits flush with the track at both ends, as in the kit. */
export const Ends: Story = {
  render: () => (
    <div className="grid w-80 gap-8 p-10">
      <Slider aria-label="Minimum" defaultValue={0} />
      <Slider aria-label="Maximum" defaultValue={100} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const [min, max] = canvasElement.querySelectorAll('[data-slot="slider"]');
    await expect(thumbInsets(min as Element).start).toBeCloseTo(0, 0);
    await expect(thumbInsets(max as Element).end).toBeCloseTo(0, 0);
  },
};

const PRICE = { style: "currency", currency: "USD", maximumFractionDigits: 0 };

/** Two thumbs for a range; each is named for screen readers. */
export const Range: Story = {
  render: () => (
    <div className="w-80 p-10">
      <Slider
        className={ORANGE}
        defaultValue={[200, 800]}
        format={PRICE as Intl.NumberFormatOptions}
        getAriaLabel={(index) =>
          ["Minimum price", "Maximum price"][index] ?? ""
        }
        max={1000}
        minStepsBetweenValues={50}
        step={10}
      >
        <div className="flex items-center justify-between">
          <SliderLabel>Price</SliderLabel>
          <SliderValue />
        </div>
      </Slider>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const low = canvas.getByRole("slider", { name: "Minimum price" });
    const high = canvas.getByRole("slider", { name: "Maximum price" });
    await expect(low).toHaveValue("200");
    await expect(high).toHaveValue("800");
    const [lowThumb, highThumb] = canvasElement.querySelectorAll(
      '[data-slot="slider-thumb"]'
    );
    await expect(
      (lowThumb as Element).getBoundingClientRect().right
    ).toBeLessThan((highThumb as Element).getBoundingClientRect().left);
  },
};

const BANDS = [
  ["60", 40],
  ["230", 65],
  ["910", 55],
  ["3.6k", 80],
  ["14k", 35],
] as const;

/** Vertical sliders as an equaliser, after the kit's weather bars. */
export const Vertical: Story = {
  render: () => (
    <div className="flex h-64 gap-6 p-10">
      {BANDS.map(([band, value]) => (
        <div className="flex flex-col items-center gap-3" key={band}>
          <Slider
            aria-label={`${band} Hz`}
            className={ORANGE}
            defaultValue={value}
            orientation="vertical"
            size="sm"
          />
          <span className="text-muted-foreground text-xs">{band}</span>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("slider", { name: "60 Hz" });
    await expect(input).toHaveAttribute("aria-orientation", "vertical");
    await userEvent.click(input);
    await userEvent.keyboard("{ArrowUp}");
    await expect(input).toHaveValue("41");
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="grid w-80 gap-8 p-10">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div className="flex items-center gap-4" key={size}>
          <Slider
            aria-label={`Volume, ${size}`}
            defaultValue={45}
            size={size}
          />
          <span className="w-4 text-muted-foreground text-xs">{size}</span>
        </div>
      ))}
    </div>
  ),
};

/** With icons at either end, and disabled. */
export const States: Story = {
  render: () => (
    <div className="grid w-80 gap-8 p-10">
      <div className="flex items-center gap-3 text-muted-foreground">
        <Volume aria-hidden="true" className="size-4 shrink-0" />
        <Slider aria-label="Volume" defaultValue={60} />
        <Volume2 aria-hidden="true" className="size-4 shrink-0" />
      </div>
      <Slider defaultValue={60} disabled>
        <SliderLabel>Disabled</SliderLabel>
      </Slider>
    </div>
  ),
};
