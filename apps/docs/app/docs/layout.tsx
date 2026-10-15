import { ScrollArea } from "@neomorphic-react/ui/scroll-area";
import type * as React from "react";
import { DocsNav } from "@/components/docs-nav";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDocsNav } from "@/lib/nav";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sections = getDocsNav();
  return (
    <>
      <SiteHeader />
      <div className="mx-auto grid w-full max-w-screen-2xl flex-1 gap-x-10 px-4 md:grid-cols-[14rem_minmax(0,1fr)] md:px-6 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <aside className="sticky top-16 hidden h-[calc(100svh-4rem)] md:block">
          <ScrollArea className="h-full" fade>
            <div className="py-8 pe-3">
              <DocsNav sections={sections} />
            </div>
          </ScrollArea>
        </aside>
        <main className="min-w-0" id="main">
          {children}
        </main>
      </div>
      <SiteFooter />
    </>
  );
}
