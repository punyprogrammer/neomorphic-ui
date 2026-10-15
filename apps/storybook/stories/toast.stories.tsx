import { Button } from "@neomorphic-ui/react/button";
import { Toaster, toast } from "@neomorphic-ui/react/toast";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

const meta = {
  title: "Components/Toast",
  component: Toaster,
  parameters: {
    docs: {
      description: {
        component: `
Short messages that stack in a corner and close themselves. Each toast is a
raised card; its icon's colour says what kind of message it is. Hovering the
stack fans it out, and toasts can be swiped away.

\`\`\`tsx
import { Toaster, toast } from "@neomorphic-ui/react/toast";

// once, near the root
<Toaster position="bottom-right" />

toast("Trip saved");
toast.success({ title: "Booked", description: "See you in Porto." });
toast("Seat released", { action: { label: "Undo", onClick: undo } });
toast.promise(save(), { loading: "Saving…", success: "Saved", error: "Couldn't save" });
\`\`\`

Toasts are announced politely and pause while hovered or focused; F6 moves
focus into the stack. Keep them short and never the only place an error is
reported; use \`Alert\` for messages that must stay.
`,
      },
    },
  },
  argTypes: {
    position: {
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
    },
  },
  args: {
    position: "bottom-right",
  },
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const Default: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3 p-10">
      <Toaster {...args} />
      <Button onClick={() => toast("Trip saved")}>Default</Button>
      <Button
        onClick={() =>
          toast.success({
            title: "Booked",
            description: "Lisbon to Porto, 12 May. See you on board.",
          })
        }
      >
        Success
      </Button>
      <Button
        onClick={() =>
          toast.info({ title: "Gate assigned", description: "Platform 4." })
        }
      >
        Info
      </Button>
      <Button
        onClick={() =>
          toast.warning({
            title: "Tight connection",
            description: "40 minutes to change in Porto.",
          })
        }
      >
        Warning
      </Button>
      <Button
        onClick={() =>
          toast.error({
            title: "Payment failed",
            description: "Your card was declined.",
          })
        }
      >
        Error
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Success" }));
    const title = await screen.findByText("Booked");
    const root = title.closest('[data-slot="toast"]') as HTMLElement;
    await expect(root).toHaveAttribute("data-type", "success");
    await expect(getComputedStyle(root).boxShadow).not.toBe("none");
    toast.dismiss();
    await waitFor(
      () => expect(screen.queryByText("Booked")).not.toBeInTheDocument(),
      { timeout: 4000 }
    );
  },
};

export const WithAction: Story = {
  render: (args) => (
    <div className="p-10">
      <Toaster {...args} />
      <Button
        onClick={() =>
          toast("Seat 12A released", {
            action: {
              label: "Undo",
              onClick: () => toast.success("Seat 12A is yours again"),
            },
          })
        }
      >
        Release seat
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "Release seat" })
    );
    await userEvent.click(await screen.findByRole("button", { name: "Undo" }));
    await expect(
      await screen.findByText("Seat 12A is yours again")
    ).toBeInTheDocument();
    toast.dismiss();
  },
};

export const TrackPromise: Story = {
  name: "Promise",
  render: (args) => (
    <div className="p-10">
      <Toaster {...args} />
      <Button
        onClick={() =>
          toast.promise(wait(1200), {
            loading: "Saving your trip…",
            success: "Trip saved",
            error: "Couldn't save",
          })
        }
      >
        Save trip
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "Save trip" })
    );
    await expect(
      await screen.findByText("Saving your trip…")
    ).toBeInTheDocument();
    await expect(
      await screen.findByText("Trip saved", undefined, { timeout: 4000 })
    ).toBeInTheDocument();
    toast.dismiss();
  },
};
