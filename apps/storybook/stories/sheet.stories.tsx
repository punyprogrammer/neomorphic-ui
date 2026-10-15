import { Button } from "@neomorphic-react/ui/button";
import { Checkbox } from "@neomorphic-react/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@neomorphic-react/ui/field";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@neomorphic-react/ui/sheet";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

const meta = {
  title: "Components/Sheet",
  component: Sheet,
  parameters: {
    docs: {
      description: {
        component: `
A modal panel that slides in from an edge: a \`Dialog\` with only its inner
edge rounded. Use it for filters, settings or details that need room without
leaving the page.

\`\`\`tsx
import {
  Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader,
  SheetTitle, SheetTrigger,
} from "@neomorphic-react/ui/sheet";

<Sheet>
  <SheetTrigger render={<Button />}>Filters</SheetTrigger>
  <SheetContent side="end">
    <SheetHeader>
      <SheetTitle>Filters</SheetTitle>
      <SheetDescription>Narrow the results.</SheetDescription>
    </SheetHeader>
    …
  </SheetContent>
</Sheet>
\`\`\`

\`side\` is \`end\` by default; \`start\` and \`end\` follow the writing
direction, \`left\`, \`right\`, \`top\` and \`bottom\` don't. \`size\` caps the
width of side sheets (sm–xl). For a sheet the user can swipe away, use
\`Drawer\`.
`,
      },
    },
  },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const STOPS = ["Direct only", "1 change", "2+ changes"];

export const Default: Story = {
  render: (args) => (
    <div className="p-10">
      <Sheet {...args}>
        <SheetTrigger render={<Button />}>Filters</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>124 trains match.</SheetDescription>
          </SheetHeader>
          <FieldGroup>
            {STOPS.map((stop, i) => (
              <Field key={stop} orientation="horizontal">
                <Checkbox defaultChecked={i === 0} />
                <FieldLabel>{stop}</FieldLabel>
              </Field>
            ))}
          </FieldGroup>
          <SheetFooter>
            <SheetClose render={<Button variant="primary" />}>
              Show 124 trains
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", {
      name: "Filters",
    });
    await userEvent.click(trigger);
    const sheet = await screen.findByRole("dialog", { name: "Filters" });
    await waitFor(
      () => {
        const rect = sheet.getBoundingClientRect();
        return expect(Math.round(rect.right)).toBe(window.innerWidth);
      },
      { timeout: 4000 }
    );
    await userEvent.click(
      within(sheet).getByRole("button", { name: "Show 124 trains" })
    );
    await waitFor(() => expect(trigger).toHaveFocus(), { timeout: 4000 });
  },
};

export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-10">
      {(["top", "end", "bottom", "start"] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger render={<Button size="sm" />}>{side}</SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>From the {side}</SheetTitle>
              <SheetDescription>Slides in from this edge.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "bottom" })
    );
    const sheet = await screen.findByRole("dialog", {
      name: "From the bottom",
    });
    await expect(sheet).toHaveAttribute("data-side", "bottom");
    await userEvent.keyboard("{Escape}");
    await waitFor(
      () => expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
      { timeout: 4000 }
    );
  },
};
