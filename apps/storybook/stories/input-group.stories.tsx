import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@neomorphic-react/ui/input-group";
import { Surface } from "@neomorphic-react/ui/surface";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Eye,
  EyeOff,
  Mail,
  MapPin,
  Paperclip,
  Search,
  SendHorizontal,
  X,
} from "lucide-react";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";

const LABEL = "font-medium text-foreground text-sm";

const meta = {
  title: "Components/InputGroup",
  component: InputGroup,
  parameters: {
    docs: {
      description: {
        component: `
One well holding a control and the parts around it: icons, text and buttons.
The well lights up for the control's focus, invalid and disabled states, and
pressing anywhere in it focuses the control.

\`\`\`tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@neomorphic-react/ui/input-group";

<InputGroup shape="pill">
  <InputGroupAddon>
    <Search />
  </InputGroupAddon>
  <InputGroupInput aria-label="Search" placeholder="Search" type="search" />
</InputGroup>

<InputGroup shape="pill">
  <InputGroupInput aria-label="Email" type="email" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton variant="primary">Subscribe</InputGroupButton>
  </InputGroupAddon>
</InputGroup>
\`\`\`

Addons go \`inline-start\` (default), \`inline-end\`, \`block-start\` or
\`block-end\`. \`InputGroupButton\` fits itself to the group's \`size\` and
\`shape\`; it is \`ghost\` by default, \`default\` or \`primary\` to rise out of
the well. Use \`InputGroupTextarea\` for a growing multi-line field. Label the
control, not the group.
`,
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    shape: { control: "inline-radio", options: ["rounded", "pill"] },
  },
  args: {
    size: "md",
    shape: "rounded",
  },
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A search field whose clear button appears once there is text. */
export const Default: Story = {
  render(args) {
    const [query, setQuery] = useState("");
    return (
      <div className="w-80 p-10">
        <InputGroup {...args}>
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            aria-label="Search"
            onValueChange={setQuery}
            placeholder="Search"
            type="search"
            value={query}
          />
          {query ? (
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                aria-label="Clear search"
                icon={<X />}
                onClick={() => setQuery("")}
              />
            </InputGroupAddon>
          ) : null}
        </InputGroup>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("searchbox", { name: "Search" });
    await userEvent.type(input, "boots");
    await userEvent.click(canvas.getByRole("button", { name: "Clear search" }));
    await expect(input).toHaveValue("");
    await expect(
      canvas.queryByRole("button", { name: "Clear search" })
    ).not.toBeInTheDocument();
  },
};

/** The kit's search pill (`1:2`), Subscribe field (`3:71`) and chat composer (`3:731`). */
export const KitReplica: Story = {
  render: () => (
    <div className="grid gap-10 p-12">
      <InputGroup className="w-72" shape="pill">
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          aria-label="Search"
          placeholder="Search"
          type="search"
        />
      </InputGroup>

      <Surface className="grid w-96 gap-4 p-6">
        <p className="font-medium text-foreground text-sm uppercase tracking-wide">
          Subscribe
        </p>
        <InputGroup shape="pill" size="lg">
          <InputGroupAddon>
            <Mail />
          </InputGroupAddon>
          <InputGroupInput
            aria-label="Email"
            placeholder="Your email"
            type="email"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="primary">Subscribe</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Surface>

      <InputGroup className="w-96" shape="pill">
        <InputGroupAddon>
          <InputGroupButton aria-label="Attach a file" icon={<Paperclip />} />
        </InputGroupAddon>
        <InputGroupTextarea
          aria-label="Message"
          className="max-h-40"
          placeholder="Type a message…"
          rows={1}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label="Send"
            icon={<SendHorizontal />}
            variant="primary"
          />
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

/** Units and prefixes as `InputGroupText`. */
export const WithText: Story = {
  render: () => (
    <div className="grid w-80 gap-6 p-10">
      <div className="grid gap-2">
        <label className={LABEL} htmlFor="price">
          Price
        </label>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>$</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput id="price" inputMode="decimal" placeholder="0.00" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>USD</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="grid gap-2">
        <label className={LABEL} htmlFor="site">
          Website
        </label>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput id="site" placeholder="example.com" />
        </InputGroup>
      </div>
      <div className="grid gap-2">
        <label className={LABEL} htmlFor="city">
          City
        </label>
        <InputGroup>
          <InputGroupAddon>
            <MapPin />
          </InputGroupAddon>
          <InputGroupInput id="city" placeholder="Kolkata" />
        </InputGroup>
      </div>
    </div>
  ),
};

/** A ghost button toggling password visibility. */
export const Password: Story = {
  render() {
    const [visible, setVisible] = useState(false);
    return (
      <div className="grid w-80 gap-2 p-10">
        <label className={LABEL} htmlFor="password">
          Password
        </label>
        <InputGroup>
          <InputGroupInput id="password" type={visible ? "text" : "password"} />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              aria-label="Show password"
              aria-pressed={visible}
              icon={visible ? <EyeOff /> : <Eye />}
              onClick={() => setVisible(!visible)}
            />
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Password");
    await expect(input).toHaveAttribute("type", "password");
    await userEvent.click(
      canvas.getByRole("button", { name: "Show password" })
    );
    await expect(input).toHaveAttribute("type", "text");
  },
};

/** Buttons shrink to fit each size with the same 4px inset. */
export const Sizes: Story = {
  render: () => (
    <div className="grid w-96 gap-6 p-10">
      {(["sm", "md", "lg"] as const).map((size) => (
        <InputGroup key={size} shape="pill" size={size}>
          <InputGroupAddon>
            <Mail />
          </InputGroupAddon>
          <InputGroupInput aria-label={`Email (${size})`} placeholder={size} />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="default">Join</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      ))}
    </div>
  ),
};

/** A block addon adds a row: here a counter under a growing textarea. */
export const BlockAddon: Story = {
  render() {
    const [text, setText] = useState("");
    return (
      <div className="grid w-96 gap-2 p-10">
        <label className={LABEL} htmlFor="bio">
          Bio
        </label>
        <InputGroup>
          <InputGroupTextarea
            className="max-h-48"
            id="bio"
            maxLength={160}
            onChange={(event) => setText(event.target.value)}
            placeholder="A line or two about you"
            value={text}
          />
          <InputGroupAddon align="block-end" className="justify-end">
            <InputGroupText className="text-xs tabular-nums">
              {text.length} / 160
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  },
};

export const States: Story = {
  render: () => (
    <div className="grid w-[40rem] grid-cols-2 gap-8 p-10 *:content-start">
      <div className="grid gap-2">
        <label className={LABEL} htmlFor="group-invalid">
          Invalid
        </label>
        <InputGroup>
          <InputGroupAddon>
            <Mail />
          </InputGroupAddon>
          <InputGroupInput
            aria-describedby="group-invalid-error"
            aria-invalid
            defaultValue="ada@"
            id="group-invalid"
            type="email"
          />
        </InputGroup>
        <p className="text-destructive text-xs" id="group-invalid-error">
          Enter a full email address.
        </p>
      </div>
      <div className="grid gap-2">
        <label className={LABEL} htmlFor="group-disabled">
          Disabled
        </label>
        <InputGroup>
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput disabled id="group-disabled" placeholder="Search" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton disabled>Go</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  ),
};
