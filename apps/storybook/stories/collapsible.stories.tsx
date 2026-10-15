import { Button } from "@neomorphic-react/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from "@neomorphic-react/ui/collapsible";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

const REFUNDABLE_RE = /Refundable/;

const meta = {
  title: "Components/Collapsible",
  component: Collapsible,
  parameters: {
    docs: {
      description: {
        component: `
Shows and hides one region. The parts are unstyled apart from the height
animation, so the trigger can be any button and the region any content.

\`\`\`tsx
import {
  Collapsible, CollapsibleContent, CollapsibleIndicator, CollapsibleTrigger,
} from "@neomorphic-react/ui/collapsible";

<Collapsible>
  <CollapsibleTrigger render={<Button variant="ghost" />}>
    Fare rules <CollapsibleIndicator />
  </CollapsibleTrigger>
  <CollapsibleContent>…</CollapsibleContent>
</Collapsible>
\`\`\`

The trigger carries \`aria-expanded\` and \`aria-controls\`. For several
sections that open in turn, use \`Accordion\`.
`,
      },
    },
  },
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="max-w-sm p-10">
      <Collapsible
        className="inset-shadow-neu-flat rounded-xl bg-neu-convex p-4 shadow-neu"
        {...args}
      >
        <div className="flex items-center justify-between gap-4">
          <p className="font-medium text-sm">3 stops on this route</p>
          <CollapsibleTrigger
            render={
              <Button aria-label="Show stops" shape="rounded" size="sm" />
            }
          >
            <CollapsibleIndicator />
          </CollapsibleTrigger>
        </div>
        <p className="inset-shadow-neu-sm mt-3 rounded-lg px-3 py-2 text-sm shadow-neu-flat">
          Lisbon Oriente
        </p>
        <CollapsibleContent>
          <div className="flex flex-col gap-2 pt-2">
            <p className="inset-shadow-neu-sm rounded-lg px-3 py-2 text-sm shadow-neu-flat">
              Coimbra B
            </p>
            <p className="inset-shadow-neu-sm rounded-lg px-3 py-2 text-sm shadow-neu-flat">
              Aveiro
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Show stops" });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(canvas.queryByText("Aveiro")).not.toBeInTheDocument();
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(canvas.getByText("Aveiro")).toBeVisible();
  },
};

export const TextTrigger: Story = {
  render: () => (
    <div className="max-w-sm p-10">
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between gap-2 rounded-md font-medium text-sm outline-none hover:text-primary focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2">
          Fare rules
          <CollapsibleIndicator />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p className="pt-3 text-muted-foreground text-sm">
            Refundable up to 24 hours before departure. Changes cost €5.
          </p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Fare rules" });
    await expect(canvas.getByText(REFUNDABLE_RE)).toBeVisible();
    trigger.focus();
    await userEvent.keyboard("{Enter}");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await waitFor(() => {
      const panel = canvasElement.querySelector(
        '[data-slot="collapsible-content"]'
      );
      return expect(panel === null || panel.hasAttribute("data-closed")).toBe(
        true
      );
    });
  },
};
