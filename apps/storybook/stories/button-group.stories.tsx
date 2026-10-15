import { Button } from "@neomorphic-react/ui/button";
import {
  ButtonGroup,
  ButtonGroupText,
} from "@neomorphic-react/ui/button-group";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Italic,
  Minus,
  Plus,
  Underline,
} from "lucide-react";
import { useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";

const TRANSPARENT = /rgba\(0, 0, 0, 0\)/g;
const COLOR = /(?:rgb|hsl|lab|lch|oklab|oklch|color)a?\(/;

/** True when every box-shadow layer is transparent. */
function isFlat(element: Element) {
  return !COLOR.test(
    getComputedStyle(element).boxShadow.replace(TRANSPARENT, "")
  );
}

const meta = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  parameters: {
    docs: {
      description: {
        component: `
Joins \`Button\`s into one raised slab, split by grooves, like the kit's
‹ › stepper. Segments rest flat in the slab and sink into it while pressed
(or while \`aria-pressed\`). \`ButtonGroupText\` adds a non-interactive
segment, such as a page readout.

\`\`\`tsx
import { Button } from "@neomorphic-react/ui/button";
import { ButtonGroup, ButtonGroupText } from "@neomorphic-react/ui/button-group";

<ButtonGroup aria-label="Pages">
  <Button aria-label="Previous page" icon={<ChevronLeft />} size="sm" />
  <ButtonGroupText>2 / 5</ButtonGroupText>
  <Button aria-label="Next page" icon={<ChevronRight />} size="sm" />
</ButtonGroup>
\`\`\`

The group is a \`role="group"\`: label it with what the buttons control. Disable
a step at its bound rather than hiding it, so the layout doesn't jump.
`,
      },
    },
  },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
    shape: { control: "inline-radio", options: ["rounded", "pill"] },
  },
  args: {
    orientation: "horizontal",
    shape: "rounded",
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="p-10">
      <ButtonGroup {...args} aria-label="Steps">
        <Button
          aria-label="Previous"
          icon={
            args.orientation === "vertical" ? <ChevronUp /> : <ChevronLeft />
          }
          size="sm"
        />
        <Button
          aria-label="Next"
          icon={
            args.orientation === "vertical" ? <ChevronDown /> : <ChevronRight />
          }
          size="sm"
        />
      </ButtonGroup>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole("group", { name: "Steps" });
    await expect(isFlat(group)).toBe(false);
    // Segments drop their own raised shadow inside the slab.
    await expect(canvas.getAllByRole("button").map(isFlat)).toEqual([
      true,
      true,
    ]);
  },
};

/** The kit's ‹ › pair at the start of a list: back is disabled. */
export const KitReplica: Story = {
  render: () => (
    <div className="p-12">
      <ButtonGroup aria-label="Slides">
        <Button
          aria-label="Previous slide"
          disabled
          icon={<ChevronLeft />}
          size="sm"
        />
        <Button aria-label="Next slide" icon={<ChevronRight />} size="sm" />
      </ButtonGroup>
    </div>
  ),
};

function Pager({ total = 5 }: { total?: number }) {
  const [page, setPage] = useState(1);
  return (
    <ButtonGroup aria-label="Pagination">
      <Button
        aria-label="Previous page"
        disabled={page === 1}
        icon={<ChevronLeft />}
        onClick={() => setPage((p) => p - 1)}
        size="sm"
      />
      <ButtonGroupText aria-live="polite">
        {page} / {total}
      </ButtonGroupText>
      <Button
        aria-label="Next page"
        disabled={page === total}
        icon={<ChevronRight />}
        onClick={() => setPage((p) => p + 1)}
        size="sm"
      />
    </ButtonGroup>
  );
}

/** Prev/next stepper with a live readout; each end disables at its bound. */
export const Stepper: Story = {
  render: () => (
    <div className="p-12">
      <Pager />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const prev = canvas.getByRole("button", { name: "Previous page" });
    const next = canvas.getByRole("button", { name: "Next page" });
    await expect(prev).toBeDisabled();
    await userEvent.click(next);
    await userEvent.click(next);
    await expect(canvas.getByText("3 / 5")).toBeInTheDocument();
    await expect(prev).toBeEnabled();
    await userEvent.click(next);
    await userEvent.click(next);
    await expect(next).toBeDisabled();
  },
};

