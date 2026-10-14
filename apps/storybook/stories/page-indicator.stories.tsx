import { Button } from "@neomorphic-ui/react/button";
import { PageIndicator } from "@neomorphic-ui/react/page-indicator";
import { Surface } from "@neomorphic-ui/react/surface";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";

const meta = {
  title: "Components/PageIndicator",
  component: PageIndicator,
  parameters: {
    docs: {
      description: {
        component: `
The kit's three dots: which of several pages is showing. The other pages are
wells pressed into the surface; the current one rises out of it, filled.

\`\`\`tsx
import { PageIndicator } from "@neomorphic-ui/react/page-indicator";

// Passive: an image named "Page 2 of 3".
<PageIndicator count={3} value={1} />

// Clickable: page buttons, arrow keys, Home and End.
<PageIndicator aria-label="Slides" count={5} onValueChange={setPage} value={page} />
\`\`\`

\`value\` counts from 0. Rename pages with \`getAriaLabel\` (e.g. "Slide 2 of
5"). Set \`--page-indicator-fill\` to recolour the current dot.
`,
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
    count: { control: { type: "range", min: 1, max: 10 } },
    value: { control: { type: "range", min: 0, max: 9 } },
  },
  args: {
    count: 3,
    value: 0,
    size: "md",
    orientation: "horizontal",
  },
} satisfies Meta<typeof PageIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render(args) {
    const [page, setPage] = useState(args.value ?? 0);
    return (
      <div className="p-10">
        <PageIndicator
          {...args}
          aria-label="Pages"
          onValueChange={setPage}
          value={page}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByRole("button", { name: "Page 1 of 3" });
    const third = canvas.getByRole("button", { name: "Page 3 of 3" });
    await expect(first).toHaveAttribute("aria-current", "true");
    await userEvent.click(third);
    await expect(third).toHaveAttribute("aria-current", "true");
    await userEvent.keyboard("{ArrowLeft}");
    await expect(
      canvas.getByRole("button", { name: "Page 2 of 3" })
    ).toHaveFocus();
  },
};

/** The kit's three dots, second page current. */
export const KitReplica: Story = {
  render: () => (
    <div className="p-12">
      <PageIndicator count={3} value={1} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("img", { name: "Page 2 of 3" })
    ).toBeVisible();
  },
};

const SLIDES = [
  { title: "Track", body: "Log every run, ride and swim in one place." },
  { title: "Plan", body: "Build a week of training around your goals." },
  { title: "Share", body: "Send your best days to friends and coaches." },
];

/** An onboarding card: dots and the stepper drive the same page. */
export const Onboarding: Story = {
  render() {
    const [page, setPage] = useState(0);
    const slide = SLIDES[page];
    return (
      <div className="p-12">
        <Surface className="grid w-80 gap-6 p-6 text-center">
          <div aria-live="polite" className="grid gap-2">
            <h3 className="font-medium text-foreground text-lg">
              {slide.title}
            </h3>
            <p className="text-muted-foreground text-sm">{slide.body}</p>
          </div>
          <div className="flex items-center justify-between">
            <Button
              aria-label="Previous"
              disabled={page === 0}
              icon={<ChevronLeft />}
              onClick={() => setPage(page - 1)}
              shape="pill"
              size="sm"
            />
            <PageIndicator
              aria-label="Slides"
              count={SLIDES.length}
              getAriaLabel={(index, count) => `Slide ${index + 1} of ${count}`}
              onValueChange={setPage}
              value={page}
            />
            <Button
              aria-label="Next"
              disabled={page === SLIDES.length - 1}
              icon={<ChevronRight />}
              onClick={() => setPage(page + 1)}
              shape="pill"
              size="sm"
            />
          </div>
        </Surface>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Next" }));
    await expect(canvas.getByText("Plan")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Slide 2 of 3" })
    ).toHaveAttribute("aria-current", "true");
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="grid justify-items-start gap-6 p-10">
      {(["sm", "md", "lg"] as const).map((size) => (
        <PageIndicator count={4} key={size} size={size} value={1} />
      ))}
    </div>
  ),
};

/** Stacked beside a vertical pager; up and down arrows move between pages. */
export const Vertical: Story = {
  render() {
    const [page, setPage] = useState(2);
    return (
      <div className="p-10">
        <PageIndicator
          aria-label="Sections"
          count={5}
          onValueChange={setPage}
          orientation="vertical"
          value={page}
        />
      </div>
    );
  },
};

/** `--page-indicator-fill` recolours the current dot. */
export const CustomFill: Story = {
  render: () => (
    <div className="grid justify-items-start gap-6 p-10">
      <PageIndicator
        className="[--page-indicator-fill:oklch(0.54_0.22_350)]"
        count={3}
        value={0}
      />
      <PageIndicator
        className="[--page-indicator-fill:var(--color-destructive)]"
        count={3}
        value={2}
      />
    </div>
  ),
};
