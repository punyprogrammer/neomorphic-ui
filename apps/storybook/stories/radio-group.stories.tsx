import { RadioGroup, RadioGroupItem } from "@neomorphic-ui/react/radio-group";
import { Surface } from "@neomorphic-ui/react/surface";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

const TRANSPARENT = /rgba\(0, 0, 0, 0\)/g;
const COLOR = /(?:rgb|hsl|lab|lch|oklab|oklch|color)a?\(/;
const LAYER_SEPARATOR = /,(?![^(]*\))/;

/** True when an outer (non-inset) box-shadow layer has a visible colour. */
function isRaised(element: Element) {
  return getComputedStyle(element)
    .boxShadow.replace(TRANSPARENT, "")
    .split(LAYER_SEPARATOR)
    .some((layer) => !layer.includes("inset") && COLOR.test(layer));
}

// The control fades itself when disabled; the label only dims its text.
const LABEL =
  "flex cursor-pointer items-center gap-3 text-sm has-data-disabled:cursor-not-allowed has-data-disabled:text-foreground/50";
const PLANS = ["Free", "Pro", "Team"];

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component: `
The kit's radio: an empty choice is a round well, the chosen one rises with a
dark dot. Arrow keys move the choice; Tab leaves the group.

\`\`\`tsx
import { RadioGroup, RadioGroupItem } from "@neomorphic-ui/react/radio-group";

<RadioGroup aria-label="Plan" defaultValue="pro" name="plan">
  <label className="flex items-center gap-3">
    <RadioGroupItem value="free" /> Free
  </label>
  <label className="flex items-center gap-3">
    <RadioGroupItem value="pro" /> Pro
  </label>
</RadioGroup>
\`\`\`

Name the group (\`aria-label\` or \`aria-labelledby\`) and wrap each item with its
text in a \`<label>\`. It stacks by default; \`className="flex gap-6"\` makes a row.
`,
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
  args: {
    size: "md",
    disabled: false,
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="p-10">
      <RadioGroup {...args} aria-label="Plan" defaultValue="Pro">
        {PLANS.map((plan) => (
          <label className={LABEL} key={plan}>
            <RadioGroupItem value={plan} />
            {plan}
          </label>
        ))}
      </RadioGroup>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const raised = () => canvas.getAllByRole("radio").map(isRaised);
    await expect(raised()).toEqual([false, true, false]);
    await userEvent.click(canvas.getByText("Team"));
    await expect(canvas.getByRole("radio", { name: "Team" })).toBeChecked();
    await waitFor(() => expect(raised()).toEqual([false, false, true]));
  },
};

/** The kit's pair: chosen (raised) and empty (well). */
export const KitReplica: Story = {
  render: () => (
    <div className="p-12">
      <RadioGroup aria-label="Kit" className="flex gap-8" defaultValue="on">
        <RadioGroupItem aria-label="Chosen" value="on" />
        <RadioGroupItem aria-label="Empty" value="off" />
      </RadioGroup>
    </div>
  ),
};

/** Arrow keys move the choice, wrapping at the ends. */
export const Keyboard: Story = {
  render: () => (
    <div className="p-10">
      <RadioGroup aria-label="Plan" defaultValue="Free">
        {PLANS.map((plan) => (
          <label className={LABEL} key={plan}>
            <RadioGroupItem value={plan} />
            {plan}
          </label>
        ))}
      </RadioGroup>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(canvas.getByRole("radio", { name: "Free" })).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    const pro = canvas.getByRole("radio", { name: "Pro" });
    await expect(pro).toHaveFocus();
    await expect(pro).toBeChecked();
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-12 p-10">
      {(["sm", "md", "lg"] as const).map((size) => (
        <RadioGroup
          aria-label={`Plan, ${size}`}
          defaultValue="Pro"
          key={size}
          size={size}
        >
          {PLANS.map((plan) => (
            <label className={LABEL} key={plan}>
              <RadioGroupItem value={plan} />
              {plan}
            </label>
          ))}
        </RadioGroup>
      ))}
    </div>
  ),
};

/** A row, with one option disabled. */
export const Horizontal: Story = {
  render: () => (
    <div className="grid gap-3 p-10">
      <span className="font-medium text-sm" id="delivery-label">
        Delivery
      </span>
      <RadioGroup
        aria-labelledby="delivery-label"
        className="flex gap-8"
        defaultValue="standard"
      >
        <label className={LABEL}>
          <RadioGroupItem value="standard" />
          Standard
        </label>
        <label className={LABEL}>
          <RadioGroupItem value="express" />
          Express
        </label>
        <label className={LABEL}>
          <RadioGroupItem disabled value="drone" />
          Drone (unavailable)
        </label>
      </RadioGroup>
    </div>
  ),
};

const SHIPPING = [
  { value: "standard", title: "Standard", detail: "4–6 days · Free" },
  { value: "express", title: "Express", detail: "1–2 days · $9" },
];

/** Each choice in a raised card; the whole card is the label. */
export const Cards: Story = {
  render: () => (
    <div className="p-10">
      <RadioGroup
        aria-label="Shipping"
        className="flex gap-6"
        defaultValue="express"
      >
        {SHIPPING.map(({ value, title, detail }) => (
          <Surface
            className="flex w-56 cursor-pointer items-start gap-4 p-5"
            key={value}
            render={<label />}
          >
            <RadioGroupItem value={value} />
            <span className="grid gap-1">
              <span className="font-medium text-sm">{title}</span>
              <span className="text-muted-foreground text-xs">{detail}</span>
            </span>
          </Surface>
        ))}
      </RadioGroup>
    </div>
  ),
};
