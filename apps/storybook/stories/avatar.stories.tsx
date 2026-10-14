import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@neomorphic-ui/react/avatar";
import { Surface } from "@neomorphic-ui/react/surface";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Hotel, User } from "lucide-react";
import { expect, within } from "storybook/test";

// Stand-ins for photos, so stories need no network.
const portrait = (hue: number) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" fill="hsl(${hue} 45% 72%)"/><circle cx="40" cy="31" r="15" fill="hsl(${hue} 30% 40%)"/><path d="M12 80c4-18 16-26 28-26s24 8 28 26z" fill="hsl(${hue} 30% 40%)"/></svg>`
  );

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: `
A person or place in a raised frame, like the kit's info box thumbnail. The
fallback (initials or an icon) shows until the image loads, or if it fails.

\`\`\`tsx
import { Avatar, AvatarFallback, AvatarImage } from "@neomorphic-ui/react/avatar";

<Avatar>
  <AvatarImage alt="Ada Lovelace" src="/ada.jpg" />
  <AvatarFallback>AL</AvatarFallback>
</Avatar>
\`\`\`

\`AvatarBadge\` adds a status dot (decorative: say the status in text too).
\`AvatarGroup\` overlaps avatars, with \`AvatarGroupCount\` for the rest.
`,
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg", "xl"] },
    shape: { control: "inline-radio", options: ["circle", "rounded"] },
  },
  args: {
    size: "lg",
    shape: "circle",
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex gap-6 p-10">
      <Avatar {...args}>
        <AvatarImage alt="Ada Lovelace" src={portrait(210)} />
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
      <Avatar {...args}>
        <AvatarFallback>GH</AvatarFallback>
      </Avatar>
      <Avatar {...args}>
        <AvatarFallback>
          <User />
        </AvatarFallback>
      </Avatar>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      await canvas.findByRole("img", { name: "Ada Lovelace" })
    ).toBeVisible();
    await expect(canvas.getByText("GH")).toBeVisible();
  },
};

/** The kit's info box: a rounded thumbnail beside a title. */
export const KitReplica: Story = {
  render: () => (
    <div className="p-12">
      <Surface className="flex w-80 items-center gap-4 p-4">
        <Avatar shape="rounded" size="lg">
          <AvatarFallback>
            <Hotel />
          </AvatarFallback>
        </Avatar>
        <div className="grid gap-0.5">
          <p className="font-medium text-foreground text-sm">Hotel Mulia</p>
          <p className="text-muted-foreground text-xs">Nusa Dua · 3 nights</p>
        </div>
      </Surface>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6 p-10">
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <Avatar key={size} size={size}>
          <AvatarImage alt="" src={portrait(30)} />
          <AvatarFallback>{size}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

/** A status dot, with the status also in the visible name. */
export const WithBadge: Story = {
  render: () => (
    <div className="flex items-center gap-8 p-10">
      <div className="flex items-center gap-3">
        <Avatar size="lg">
          <AvatarImage alt="" src={portrait(140)} />
          <AvatarFallback>GH</AvatarFallback>
          <AvatarBadge />
        </Avatar>
        <span className="text-foreground text-sm">Grace · online</span>
      </div>
      <div className="flex items-center gap-3">
        <Avatar shape="rounded" size="lg">
          <AvatarFallback>KJ</AvatarFallback>
          <AvatarBadge className="bg-warning" />
        </Avatar>
        <span className="text-foreground text-sm">Katherine · away</span>
      </div>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div className="p-10">
      <AvatarGroup aria-label="6 travellers">
        {[210, 30, 140].map((hue) => (
          <Avatar key={hue}>
            <AvatarImage alt="" src={portrait(hue)} />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
        ))}
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
    </div>
  ),
};
