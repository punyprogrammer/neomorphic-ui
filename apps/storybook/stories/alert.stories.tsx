import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@neomorphic-ui/react/alert";
import { Button } from "@neomorphic-ui/react/button";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CircleAlert,
  CircleCheck,
  Info,
  Terminal,
  TriangleAlert,
} from "lucide-react";
import { expect, within } from "storybook/test";

const meta = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    docs: {
      description: {
        component: `
A message in the page's flow: a shallow well with a coloured rule and icon. The
colour, not the depth, says what kind of message it is.

\`\`\`tsx
import {
  Alert, AlertAction, AlertDescription, AlertTitle,
} from "@neomorphic-ui/react/alert";

<Alert variant="success">
  <CircleCheck />
  <AlertTitle>Booking confirmed</AlertTitle>
  <AlertDescription>Your tickets are in your inbox.</AlertDescription>
</Alert>
\`\`\`

An alert is a polite \`status\`: screen readers announce it when it appears
without interrupting. Pass \`role="alert"\` only for urgent messages. For
messages that come and go, use \`Toast\`.
`,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "info", "success", "warning", "destructive"],
    },
  },
  args: {
    variant: "default",
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="max-w-lg p-10">
      <Alert {...args}>
        <Terminal />
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>
          Check-in opens 24 hours before departure.
        </AlertDescription>
      </Alert>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const alert = within(canvasElement).getByRole("status");
    await expect(alert).toHaveTextContent("Heads up");
    await expect(getComputedStyle(alert).boxShadow).toContain("inset");
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex max-w-lg flex-col gap-4 p-10">
      <Alert variant="info">
        <Info />
        <AlertTitle>Gate assigned</AlertTitle>
        <AlertDescription>Your flight leaves from gate B12.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <CircleCheck />
        <AlertTitle>Booking confirmed</AlertTitle>
        <AlertDescription>Your tickets are in your inbox.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <TriangleAlert />
        <AlertTitle>Tight connection</AlertTitle>
        <AlertDescription>
          You have 40 minutes to change trains in Porto.
        </AlertDescription>
      </Alert>
      <Alert role="alert" variant="destructive">
        <CircleAlert />
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>
          <p>Your card was declined. Try another card or:</p>
          <ul className="ms-4 list-disc">
            <li>Check the billing address</li>
            <li>Ask your bank to allow the payment</li>
          </ul>
        </AlertDescription>
      </Alert>
      <Alert>
        <AlertTitle>No icon</AlertTitle>
        <AlertDescription>The rule still marks the message.</AlertDescription>
      </Alert>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("alert")).toHaveTextContent("Payment failed");
    await expect(canvas.getAllByRole("status")).toHaveLength(4);
  },
};

export const WithAction: Story = {
  render: () => (
    <div className="max-w-lg p-10">
      <Alert variant="info">
        <Info />
        <AlertTitle>Seat changed</AlertTitle>
        <AlertDescription>You're now in 14A.</AlertDescription>
        <AlertAction>
          <Button size="sm">Undo</Button>
        </AlertAction>
      </Alert>
    </div>
  ),
};
