import { Button } from "@neomorphic-ui/react/button";
import { Kbd, KbdGroup } from "@neomorphic-ui/react/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@neomorphic-ui/react/tooltip";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Save } from "lucide-react";
import { expect, within } from "storybook/test";

const meta = {
  title: "Components/Kbd",
  component: Kbd,
  parameters: {
    docs: {
      description: {
        component: `
A keyboard key as a small raised cap. \`KbdGroup\` holds a chord or sequence.

\`\`\`tsx
import { Kbd, KbdGroup } from "@neomorphic-ui/react/kbd";

<KbdGroup>
  <Kbd aria-label="Command">⌘</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>
\`\`\`

Screen readers don't read symbols like ⌘ and ⇧ reliably: give those keys an
\`aria-label\`.
`,
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md"] },
  },
  args: {
    size: "md",
  },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center gap-6 p-10">
      <KbdGroup>
        <Kbd {...args} aria-label="Command">
          ⌘
        </Kbd>
        <Kbd {...args}>K</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd {...args}>Ctrl</Kbd>
        <span>+</span>
        <Kbd {...args}>B</Kbd>
      </KbdGroup>
      <Kbd {...args}>Esc</Kbd>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText("Command")).toHaveTextContent("⌘");
    await expect(getComputedStyle(canvas.getByText("Esc")).boxShadow).not.toBe(
      "none"
    );
  },
};

/** In running text and in a tooltip, the cap stays raised on its surface. */
export const InContext: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-8 p-10">
      <p className="text-muted-foreground text-sm">
        Press <Kbd size="sm">/</Kbd> to search, or{" "}
        <KbdGroup>
          <Kbd aria-label="Shift" size="sm">
            ⇧
          </Kbd>
          <Kbd size="sm">?</Kbd>
        </KbdGroup>{" "}
        for every shortcut.
      </p>
      <Tooltip defaultOpen>
        <TooltipTrigger render={<Button aria-label="Save" icon={<Save />} />} />
        <TooltipContent className="flex items-center gap-2" side="right">
          Save
          <KbdGroup>
            <Kbd aria-label="Command" size="sm">
              ⌘
            </Kbd>
            <Kbd size="sm">S</Kbd>
          </KbdGroup>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};
