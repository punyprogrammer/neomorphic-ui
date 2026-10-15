import { Avatar, AvatarFallback } from "@neomorphic-react/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@neomorphic-react/ui/hover-card";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

const GUIDES_RE = /Guides walking tours/;

const meta = {
  title: "Components/HoverCard",
  component: HoverCard,
  parameters: {
    docs: {
      description: {
        component: `
A preview of a link's destination, shown when the pointer rests on the link
or it takes keyboard focus. The card is a raised popup like \`Popover\`.

\`\`\`tsx
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@neomorphic-react/ui/hover-card";

<HoverCard>
  <HoverCardTrigger href="/hosts/ines">Inês</HoverCardTrigger>
  <HoverCardContent>…</HoverCardContent>
</HoverCard>
\`\`\`

\`delay\` (600ms) and \`closeDelay\` (300ms) go on the trigger. Keep the card
supplementary: touch and screen-reader users may never see it, so the link
must make sense on its own.
`,
      },
    },
  },
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex min-h-72 items-start justify-center p-10 text-sm">
      <p>
        Hosted by{" "}
        <HoverCard {...args}>
          <HoverCardTrigger delay={200} href="#ines">
            Inês Almeida
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex gap-4">
              <Avatar>
                <AvatarFallback>IA</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">Inês Almeida</p>
                <p className="text-muted-foreground">
                  Guides walking tours of Alfama. Hosting since 2019.
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </p>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole("link", {
      name: "Inês Almeida",
    });
    await userEvent.hover(link);
    const bio = await screen.findByText(GUIDES_RE);
    await waitFor(() => expect(bio).toBeVisible(), { timeout: 4000 });
    await userEvent.unhover(link);
  },
};
