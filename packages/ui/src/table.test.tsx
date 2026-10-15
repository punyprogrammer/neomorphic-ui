import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

function Fares(props: Partial<React.ComponentProps<typeof Table>>) {
  return (
    <Table {...props}>
      <TableCaption>Fares this week</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Route</TableHead>
          <TableHead>Fare</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Lisbon to Porto</TableCell>
          <TableCell>€24</TableCell>
        </TableRow>
        <TableRow aria-selected="true">
          <TableCell>Porto to Faro</TableCell>
          <TableCell>€31</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>€55</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

describe("Table", () => {
  it("renders a captioned table with header cells", () => {
    render(<Fares />);
    const table = screen.getByRole("table", { name: "Fares this week" });
    expect(within(table).getAllByRole("columnheader")).toHaveLength(2);
    expect(within(table).getAllByRole("row")).toHaveLength(4);
  });

  it("wraps the table in a sideways-scrolling container", () => {
    render(<Fares />);
    const container = screen.getByRole("table").parentElement;
    expect(container).toHaveAttribute("data-slot", "table-container");
    expect(container).toHaveClass("overflow-x-auto");
    expect(container).toHaveAttribute("data-variant", "flat");
  });

  it("separates rows with grooves", () => {
    render(<Fares />);
    expect(screen.getByText("Lisbon to Porto")).toHaveClass(
      "border-b",
      "shadow-[0_1px_0_var(--neu-light)]"
    );
  });

  it("raises or sinks the container by variant", () => {
    const { rerender } = render(<Fares variant="raised" />);
    expect(screen.getByRole("table").parentElement).toHaveClass("shadow-neu");
    rerender(<Fares variant="inset" />);
    expect(screen.getByRole("table").parentElement).toHaveClass(
      "inset-shadow-neu"
    );
  });

  it("marks a sticky header so its cells pin", () => {
    render(<Fares containerProps={{ className: "max-h-40" }} stickyHeader />);
    const table = screen.getByRole("table");
    expect(table).toHaveAttribute("data-sticky-header", "true");
    expect(table.parentElement).toHaveClass("max-h-40", "overflow-y-auto");
  });

  it("tints a selected row", () => {
    render(<Fares />);
    const row = screen.getByText("Porto to Faro").closest("tr");
    expect(row).toHaveAttribute("aria-selected", "true");
    expect(row?.className).toContain(
      "aria-selected:bg-[color-mix(in_oklab,var(--color-primary)_9%,transparent)]"
    );
  });
});
