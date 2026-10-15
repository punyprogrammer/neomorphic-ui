import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { TravelCards } from "../../blocks/travel-cards";

const meta = {
  title: "Blocks/Travel Cards",
  component: TravelCards,
  args: { onBook: fn(), onSavedChange: fn() },
  parameters: {
    docs: {
      description: {
        component: `
The kit's travel cards (\`3:731\`): an info card (photo, place, rating, price,
Save toggle), a big info card (trip summary, travellers, Book now) and info
boxes (raised rows with a framed thumbnail). Built from \`Card\`, \`Toggle\`,
\`Avatar\`, \`Badge\`, \`Button\` and \`Item\`. Each card is an \`<article>\`
named by its title.

Source: \`apps/storybook/blocks/travel-cards.tsx\`.
`,
      },
    },
  },
} satisfies Meta<typeof TravelCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="p-12">
      <TravelCards {...args} />
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("article", { name: "Uluwatu Beach" })
    ).toBeVisible();
    await expect(
      canvas.getByRole("list", { name: "More trips" })
    ).toBeVisible();

    const save = canvas.getByRole("button", { name: "Save Uluwatu Beach" });
    await userEvent.click(save);
    await expect(save).toHaveAttribute("aria-pressed", "true");
    await expect(args.onSavedChange).toHaveBeenCalledWith(
      true,
      expect.anything()
    );

    await userEvent.click(canvas.getByRole("button", { name: "Book now" }));
    await expect(canvas.getByRole("status")).toHaveTextContent("Booked");
    await expect(args.onBook).toHaveBeenCalledWith("Santorini getaway");
  },
};
