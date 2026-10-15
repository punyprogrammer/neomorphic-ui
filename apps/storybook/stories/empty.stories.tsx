import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
} from "@neomorphic-ui/react/avatar";
import { Button } from "@neomorphic-ui/react/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@neomorphic-ui/react/empty";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plane, Plus } from "lucide-react";
import { expect, within } from "storybook/test";

const meta = {
  title: "Components/Empty",
  component: Empty,
  parameters: {
    docs: {
      description: {
        component: `
What to show when there's nothing to show: a raised icon tile (or an avatar or
illustration), a title, a description and the next step.

\`\`\`tsx
import {
  Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle,
} from "@neomorphic-ui/react/empty";

<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon"><Plane /></EmptyMedia>
    <EmptyTitle>No trips yet</EmptyTitle>
    <EmptyDescription>Trips you book show up here.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent><Button variant="primary">Book a trip</Button></EmptyContent>
</Empty>
\`\`\`

\`variant="inset"\` sets it in a shallow well, for an empty region inside a page.
`,
      },
    },
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["flat", "inset"] },
  },
  args: {
    variant: "flat",
  },
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="max-w-xl p-10">
      <Empty {...args}>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Plane />
          </EmptyMedia>
          <EmptyTitle>No trips yet</EmptyTitle>
          <EmptyDescription>
            Trips you book show up here, with tickets and live updates.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button icon={<Plus />} variant="primary">
            Book a trip
          </Button>
          <a className="text-muted-foreground text-sm underline" href="#import">
            Import a booking
          </a>
        </EmptyContent>
      </Empty>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("No trips yet")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Book a trip" })
    ).toBeEnabled();
  },
};

export const InAWell: Story = {
  render: () => (
    <div className="max-w-xl p-10">
      <Empty variant="inset">
        <EmptyHeader>
          <EmptyMedia>
            <AvatarGroup>
              <Avatar>
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>MR</AvatarFallback>
              </Avatar>
            </AvatarGroup>
          </EmptyMedia>
          <EmptyTitle>No travel companions</EmptyTitle>
          <EmptyDescription>
            Invite people to share this trip's plans and tickets.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button size="sm">Invite</Button>
        </EmptyContent>
      </Empty>
    </div>
  ),
};
