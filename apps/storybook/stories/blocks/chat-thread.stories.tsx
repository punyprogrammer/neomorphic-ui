import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import { ChatThread } from "../../blocks/chat-thread";

const USUAL_PLACE = /Usual place/;

const meta = {
  title: "Blocks/Chat Thread",
  component: ChatThread,
  args: {
    onSend: fn(),
    reply: () => "Great, see you at 6:30!",
    replyDelay: 600,
  },
  parameters: {
    docs: {
      description: {
        component: `
The kit's chat app (\`3:731\`): a contact header (\`Avatar\` with a status
badge, call actions as icon \`Button\`s with \`Tooltip\`s), a message log, and
a pill-shaped \`InputGroup\` composer with a growing textarea. Incoming
bubbles are raised; outgoing ones are \`bg-primary\`. Enter sends and
Shift+Enter starts a new line.

The thread is a \`role="log"\` region, so screen readers announce new
messages; each bubble starts with a hidden "You:" or the sender's name. The
region is focusable so it can be scrolled from the keyboard.

Source: \`apps/storybook/blocks/chat-thread.tsx\`.
`,
      },
    },
  },
} satisfies Meta<typeof ChatThread>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="p-12">
      <ChatThread {...args} />
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const log = canvas.getByRole("log", {
      name: "Conversation with Maya Chen",
    });
    // The "Today" divider is decorative, so only the messages are items.
    await expect(within(log).getAllByRole("listitem")).toHaveLength(3);

    const composer = canvas.getByRole("textbox", { name: "Message Maya Chen" });
    await userEvent.type(
      composer,
      "Sure, 6:30?{Shift>}{Enter}{/Shift}Usual place"
    );
    await expect(composer).toHaveValue("Sure, 6:30?\nUsual place");
    await userEvent.keyboard("{Enter}");

    await expect(composer).toHaveValue("");
    await expect(args.onSend).toHaveBeenCalledWith("Sure, 6:30?\nUsual place");
    await expect(within(log).getByText(USUAL_PLACE)).toBeVisible();
    await waitFor(
      () =>
        expect(within(log).getByText("Great, see you at 6:30!")).toBeVisible(),
      { timeout: 3000 }
    );

    // A blank message is not sent.
    await userEvent.click(canvas.getByRole("button", { name: "Send" }));
    await expect(args.onSend).toHaveBeenCalledOnce();
  },
};

/** A new conversation: just the composer. */
export const Empty: Story = {
  args: { contact: "Linus Park", defaultMessages: [] },
  render: (args) => (
    <div className="p-12">
      <ChatThread {...args} />
    </div>
  ),
};