function QuantityStepper() {
  const [quantity, setQuantity] = useState(1);
  return (
    <ButtonGroup aria-label="Quantity" shape="pill">
      <Button
        aria-label="Decrease quantity"
        disabled={quantity === 0}
        icon={<Minus />}
        onClick={() => setQuantity((q) => q - 1)}
        size="sm"
      />
      <ButtonGroupText className="min-w-10" render={<output />}>
        {quantity}
      </ButtonGroupText>
      <Button
        aria-label="Increase quantity"
        icon={<Plus />}
        onClick={() => setQuantity((q) => q + 1)}
        size="sm"
      />
    </ButtonGroup>
  );
}

/** A pill slab around − and +, with the value as an `<output>`. */
export const Quantity: Story = {
  render: () => (
    <div className="p-12">
      <QuantityStepper />
    </div>
  ),
};

/** Text buttons share the slab too; corners follow `shape`. */
export const WithLabels: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-8 p-10">
      <ButtonGroup aria-label="Navigate">
        <Button icon={<ChevronLeft />}>Back</Button>
        <Button icon={<ChevronRight />} iconPosition="end">
          Next
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Navigate, pill" shape="pill">
        <Button icon={<ChevronLeft />}>Back</Button>
        <Button icon={<ChevronRight />} iconPosition="end">
          Next
        </Button>
      </ButtonGroup>
    </div>
  ),
};

function FormattingToolbar() {
  const [marks, setMarks] = useState<Record<string, boolean>>({ bold: true });
  const [align, setAlign] = useState("left");
  const toggle = (mark: string) =>
    setMarks((m) => ({ ...m, [mark]: !m[mark] }));
  return (
    <div className="flex gap-6">
      <ButtonGroup aria-label="Text style">
        {(
          [
            ["bold", "Bold", <Bold key="b" />],
            ["italic", "Italic", <Italic key="i" />],
            ["underline", "Underline", <Underline key="u" />],
          ] as const
        ).map(([mark, label, icon]) => (
          <Button
            aria-label={label}
            aria-pressed={Boolean(marks[mark])}
            icon={icon}
            key={mark}
            onClick={() => toggle(mark)}
            size="sm"
          />
        ))}
      </ButtonGroup>
      <ButtonGroup aria-label="Alignment">
        {(
          [
            ["left", "Align left", <AlignLeft key="l" />],
            ["center", "Align center", <AlignCenter key="c" />],
            ["right", "Align right", <AlignRight key="r" />],
          ] as const
        ).map(([value, label, icon]) => (
          <Button
            aria-label={label}
            aria-pressed={align === value}
            icon={icon}
            key={value}
            onClick={() => setAlign(value)}
            size="sm"
          />
        ))}
      </ButtonGroup>
    </div>
  );
}

/**
 * Toggled segments (`aria-pressed`) stay sunk into the slab. For a true
 * single-choice control, `ToggleGroup` (planned) adds roving focus.
 */
export const Pressed: Story = {
  render: () => (
    <div className="p-10">
      <FormattingToolbar />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const bold = canvas.getByRole("button", { name: "Bold" });
    const italic = canvas.getByRole("button", { name: "Italic" });
    await expect(isFlat(bold)).toBe(false);
    await expect(isFlat(italic)).toBe(true);
    await userEvent.click(italic);
    await expect(italic).toHaveAttribute("aria-pressed", "true");
    await waitFor(() => expect(isFlat(italic)).toBe(false));
  },
};

/** Stacked: corners and grooves follow the axis. */
export const Vertical: Story = {
  render: () => (
    <div className="flex gap-8 p-10">
      <ButtonGroup aria-label="Scroll" orientation="vertical">
        <Button aria-label="Up" icon={<ChevronUp />} size="sm" />
        <Button aria-label="Down" icon={<ChevronDown />} size="sm" />
      </ButtonGroup>
      <ButtonGroup aria-label="Zoom" orientation="vertical" shape="pill">
        <Button aria-label="Zoom in" icon={<Plus />} size="sm" />
        <Button aria-label="Zoom out" icon={<Minus />} size="sm" />
      </ButtonGroup>
    </div>
  ),
};

/** Sizes come from the buttons; the slab wraps them. */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-8 p-10">
      {(["sm", "md", "lg"] as const).map((size) => (
        <ButtonGroup aria-label={`Steps, ${size}`} key={size}>
          <Button aria-label="Previous" icon={<ChevronLeft />} size={size} />
          <Button aria-label="Next" icon={<ChevronRight />} size={size} />
        </ButtonGroup>
      ))}
    </div>
  ),
};
