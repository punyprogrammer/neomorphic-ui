import {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyInlineCode,
  TypographyLarge,
  TypographyLead,
  TypographyList,
  TypographyMuted,
  TypographyP,
  TypographySmall,
} from "@neomorphic-react/ui/typography";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

const meta = {
  title: "Components/Typography",
  component: TypographyP,
  parameters: {
    docs: {
      description: {
        component: `
Text styles as components: headings, body, lead, muted, a blockquote in a
shallow well and inline code pressed into the line. Each renders its own
element; \`render\` swaps it while keeping the style.

\`\`\`tsx
import { TypographyH2, TypographyP } from "@neomorphic-react/ui/typography";

<TypographyH2 render={<h1 />}>Your trips</TypographyH2>
<TypographyP>Three upcoming, one past.</TypographyP>
\`\`\`

Headings use \`--font-heading\` when the theme sets one, else the body font.
`,
      },
    },
  },
} satisfies Meta<typeof TypographyP>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Article: Story = {
  render: () => (
    <article className="max-w-2xl p-10">
      <TypographyH1>The slow road to Lisbon</TypographyH1>
      <TypographyLead>
        Three days, two trains and one missed connection along the Atlantic
        coast.
      </TypographyLead>
      <TypographyH2 className="mt-10">Day one</TypographyH2>
      <TypographyP>
        The overnight sleeper leaves at 21:40. Book a berth with{" "}
        <TypographyInlineCode>seat=lower</TypographyInlineCode> if you can; the
        upper bunks run hot.
      </TypographyP>
      <TypographyBlockquote>
        "The best part of the trip was the part we hadn't planned."
      </TypographyBlockquote>
      <TypographyH3 className="mt-8">What to pack</TypographyH3>
      <TypographyList>
        <li>A light jacket for the coast</li>
        <li>Snacks: the dining car closes at 22:00</li>
        <li>A paper copy of the ticket</li>
      </TypographyList>
      <TypographyH4>Costs</TypographyH4>
      <TypographyP>About €140 each, booked six weeks out.</TypographyP>
    </article>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("heading", { level: 1 })).toHaveTextContent(
      "The slow road to Lisbon"
    );
    await expect(canvas.getAllByRole("listitem")).toHaveLength(3);
  },
};

export const Scale: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-10">
      <TypographyH1>Heading 1</TypographyH1>
      <TypographyH2>Heading 2</TypographyH2>
      <TypographyH3>Heading 3</TypographyH3>
      <TypographyH4>Heading 4</TypographyH4>
      <TypographyLarge>Large text</TypographyLarge>
      <TypographyP>Body paragraph</TypographyP>
      <TypographySmall>Small text</TypographySmall>
      <TypographyMuted>Muted text</TypographyMuted>
    </div>
  ),
};
