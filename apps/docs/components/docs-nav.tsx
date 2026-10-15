"use client";

import { cn } from "@neomorphic-react/ui/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavSection } from "@/lib/nav";

interface DocsNavProps {
  className?: string;
  /** Called after a link is followed, to close the mobile menu. */
  onNavigate?: () => void;
  sections: NavSection[];
}

/** The docs links, grouped by section; the current page sits in a well. */
export function DocsNav({ className, onNavigate, sections }: DocsNavProps) {
  const pathname = usePathname();
  return (
    <nav aria-label="Docs" className={cn("grid gap-6", className)}>
      {sections.map((section) => (
        <div className="grid gap-1" key={section.title || "docs"}>
          {section.title ? (
            <h4 className="px-3 pb-1 font-medium text-muted-foreground text-xs uppercase tracking-wide">
              {section.title}
            </h4>
          ) : null}
          <ul className="grid gap-0.5">
            {section.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "inset-shadow-neu-flat flex h-8 items-center rounded-lg px-3 text-muted-foreground text-sm shadow-neu-flat outline-none transition-[color,box-shadow] hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring/50",
                      active &&
                        "inset-shadow-neu-sm font-medium text-foreground shadow-neu-flat"
                    )}
                    href={item.href}
                    onClick={onNavigate}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
