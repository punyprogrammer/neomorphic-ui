import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@neomorphic-react/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@neomorphic-react/ui/input-otp";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";

const meta = {
  title: "Components/InputOTP",
  component: InputOTP,
  parameters: {
    docs: {
      description: {
        component: `
A one-time code split into slots, on Base UI's \`OTPField\`. Each slot is a small
\`Input\` well; the focused one sinks deeper. Typing advances, Backspace goes
back, and pasting fills every slot. Digits only by default.

\`\`\`tsx
import {
  InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot,
} from "@neomorphic-react/ui/input-otp";

<InputOTP aria-label="Verification code" length={6}>
  <InputOTPGroup>
    <InputOTPSlot /><InputOTPSlot /><InputOTPSlot />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot /><InputOTPSlot /><InputOTPSlot />
  </InputOTPGroup>
</InputOTP>
\`\`\`

Render one \`InputOTPSlot\` per character of \`length\`. \`validationType\`
allows letters; \`mask\` hides what's typed.
`,
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  args: {
    length: 6,
    size: "md",
  },
} satisfies Meta<typeof InputOTP>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div className="flex flex-col gap-4 p-10">
        <InputOTP
          {...args}
          aria-label="Verification code"
          onValueChange={setValue}
          value={value}
        >
          <InputOTPGroup>
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
          </InputOTPGroup>
        </InputOTP>
        <p className="text-muted-foreground text-sm">
          Entered: <span data-testid="value">{value || "nothing yet"}</span>
        </p>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slots = canvasElement.querySelectorAll<HTMLInputElement>(
      '[data-slot="input-otp-slot"]'
    );
    await userEvent.click(slots[0] as HTMLInputElement);
    // The letter is rejected; the digits fill the slots in order.
    await userEvent.keyboard("4a8291");
    await expect(canvas.getByTestId("value")).toHaveTextContent("48291");
    await expect(slots[4]).toHaveValue("1");
    await expect(slots[5]).toHaveValue("");
  },
};

export const InAField: Story = {
  render: () => (
    <div className="p-10">
      <Field>
        <FieldLabel>Code from your boarding app</FieldLabel>
        <InputOTP length={4}>
          <InputOTPGroup>
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
          </InputOTPGroup>
        </InputOTP>
        <FieldDescription>It expires in 5 minutes.</FieldDescription>
      </Field>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-10">
      {(["sm", "md", "lg"] as const).map((size) => (
        <InputOTP aria-label={`Code ${size}`} key={size} length={4} size={size}>
          <InputOTPGroup>
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
          </InputOTPGroup>
        </InputOTP>
      ))}
    </div>
  ),
};
