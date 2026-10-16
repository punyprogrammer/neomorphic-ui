import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { componentGroups, components } from "@/lib/components";
import { siteConfig } from "@/lib/site";
import { source } from "@/lib/source";

const CARD =
  "inset-shadow-neu-flat group grid content-start gap-1 rounded-xl bg-neu-convex p-4 shadow-neu-sm outline-none transition-shadow hover:shadow-neu focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2";

/**
 * Every component by group, each linking to its docs page.
 */
export function ComponentsIndex() {
  return (
    <div className="not-prose grid gap-12">
      {componentGroups.map((group) => {
        const entries = components.filter((entry) => entry.group === group.id);
        return (
          <section className="grid gap-4" key={group.id}>
            <div className="grid gap-1">
              <h2
                className="scroll-mt-24 font-semibold text-foreground text-xl tracking-tight"
                id={group.id}
              >
                {group.title}
              </h2>
              <p className="text-muted-foreground text-sm">
                {group.description}
              </p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {entries.map((entry) => {
                const page = source.getPage(["components", entry.slug]);
                const body = (
                  <>
                    <span className="flex items-center justify-between gap-2 font-medium text-foreground group-hover:text-primary">
                      {entry.name}
                      {page ? null : (
                        <ArrowUpRightIcon
                          aria-label="Opens Storybook"
                          className="size-3.5 text-muted-foreground"
                        />
                      )}
                    </span>
                    <span className="text-muted-foreground text-sm leading-snug">
                      {entry.description}
                    </span>
                  </>
                );
                return (
                  <li className="grid" key={entry.slug}>
                    {page ? (
                      <Link className={CARD} href={page.url}>
                        {body}
                      </Link>
                    ) : (
                      <a
                        className={CARD}
                        href={siteConfig.links.storybook}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {body}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
