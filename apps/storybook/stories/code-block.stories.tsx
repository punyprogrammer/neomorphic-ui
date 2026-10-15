import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
  CodeBlockWrapButton,
} from "@neomorphic-react/ui/code-block";
import { useHighlightedCode } from "@neomorphic-react/ui/use-highlighted-code";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileCode, TerminalSquare } from "lucide-react";
import { expect, userEvent, waitFor, within } from "storybook/test";

const BUTTON = `import { Button } from "@neomorphic-react/ui/button";

export function Save({ pending }: { pending: boolean }) {
  return (
    <Button isLoading={pending} variant="primary">
      Save changes
    </Button>
  );
}
`;

const LONG = Array.from(
  { length: 24 },
  (_, i) => `export const token${i + 1} = "var(--neu-${i + 1})";`
).join("\n");

const meta = {
  title: "Components/Code Block",
  component: CodeBlock,
  parameters: {
    docs: {
      description: {
        component: `
Code in a well pressed into the surface: an optional \`CodeBlockHeader\`
(\`CodeBlockTitle\` and \`CodeBlockActions\`), \`CodeBlockContent\` and an
optional \`CodeBlockFooter\`. The content is a focusable region, so it
scrolls from the keyboard, and always reads left to right.

\`\`\`tsx
import {
  CodeBlock, CodeBlockActions, CodeBlockContent, CodeBlockCopyButton,
  CodeBlockHeader, CodeBlockTitle, CodeBlockWrapButton,
} from "@neomorphic-react/ui/code-block";

<CodeBlock>
  <CodeBlockHeader>
    <CodeBlockTitle>save.tsx</CodeBlockTitle>
    <CodeBlockActions>
      <CodeBlockWrapButton />
      <CodeBlockCopyButton value={code} />
    </CodeBlockActions>
  </CodeBlockHeader>
  <CodeBlockContent lineNumbers>{code}</CodeBlockContent>
</CodeBlock>
\`\`\`

\`lineNumbers\` and \`startLine\` number the lines; \`wrap\` (or a
\`CodeBlockWrapButton\`) wraps long ones; \`maxLines\` clips the block with a
Show more button. Mark lines with \`CodeBlockLine\` \`variant\`s
\`highlighted\`, \`added\` and \`removed\`. Actions placed straight in the block
float over its corner on hover or focus.

Highlighting is separate: \`useHighlightedCode\` (from
\`@neomorphic-react/ui/use-highlighted-code\`) loads Shiki's JavaScript engine,
the language and the theme on first use. Install the optional \`shiki\`
package to use it.

\`\`\`tsx
const { lines } = useHighlightedCode(code, { language: "tsx" });

<CodeBlockContent lineNumbers>
  {lines.map((line, i) => <CodeBlockLine key={i}>{line}</CodeBlockLine>)}
</CodeBlockContent>
\`\`\`
`,
      },
    },
  },
  args: { size: "default", variant: "default" },
  argTypes: {
    size: { control: "inline-radio", options: ["default", "sm"] },
    variant: { control: "inline-radio", options: ["default", "destructive"] },
  },
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[34rem] p-10">
      <CodeBlock {...args}>
        <CodeBlockHeader>
          <CodeBlockTitle>
            <FileCode />
            save.tsx
          </CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockWrapButton />
            <CodeBlockCopyButton value={BUTTON} />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent lineNumbers>{BUTTON}</CodeBlockContent>
      </CodeBlock>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const region = canvasElement.querySelector("pre");
    await expect(region).toHaveAttribute("tabindex", "0");
    await expect(
      canvasElement.querySelectorAll("[data-slot=code-block-line]")
    ).toHaveLength(9);
    const wrap = canvas.getByRole("button", { name: "Wrap lines" });
    await userEvent.click(wrap);
    await expect(wrap).toHaveAttribute("aria-pressed", "true");
    await expect(region).toHaveAttribute("data-wrap");
    await userEvent.click(wrap);
  },
};

/** A diff: removed and added lines, numbered from line 12. */
export const Diff: Story = {
  render: () => (
    <div className="w-[34rem] p-10">
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>button.tsx</CodeBlockTitle>
        </CodeBlockHeader>
        <CodeBlockContent lineNumbers startLine={12}>
          <CodeBlockLine>{"const ghost = cva("}</CodeBlockLine>
          <CodeBlockLine variant="removed">
            {'  "bg-transparent shadow-none",'}
          </CodeBlockLine>
          <CodeBlockLine variant="added">
            {'  "bg-transparent shadow-neu-flat inset-shadow-neu-flat",'}
          </CodeBlockLine>
          <CodeBlockLine variant="highlighted">
            {'  "hover:bg-neu-convex hover:shadow-neu-sm",'}
          </CodeBlockLine>
          <CodeBlockLine>{");"}</CodeBlockLine>
        </CodeBlockContent>
      </CodeBlock>
    </div>
  ),
};

/** Floating actions, shown on hover or focus, and a Show more for long code. */
export const LongWithFloatingActions: Story = {
  render: () => (
    <div className="w-[34rem] p-10">
      <CodeBlock>
        <CodeBlockActions>
          <CodeBlockCopyButton value={LONG} />
        </CodeBlockActions>
        <CodeBlockContent lineNumbers maxLines={6}>
          {LONG}
        </CodeBlockContent>
      </CodeBlock>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const more = canvas.getByRole("button", { name: "Show 18 more lines" });
    const region = canvasElement.querySelector("pre");
    await expect(region).toHaveAttribute("data-clipped");
    const clipped = region?.clientHeight ?? 0;
    await userEvent.click(more);
    await expect(region).not.toHaveAttribute("data-clipped");
    await expect(region?.clientHeight ?? 0).toBeGreaterThan(clipped);
    await expect(more).toHaveAccessibleName("Show less");
  },
};

/** An error, as `sm` output with a footer. */
export const ErrorOutput: Story = {
  render: () => (
    <div className="w-[30rem] p-10">
      <CodeBlock size="sm" variant="destructive">
        <CodeBlockHeader>
          <CodeBlockTitle>
            <TerminalSquare />
            pnpm build
          </CodeBlockTitle>
        </CodeBlockHeader>
        <CodeBlockContent>{`error TS2345: Argument of type 'string' is not
assignable to parameter of type 'number'.
  src/dial.tsx:42:18`}</CodeBlockContent>
        <CodeBlockFooter>Exit code 1</CodeBlockFooter>
      </CodeBlock>
    </div>
  ),
};

function Highlighted() {
  const { lines, status } = useHighlightedCode(BUTTON, { language: "tsx" });
  return (
    <CodeBlock data-status={status}>
      <CodeBlockHeader>
        <CodeBlockTitle>save.tsx</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={BUTTON} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent lineNumbers>
        {lines.map((line, index) => (
          <CodeBlockLine key={index}>{line}</CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  );
}

/** Tokens coloured by `useHighlightedCode` (Shiki, loaded on demand). */
export const SyntaxHighlighting: Story = {
  render: () => (
    <div className="w-[34rem] p-10">
      <Highlighted />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const block = canvasElement.querySelector("[data-slot=code-block]");
    await waitFor(() => expect(block).toHaveAttribute("data-status", "ready"), {
      timeout: 10_000,
    });
    await expect(
      canvasElement.querySelectorAll("[data-slot=code-block-line] span[style]")
        .length
    ).toBeGreaterThan(10);
  },
};
