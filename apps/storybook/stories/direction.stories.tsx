import {
  DirectionProvider,
  useDirection,
} from "@neomorphic-ui/react/direction";
import { Slider } from "@neomorphic-ui/react/slider";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@neomorphic-ui/react/toggle-group";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

const meta = {
  title: "Components/Direction",
  component: DirectionProvider,
  parameters: {
    docs: {
      description: {
        component: `
Tells the components the reading direction, so keyboard handling (arrow keys in
sliders, toggle groups, tabs and menus) and popup sides mirror for
right-to-left languages. Set \`dir\` on \`<html>\` (or a wrapper) as well; that
is what mirrors the layout.

\`\`\`tsx
import { DirectionProvider } from "@neomorphic-ui/react/direction";

<html dir="rtl">
  <DirectionProvider direction="rtl">
    <App />
  </DirectionProvider>
</html>
\`\`\`

\`useDirection()\` reads it in your own components.
`,
      },
    },
  },
  args: {
    direction: "rtl",
  },
  argTypes: {
    direction: { control: "inline-radio", options: ["ltr", "rtl"] },
  },
} satisfies Meta<typeof DirectionProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

function Readout() {
  return (
    <p className="text-muted-foreground text-sm">
      Direction: <span data-testid="direction">{useDirection()}</span>
    </p>
  );
}

export const RightToLeft: Story = {
  render: (args) => (
    <div className="flex max-w-sm flex-col gap-8 p-10" dir={args.direction}>
      <DirectionProvider {...args}>
        <Readout />
        <Slider aria-label="Volume" defaultValue={30} />
        <ToggleGroup aria-label="View" defaultValue={["day"]}>
          <ToggleGroupItem value="day">يوم</ToggleGroupItem>
          <ToggleGroupItem value="week">أسبوع</ToggleGroupItem>
          <ToggleGroupItem value="month">شهر</ToggleGroupItem>
        </ToggleGroup>
      </DirectionProvider>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId("direction")).toHaveTextContent("rtl");
    const slider = canvas.getByRole("slider", { name: "Volume" });
    slider.focus();
    // In RTL the track runs right to left, so ArrowLeft raises the value.
    await userEvent.keyboard("{ArrowLeft}");
    await expect(slider).toHaveValue("31");
  },
};
