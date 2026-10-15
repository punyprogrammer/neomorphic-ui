import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@neomorphic-ui/react/resizable";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

const meta = {
  title: "Components/Resizable",
  component: ResizablePanelGroup,
  parameters: {
    docs: {
      description: {
        component: `
Panels split by a groove that can be dragged or moved with the keyboard,
built on \`react-resizable-panels\`.

\`\`\`tsx
import {
  ResizableHandle, ResizablePanel, ResizablePanelGroup,
} from "@neomorphic-ui/react/resizable";

<ResizablePanelGroup orientation="horizontal">
  <ResizablePanel defaultSize="30" minSize="20">Inbox</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel>Message</ResizablePanel>
</ResizablePanelGroup>
\`\`\`

- Sizes are pixels as numbers and percentages as strings.
- The groove turns primary while hovered, focused or dragged; \`withHandle\`
  adds a raised grip that presses in while dragged.
- Focus the groove, then use the arrow keys to resize, Home/End to jump,
  and Enter to collapse a \`collapsible\` panel.
`,
      },
    },
  },
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const Pane = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-full items-center justify-center p-6 font-medium text-muted-foreground text-sm">
    {children}
  </div>
);

export const Default: Story = {
  render: () => (
    <div className="p-10">
      <div className="inset-shadow-neu-flat h-72 w-full max-w-2xl overflow-hidden rounded-2xl bg-neu-convex shadow-neu">
        <ResizablePanelGroup aria-label="Mail" orientation="horizontal">
          <ResizablePanel defaultSize="30" id="folders" minSize="20">
            <Pane>Folders</Pane>
          </ResizablePanel>
          <ResizableHandle aria-label="Resize folders" />
          <ResizablePanel id="message" minSize="30">
            <Pane>Message</Pane>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const handle = within(canvasElement).getByRole("separator", {
      name: "Resize folders",
    });
    await expect(handle).toHaveAttribute("aria-orientation", "vertical");
    const before = Number(handle.getAttribute("aria-valuenow"));
    handle.focus();
    await userEvent.keyboard("{ArrowRight}{ArrowRight}");
    await waitFor(() =>
      expect(Number(handle.getAttribute("aria-valuenow"))).toBeGreaterThan(
        before
      )
    );
    await expect(handle).toHaveAttribute("data-separator", "focus");
  },
};

export const WithHandle: Story = {
  render: () => (
    <div className="p-10">
      <div className="inset-shadow-neu-flat h-96 w-full max-w-2xl overflow-hidden rounded-2xl bg-neu-convex shadow-neu">
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel defaultSize="35" minSize="20">
            <Pane>Stations</Pane>
          </ResizablePanel>
          <ResizableHandle aria-label="Resize stations" withHandle />
          <ResizablePanel>
            <ResizablePanelGroup orientation="vertical">
              <ResizablePanel defaultSize="60">
                <Pane>Map</Pane>
              </ResizablePanel>
              <ResizableHandle aria-label="Resize map" withHandle />
              <ResizablePanel>
                <Pane>Timetable</Pane>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const map = canvas.getByRole("separator", { name: "Resize map" });
    await expect(map).toHaveAttribute("aria-orientation", "horizontal");
    const before = Number(map.getAttribute("aria-valuenow"));
    map.focus();
    await userEvent.keyboard("{ArrowUp}");
    await waitFor(() =>
      expect(Number(map.getAttribute("aria-valuenow"))).toBeLessThan(before)
    );
    await expect(
      canvasElement.querySelectorAll('[data-slot="resizable-handle-grip"]')
    ).toHaveLength(2);
  },
};
