"use client";

import { cn } from "@neomorphic-react/ui/utils";
import {
  AnchorProvider,
  TOCItem,
  type TOCItemType,
  useActiveAnchor,
} from "fumadocs-core/toc";

function Items({ toc }: { toc: TOCItemType[] }) {
  const active = useActiveAnchor();
  return (
    <ul className="grid gap-0.5 text-sm">
      {toc.map((item) => {
        const current = active === item.url.slice(1);
        return (
          <li key={item.url}>
            <TOCItem
              className={cn(
                "block rounded-md py-1 text-muted-foreground leading-snug outline-none transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring/50",
                item.depth > 2 && "ps-3",
                item.depth > 3 && "ps-6",
                current && "font-medium text-primary"
              )}
              href={item.url}
            >
              {item.title}
            </TOCItem>
          </li>
        );
      })}
    </ul>
  );
}

/** "On this page": the page's headings, with the one in view marked. */
export function DocsToc({ toc }: { toc: TOCItemType[] }) {
  if (toc.length === 0) {
    return null;
  }
  return (
    <AnchorProvider single toc={toc}>
      <nav aria-label="On this page" className="grid gap-2">
        <p className="font-medium text-foreground text-sm">On this page</p>
        <Items toc={toc} />
      </nav>
    </AnchorProvider>
  );
}
