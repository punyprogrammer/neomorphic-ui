import { Avatar, AvatarImage } from "@neomorphic-react/ui/avatar";
import { Bubble, BubbleContent } from "@neomorphic-react/ui/bubble";
import { Button } from "@neomorphic-react/ui/button";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@neomorphic-react/ui/message";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckCheck, Copy, RefreshCw, Sparkles } from "lucide-react";
import { expect, within } from "storybook/test";

import { portrait } from "../blocks/images";

const meta = {
  title: "Components/Message",
  component: Message,
  parameters: {
    docs: {
      description: {
        component: `
The layout of one turn in a conversation: a \`MessageAvatar\` beside a
\`MessageContent\` column of \`MessageHeader\` (name, time), \`Bubble\`s and
\`MessageFooter\` (delivery state, actions). \`align="end"\` mirrors it for
your own messages; \`MessageGroup\` stacks turns from one sender closer
together.

\`\`\`tsx
import {
  Message, MessageAvatar, MessageContent, MessageFooter, MessageHeader,
} from "@neomorphic-react/ui/message";

<Message>
  <MessageAvatar>
    <Avatar size="sm"><AvatarImage alt="" src={maya} /></Avatar>
  </MessageAvatar>
  <MessageContent>
    <MessageHeader>Maya Chen</MessageHeader>
    <Bubble variant="secondary"><BubbleContent>Morning!</BubbleContent></Bubble>
    <MessageFooter><time>09:12</time></MessageFooter>
  </MessageContent>
</Message>
\`\`\`

The avatar sits level with the last bubble, lifted above a footer. The avatar
image is decorative when the header names the sender.
`,
      },
    },
  },
  args: { align: "start" },
  argTypes: { align: { control: "inline-radio", options: ["start", "end"] } },
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[28rem] p-10">
      <Message {...args}>
        <MessageAvatar>
          <Avatar size="sm">
            <AvatarImage alt="" src={portrait(330)} />
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Maya Chen</MessageHeader>
          <Bubble align={args.align} variant="secondary">
            <BubbleContent>
              Morning! Did you get the tickets for Saturday?
            </BubbleContent>
          </Bubble>
          <MessageFooter>
            <time dateTime="09:12">09:12</time>
          </MessageFooter>
        </MessageContent>
      </Message>
    </div>
  ),
};

/** A short exchange: incoming groups on the start side, yours on the end. */
export const Conversation: Story = {
  render: () => (
    <div className="flex w-[28rem] flex-col gap-6 p-10">
      <MessageGroup>
        <Message>
          <MessageAvatar>
            <Avatar size="sm">
              <AvatarImage alt="" src={portrait(330)} />
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <MessageHeader>
              Maya Chen <time dateTime="09:12">09:12</time>
            </MessageHeader>
            <Bubble variant="secondary">
              <BubbleContent>Morning! Did you get the tickets?</BubbleContent>
            </Bubble>
            <Bubble variant="secondary">
              <BubbleContent>Saturday, 8pm.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
      </MessageGroup>
      <Message align="end">
        <MessageContent>
          <Bubble align="end">
            <BubbleContent>Yes, two seats in row F.</BubbleContent>
          </Bubble>
          <MessageFooter>
            <CheckCheck aria-hidden="true" className="size-3.5" />
            Read 09:14
          </MessageFooter>
        </MessageContent>
      </Message>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const mine = canvas.getByText("Read 09:14");
    await expect(mine).toHaveAttribute("data-slot", "message-footer");
    await expect(mine.closest("[data-slot=message]")).toHaveAttribute(
      "data-align",
      "end"
    );
    await expect(canvas.getByText("Maya Chen")).toHaveAttribute(
      "data-slot",
      "message-header"
    );
  },
};

/** An assistant reply as a `ghost` bubble, with actions in the footer. */
export const Assistant: Story = {
  render: () => (
    <div className="w-[32rem] p-10">
      <Message>
        <MessageAvatar>
          <span className="inset-shadow-neu-flat flex size-8 items-center justify-center rounded-full bg-neu-convex shadow-neu-sm">
            <Sparkles aria-hidden="true" className="size-4" />
          </span>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Assistant</MessageHeader>
          <Bubble variant="ghost">
            <BubbleContent>
              Start with the invite step. Teams are creating workspaces but
              waiting to add collaborators, so compare invite drop-off by
              account size before changing the onboarding flow.
            </BubbleContent>
          </Bubble>
          <MessageFooter className="gap-1">
            <Button
              aria-label="Copy"
              icon={<Copy />}
              shape="pill"
              size="sm"
              variant="ghost"
            />
            <Button
              aria-label="Regenerate"
              icon={<RefreshCw />}
              shape="pill"
              size="sm"
              variant="ghost"
            />
          </MessageFooter>
        </MessageContent>
      </Message>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "Copy" })).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Regenerate" })
    ).toBeVisible();
  },
};
