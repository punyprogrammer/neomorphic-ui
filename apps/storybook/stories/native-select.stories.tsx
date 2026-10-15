import { Field, FieldLabel } from "@neomorphic-ui/react/field";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@neomorphic-ui/react/native-select";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

const meta = {
  title: "Components/NativeSelect",
  component: NativeSelect,
  parameters: {
    docs: {
      description: {
        component: `
The platform's own \`<select>\` in the same well as \`Input\`, with the kit's
solid caret. Best on touch devices and in plain forms; for a styled, searchable
list use \`Select\` or \`Combobox\`.

\`\`\`tsx
import {
  NativeSelect, NativeSelectOption,
} from "@neomorphic-ui/react/native-select";

<NativeSelect aria-label="Seat">
  <NativeSelectOption value="window">Window</NativeSelectOption>
  <NativeSelectOption value="aisle">Aisle</NativeSelectOption>
</NativeSelect>
\`\`\`

\`className\` sizes the wrapper; every other prop goes to the \`<select>\`.
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
} satisfies Meta<typeof NativeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="p-10">
      <NativeSelect aria-label="Seat" className="w-56" {...args}>
        <NativeSelectOption value="">Choose a seat</NativeSelectOption>
        <NativeSelectOption value="window">Window</NativeSelectOption>
        <NativeSelectOption value="middle">Middle</NativeSelectOption>
        <NativeSelectOption value="aisle">Aisle</NativeSelectOption>
      </NativeSelect>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const select = within(canvasElement).getByRole("combobox", {
      name: "Seat",
    });
    await userEvent.selectOptions(select, "aisle");
    await expect(select).toHaveValue("aisle");
    await expect(getComputedStyle(select).boxShadow).not.toBe("none");
  },
};

export const Groups: Story = {
  render: () => (
    <div className="max-w-xs p-10">
      <Field>
        <FieldLabel>Departure</FieldLabel>
        <NativeSelect className="w-full" defaultValue="lhr">
          <NativeSelectOptGroup label="London">
            <NativeSelectOption value="lhr">Heathrow</NativeSelectOption>
            <NativeSelectOption value="lgw">Gatwick</NativeSelectOption>
          </NativeSelectOptGroup>
          <NativeSelectOptGroup label="Paris">
            <NativeSelectOption value="cdg">
              Charles de Gaulle
            </NativeSelectOption>
            <NativeSelectOption value="ory">Orly</NativeSelectOption>
          </NativeSelectOptGroup>
        </NativeSelect>
      </Field>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-10">
      {(["sm", "md", "lg"] as const).map((size) => (
        <NativeSelect aria-label={`Size ${size}`} key={size} size={size}>
          <NativeSelectOption>{size}</NativeSelectOption>
        </NativeSelect>
      ))}
    </div>
  ),
};
