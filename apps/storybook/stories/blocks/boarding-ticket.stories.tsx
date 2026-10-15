import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { BoardingTicket } from "../../blocks/boarding-ticket";

const meta = {
  title: "Blocks/Boarding Ticket",
  component: BoardingTicket,
  args: { onAddToWallet: fn() },
  parameters: {
    docs: {
      description: {
        component: `
The kit's boarding ticket (\`3:731\`): a raised \`Card\` with the route, the
flight details as a description list, a perforated \`Separator\` tear line
with inset \`Surface\` notches punched at each end, and a barcode stub. The
ticket is an \`<article>\` named "Boarding pass, CCU to BLR".

Source: \`apps/storybook/blocks/boarding-ticket.tsx\`.
`,
      },
    },
  },
} satisfies Meta<typeof BoardingTicket>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="p-12">
      <BoardingTicket {...args} />
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const ticket = canvas.getByRole("article", {
      name: "Boarding pass, CCU to BLR",
    });
    await expect(ticket).toBeVisible();
    // The details are a description list: each term names its value.
    const seat = within(ticket).getByText("Seat");
    await expect(seat.tagName).toBe("DT");
    await expect(seat.nextElementSibling).toHaveTextContent("14A");

    await userEvent.click(
      canvas.getByRole("button", { name: "Add to wallet" })
    );
    await expect(canvas.getByRole("status")).toHaveTextContent(
      "Added to wallet"
    );
    await expect(args.onAddToWallet).toHaveBeenCalledOnce();
  },
};

/** Another booking: the barcode is drawn from the booking details. */
export const Business: Story = {
  args: {
    flight: {
      flight: "NU 88",
      passenger: "Grace Hopper",
      date: "2 Nov",
      boarding: "21:10",
      gate: "A3",
      seat: "2C",
      travelClass: "Business",
      from: { code: "DEL", city: "Delhi", time: "21:45" },
      to: { code: "LHR", city: "London", time: "02:30" },
    },
  },
  render: (args) => (
    <div className="p-12">
      <BoardingTicket {...args} />
    </div>
  ),
};
