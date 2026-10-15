import { Button } from "@neomorphic-ui/react/button";
import { Checkbox } from "@neomorphic-ui/react/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@neomorphic-ui/react/field";
import { Input } from "@neomorphic-ui/react/input";
import { Label } from "@neomorphic-ui/react/label";
import { RadioGroup, RadioGroupItem } from "@neomorphic-ui/react/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@neomorphic-ui/react/select";
import { Switch } from "@neomorphic-ui/react/switch";
import { Textarea } from "@neomorphic-ui/react/textarea";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

const LOUNGE_RE = /Lounge access/;

const meta = {
  title: "Components/Field",
  component: Field,
  parameters: {
    docs: {
      description: {
        component: `
Labels, descriptions and errors for any control, on Base UI's \`Field\`. Library
controls built on Base UI (\`Input\`, \`Textarea\`, \`Select\`, \`Checkbox\`,
\`Switch\`, \`Slider\`, \`RadioGroup\`) are wired up inside a \`Field\`: the label
names them, the description and error describe them, and \`invalid\` marks
them \`aria-invalid\`.

\`\`\`tsx
import {
  Field, FieldDescription, FieldError, FieldLabel,
} from "@neomorphic-ui/react/field";

<Field invalid={!!error}>
  <FieldLabel>Email</FieldLabel>
  <Input type="email" />
  <FieldDescription>We'll send the ticket here.</FieldDescription>
  {error ? <FieldError>{error}</FieldError> : null}
</Field>
\`\`\`

\`FieldSet\` and \`FieldLegend\` group fields; \`FieldGroup\` stacks them (and is
the container \`orientation="responsive"\` measures). A \`FieldLabel\` that wraps
a whole \`Field\` becomes a raised choice card, pressed in once its checkbox or
radio is checked. \`Label\` is the plain \`<label>\` for use outside a \`Field\`.
`,
      },
    },
  },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["vertical", "horizontal", "responsive"],
    },
  },
  args: {
    orientation: "vertical",
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="max-w-sm p-10">
      <Field {...args}>
        <FieldLabel>Email</FieldLabel>
        <Input placeholder="you@example.com" type="email" />
        <FieldDescription>We'll send the ticket here.</FieldDescription>
      </Field>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Email");
    const description = canvas.getByText("We'll send the ticket here.");
    await expect(input.getAttribute("aria-describedby")).toContain(
      description.id
    );
  },
};

/**
 * Native validation, checked when the field loses focus
 * (`validationMode="onBlur"`): the error names what's missing.
 */
export const Validation: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-4 p-10">
      <Field validationMode="onBlur">
        <FieldLabel>Passenger name</FieldLabel>
        <Input required />
        <FieldError match="valueMissing">
          Enter the name on the passport
        </FieldError>
      </Field>
      <Button variant="primary">Continue</Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.queryByText("Enter the name on the passport")
    ).not.toBeInTheDocument();
    const input = canvas.getByLabelText("Passenger name");
    await userEvent.type(input, "A");
    await userEvent.clear(input);
    await userEvent.tab();
    await expect(
      await canvas.findByText("Enter the name on the passport")
    ).toBeVisible();
    await expect(canvas.getByLabelText("Passenger name")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  },
};

export const Form: Story = {
  render: () => (
    <form
      className="max-w-md p-10"
      onSubmit={(event) => event.preventDefault()}
    >
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Traveller</FieldLegend>
          <FieldDescription>As printed on the passport.</FieldDescription>
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>First name</FieldLabel>
                <Input />
              </Field>
              <Field>
                <FieldLabel>Last name</FieldLabel>
                <Input />
              </Field>
            </div>
            <Field>
              <FieldLabel>Cabin</FieldLabel>
              <Select
                items={[
                  { label: "Economy", value: "economy" },
                  { label: "Business", value: "business" },
                ]}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a cabin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">Economy</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>Notes</FieldLabel>
              <Textarea placeholder="Dietary needs, assistance…" />
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator>Preferences</FieldSeparator>
        <FieldSet>
          <FieldLegend variant="label">Seat</FieldLegend>
          <RadioGroup defaultValue="window">
            {["Window", "Aisle"].map((seat) => (
              <Field key={seat} orientation="horizontal">
                <RadioGroupItem value={seat.toLowerCase()} />
                <FieldLabel>{seat}</FieldLabel>
              </Field>
            ))}
          </RadioGroup>
        </FieldSet>
        <Field orientation="horizontal">
          <Switch defaultChecked />
          <FieldContent>
            <FieldLabel>Trip updates</FieldLabel>
            <FieldDescription>
              Gate changes and delays by email.
            </FieldDescription>
          </FieldContent>
        </Field>
        <Button type="submit" variant="primary">
          Save
        </Button>
      </FieldGroup>
    </form>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("group", { name: "Traveller" })
    ).toBeVisible();
    await expect(canvas.getByLabelText("First name")).toBeVisible();
    await expect(
      canvas.getByRole("switch", { name: "Trip updates" })
    ).toBeChecked();
    await userEvent.click(canvas.getByRole("radio", { name: "Aisle" }));
    await expect(canvas.getByRole("radio", { name: "Aisle" })).toBeChecked();
  },
};

/** A `FieldLabel` wrapping a `Field` is a raised card that presses in when chosen. */
export const ChoiceCards: Story = {
  render: () => (
    <div className="max-w-md p-10">
      <FieldSet>
        <FieldLegend variant="label">Add-ons</FieldLegend>
        <FieldGroup className="gap-4">
          {[
            ["bags", "Extra bag", "23 kg in the hold"],
            ["lounge", "Lounge access", "Before departure"],
          ].map(([id, title, description]) => (
            <FieldLabel key={id}>
              <Field orientation="horizontal">
                <Checkbox defaultChecked={id === "bags"} />
                <FieldContent>
                  <FieldTitle>{title}</FieldTitle>
                  <FieldDescription>{description}</FieldDescription>
                </FieldContent>
              </Field>
            </FieldLabel>
          ))}
        </FieldGroup>
      </FieldSet>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const lounge = canvas.getByRole("checkbox", { name: LOUNGE_RE });
    await expect(lounge).not.toBeChecked();
    await userEvent.click(canvas.getByText("Lounge access"));
    await expect(lounge).toBeChecked();
  },
};

/** `Label` on its own, for a control outside a `Field`. */
export const PlainLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-10">
      <Label>
        <Checkbox />
        Accept the fare rules
      </Label>
      <Label>
        <Checkbox disabled />
        Not available on this fare
      </Label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const accept = canvas.getByRole("checkbox", {
      name: "Accept the fare rules",
    });
    await userEvent.click(canvas.getByText("Accept the fare rules"));
    await expect(accept).toBeChecked();
  },
};
