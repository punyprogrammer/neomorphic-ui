import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@neomorphic-react/ui/accordion";
import { Card, CardContent } from "@neomorphic-react/ui/card";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

const CHANGES_RE = /Changes cost €5/;
const LOUNGE_RE = /Lounge/;

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component: `
Stacked sections that open one at a time. Each item is a raised panel; the
open header presses in and its chevron turns over and takes the primary
colour.

\`\`\`tsx
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@neomorphic-react/ui/accordion";

<Accordion defaultValue={["bags"]}>
  <AccordionItem value="bags">
    <AccordionTrigger>What can I bring?</AccordionTrigger>
    <AccordionContent>One cabin bag and one personal item.</AccordionContent>
  </AccordionItem>
</Accordion>
\`\`\`

Pass \`multiple\` to let several sections stay open. \`variant="flat"\` drops
the panels for grooves, for use inside a \`Card\`. Headers are real headings
holding buttons in the Tab order; Enter or Space toggles a section.
`,
      },
    },
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["raised", "flat"] },
    multiple: { control: "boolean" },
  },
  args: {
    variant: "raised",
    multiple: false,
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const FAQ = [
  {
    value: "bags",
    q: "What can I bring on board?",
    a: "One cabin bag up to 10 kg and one personal item that fits under the seat.",
  },
  {
    value: "change",
    q: "Can I change my booking?",
    a: "Yes, up to 24 hours before departure. Changes cost €5 plus any fare difference.",
  },
  {
    value: "pets",
    q: "Can I travel with a pet?",
    a: "Small pets in a carrier travel free on all routes.",
  },
];

function Items() {
  return FAQ.map((item) => (
    <AccordionItem key={item.value} value={item.value}>
      <AccordionTrigger>{item.q}</AccordionTrigger>
      <AccordionContent>{item.a}</AccordionContent>
    </AccordionItem>
  ));
}

export const Default: Story = {
  render: (args) => (
    <div className="max-w-lg p-10">
      <Accordion {...args} defaultValue={["bags"]}>
        <Items />
      </Accordion>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [bags, change] = canvas.getAllByRole("button");
    await expect(bags).toHaveAttribute("aria-expanded", "true");
    await expect(getComputedStyle(bags as Element).boxShadow).toContain(
      "inset"
    );
    await userEvent.click(change as HTMLElement);
    await expect(change).toHaveAttribute("aria-expanded", "true");
    await expect(bags).toHaveAttribute("aria-expanded", "false");
    await expect(canvas.getByText(CHANGES_RE)).toBeVisible();
  },
};

export const Keyboard: Story = {
  render: (args) => (
    <div className="max-w-lg p-10">
      <Accordion {...args} multiple>
        <Items />
      </Accordion>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole("button");
    (buttons[0] as HTMLElement).focus();
    await userEvent.keyboard("{Enter}");
    await userEvent.tab();
    await expect(buttons[1]).toHaveFocus();
    await userEvent.tab();
    await expect(buttons[2]).toHaveFocus();
    await userEvent.keyboard(" ");
    await waitFor(() =>
      expect(
        canvas
          .getAllByRole("button")
          .map((b) => b.getAttribute("aria-expanded"))
      ).toEqual(["true", "false", "true"])
    );
  },
};

export const FlatInCard: Story = {
  args: { variant: "flat" },
  render: (args) => (
    <div className="max-w-lg p-10">
      <Card>
        <CardContent>
          <Accordion {...args}>
            <Items />
          </Accordion>
        </CardContent>
      </Card>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const item = canvasElement.querySelector('[data-slot="accordion-item"]');
    await expect(getComputedStyle(item as Element).boxShadow).toBe("none");
  },
};

export const Disabled: Story = {
  render: (args) => (
    <div className="max-w-lg p-10">
      <Accordion {...args}>
        <AccordionItem value="upgrade">
          <AccordionTrigger>Upgrade to first class</AccordionTrigger>
          <AccordionContent>€40 per leg.</AccordionContent>
        </AccordionItem>
        <AccordionItem disabled value="lounge">
          <AccordionTrigger>Lounge access (sold out)</AccordionTrigger>
          <AccordionContent>Not available.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const lounge = within(canvasElement).getByRole("button", {
      name: LOUNGE_RE,
    });
    await expect(lounge).toBeDisabled();
    await expect(lounge).toHaveAttribute("data-disabled");
  },
};
