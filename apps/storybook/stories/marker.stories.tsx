import { Marker, MarkerContent, MarkerIcon } from "@neomorphic-react/ui/marker";
import { Spinner } from "@neomorphic-react/ui/spinner";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Lock, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { expect, waitFor, within } from "storybook/test";

const meta = {
  title: "Components/Marker",
  component: Marker,
  parameters: {
    docs: {
      description: {
        component: `
A line of status in a transcript: a date, "Maya joined", "Thinking…". It
isn't a \`role="separator"\` (it carries information); the \`separator\` and
\`border\` variants only draw grooves, like \`Separator\`.

\`\`\`tsx
import { Marker, MarkerContent, MarkerIcon } from "@neomorphic-react/ui/marker";

<Marker variant="separator"><MarkerContent>Today</MarkerContent></Marker>
<Marker role="status" shimmer>
  <MarkerIcon><Spinner aria-hidden className="size-4" /></MarkerIcon>
  <MarkerContent>Thinking…</MarkerContent>
</Marker>
\`\`\`

For progress that changes while the reader watches, give the marker
\`role="status"\` so the change is announced, and \`shimmer\` to sweep a
shine across the text (static under reduced motion). Links inside are
underlined.
`,
      },
    },
  },
  args: { variant: "default", shimmer: false },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "separator", "border"],
    },
  },
} satisfies Meta<typeof Marker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-96 p-10">
      <Marker {...args}>
        <MarkerIcon>
          <UserPlus />
        </MarkerIcon>
        <MarkerContent>Marcus joined the chat</MarkerContent>
      </Marker>
    </div>
  ),
};

/** The three variants; none is announced as a separator. */
export const Variants: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-8 p-10">
      <Marker>
        <MarkerIcon>
          <Lock />
        </MarkerIcon>
        <MarkerContent>
          Messages are end-to-end encrypted.{" "}
          <a href="#privacy">Learn more about encryption</a>
        </MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>Today</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerContent>Earlier messages</MarkerContent>
      </Marker>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole("separator")).toBeNull();
    await expect(
      canvas.getByRole("link", { name: "Learn more about encryption" })
    ).toBeVisible();
  },
};

function Thinking() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setDone(true), 1500);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <Marker role="status" shimmer={!done}>
      {done ? null : (
        <MarkerIcon>
          <Spinner aria-hidden="true" className="size-4" size="sm" />
        </MarkerIcon>
      )}
      <MarkerContent>
        {done ? "Thought for 2 seconds" : "Thinking…"}
      </MarkerContent>
    </Marker>
  );
}

/** Live progress: announced, shimmering until it settles. */
export const Status: Story = {
  render: () => (
    <div className="w-96 p-10">
      <Thinking />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const status = canvas.getByRole("status");
    await expect(status).toHaveTextContent("Thinking…");
    await expect(status).toHaveAttribute("data-shimmer");
    await waitFor(
      () => expect(status).toHaveTextContent("Thought for 2 seconds"),
      { timeout: 3000 }
    );
    await expect(status).not.toHaveAttribute("data-shimmer");
  },
};
