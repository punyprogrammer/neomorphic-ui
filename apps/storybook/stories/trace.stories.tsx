import { CodeBlock, CodeBlockContent } from "@neomorphic-react/ui/code-block";
import { Spinner } from "@neomorphic-react/ui/spinner";
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@neomorphic-react/ui/trace";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleAlert, FileSearch, Globe, Terminal } from "lucide-react";
import { expect, userEvent, within } from "storybook/test";

const TESTS = /Ran the unit tests/;
const TEST_FILES = /Test Files/;
const CHANGELOG = /Fetched the changelog/;
const CONTINUING = /continuing with the release notes/;

const meta = {
  title: "Components/Trace",
  component: Trace,
  parameters: {
    docs: {
      description: {
        component: `
An agent's working steps. Each \`TraceLine\` has a \`TraceIcon\`, a
truncating \`TraceTitle\` and a \`TraceDescription\` (a count or a time).
\`status\` is \`running\` (the title shimmers), \`pending\` (dimmed) or
\`error\`; finished steps have none. Wrap a line in a \`TraceCollapsible\` to
show its output under a groove.

\`\`\`tsx
import {
  Trace, TraceCollapsible, TraceCollapsibleContent, TraceCollapsibleTrigger,
  TraceDescription, TraceIcon, TraceLine, TraceTitle,
} from "@neomorphic-react/ui/trace";

<Trace>
  <TraceLine status="running">
    <TraceIcon><Spinner aria-hidden className="size-4" /></TraceIcon>
    <TraceTitle>Searching the web</TraceTitle>
  </TraceLine>
  <TraceCollapsible>
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceIcon><Terminal /></TraceIcon>
        <TraceTitle>Ran the tests</TraceTitle>
        <TraceDescription>2.4s</TraceDescription>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>…</TraceCollapsibleContent>
  </TraceCollapsible>
</Trace>
\`\`\`

Put a running trace in a \`role="status"\` region if its progress should be
announced. Use a \`sm\` \`CodeBlock\` for command output.
`,
      },
    },
  },
} satisfies Meta<typeof Trace>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[28rem] p-10">
      <Trace>
        <TraceLine>
          <TraceIcon>
            <FileSearch />
          </TraceIcon>
          <TraceTitle>Read 3 files</TraceTitle>
          <TraceDescription>0.2s</TraceDescription>
        </TraceLine>
        <TraceCollapsible>
          <TraceCollapsibleTrigger>
            <TraceLine>
              <TraceIcon>
                <Terminal />
              </TraceIcon>
              <TraceTitle>Ran the unit tests</TraceTitle>
              <TraceDescription>2.4s</TraceDescription>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <CodeBlock size="sm">
              <CodeBlockContent>{`$ vitest run
 ✓ src/bubble.test.tsx (4 tests)
 ✓ src/message.test.tsx (2 tests)
 Test Files  2 passed (2)`}</CodeBlockContent>
            </CodeBlock>
          </TraceCollapsibleContent>
        </TraceCollapsible>
        <TraceCollapsible>
          <TraceCollapsibleTrigger>
            <TraceLine status="error">
              <TraceIcon>
                <CircleAlert />
              </TraceIcon>
              <TraceTitle>Fetched the changelog</TraceTitle>
              <TraceDescription>404</TraceDescription>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            The page wasn't found; continuing with the release notes in the
            repository instead.
          </TraceCollapsibleContent>
        </TraceCollapsible>
        <TraceLine status="running">
          <TraceIcon>
            <Spinner aria-hidden="true" className="size-4" size="sm" />
          </TraceIcon>
          <TraceTitle>Searching the web for “neumorphism contrast”</TraceTitle>
        </TraceLine>
        <TraceLine status="pending">
          <TraceIcon>
            <Globe />
          </TraceIcon>
          <TraceTitle>Summarise the findings</TraceTitle>
        </TraceLine>
      </Trace>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tests = canvas.getByRole("button", { name: TESTS });
    await expect(tests).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(tests);
    await expect(tests).toHaveAttribute("aria-expanded", "true");
    await expect(canvas.getByText(TEST_FILES)).toBeVisible();

    // The output is a focusable region, then the next step.
    const error = canvas.getByRole("button", { name: CHANGELOG });
    await userEvent.keyboard("{Tab}");
    await expect(canvasElement.querySelector("pre")).toHaveFocus();
    await userEvent.keyboard("{Tab}");
    await expect(error).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(canvas.getByText(CONTINUING)).toBeVisible();
    await expect(
      canvas.getByText("Searching the web for “neumorphism contrast”")
        .parentElement
    ).toHaveAttribute("data-status", "running");
  },
};
