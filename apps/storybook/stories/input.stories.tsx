import { Input } from "@neomorphic-react/ui/input";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

const LABEL = "font-medium text-foreground text-sm";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    docs: {
      description: {
        component: `
A single-line field: a well pressed into the surface, like the kit's search
pill. Focus deepens it and adds the outline; read-only is shallower. Built on
Base UI's \`Input\`, so it works inside a \`Field\`.

\`\`\`tsx
import { Input } from "@neomorphic-react/ui/input";

<label htmlFor="email">Email</label>
<Input id="email" type="email" placeholder="you@example.com" />

<Input aria-label="Search" shape="pill" type="search" placeholder="Search" />
\`\`\`

\`rounded\` (the default) matches \`Textarea\` and \`Select\` in forms; \`pill\`
is the kit's search field. Pair it with a \`<label htmlFor>\`: a placeholder
is not a label. For icons or buttons inside the well, use \`InputGroup\`.
`,
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    shape: { control: "inline-radio", options: ["rounded", "pill"] },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    size: "md",
    shape: "rounded",
    disabled: false,
    readOnly: false,
    placeholder: "you@example.com",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="grid w-80 gap-2 p-10">
      <label className={LABEL} htmlFor="default-email">
        Email
      </label>
      <Input id="default-email" type="email" {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole("textbox", {
      name: "Email",
    });
    await userEvent.type(input, "ada@example.com");
    await expect(input).toHaveValue("ada@example.com");
    await expect(input).toHaveFocus();
    await expect(getComputedStyle(input).boxShadow).not.toBe("none");
  },
};

/** The kit's search pill, without its icon (see `InputGroup` for that). */
export const KitReplica: Story = {
  render: () => (
    <div className="p-12">
      <Input
        aria-label="Search"
        className="w-72"
        placeholder="Search"
        shape="pill"
        type="search"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="grid w-80 gap-6 p-10">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Input aria-label={size} key={size} placeholder={size} size={size} />
      ))}
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="grid w-80 gap-6 p-10">
      <Input aria-label="Rounded" placeholder="Rounded" />
      <Input aria-label="Pill" placeholder="Pill" shape="pill" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="grid w-[40rem] grid-cols-2 gap-8 p-10 *:content-start">
      <div className="grid gap-2">
        <label className={LABEL} htmlFor="filled">
          Filled
        </label>
        <Input defaultValue="Ada Lovelace" id="filled" />
      </div>
      <div className="grid gap-2">
        <label className={LABEL} htmlFor="read-only">
          Read-only
        </label>
        <Input defaultValue="ORD-4821" id="read-only" readOnly />
      </div>
      <div className="grid gap-2">
        <label className={LABEL} htmlFor="invalid">
          Invalid
        </label>
        <Input
          aria-describedby="invalid-error"
          aria-invalid
          defaultValue="ada@"
          id="invalid"
          type="email"
        />
        <p className="text-destructive text-xs" id="invalid-error">
          Enter a full email address.
        </p>
      </div>
      <div className="grid gap-2">
        <label className={LABEL} htmlFor="disabled">
          Disabled
        </label>
        <Input disabled id="disabled" placeholder="Not editable" />
      </div>
    </div>
  ),
};

/** Native types keep their keyboards and validation. */
export const Types: Story = {
  render: () => (
    <div className="grid w-80 gap-6 p-10">
      {(
        [
          ["password", "Password"],
          ["number", "Quantity"],
          ["date", "Date"],
          ["file", "Attachment"],
        ] as const
      ).map(([type, label]) => (
        <div className="grid gap-2" key={type}>
          <label className={LABEL} htmlFor={`type-${type}`}>
            {label}
          </label>
          <Input id={`type-${type}`} type={type} />
        </div>
      ))}
    </div>
  ),
};
