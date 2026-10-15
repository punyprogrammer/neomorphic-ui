import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, screen, userEvent, waitFor, within } from "storybook/test";

import { DataTable } from "../../blocks/data-table";

const meta = {
  title: "Blocks/Data Table",
  component: DataTable,
  parameters: {
    docs: {
      description: {
        component: `
A bookings table built the way shadcn's data-table guide builds one:
\`@tanstack/react-table\` drives the state and the kit's parts draw it. It is
a block to copy, not a package component.

- A raised \`Table\`; selected rows take the primary tint and edge bar.
- Sortable headers are ghost \`Button\`s that turn primary while sorted,
  with \`aria-sort\` on the header cell.
- An \`Input\` filters by passenger; a \`DropdownMenu\` of checkbox items
  hides columns.
- \`Checkbox\`es select rows, with an indeterminate select-all for the page.
- \`Pagination\` renders buttons; the current page is pressed in.

Source: \`apps/storybook/blocks/data-table.tsx\`.
`,
      },
    },
  },
  args: {
    onSelectionChange: fn(),
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const bodyRows = (table: HTMLElement) =>
  within(table).getAllByRole("row").slice(1);

export const Default: Story = {
  render: (args) => (
    <div className="flex justify-center p-10">
      <DataTable {...args} />
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const table = canvas.getByRole("table", { name: "Bookings" });
    await expect(bodyRows(table)).toHaveLength(5);

    // Sort by amount, highest first.
    const amount = canvas.getByRole("button", { name: "Amount" });
    await userEvent.click(amount);
    await userEvent.click(amount);
    await expect(amount.closest("th")).toHaveAttribute(
      "aria-sort",
      "descending"
    );
    await expect(bodyRows(table)[0]).toHaveTextContent("Carla Reis");

    // Select a row, then the rest of the page.
    await userEvent.click(
      canvas.getByRole("checkbox", { name: "Select Carla Reis" })
    );
    await expect(bodyRows(table)[0]).toHaveAttribute("data-selected");
    await expect(
      canvas.getByRole("checkbox", { name: "Select all on this page" })
    ).toHaveAttribute("aria-checked", "mixed");
    await expect(args.onSelectionChange).toHaveBeenLastCalledWith(["BK-1044"]);
    await userEvent.click(
      canvas.getByRole("checkbox", { name: "Select all on this page" })
    );
    await expect(canvas.getByText("5 of 12 row(s) selected.")).toBeVisible();

    // Page two.
    await userEvent.click(canvas.getByRole("button", { name: "Page 2" }));
    await expect(
      canvas.getByRole("button", { name: "Page 2" })
    ).toHaveAttribute("aria-current", "page");
    await expect(
      canvas.getByRole("button", { name: "Go to previous page" })
    ).toBeEnabled();

    // Filter.
    await userEvent.type(
      canvas.getByRole("textbox", { name: "Filter passengers" }),
      "inês"
    );
    await waitFor(() => expect(bodyRows(table)).toHaveLength(1));
    await expect(bodyRows(table)[0]).toHaveTextContent("Inês Rocha");
    await userEvent.clear(
      canvas.getByRole("textbox", { name: "Filter passengers" })
    );

    // Hide the route column.
    await userEvent.click(canvas.getByRole("button", { name: "Columns" }));
    const route = await screen.findByRole("menuitemcheckbox", {
      name: "Route",
    });
    await waitFor(() => expect(route).toBeVisible(), { timeout: 4000 });
    await userEvent.click(route);
    await expect(
      within(table).queryByRole("columnheader", { name: "Route" })
    ).toBeNull();
    await userEvent.keyboard("{Escape}");
  },
};

export const Empty: Story = {
  render: (args) => (
    <div className="flex justify-center p-10">
      <DataTable {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByRole("textbox", { name: "Filter passengers" }),
      "Zé"
    );
    await expect(canvas.getByText("No bookings match.")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Go to next page" })
    ).toBeDisabled();
  },
};
