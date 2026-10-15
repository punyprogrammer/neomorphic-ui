import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { NewsletterSignup } from "../../blocks/newsletter-signup";

const meta = {
  title: "Blocks/Newsletter Signup",
  component: NewsletterSignup,
  parameters: {
    docs: {
      description: {
        component: `
The kit's Subscribe card (\`3:71\`), built from \`Surface\`, \`InputGroup\` and
\`ToggleGroup\`. The email well rings red with a message for an incomplete
address, the button spins while \`onSubscribe\` runs, and a confirmation
replaces the form once it resolves.

Source: \`apps/storybook/blocks/newsletter-signup.tsx\`.
`,
      },
    },
  },
  args: {
    onSubscribe: fn(),
  },
} satisfies Meta<typeof NewsletterSignup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="p-12">
      <NewsletterSignup {...args} />
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const email = canvas.getByRole("textbox", { name: "Email" });
    const subscribe = canvas.getByRole("button", { name: "Subscribe" });

    await userEvent.type(email, "ada@");
    await userEvent.click(subscribe);
    await expect(email).toHaveAttribute("aria-invalid", "true");
    await expect(email).toHaveAccessibleDescription(
      "Enter a full email address, like ada@example.com."
    );

    await userEvent.click(canvas.getByRole("button", { name: "Events" }));
    await userEvent.type(email, "example.com");
    await expect(email).not.toHaveAttribute("aria-invalid");
    await userEvent.click(subscribe);

    await expect(await canvas.findByRole("status")).toHaveTextContent(
      "Check ada@example.com to confirm"
    );
    await expect(args.onSubscribe).toHaveBeenCalledWith("ada@example.com", [
      "deals",
      "guides",
      "events",
    ]);
  },
};

/** A slow request: the Subscribe button holds its size under a spinner. */
export const Sending: Story = {
  args: {
    onSubscribe: fn(() => new Promise<void>(() => undefined)),
  },
  render: (args) => (
    <div className="p-12">
      <NewsletterSignup {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByRole("textbox", { name: "Email" }),
      "grace@example.com"
    );
    const subscribe = canvas.getByRole("button", { name: "Subscribe" });
    await userEvent.click(subscribe);
    await expect(subscribe).toHaveAttribute("aria-busy", "true");
    await expect(
      canvas.getByRole("textbox", { name: "Email" })
    ).toHaveAttribute("readonly");
  },
};
