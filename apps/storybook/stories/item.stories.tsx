import { Badge } from "@neomorphic-react/ui/badge";
import { Button } from "@neomorphic-react/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@neomorphic-react/ui/item";
import { Surface } from "@neomorphic-react/ui/surface";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Bell,
  ChevronRight,
  CreditCard,
  Landmark,
  Lock,
  Plus,
  Wallet,
} from "lucide-react";
import { expect, within } from "storybook/test";

const meta = {
  title: "Components/Item",
  component: Item,
  parameters: {
    docs: {
      description: {
        component: `
A row of media, text and actions, like the kit's credit-card list. \`flat\`
sits level with the surface, \`raised\` stands out of it, \`inset\` is a well.

\`\`\`tsx
import {
  Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle,
} from "@neomorphic-react/ui/item";

<ItemGroup aria-label="Payment methods">
  <Item variant="raised">
    <ItemMedia variant="icon"><CreditCard /></ItemMedia>
    <ItemContent>
      <ItemTitle>Visa</ItemTitle>
      <ItemDescription>•••• 4821</ItemDescription>
    </ItemContent>
    <ItemActions>…</ItemActions>
  </Item>
</ItemGroup>
\`\`\`

Inside an \`ItemGroup\` (a list) each default item is a list item. With
\`render={<a href="…" />}\` the whole row is a link that presses in while held;
it keeps the link role, so wrap it in a \`role="listitem"\` element inside a
group.
`,
      },
    },
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["flat", "raised", "inset"] },
    size: { control: "inline-radio", options: ["sm", "md"] },
  },
  args: {
    variant: "raised",
    size: "md",
  },
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-96 p-10">
      <Item {...args}>
        <ItemMedia variant="icon">
          <Bell />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Notifications</ItemTitle>
          <ItemDescription>Trip reminders and price alerts</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm">Manage</Button>
        </ItemActions>
      </Item>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Notifications")).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Manage" })).toBeVisible();
  },
};

const CARDS = [
  {
    name: "Visa Platinum",
    number: "4821",
    balance: "$2,340.18",
    icon: CreditCard,
  },
  { name: "Mastercard", number: "9910", balance: "$812.02", icon: Wallet },
  {
    name: "HDFC Savings",
    number: "1173",
    balance: "$14,005.60",
    icon: Landmark,
  },
];

/** The kit's credit-card list: raised rows on a card. */
export const KitReplica: Story = {
  render: () => (
    <div className="p-12">
      <Surface className="grid w-[26rem] gap-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-foreground">Payment methods</h3>
          <Button
            aria-label="Add a card"
            icon={<Plus />}
            shape="pill"
            size="sm"
          />
        </div>
        <ItemGroup aria-label="Payment methods" className="gap-3">
          {CARDS.map(({ name, number, balance, icon: Icon }) => (
            <Item key={number} variant="raised">
              <ItemMedia variant="icon">
                <Icon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{name}</ItemTitle>
                <ItemDescription>•••• {number}</ItemDescription>
              </ItemContent>
              <ItemContent>
                <ItemTitle className="tabular-nums">{balance}</ItemTitle>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </Surface>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole("listitem")).toHaveLength(3);
  },
};

/** Whole rows as links; they lift on hover and press in while held. */
export const AsLinks: Story = {
  render: () => (
    <div className="w-96 p-10">
      <ItemGroup aria-label="Settings">
        {["Account", "Security", "Privacy"].map((label) => (
          <div key={label} role="listitem">
            <Item render={<a href={`#${label.toLowerCase()}`} />}>
              <ItemContent>
                <ItemTitle>{label}</ItemTitle>
              </ItemContent>
              <ChevronRight
                aria-hidden="true"
                className="size-4 text-muted-foreground"
              />
            </Item>
          </div>
        ))}
      </ItemGroup>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="grid w-96 gap-4 p-10">
      {(["flat", "raised", "inset"] as const).map((variant) => (
        <Item key={variant} variant={variant}>
          <ItemMedia variant="icon">
            <Lock />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="capitalize">{variant}</ItemTitle>
            <ItemDescription>variant="{variant}"</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  ),
};

/** Grooves between flat rows, with header and footer lines. */
export const WithSeparators: Story = {
  render: () => (
    <div className="w-96 p-10">
      <ItemGroup aria-label="Recent transactions" className="gap-0">
        <Item size="sm">
          <ItemHeader>
            <span>Today</span>
            <Badge size="sm" variant="success">
              Paid
            </Badge>
          </ItemHeader>
          <ItemContent>
            <ItemTitle>Airport taxi</ItemTitle>
          </ItemContent>
          <ItemContent>
            <ItemTitle className="tabular-nums">−$32.00</ItemTitle>
          </ItemContent>
        </Item>
        <ItemSeparator />
        <Item size="sm">
          <ItemContent>
            <ItemTitle>Hotel deposit</ItemTitle>
          </ItemContent>
          <ItemContent>
            <ItemTitle className="tabular-nums">−$120.00</ItemTitle>
          </ItemContent>
          <ItemFooter>Refunded on check-out</ItemFooter>
        </Item>
      </ItemGroup>
    </div>
  ),
};
