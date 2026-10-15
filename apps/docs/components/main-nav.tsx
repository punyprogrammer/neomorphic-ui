"use client";

import { cn } from "@neomorphic-react/ui/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/lib/site";

function isActive(pathname: string, href: string) {
  if (href.includes("#")) {
    return false;
  }
  if (href === "/docs") {
    return (
      pathname.startsWith("/docs") && !pathname.startsWith("/docs/components")
    );
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MainNav({ className }: { className?: string }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className={cn("items-center gap-1", className)}>
      {mainNav.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            aria-current={active ? "page" : undefined}
            className={cn(
              "inset-shadow-neu-flat rounded-full px-3 py-1.5 font-medium text-muted-foreground text-sm shadow-neu-flat outline-none transition-[color,box-shadow] hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2",
              active && "inset-shadow-neu-sm text-foreground shadow-neu-flat"
            )}
            href={item.href}
            key={item.href}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
