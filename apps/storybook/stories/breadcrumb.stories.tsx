import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@neomorphic-ui/react/breadcrumb";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slash } from "lucide-react";
import { expect, within } from "storybook/test";

const meta = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    docs: {
      description: {
        component: `
The trail to the current page. Ancestors are links; the current page is
pressed into the surface and carries \`aria-current="page"\`.

\`\`\`tsx
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@neomorphic-ui/react/breadcrumb";

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Booking</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
\`\`\`

Pass \`render={<Link href="…" />}\` to \`BreadcrumbLink\` for a router link.
Separators are hidden from screen readers; the ellipsis is named "More pages".
`,
      },
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="p-10">
      <Breadcrumb {...args}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#home">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#trips">Trips</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Lisbon to Porto</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole("navigation", { name: "Breadcrumb" });
    await expect(within(nav).getAllByRole("listitem")).toHaveLength(3);
    await expect(canvas.getByText("Lisbon to Porto")).toHaveAttribute(
      "aria-current",
      "page"
    );
    await expect(canvas.getByRole("link", { name: "Trips" })).toHaveAttribute(
      "href",
      "#trips"
    );
  },
};

export const Collapsed: Story = {
  render: (args) => (
    <div className="p-10">
      <Breadcrumb {...args}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#home">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#booking">Booking</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Seats</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByText("More pages")
    ).toBeInTheDocument();
  },
};

export const CustomSeparator: Story = {
  render: (args) => (
    <div className="p-10">
      <Breadcrumb {...args}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#docs">Docs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Components</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  ),
};
