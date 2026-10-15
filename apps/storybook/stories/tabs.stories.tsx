import { Card, CardContent } from "@neomorphic-ui/react/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@neomorphic-ui/react/tabs";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BedDouble, Plane, TrainFront } from "lucide-react";
import { expect, userEvent, waitFor, within } from "storybook/test";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component: `
Panels behind a row of tabs. The list is a raised slab; a well slides under
the active tab, which also takes the primary colour and weight.

\`\`\`tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@neomorphic-ui/react/tabs";

<Tabs defaultValue="flights">
  <TabsList aria-label="Search">
    <TabsTrigger value="flights">Flights</TabsTrigger>
    <TabsTrigger value="trains">Trains</TabsTrigger>
  </TabsList>
  <TabsContent value="flights">…</TabsContent>
  <TabsContent value="trains">…</TabsContent>
</Tabs>
\`\`\`

\`variant="line"\` on the list swaps the slab for a primary bar. Arrow keys
move between tabs; add \`activateOnFocus\` to the list to switch panels as
focus moves. Set \`--tabs-active\` to recolour the active tab.
`,
      },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

function Panels() {
  return (
    <>
      <TabsContent value="flights">
        <Card>
          <CardContent>12 flights from Lisbon today.</CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="trains">
        <Card>
          <CardContent>34 trains from Lisbon today.</CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="stays">
        <Card>
          <CardContent>210 places to stay in Porto.</CardContent>
        </Card>
      </TabsContent>
    </>
  );
}

export const Default: Story = {
  render: (args) => (
    <div className="max-w-lg p-10">
      <Tabs defaultValue="flights" {...args}>
        <TabsList aria-label="Search">
          <TabsTrigger value="flights">
            <Plane aria-hidden="true" />
            Flights
          </TabsTrigger>
          <TabsTrigger value="trains">
            <TrainFront aria-hidden="true" />
            Trains
          </TabsTrigger>
          <TabsTrigger value="stays">
            <BedDouble aria-hidden="true" />
            Stays
          </TabsTrigger>
        </TabsList>
        <Panels />
      </Tabs>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trains = canvas.getByRole("tab", { name: "Trains" });
    await userEvent.click(trains);
    await expect(trains).toHaveAttribute("aria-selected", "true");
    await waitFor(() =>
      expect(canvas.getByRole("tabpanel")).toHaveTextContent("34 trains")
    );
    const indicator = canvasElement.querySelector(
      '[data-slot="tabs-indicator"]'
    ) as HTMLElement;
    await waitFor(() =>
      expect(
        Math.abs(
          indicator.getBoundingClientRect().left -
            trains.getBoundingClientRect().left
        )
      ).toBeLessThan(2)
    );
  },
};

export const Keyboard: Story = {
  render: (args) => (
    <div className="max-w-lg p-10">
      <Tabs defaultValue="flights" {...args}>
        <TabsList activateOnFocus aria-label="Search">
          <TabsTrigger value="flights">Flights</TabsTrigger>
          <TabsTrigger value="trains">Trains</TabsTrigger>
          <TabsTrigger value="stays">Stays</TabsTrigger>
        </TabsList>
        <Panels />
      </Tabs>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByRole("tab", { name: "Flights" }).focus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(canvas.getByRole("tab", { name: "Trains" })).toHaveFocus();
    await waitFor(() =>
      expect(canvas.getByRole("tabpanel")).toHaveTextContent("34 trains")
    );
    await userEvent.keyboard("{ArrowLeft}{ArrowLeft}");
    await expect(canvas.getByRole("tab", { name: "Stays" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  },
};

export const Line: Story = {
  render: (args) => (
    <div className="max-w-lg p-10">
      <Tabs defaultValue="trains" {...args}>
        <TabsList aria-label="Search" variant="line">
          <TabsTrigger value="flights">Flights</TabsTrigger>
          <TabsTrigger value="trains">Trains</TabsTrigger>
          <TabsTrigger disabled value="stays">
            Stays
          </TabsTrigger>
        </TabsList>
        <Panels />
      </Tabs>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("tablist")).toHaveAttribute(
      "data-variant",
      "line"
    );
    await expect(canvas.getByRole("tab", { name: "Stays" })).toHaveAttribute(
      "aria-disabled",
      "true"
    );
  },
};

export const Vertical: Story = {
  render: (args) => (
    <div className="max-w-xl p-10">
      <Tabs defaultValue="flights" orientation="vertical" {...args}>
        <TabsList aria-label="Search">
          <TabsTrigger className="justify-start" value="flights">
            Flights
          </TabsTrigger>
          <TabsTrigger className="justify-start" value="trains">
            Trains
          </TabsTrigger>
          <TabsTrigger className="justify-start" value="stays">
            Stays
          </TabsTrigger>
        </TabsList>
        <Panels />
      </Tabs>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("tablist")).toHaveAttribute(
      "aria-orientation",
      "vertical"
    );
    canvas.getByRole("tab", { name: "Flights" }).focus();
    await userEvent.keyboard("{ArrowDown}");
    await expect(canvas.getByRole("tab", { name: "Trains" })).toHaveFocus();
  },
};
