import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@neomorphic-react/ui/bubble";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

const VARIANTS = [
  ["default", "Outgoing, in primary."],
  ["secondary", "Incoming, raised from the surface."],
  ["muted", "Pressed into the surface, for quieter asides."],
  ["tinted", "A wash of primary, raised."],
  ["outline", "A groove around the text."],
  ["ghost", "Bare text, for long assistant replies that read like a document."],
  ["destructive", "Couldn't send. Tap to retry."],
] as const;

const SUGGESTIONS = ["Sounds good", "Can we do 7?", "I'll call you"];

const meta = {
  title: "Components/Bubble",
  component: Bubble,
  parameters: {
    docs: {
      description: {
        component: `
A chat bubble. \`Bubble\` sets the variant and which side it hangs from;
\`BubbleContent\` is the surface; \`BubbleReactions\` pins a raised pill of
reactions to its edge. Put bubbles in a \`Message\` for an avatar, name and
time.

\`\`\`tsx
import {
  Bubble, BubbleContent, BubbleGroup, BubbleReactions,
} from "@neomorphic-react/ui/bubble";

<Bubble align="end">
  <BubbleContent>Yes, two seats in row F.</BubbleContent>
</Bubble>
<Bubble variant="secondary">
  <BubbleContent>Perfect. Dinner before the show?</BubbleContent>
  <BubbleReactions aria-label="Liked by you" role="img">👍</BubbleReactions>
</Bubble>
\`\`\`

\`default\` is primary, \`secondary\` raised, \`muted\` and \`destructive\`
pressed in, \`outline\` a groove. The corner on the aligned side is tucked in,
pointing at the sender. A bubble is at most 80% of the row wide (\`ghost\`
takes it all). Render the content as a \`<button>\` for a suggested reply.
Emoji reactions need \`role="img"\` and a label that says who reacted.
`,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: VARIANTS.map(([variant]) => variant),
    },
    align: { control: "inline-radio", options: ["start", "end"] },
  },
  args: {
    variant: "secondary",
    align: "start",
  },
} satisfies Meta<typeof Bubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex w-96 flex-col p-10">
      <Bubble {...args}>
        <BubbleContent>
          Morning! Did you get the tickets for Saturday?
        </BubbleContent>
      </Bubble>
    </div>
  ),
};

/** Every variant, alternating sides. */
export const Variants: Story = {
  render: () => (
    <div className="flex w-[28rem] flex-col gap-4 p-10">
      {VARIANTS.map(([variant, text], index) => (
        <Bubble
          align={index % 2 === 0 ? "end" : "start"}
          key={variant}
          variant={variant}
        >
          <BubbleContent>{text}</BubbleContent>
        </Bubble>
      ))}
    </div>
  ),
};

/** Reactions sit on the bubble's edge; the bubble makes room for them. */
export const Reactions: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-4 p-10">
      <Bubble variant="secondary">
        <BubbleContent>The venue moved the start to 7:30.</BubbleContent>
        <BubbleReactions aria-label="Liked by you and Maya" role="img">
          👍 2
        </BubbleReactions>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>Even better, more time for dinner.</BubbleContent>
        <BubbleReactions
          align="start"
          aria-label="Maya laughed"
          role="img"
          side="top"
        >
          😂
        </BubbleReactions>
      </Bubble>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const liked = canvas.getByRole("img", { name: "Liked by you and Maya" });
    await expect(liked).toHaveAttribute("data-side", "bottom");
    await expect(
      canvas.getByRole("img", { name: "Maya laughed" })
    ).toHaveAttribute("data-side", "top");
  },
};

/** Consecutive bubbles from one sender, and suggested replies as buttons. */
export const GroupAndSuggestions: Story = {
  args: { onClick: fn() },
  render: ({ onClick }) => (
    <div className="flex w-96 flex-col gap-6 p-10">
      <BubbleGroup>
        <Bubble variant="secondary">
          <BubbleContent>Dinner before the show?</BubbleContent>
        </Bubble>
        <Bubble variant="secondary">
          <BubbleContent>The usual place at 6:30?</BubbleContent>
        </Bubble>
      </BubbleGroup>
      <BubbleGroup
        aria-label="Suggested replies"
        className="items-end"
        role="group"
      >
        {SUGGESTIONS.map((suggestion) => (
          <Bubble align="end" key={suggestion} variant="outline">
            <BubbleContent onClick={onClick} render={<button type="button" />}>
              {suggestion}
            </BubbleContent>
          </Bubble>
        ))}
      </BubbleGroup>
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const replies = canvas.getByRole("group", { name: "Suggested replies" });
    const buttons = within(replies).getAllByRole("button");
    await expect(buttons).toHaveLength(3);
    await userEvent.click(
      within(replies).getByRole("button", { name: "Can we do 7?" })
    );
    await expect(args.onClick).toHaveBeenCalledOnce();
    await userEvent.tab();
    await expect(
      within(replies).getByRole("button", { name: "I'll call you" })
    ).toHaveFocus();
  },
};
