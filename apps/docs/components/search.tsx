"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@neomorphic-react/ui/command";
import { Kbd, KbdGroup } from "@neomorphic-react/ui/kbd";
import { cn } from "@neomorphic-react/ui/utils";
import type { SearchResultItem } from "fumadocs-core/search/client";
import { useStaticSearch } from "fumadocs-core/search/client";
import { FileTextIcon, HashIcon, SearchIcon, TextIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { NavSection } from "@/lib/nav";

interface Result {
  breadcrumbs?: string[];
  content: string;
  id: string;
  type: "page" | "heading" | "text";
  url: string;
}

const ICONS = {
  page: FileTextIcon,
  heading: HashIcon,
  text: TextIcon,
};

interface PageInfo {
  section?: string;
  title: string;
}

/** Turns an indexed markdown snippet into plain text for a result row. */
function plain(text: string) {
  return text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/`|\*\*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function flatten(
  items: SearchResultItem[],
  pages: Map<string, PageInfo>
): Result[] {
  return items
    .flatMap((item) => (item.type === "table" ? item.rows : [item]))
    .filter((item) => !item.content.trimStart().startsWith("|"))
    .map((item) => {
      const page = pages.get(item.url.split("#")[0] ?? item.url);
      const trail = item.type === "page" ? [] : [page?.title];
      const breadcrumbs = [page?.section, ...trail].filter(
        (part): part is string => Boolean(part)
      );
      return {
        ...item,
        content: plain(item.content),
        breadcrumbs: breadcrumbs.length ? breadcrumbs : undefined,
      };
    });
}

function isEditable(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.tagName === "SELECT")
  );
}

/**
 * A search field in the header that opens the ⌘K palette over the docs. With
 * no query it lists every page; typing searches pages, headings and text.
 */
export function SearchDocs({
  className,
  sections,
}: {
  className?: string;
  sections: NavSection[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { search, onSearchChange, data, isLoading } = useStaticSearch({
    from: "/api/search",
  });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const shortcut =
        (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) ||
        (event.key === "/" && !isEditable(event.target));
      if (shortcut) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const pages = useMemo<Result[]>(
    () =>
      sections.flatMap((section) =>
        section.items.map((item) => ({
          id: item.href,
          url: item.href,
          type: "page" as const,
          content: item.title,
          breadcrumbs: section.title ? [section.title] : undefined,
        }))
      ),
    [sections]
  );

  const pageInfo = useMemo(
    () =>
      new Map<string, PageInfo>(
        sections.flatMap((section) =>
          section.items.map(
            (item) =>
              [
                item.href,
                { section: section.title, title: item.title },
              ] as const
          )
        )
      ),
    [sections]
  );

  const results = search.trim() && data ? flatten(data.items, pageInfo) : pages;

  const go = useCallback(
    (url: string) => {
      setOpen(false);
      onSearchChange("");
      router.push(url);
    },
    [onSearchChange, router]
  );

  return (
    <>
      <button
        className={cn(
          "inset-shadow-neu-sm flex h-9 items-center gap-2 rounded-full bg-background ps-3 pe-1.5 text-muted-foreground text-sm shadow-neu-flat outline-none transition-[box-shadow] hover:inset-shadow-neu focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2",
          className
        )}
        onClick={() => setOpen(true)}
        type="button"
      >
        <SearchIcon aria-hidden="true" className="size-4" />
        <span className="hidden flex-1 text-start lg:inline">
          Search documentation…
        </span>
        <span className="flex-1 text-start lg:hidden">Search…</span>
        <KbdGroup className="hidden sm:inline-flex">
          <Kbd size="sm">⌘</Kbd>
          <Kbd size="sm">K</Kbd>
        </KbdGroup>
      </button>
      <CommandDialog
        className="p-0"
        description="Search pages, headings and text in the docs."
        onOpenChange={setOpen}
        open={open}
        title="Search documentation"
      >
        <Command
          itemToStringValue={(item: Result) => item.content}
          items={results}
          mode="none"
          onValueChange={(value) => onSearchChange(value)}
          value={search}
        >
          <CommandInput
            className="inset-shadow-neu-flat mb-0 rounded-none bg-transparent [--input-group-h:3.25rem] has-[[data-slot=input-group-control]:focus-visible]:inset-shadow-neu-flat has-[[data-slot=input-group-control]:focus-visible]:outline-0"
            placeholder="Search documentation…"
          />
          <div
            aria-hidden="true"
            className="h-px shrink-0 bg-[var(--neu-dark)] shadow-[0_1px_0_var(--neu-light)]"
          />
          <CommandEmpty>
            {isLoading ? "Searching…" : "No results found."}
          </CommandEmpty>
          <CommandList className="p-2">
            {(item: Result) => {
              const Icon = ICONS[item.type];
              return (
                <CommandItem
                  className="items-start gap-3 py-2"
                  key={item.id}
                  onClick={() => go(item.url)}
                  value={item}
                >
                  <Icon
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                  />
                  <span className="grid min-w-0 gap-0.5">
                    <span className="truncate">{item.content}</span>
                    {item.breadcrumbs?.length ? (
                      <span className="truncate text-muted-foreground text-xs">
                        {item.breadcrumbs.join(" › ")}
                      </span>
                    ) : null}
                  </span>
                </CommandItem>
              );
            }}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
