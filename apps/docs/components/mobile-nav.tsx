"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@neomorphic-react/ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DocsNav } from "@/components/docs-nav";
import type { NavSection } from "@/lib/nav";
import { mainNav } from "@/lib/site";

export function MobileNav({ sections }: { sections: NavSection[] }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger
        render={
          <Button
            aria-label="Open menu"
            className="md:hidden"
            icon={<MenuIcon />}
            size="sm"
            variant="ghost"
          />
        }
      />
      <SheetContent className="gap-0" side="start" size="sm">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="neu-scrollbar grid gap-6 overflow-y-auto px-3 pb-8">
          <nav aria-label="Main" className="grid gap-0.5">
            {mainNav.map((item) => (
              <Link
                className="flex h-9 items-center rounded-lg px-3 font-medium text-sm outline-none hover:text-primary focus-visible:outline-2 focus-visible:outline-ring/50"
                href={item.href}
                key={item.href}
                onClick={close}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <DocsNav onNavigate={close} sections={sections} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
