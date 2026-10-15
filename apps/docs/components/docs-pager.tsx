import type { Item } from "fumadocs-core/page-tree";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const CARD =
  "inset-shadow-neu-flat group grid gap-1 rounded-xl bg-neu-convex p-4 shadow-neu-sm outline-none transition-shadow hover:shadow-neu focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2";

/** Links to the previous and next pages in the sidebar's order. */
export function DocsPager({
  next,
  previous,
}: {
  next?: Item;
  previous?: Item;
}) {
  if (!(next || previous)) {
    return null;
  }
  return (
    <nav
      aria-label="Previous and next page"
      className="mt-16 grid gap-4 sm:grid-cols-2"
    >
      {previous ? (
        <Link className={CARD} href={previous.url}>
          <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
            <ArrowLeftIcon aria-hidden="true" className="size-3.5" />
            Previous
          </span>
          <span className="font-medium text-foreground group-hover:text-primary">
            {previous.name}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link className={`${CARD} text-end`} href={next.url}>
          <span className="flex items-center justify-end gap-1.5 text-muted-foreground text-xs">
            Next
            <ArrowRightIcon aria-hidden="true" className="size-3.5" />
          </span>
          <span className="font-medium text-foreground group-hover:text-primary">
            {next.name}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
