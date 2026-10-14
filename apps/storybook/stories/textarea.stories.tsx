import { Textarea } from "@neomorphic-ui/react/textarea";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";

const LABEL = "font-medium text-foreground text-sm";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component: `
The kit's message field: a well pressed into the surface. Focus deepens it
and adds the outline. Resizes vertically by default; \`autoResize\` grows it with
the text instead (where the browser supports \`field-sizing\`).

\`\`\`tsx
import { Textarea } from "@neomorphic-ui/react/textarea";

<label htmlFor="message">Message</label>
<Textarea id="message" placeholder="Your message here…" />
\`\`\`

Always pair it with a \`<label htmlFor>\`: a placeholder disappears as soon as
someone types, so it can't be the label.
`,
      },
    },
  },
  argTypes: {
    autoResize: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    autoResize: false,
    disabled: false,
    readOnly: false,
    placeholder: "Your message here…",
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="grid w-96 gap-2 p-10">
      <label className={LABEL} htmlFor="default-message">
        Message
      </label>
      <Textarea id="default-message" {...args} />
    </div>
  ),
};

/** The kit's message field. */
export const KitReplica: Story = {
  render: () => (
    <div className="p-12">
      <Textarea
        aria-label="Message"
        className="h-32 w-72 resize-none"
        placeholder="Your message here…"
      />
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
        <Textarea
          defaultValue="Thanks for the update. Let's ship it on Friday."
          id="filled"
        />
      </div>
      <div className="grid gap-2">
        <label className={LABEL} htmlFor="read-only">
          Read-only
        </label>
        <Textarea
          defaultValue="Order #4821 shipped on 12 Oct."
          id="read-only"
          readOnly
        />
      </div>
      <div className="grid gap-2">
        <label className={LABEL} htmlFor="invalid">
          Invalid
        </label>
        <Textarea
          aria-describedby="invalid-error"
          aria-invalid
          id="invalid"
          placeholder="Tell us what happened"
        />
        <p className="text-destructive text-xs" id="invalid-error">
          Describe the issue in a few words.
        </p>
      </div>
      <div className="grid gap-2">
        <label className={LABEL} htmlFor="disabled">
          Disabled
        </label>
        <Textarea disabled id="disabled" placeholder="Comments are closed" />
      </div>
    </div>
  ),
};

/** Grows with each line, up to `max-h-60`, then scrolls. */
export const AutoResize: Story = {
  render: () => (
    <div className="grid w-96 gap-2 p-10">
      <label className={LABEL} htmlFor="auto">
        Notes
      </label>
      <Textarea
        autoResize
        className="max-h-60 min-h-12"
        id="auto"
        placeholder="Start typing…"
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const field = within(canvasElement).getByRole("textbox", { name: "Notes" });
    const before = field.getBoundingClientRect().height;
    await userEvent.type(field, "One{Enter}Two{Enter}Three{Enter}Four");
    await expect(field.getBoundingClientRect().height).toBeGreaterThan(before);
  },
};

const LIMIT = 140;

function CountedMessage() {
  const [text, setText] = useState("");
  const left = LIMIT - text.length;
  return (
    <div className="grid w-96 gap-2">
      <label className={LABEL} htmlFor="bio">
        Bio
      </label>
      <Textarea
        aria-describedby="bio-count"
        id="bio"
        maxLength={LIMIT}
        onChange={(event) => setText(event.target.value)}
        placeholder="A line or two about you"
        value={text}
      />
      <p
        aria-live="polite"
        className="text-end text-muted-foreground text-xs tabular-nums"
        id="bio-count"
      >
        {left} characters left
      </p>
    </div>
  );
}

/** A live character count, announced politely as it changes. */
export const WithCounter: Story = {
  render: () => (
    <div className="p-10">
      <CountedMessage />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox", { name: "Bio" }), "Hi");
    await expect(canvas.getByText("138 characters left")).toBeInTheDocument();
  },
};
