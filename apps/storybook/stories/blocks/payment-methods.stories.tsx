import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { PaymentMethods } from "../../blocks/payment-methods";

const meta = {
  title: "Blocks/Payment Methods",
  component: PaymentMethods,
  args: { onAddCard: fn(), onPay: fn() },
  parameters: {
    docs: {
      description: {
        component: `
The kit's credit cards (\`3:731\`) as a checkout step. Saved cards are a
\`RadioGroup\` of raised \`Item\` rows rendered as labels; the chosen row
presses into the surface and its radio carries the dot. A warning \`Badge\`
flags a card about to expire, a \`Checkbox\` saves the default, and the Pay
\`Button\` names the chosen card and shows a spinner while paying.

Each radio is named by its card ("Visa ending in 4242") and described by its
expiry.

Source: \`apps/storybook/blocks/payment-methods.tsx\`.
`,
      },
    },
  },
} satisfies Meta<typeof PaymentMethods>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="p-12">
      <PaymentMethods {...args} />
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("radiogroup", { name: "Payment method" })
    ).toBeVisible();
    await expect(
      canvas.getByRole("radio", { name: "Visa ending in 4242" })
    ).toBeChecked();

    const mastercard = canvas.getByRole("radio", {
      name: "Mastercard ending in 5100",
    });
    await expect(mastercard).toHaveAccessibleDescription(
      "Expires 11/26 Expires soon"
    );
    // Clicking anywhere on the row chooses the card.
    await userEvent.click(canvas.getByText("Expires 11/26"));
    await expect(mastercard).toBeChecked();

    await userEvent.click(
      canvas.getByRole("checkbox", { name: "Save as default card" })
    );
    await userEvent.click(
      canvas.getByRole("button", { name: "Pay $248.00 with Mastercard" })
    );
    await expect(canvas.getByRole("status")).toHaveTextContent(
      "Paid $248.00 with Mastercard ending in 5100"
    );
    await expect(args.onPay).toHaveBeenCalledWith(
      expect.objectContaining({ id: "mastercard" }),
      true
    );
  },
};

/** While the payment is in flight, the button spins and the choices hold. */
export const Paying: Story = {
  args: { onPay: fn(() => new Promise<void>(() => undefined)) },
  render: (args) => (
    <div className="p-12">
      <PaymentMethods {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pay = canvas.getByRole("button", { name: "Pay $248.00 with Visa" });
    await userEvent.click(pay);
    await expect(pay).toHaveAttribute("aria-busy", "true");
    await userEvent.click(canvas.getByText("Expires 03/30"));
    await expect(
      canvas.getByRole("radio", { name: "Visa ending in 4242" })
    ).toBeChecked();
  },
};
