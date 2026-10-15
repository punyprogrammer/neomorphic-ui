import { Badge, BadgeAnchor } from "@neomorphic-ui/react/badge";
import { Button } from "@neomorphic-ui/react/button";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Bell,
  Inbox,
  Mail,
  MessageCircle,
  Minus,
  Plus,
  ShoppingCart,
  User,
} from "lucide-react";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: `
A small raised marker for a count, a dot, or a short label like "New". On its
own it sits inline; give it a \`placement\` inside a \`BadgeAnchor\` and it pins
to that corner, as on the kit's bell and cart tiles. For icon + label pills
("Paid", "Due soon"), use \`Chip\` instead.

\`\`\`tsx
import { Badge, BadgeAnchor } from "@neomorphic-ui/react/badge";

<Badge count={12} variant="primary" />

<BadgeAnchor>
  <Button aria-label="Notifications, 3 unread" icon={<Bell />} size="lg" />
  <Badge count={3} placement="top-end" />
</BadgeAnchor>
\`\`\`

A placed badge is \`aria-hidden\`: the count belongs in the anchored control's
accessible name, where a screen reader announces it with the control.
`,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "inset",
        "primary",
        "destructive",
        "success",
        "warning",
      ],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    count: { control: { type: "number", min: 0 } },
    max: { control: { type: "number", min: 1 } },
    dot: { control: "boolean" },
    showZero: { control: "boolean" },
  },
  args: {
    count: 3,
    max: 99,
    variant: "default",
    size: "md",
    dot: false,
    showZero: false,
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="p-10">
      <Badge {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const badge = canvasElement.querySelector('[data-slot="badge"]');
    await expect(badge).toHaveTextContent("3");
    await expect(getComputedStyle(badge as Element).boxShadow).not.toBe("none");
  },
};

/** The kit's bell "3" and cart "17" tiles. */
export const KitReplica: Story = {
  render: () => (
    <div className="flex items-center gap-10 p-12">
      <BadgeAnchor>
        <Button aria-label="Profile" icon={<User />} size="lg" />
      </BadgeAnchor>
      <BadgeAnchor>
        <Button
          aria-label="Notifications, 3 unread"
          icon={<Bell />}
          size="lg"
        />
        <Badge count={3} placement="top-start" />
      </BadgeAnchor>
      <BadgeAnchor>
        <Button aria-label="Cart, 17 items" icon={<ShoppingCart />} size="lg" />
        <Badge count={17} placement="top-end" />
      </BadgeAnchor>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6 p-10">
      <Badge>Default</Badge>
      <Badge variant="inset">Inset</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-10">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div className="flex items-center gap-6" key={size}>
          <Badge count={7} size={size} />
          <Badge count={128} size={size} variant="primary" />
          <Badge size={size} variant="inset">
            {size}
          </Badge>
          <Badge dot size={size} variant="destructive" />
        </div>
      ))}
    </div>
  ),
};

/** Over `max` reads `max+`; zero hides the badge unless `showZero`. */
export const Counts: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6 p-10">
      <span className="text-muted-foreground text-xs">count=0 →</span>
      <Badge count={0} data-testid="hidden-zero" />
      <Badge count={0} showZero />
      <Badge count={5} />
      <Badge count={99} />
      <Badge count={120} />
      <Badge count={12} max={9} variant="primary" />
      <Badge count={1500} max={999} variant="inset" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const texts = [
      ...canvasElement.querySelectorAll('[data-slot="badge"]'),
    ].map((b) => b.textContent);
    await expect(texts).toEqual(["0", "5", "99", "99+", "9+", "999+"]);
  },
};

/**
 * Corners follow the writing direction. On a round anchor, `overlap="circular"`
 * moves the badge onto the edge instead of the empty bounding-box corner.
 */
export const Placements: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-14 p-12">
      {(["top-start", "top-end", "bottom-start", "bottom-end"] as const).map(
        (placement) => (
          <BadgeAnchor key={placement}>
            <Button aria-label={placement} icon={<Inbox />} size="lg" />
            <Badge count={4} placement={placement} variant="primary" />
          </BadgeAnchor>
        )
      )}
      <BadgeAnchor>
        <Button
          aria-label="Messages, rectangular overlap"
          icon={<MessageCircle />}
          shape="pill"
          size="lg"
        />
        <Badge count={2} placement="top-end" variant="destructive" />
      </BadgeAnchor>
      <BadgeAnchor>
        <Button
          aria-label="Messages, circular overlap"
          icon={<MessageCircle />}
          shape="pill"
          size="lg"
        />
        <Badge
          count={2}
          overlap="circular"
          placement="top-end"
          variant="destructive"
        />
      </BadgeAnchor>
      <BadgeAnchor>
        <Button
          aria-label="Profile, online"
          icon={<User />}
          shape="pill"
          size="lg"
        />
        <Badge
          dot
          overlap="circular"
          placement="bottom-end"
          variant="success"
        />
      </BadgeAnchor>
    </div>
  ),
};

/** Inline inside a button label. */
export const InButton: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-8 p-10">
      <Button icon={<Inbox />}>
        Inbox
        <Badge count={12} variant="inset" />
      </Button>
      <Button icon={<Mail />} variant="primary">
        Unread
        <Badge count={3} />
      </Button>
    </div>
  ),
};

function LiveCounter() {
  const [count, setCount] = useState(3);
  return (
    <div className="flex items-center gap-8">
      <BadgeAnchor>
        <Button
          aria-label={`Notifications, ${count} unread`}
          icon={<Bell />}
          size="lg"
        />
        <Badge count={count} placement="top-end" variant="destructive" />
      </BadgeAnchor>
      <Button
        aria-label="Add notification"
        icon={<Plus />}
        onClick={() => setCount((c) => c + 1)}
        shape="pill"
        size="sm"
      />
      <Button
        aria-label="Remove notification"
        icon={<Minus />}
        onClick={() => setCount((c) => Math.max(0, c - 1))}
        shape="pill"
        size="sm"
      />
      <Button onClick={() => setCount(0)} size="sm" variant="ghost">
        Clear
      </Button>
    </div>
  );
}

/** The count lives in the button's name; the badge hides at zero. */
export const Live: Story = {
  render: () => (
    <div className="p-12">
      <LiveCounter />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: "Add notification" })
    );
    await expect(
      canvas.getByRole("button", { name: "Notifications, 4 unread" })
    ).toBeInTheDocument();
    await expect(
      canvasElement.querySelector('[data-slot="badge"]')
    ).toHaveTextContent("4");
    await userEvent.click(canvas.getByRole("button", { name: "Clear" }));
    await expect(
      canvasElement.querySelector('[data-slot="badge"]')
    ).not.toBeInTheDocument();
  },
};
