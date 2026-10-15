import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { WeatherWidget } from "../../blocks/weather-widget";

const meta = {
  title: "Blocks/Weather Widget",
  component: WeatherWidget,
  parameters: {
    docs: {
      description: {
        component: `
The kit's weather card (\`3:71\`), built from \`Surface\`, \`ToggleGroup\`,
\`Separator\` and \`BarMeter\`. A °C/°F segmented switch converts every reading,
including each bar's spoken value; today's conditions sit in an inset well.

Source: \`apps/storybook/blocks/weather-widget.tsx\`.
`,
      },
    },
  },
} satisfies Meta<typeof WeatherWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="p-12">
      <WeatherWidget {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const wednesday = canvas.getByRole("meter", { name: "Wed" });
    await expect(wednesday).toHaveAttribute("aria-valuetext", "31°C");

    await userEvent.click(canvas.getByRole("button", { name: "Fahrenheit" }));
    await expect(wednesday).toHaveAttribute("aria-valuetext", "88°F");
    await expect(canvas.getByText("75°")).toBeVisible();

    // The switch never empties: pressing the chosen unit again keeps it.
    const fahrenheit = canvas.getByRole("button", { name: "Fahrenheit" });
    await userEvent.click(fahrenheit);
    await expect(fahrenheit).toHaveAttribute("aria-pressed", "true");
  },
};

/** Another city and a colder week. */
export const Winter: Story = {
  args: {
    city: "Oslo",
    condition: "Light snow",
    current: -3,
    humidity: 81,
    uv: 1,
    wind: 19,
    week: [
      { day: "Mon", high: 2 },
      { day: "Tue", high: -1 },
      { day: "Wed", high: 0 },
      { day: "Thu", high: 3 },
      { day: "Fri", high: 1 },
      { day: "Sat", high: -2 },
      { day: "Sun", high: 4 },
    ],
  },
  render: (args) => (
    <div className="p-12">
      <WeatherWidget {...args} />
    </div>
  ),
};
