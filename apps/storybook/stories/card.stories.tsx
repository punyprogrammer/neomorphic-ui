import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { Toggle } from "@neomorphic-react/ui/toggle";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heart, MapPin, Star } from "lucide-react";
import { expect, within } from "storybook/test";

// Stand-in for a photo, so stories need no network.
const PHOTO =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc4e8"/><stop offset="0.6" stop-color="#f6d58e"/><stop offset="1" stop-color="#e59a6b"/></linearGradient></defs><rect width="320" height="180" fill="url(#g)"/><path d="M0 150 L70 95 L130 140 L210 70 L320 150 L320 180 L0 180Z" fill="#4f7a6a"/></svg>`
  );

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    docs: {
      description: {
        component: `
A panel grouping related content, raised out of the surface like the kit's
travel cards. \`inset\` makes it a well for secondary panels.

\`\`\`tsx
import {
  Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@neomorphic-react/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Bali</CardTitle>
    <CardDescription>7 nights · from $1,240</CardDescription>
    <CardAction>…</CardAction>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter>…</CardFooter>
</Card>
\`\`\`

An \`<img>\` as the first or last child runs to the card's edge. Every gap and
padding comes from \`--card-spacing\`; \`className="[--card-spacing:0px]"\`
removes them all.
`,
      },
    },
  },
  argTypes: {
    elevation: {
      control: "inline-radio",
      options: ["raised", "inset", "flat"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  args: {
    elevation: "raised",
    size: "md",
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="p-12">
      <Card {...args} className="w-80">
        <CardHeader>
          <CardTitle>Weekly summary</CardTitle>
          <CardDescription>12 – 18 October</CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          You logged 5 runs and 42 km, 8 km more than last week.
        </CardContent>
        <CardFooter>
          <Button size="sm">View details</Button>
        </CardFooter>
      </Card>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const card = canvasElement.querySelector('[data-slot="card"]') as Element;
    await expect(getComputedStyle(card).boxShadow).not.toBe("none");
    await expect(
      within(canvasElement).getByText("Weekly summary")
    ).toBeVisible();
  },
};

/** The kit's info card: a photo to the edge, title, place and a like toggle. */
export const KitReplica: Story = {
  render: () => (
    <div className="p-12">
      <Card className="w-80" render={<article />}>
        <img alt="Beach at sunset" className="h-44" src={PHOTO} />
        <CardHeader>
          <CardTitle>Uluwatu Beach</CardTitle>
          <CardDescription className="flex items-center gap-1">
            <MapPin aria-hidden="true" className="size-3.5" />
            Bali, Indonesia
          </CardDescription>
          <CardAction>
            <Toggle
              aria-label="Save"
              className="[--toggle-on:var(--color-destructive)]"
              iconFill
              size="sm"
            >
              <Heart />
            </Toggle>
          </CardAction>
        </CardHeader>
        <CardFooter className="justify-between">
          <span className="flex items-center gap-1 text-foreground">
            <Star aria-hidden="true" className="size-4 fill-current" />
            4.8
          </span>
          <span className="font-medium text-base text-foreground">$1,240</span>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const Elevations: Story = {
  render: () => (
    <div className="flex gap-10 p-12">
      {(["raised", "inset", "flat"] as const).map((elevation) => (
        <Card className="w-52" elevation={elevation} key={elevation}>
          <CardHeader>
            <CardTitle className="capitalize">{elevation}</CardTitle>
            <CardDescription>elevation="{elevation}"</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-start gap-10 p-12">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Card className="w-56" key={size} size={size}>
          <CardHeader>
            <CardTitle>Size {size}</CardTitle>
            <CardDescription>
              Padding and radius scale together.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="sm">Action</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};

/** A raised card holding an inset panel. */
export const Nested: Story = {
  render: () => (
    <div className="p-12">
      <Card className="w-80">
        <CardHeader>
          <CardTitle>Flight CCU → BLR</CardTitle>
          <CardDescription>Wed, 21 Oct</CardDescription>
        </CardHeader>
        <CardContent>
          <Card className="text-center" elevation="inset" size="sm">
            <CardContent className="grid gap-1">
              <span className="text-muted-foreground text-xs uppercase">
                Boarding
              </span>
              <span className="font-medium text-2xl tabular-nums">06:40</span>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  ),
};
