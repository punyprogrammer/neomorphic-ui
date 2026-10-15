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
badge, call actions as icon \`Button\`s with \`Tooltip\`s), the transcript,
and a pill-shaped \`InputGroup\` composer with a growing textarea.

The transcript is built from the conversation components: each turn is a
\`Message\` with a \`Bubble\` (raised for incoming, primary for outgoing) and
its time in the \`MessageFooter\`; a separator \`Marker\` dates the thread
and a shimmering one shows the other person typing. A \`MessageScroller\`
opens at the latest message, keeps a sent message near the top while the
answer arrives below it, and offers a jump button when you've scrolled up.
Enter sends and Shift+Enter starts a new line.

The transcript is a \`role="log"\`, so screen readers announce new messages;
each bubble starts with a hidden "You:" or the sender's name. The scrolling
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
    // The "Today" marker is decorative; the three messages are rows.
    await expect(log.querySelectorAll("[data-message-id]")).toHaveLength(3);
    await expect(
      within(log).getByText("Today").closest("[aria-hidden]")
    ).not.toBeNull();

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
    await expect(within(log).getByText("Maya is typing…")).toBeVisible();
    await waitFor(
      () =>
        expect(within(log).getByText("Great, see you at 6:30!")).toBeVisible(),
      { timeout: 3000 }
    );
    await expect(within(log).queryByText("Maya is typing…")).toBeNull();

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
