import {
  Select,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@neomorphic-ui/react/select";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Code, Megaphone, Palette, PenTool } from "lucide-react";
import { expect, userEvent, waitFor, within } from "storybook/test";

const TRANSPARENT = /rgba\(0, 0, 0, 0\)/g;
const COLOR = /(?:rgb|hsl|lab|lch|oklab|oklch|color)a?\(/;
const LAYER_SEPARATOR = /,(?![^(]*\))/;

/** True when an `inset` layer of the box-shadow has a visible colour. */
function isPressedIn(element: Element) {
  return getComputedStyle(element)
    .boxShadow.replace(TRANSPARENT, "")
    .split(LAYER_SEPARATOR)
    .some((layer) => layer.includes("inset") && COLOR.test(layer));
}

const CATEGORIES = [
  { label: "Design", value: "design", icon: Palette },
  { label: "Engineering", value: "engineering", icon: Code },
  { label: "Marketing", value: "marketing", icon: Megaphone },
  { label: "Writing", value: "writing", icon: PenTool },
];

function CategorySelect({
  label,
  labelClassName,
  size,
  ...props
}: Omit<React.ComponentProps<typeof Select<string>>, "children"> & {
  label: string;
  labelClassName?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <Select items={CATEGORIES} {...props}>
      <SelectLabel className={labelClassName}>{label}</SelectLabel>
      <SelectTrigger className="w-64" size={size}>
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        {CATEGORIES.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            <item.icon aria-hidden="true" className="text-muted-foreground" />
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const meta = {
  title: "Components/Select",
  component: SelectTrigger,
  parameters: {
    docs: {
      description: {
        component: `
The kit's "SELECT CATEGORY": a raised, uppercase trigger with a solid caret.
It presses into the surface while its list is open; the list is a raised card
whose highlighted item sinks in, and the chosen one carries a check.

\`\`\`tsx
import {
  Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue,
} from "@neomorphic-ui/react/select";

const items = [
  { label: "Design", value: "design" },
  { label: "Engineering", value: "engineering" },
];

<Select items={items} name="category">
  <SelectLabel>Category</SelectLabel>
  <SelectTrigger className="w-64">
    <SelectValue placeholder="Select category" />
  </SelectTrigger>
  <SelectContent>
    {items.map((item) => (
      <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
    ))}
  </SelectContent>
</Select>
\`\`\`

Pass \`items\` to \`Select\` so the trigger shows labels, not raw values. Name it
with \`SelectLabel\` (or \`aria-label\` on the trigger). Keyboard: Space/Enter or
the arrow keys open it, arrows move, typing jumps to a match, Escape closes.
`,
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  args: { size: "md" },
} satisfies Meta<typeof SelectTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="grid w-fit gap-2 p-10">
      <CategorySelect label="Category" size={args.size} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox", { name: "Category" });
    await expect(isPressedIn(trigger)).toBe(false);
    await userEvent.click(trigger);
    // The list portals to <body>, outside the story canvas.
    const page = within(canvasElement.ownerDocument.body);
    const option = await page.findByRole("option", { name: "Engineering" });
    await waitFor(() => expect(isPressedIn(trigger)).toBe(true));
    await userEvent.click(option);
    await waitFor(() => expect(trigger).toHaveTextContent("Engineering"));
    await waitFor(() => expect(isPressedIn(trigger)).toBe(false));
  },
};

/** The kit's "SELECT CATEGORY". */
export const KitReplica: Story = {
  render: () => (
    <div className="p-12">
      <Select items={CATEGORIES}>
        <SelectTrigger aria-label="Category" className="w-72">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {CATEGORIES.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
};

/** Arrow keys open and move; Enter chooses. */
export const Keyboard: Story = {
  render: () => (
    <div className="grid w-fit gap-2 p-10">
      <CategorySelect defaultValue="design" label="Category" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox", { name: "Category" });
    trigger.focus();
    await userEvent.keyboard("{ArrowDown}");
    const page = within(canvasElement.ownerDocument.body);
    await page.findByRole("listbox");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{Enter}");
    await waitFor(() => expect(trigger).toHaveTextContent("Engineering"));
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="grid w-fit gap-6 p-10">
      {(["sm", "md", "lg"] as const).map((size) => (
        <CategorySelect
          key={size}
          label={`Category, ${size}`}
          labelClassName="sr-only"
          size={size}
        />
      ))}
    </div>
  ),
};

const TIMEZONES = {
  Americas: [
    ["America/New_York", "New York (UTC−5)"],
    ["America/Chicago", "Chicago (UTC−6)"],
    ["America/Denver", "Denver (UTC−7)"],
    ["America/Los_Angeles", "Los Angeles (UTC−8)"],
    ["America/Sao_Paulo", "São Paulo (UTC−3)"],
  ],
  Europe: [
    ["Europe/London", "London (UTC+0)"],
    ["Europe/Paris", "Paris (UTC+1)"],
    ["Europe/Athens", "Athens (UTC+2)"],
  ],
  Asia: [
    ["Asia/Dubai", "Dubai (UTC+4)"],
    ["Asia/Kolkata", "Kolkata (UTC+5:30)"],
    ["Asia/Singapore", "Singapore (UTC+8)"],
    ["Asia/Tokyo", "Tokyo (UTC+9)"],
  ],
} as const;

const TIMEZONE_ITEMS = Object.fromEntries(
  Object.values(TIMEZONES).flatMap((zones) => zones.map(([v, l]) => [v, l]))
);

/** Groups with labels and grooved separators; long lists scroll. */
export const Groups: Story = {
  render: () => (
    <div className="grid w-fit gap-2 p-10">
      <Select defaultValue="Asia/Kolkata" items={TIMEZONE_ITEMS}>
        <SelectLabel>Time zone</SelectLabel>
        <SelectTrigger className="w-72">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-72">
          {Object.entries(TIMEZONES).map(([region, zones], index) => (
            <div key={region}>
              {index > 0 && <SelectSeparator />}
              <SelectGroup>
                <SelectGroupLabel>{region}</SelectGroupLabel>
                {zones.map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </div>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("combobox", { name: "Time zone" }));
    const page = within(canvasElement.ownerDocument.body);
    const listbox = await page.findByRole("listbox");
    const option = page.getByRole("option", { name: "Kolkata (UTC+5:30)" });
    const popup = listbox.closest("[data-slot=select-content]") as HTMLElement;
    // The list scrolls inside the capped popup; the popup itself never does,
    // or the scroll arrows would drift off its edges.
    await waitFor(() => expect(listbox.scrollTop).toBeGreaterThan(0));
    await expect(popup.scrollTop).toBe(0);
    const box = listbox.getBoundingClientRect();
    const chosen = option.getBoundingClientRect();
    await expect(chosen.top).toBeGreaterThanOrEqual(box.top);
    await expect(chosen.bottom).toBeLessThanOrEqual(box.bottom);
  },
};

/** A disabled option, a disabled select, and an invalid one with its error. */
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-10 p-10">
      <Select items={CATEGORIES}>
        <div className="grid gap-2">
          <SelectLabel>Unavailable option</SelectLabel>
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
        </div>
        <SelectContent>
          {CATEGORIES.map(({ label, value }) => (
            <SelectItem
              disabled={value === "marketing"}
              key={value}
              value={value}
            >
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select disabled items={CATEGORIES}>
        <div className="grid gap-2">
          <SelectLabel className="text-foreground/50">Disabled</SelectLabel>
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
        </div>
      </Select>
      <Select items={CATEGORIES}>
        <div className="grid gap-2">
          <SelectLabel>Invalid</SelectLabel>
          <SelectTrigger
            aria-describedby="category-error"
            aria-invalid
            className="w-56"
          >
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <p className="text-destructive text-xs" id="category-error">
            Choose a category.
          </p>
        </div>
        <SelectContent>
          {CATEGORIES.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
};
