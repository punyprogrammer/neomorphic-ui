import { Button } from "@neomorphic-react/ui/button";
import { Chip } from "@neomorphic-react/ui/chip";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@neomorphic-react/ui/item";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ArrowUpRight,
  Check,
  CircleAlert,
  Clock,
  FilePen,
  Send,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";

const meta = {
  title: "Components/Chip",
  component: Chip,
  parameters: {
    docs: {
      description: {
        component: `
A status pill: an optional icon and a short label such as "Paid" or "Due
soon". \`Badge\` is for counts and dots; \`Chip\` is larger, sentence-case and
carries an icon, placed with \`iconPosition\` like \`Button\`'s.

\`\`\`tsx
import { Chip } from "@neomorphic-react/ui/chip";

<Chip icon={<Check />} variant="success">Paid</Chip>
<Chip icon={<Clock />} variant="warning">Due soon</Chip>
\`\`\`

\`default\` is raised from the surface and \`inset\` pressed into it; the token
fills pair each colour with its \`-foreground\`. The icon is decorative, so the
label must say the status on its own. A chip isn't interactive: for a status
that changes while the user watches, render it inside a \`role="status"\`
region.
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
    iconPosition: { control: "inline-radio", options: ["start", "end"] },
  },
  args: {
    variant: "success",
    size: "md",
    iconPosition: "start",
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="p-10">
      <Chip {...args} icon={<Check />}>
        Paid
      </Chip>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const chip = within(canvasElement).getByText("Paid");
    await expect(chip).toHaveAttribute("data-slot", "chip");
    await expect(getComputedStyle(chip).boxShadow).not.toBe("none");
    const icon = chip.querySelector('[data-slot="chip-icon"]');
    await expect(icon).toHaveAttribute("aria-hidden", "true");
  },
};

const VARIANTS = [
  ["default", Sparkles, "New"],
  ["inset", FilePen, "Draft"],
  ["primary", Send, "Sent"],
  ["success", Check, "Paid"],
  ["warning", Clock, "Due soon"],
  ["destructive", CircleAlert, "Overdue"],
] as const;

/** Raised and inset on the surface, then the token fills. */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4 p-10">
      {VARIANTS.map(([variant, Icon, label]) => (
        <Chip icon={<Icon />} key={variant} variant={variant}>
          {label}
        </Chip>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-10">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Chip icon={<Clock />} key={size} size={size} variant="warning">
          Due soon
        </Chip>
      ))}
    </div>
  ),
};

/** `start` and `end` follow the writing direction. */
export const IconPositions: Story = {
  render: () => (
    <div className="grid w-fit gap-4 p-10">
      <div className="flex items-center gap-4">
        <Chip icon={<Check />} variant="success">
          Paid
        </Chip>
        <Chip icon={<ArrowUpRight />} iconPosition="end">
          12% this week
        </Chip>
        <Chip>No icon</Chip>
      </div>
      <div className="flex items-center gap-4" dir="rtl">
        <Chip icon={<Check />} variant="success">
          مدفوع
        </Chip>
        <Chip
          icon={<ArrowUpRight className="rtl:-scale-x-100" />}
          iconPosition="end"
        >
          12% هذا الأسبوع
        </Chip>
      </div>
    </div>
  ),
};

const INVOICES = [
  { id: "1042", client: "Lumen Studio", amount: "$2,400", status: "overdue" },
  { id: "1043", client: "Northwind", amount: "$860", status: "due" },
  { id: "1044", client: "Acme Travel", amount: "$1,120", status: "paid" },
  { id: "1045", client: "Kite & Co", amount: "$540", status: "draft" },
] as const;

const STATUS = {
  overdue: { label: "Overdue", variant: "destructive", Icon: CircleAlert },
  due: { label: "Due soon", variant: "warning", Icon: Clock },
  paid: { label: "Paid", variant: "success", Icon: Check },
  draft: { label: "Draft", variant: "inset", Icon: FilePen },
} as const;

/** Statuses in a list of raised rows. */
export const InvoiceList: Story = {
  render: () => (
    <div className="w-[26rem] p-10">
      <ItemGroup aria-label="Invoices">
        {INVOICES.map((invoice) => {
          const { label, variant, Icon } = STATUS[invoice.status];
          return (
            <Item key={invoice.id} variant="raised">
              <ItemContent>
                <ItemTitle>Invoice #{invoice.id}</ItemTitle>
                <ItemDescription>
                  {invoice.client} · {invoice.amount}
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Chip icon={<Icon />} size="sm" variant={variant}>
                  {label}
                </Chip>
              </ItemActions>
            </Item>
          );
        })}
      </ItemGroup>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rows = canvas.getAllByRole("listitem");
    await expect(rows).toHaveLength(4);
    await expect(rows[0]).toHaveTextContent("Invoice #1042");
    await expect(rows[0]).toHaveTextContent("Overdue");
  },
};

function SendInvoice() {
  const [sent, setSent] = useState(false);
  return (
    <div className="flex items-center gap-6 p-10">
      <p className="flex items-center gap-2 text-foreground text-sm">
        Invoice #1045
        <span role="status">
          {sent ? (
            <Chip icon={<Send />} size="sm" variant="primary">
              Sent
            </Chip>
          ) : (
            <Chip icon={<FilePen />} size="sm" variant="inset">
              Draft
            </Chip>
          )}
        </span>
      </p>
      <Button disabled={sent} onClick={() => setSent(true)} size="sm">
        Send
      </Button>
    </div>
  );
}

/** A status that changes in place is announced through `role="status"`. */
export const LiveStatus: Story = {
  render: () => <SendInvoice />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const status = canvas.getByRole("status");
    await expect(status).toHaveTextContent("Draft");
    await userEvent.click(canvas.getByRole("button", { name: "Send" }));
    await expect(status).toHaveTextContent("Sent");
  },
};
