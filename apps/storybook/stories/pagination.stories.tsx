import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@neomorphic-ui/react/pagination";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component: `
Page links as raised buttons. The current page presses in and takes the
primary colour, and carries \`aria-current="page"\`.

\`\`\`tsx
import {
  Pagination, PaginationContent, PaginationEllipsis, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious,
} from "@neomorphic-ui/react/pagination";

<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="?page=1" /></PaginationItem>
    <PaginationItem><PaginationLink href="?page=1">1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="?page=2" isActive>2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationNext href="?page=3" /></PaginationItem>
  </PaginationContent>
</Pagination>
\`\`\`

Links are \`<a>\` elements; pass \`render={<Link … />}\` for a router link.
Previous and Next drop their text below the \`sm\` breakpoint but keep their
accessible names.
`,
      },
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

const LAST = 10;

function pagesAround(page: number): (number | "gap")[] {
  if (page <= 3) {
    return [1, 2, 3, 4, "gap", LAST];
  }
  if (page >= LAST - 2) {
    return [1, "gap", LAST - 3, LAST - 2, LAST - 1, LAST];
  }
  return [1, "gap", page - 1, page, page + 1, "gap", LAST];
}

function Pager() {
  const [page, setPage] = useState(2);
  const go = (next: number) => (event: React.MouseEvent) => {
    event.preventDefault();
    setPage(Math.min(LAST, Math.max(1, next)));
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`#page-${page - 1}`}
            onClick={go(page - 1)}
          />
        </PaginationItem>
        {pagesAround(page).map((item, i) => (
          <PaginationItem key={item === "gap" ? `gap-${i}` : item}>
            {item === "gap" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={`#page-${item}`}
                isActive={item === page}
                onClick={go(item)}
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href={`#page-${page + 1}`} onClick={go(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export const Default: Story = {
  render: () => (
    <div className="p-10">
      <Pager />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole("navigation", { name: "Pagination" });
    await expect(canvas.getByRole("link", { name: "2" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    await userEvent.click(
      canvas.getByRole("link", { name: "Go to next page" })
    );
    const three = canvas.getByRole("link", { name: "3" });
    await expect(three).toHaveAttribute("aria-current", "page");
    await expect(getComputedStyle(three).boxShadow).toContain("inset");
    await userEvent.click(canvas.getByRole("link", { name: "10" }));
    await expect(within(nav).getByRole("link", { name: "10" })).toHaveAttribute(
      "aria-current",
      "page"
    );
  },
};

export const Small: Story = {
  render: () => (
    <div className="p-10">
      <Pagination>
        <PaginationContent>
          {[1, 2, 3].map((n) => (
            <PaginationItem key={n}>
              <PaginationLink href={`#page-${n}`} isActive={n === 1} size="sm">
                {n}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole("link", { name: "1" });
    await expect(link.getBoundingClientRect().height).toBe(32);
  },
};
