import { Checkbox } from "@neomorphic-ui/react/checkbox";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";

const TRANSPARENT = /rgba\(0, 0, 0, 0\)/g;
const COLOR = /(?:rgb|hsl|lab|lch|oklab|oklch|color)a?\(/;
const LAYER_SEPARATOR = /,(?![^(]*\))/;

/** Which box-shadow slots have a visible colour. */
function depth(element: Element) {
  const layers = getComputedStyle(element)
    .boxShadow.replace(TRANSPARENT, "")
    .split(LAYER_SEPARATOR)
    .filter((layer) => COLOR.test(layer));
  return {
    inset: layers.some((layer) => layer.includes("inset")),
    raised: layers.some((layer) => !layer.includes("inset")),
  };
}

// The control fades itself when disabled; the label only dims its text.
const LABEL =
  "flex cursor-pointer items-center gap-3 text-sm has-data-disabled:cursor-not-allowed has-data-disabled:text-foreground/50";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component: `
The kit's checkbox: empty, it's a well pressed into the surface; checked, it
rises out of it with a dark check. A hidden native input carries the value, so
it submits with forms.

\`\`\`tsx
import { Checkbox } from "@neomorphic-ui/react/checkbox";

<label className="flex items-center gap-3">
  <Checkbox defaultChecked name="remember" />
  Remember me
</label>
\`\`\`

Wrap it with its text in a \`<label>\` (the whole label is clickable) or give it
an \`aria-label\`. \`indeterminate\` shows a dash and reads as "mixed".
`,
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    indeterminate: { control: "boolean" },
  },
  args: {
    size: "md",
    disabled: false,
    indeterminate: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="p-10">
      <label className={LABEL}>
        <Checkbox {...args} />
        Remember me
      </label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const box = canvas.getByRole("checkbox", { name: "Remember me" });
    await expect(depth(box)).toEqual({ inset: true, raised: false });
    await userEvent.click(canvas.getByText("Remember me"));
    await expect(box).toHaveAttribute("aria-checked", "true");
    await waitFor(() =>
      expect(depth(box)).toEqual({ inset: false, raised: true })
    );
  },
};

/** The kit's pair: checked (raised) and empty (well). */
export const KitReplica: Story = {
  render: () => (
    <div className="flex items-center gap-8 p-12">
      <Checkbox aria-label="Checked" defaultChecked />
      <Checkbox aria-label="Unchecked" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="grid w-fit grid-cols-2 gap-x-12 gap-y-5 p-10">
      <label className={LABEL}>
        <Checkbox />
        Unchecked
      </label>
      <label className={LABEL}>
        <Checkbox defaultChecked />
        Checked
      </label>
      <label className={LABEL}>
        <Checkbox indeterminate />
        Indeterminate
      </label>
      <label className={LABEL}>
        <Checkbox aria-invalid />
        Invalid
      </label>
      <label className={LABEL}>
        <Checkbox disabled />
        Disabled
      </label>
      <label className={LABEL}>
        <Checkbox defaultChecked disabled />
        Disabled checked
      </label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const box = (name: string) => canvas.getByRole("checkbox", { name });
    await expect(box("Indeterminate")).toHaveAttribute("aria-checked", "mixed");
    // The dash shows and the check hides from the indicator's own state.
    const indicator = box("Indeterminate").querySelector(
      '[data-slot="checkbox-indicator"]'
    ) as Element;
    const [check, dash] = indicator.querySelectorAll("svg");
    await expect(getComputedStyle(check).display).toBe("none");
    await expect(getComputedStyle(dash).display).not.toBe("none");
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-8 p-10">
      {(["sm", "md", "lg"] as const).map((size) => (
        <label className={LABEL} key={size}>
          <Checkbox defaultChecked size={size} />
          {size}
        </label>
      ))}
    </div>
  ),
};

const TOPPINGS = ["Cheese", "Mushrooms", "Olives"];

function SelectAllList() {
  const [chosen, setChosen] = useState<string[]>(["Cheese"]);
  const all = chosen.length === TOPPINGS.length;
  const some = chosen.length > 0 && !all;
  return (
    <fieldset className="grid gap-4">
      <legend className="sr-only">Toppings</legend>
      <label className={`${LABEL} font-medium`}>
        <Checkbox
          checked={all}
          indeterminate={some}
          onCheckedChange={(next) => setChosen(next ? TOPPINGS : [])}
        />
        All toppings
      </label>
      <div className="grid gap-4 ps-9">
        {TOPPINGS.map((topping) => (
          <label className={LABEL} key={topping}>
            <Checkbox
              checked={chosen.includes(topping)}
              onCheckedChange={(next) =>
                setChosen((c) =>
                  next ? [...c, topping] : c.filter((t) => t !== topping)
                )
              }
            />
            {topping}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** A parent box is "mixed" while only some children are checked. */
export const SelectAll: Story = {
  render: () => (
    <div className="p-10">
      <SelectAllList />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const parent = canvas.getByRole("checkbox", { name: "All toppings" });
    await expect(parent).toHaveAttribute("aria-checked", "mixed");
    await userEvent.click(parent);
    const states = canvas
      .getAllByRole("checkbox")
      .map((box) => box.getAttribute("aria-checked"));
    await expect(states).toEqual(["true", "true", "true", "true"]);
  },
};

/** An error message tied to the box with `aria-describedby`. */
export const WithError: Story = {
  render: () => (
    <div className="grid gap-2 p-10">
      <label className={LABEL}>
        <Checkbox aria-describedby="terms-error" aria-invalid name="terms" />I
        accept the terms
      </label>
      <p className="ps-9 text-destructive text-xs" id="terms-error">
        Accept the terms to continue.
      </p>
    </div>
  ),
};
