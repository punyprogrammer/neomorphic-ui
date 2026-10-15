import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@neomorphic-react/ui/alert-dialog";
import { Button } from "@neomorphic-react/ui/button";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Trash2 } from "lucide-react";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

const meta = {
  title: "Components/AlertDialog",
  component: AlertDialog,
  parameters: {
    docs: {
      description: {
        component: `
A dialog that needs an answer. Clicking the backdrop doesn't dismiss it, and
it's announced as an \`alertdialog\`; Escape still cancels.

\`\`\`tsx
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@neomorphic-react/ui/alert-dialog";

<AlertDialog>
  <AlertDialogTrigger render={<Button variant="destructive" />}>Cancel trip</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Cancel this trip?</AlertDialogTitle>
      <AlertDialogDescription>Your seats will be released.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Keep trip</AlertDialogCancel>
      <AlertDialogAction variant="destructive" onClick={cancelTrip}>Cancel trip</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
\`\`\`

Put \`AlertDialogCancel\` first so focus starts on the safe choice.
\`AlertDialogAction\` closes the dialog after \`onClick\`; pass
\`closeOnClick={false}\` to keep it open while an async action runs.
`,
      },
    },
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="p-10">
      <AlertDialog {...args}>
        <AlertDialogTrigger render={<Button variant="destructive" />}>
          Cancel trip
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel this trip?</AlertDialogTitle>
            <AlertDialogDescription>
              Your seats on both trains will be released and €48 refunded to
              your card within five days.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep trip</AlertDialogCancel>
            <AlertDialogAction variant="destructive">
              Cancel trip
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "Cancel trip" })
    );
    const dialog = await screen.findByRole("alertdialog", {
      name: "Cancel this trip?",
    });
    await waitFor(() =>
      expect(
        within(dialog).getByRole("button", { name: "Keep trip" })
      ).toHaveFocus()
    );
    const backdrop = document.querySelector(
      '[data-slot="alert-dialog-overlay"]'
    ) as HTMLElement;
    await userEvent.click(backdrop);
    await expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    await userEvent.click(
      within(dialog).getByRole("button", { name: "Keep trip" })
    );
    await waitFor(() =>
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument()
    );
  },
};

export const SmallWithMedia: Story = {
  render: (args) => (
    <div className="p-10">
      <AlertDialog {...args}>
        <AlertDialogTrigger render={<Button />}>
          Delete saved search
        </AlertDialogTrigger>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="text-destructive">
              <Trash2 />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete search?</AlertDialogTitle>
            <AlertDialogDescription>
              "Lisbon to Porto, weekends" will be removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep</AlertDialogCancel>
            <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "Delete saved search" })
    );
    const dialog = await screen.findByRole("alertdialog");
    await expect(dialog).toHaveAttribute("data-size", "sm");
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument()
    );
  },
};
