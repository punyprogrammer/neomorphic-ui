import { Button } from "@neomorphic-ui/react/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@neomorphic-ui/react/dialog";
import { Field, FieldGroup, FieldLabel } from "@neomorphic-ui/react/field";
import { Input } from "@neomorphic-ui/react/input";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component: `
A modal panel: raised over a tinted, softly blurred page. Focus is trapped
inside while it's open and returns to the trigger when it closes; Escape and
clicks on the backdrop dismiss it.

\`\`\`tsx
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader,
  DialogTitle, DialogTrigger,
} from "@neomorphic-ui/react/dialog";

<Dialog>
  <DialogTrigger render={<Button />}>Edit trip</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit trip</DialogTitle>
      <DialogDescription>Change the name and dates.</DialogDescription>
    </DialogHeader>
    …
    <DialogFooter showCloseButton>
      <Button variant="primary">Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
\`\`\`

Every dialog needs a \`DialogTitle\`. \`size\` is sm, md or lg. The panel
never outgrows the viewport: put long content in a \`DialogBody\` and it
scrolls between a fixed header and footer. For a yes/no question use
\`AlertDialog\`; for a panel from the edge, \`Sheet\` or \`Drawer\`.
`,
      },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="p-10">
      <Dialog {...args}>
        <DialogTrigger render={<Button />}>Edit trip</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit trip</DialogTitle>
            <DialogDescription>
              Change the name and dates. Your bookings stay as they are.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input defaultValue="Spring in Porto" />
            </Field>
            <Field>
              <FieldLabel>Travellers</FieldLabel>
              <Input defaultValue="2" inputMode="numeric" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button />}>Cancel</DialogClose>
            <DialogClose render={<Button variant="primary" />}>
              Save
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", {
      name: "Edit trip",
    });
    await userEvent.click(trigger);
    const dialog = await screen.findByRole("dialog", { name: "Edit trip" });
    await waitFor(() =>
      expect(dialog.contains(document.activeElement)).toBe(true)
    );
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(trigger).toHaveFocus(), { timeout: 4000 });
  },
};

const TERMS = Array.from(
  { length: 12 },
  (_, i) =>
    `${i + 1}. Tickets are personal and valid only for the date, train and seat shown. Changes are possible up to 24 hours before departure for a €5 fee plus any fare difference.`
);

export const Scrolling: Story = {
  render: (args) => (
    <div className="p-10">
      <Dialog {...args}>
        <DialogTrigger render={<Button />}>Fare terms</DialogTrigger>
        <DialogContent className="max-h-[28rem]" size="lg">
          <DialogHeader>
            <DialogTitle>Fare terms</DialogTitle>
            <DialogDescription>Saver fare, Lisbon to Porto.</DialogDescription>
          </DialogHeader>
          <DialogBody className="flex flex-col gap-3 text-muted-foreground">
            {TERMS.map((term) => (
              <p key={term}>{term}</p>
            ))}
          </DialogBody>
          <DialogFooter showCloseButton>
            <DialogClose render={<Button variant="primary" />}>
              Accept
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "Fare terms" })
    );
    const dialog = await screen.findByRole("dialog", { name: "Fare terms" });
    const body = dialog.querySelector(
      '[data-slot="dialog-body"]'
    ) as HTMLElement;
    await waitFor(() =>
      expect(body.scrollHeight).toBeGreaterThan(body.clientHeight)
    );
    await waitFor(() =>
      expect(
        within(dialog).getByRole("button", { name: "Accept" })
      ).toBeVisible()
    );
    await userEvent.click(
      within(dialog).getAllByRole("button", { name: "Close" })[0] as HTMLElement
    );
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );
  },
};
