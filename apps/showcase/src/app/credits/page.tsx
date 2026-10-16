import { Card, CardContent } from "@neomorphic-react/ui/card";
import type { Metadata } from "next";
import Image from "next/image";

import { PageHeader } from "@/components/page-header";
import { asset } from "@/lib/base-path";
import credits from "@/lib/photo-credits.json";

export const metadata: Metadata = { title: "Photo credits" };

export default function CreditsPage() {
  return (
    <main className="w-full min-w-0 flex-1 overflow-x-clip px-4 py-8 sm:px-6 lg:px-10">
      <div className="grid gap-10">
        <PageHeader
          description="Every photograph in the showcase is CC0 (public domain) from StockSnap, found through Openverse. Attribution isn't required, but the photographers deserve it."
          eyebrow="Credits"
          title="Photography"
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {credits.map((credit) => (
            <li key={credit.src}>
              <Card className="h-full gap-3 p-3">
                <span className="relative block aspect-[4/3] overflow-hidden rounded-[calc(var(--radius)*0.8)]">
                  <Image
                    alt=""
                    className="object-cover"
                    fill
                    sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 90vw"
                    src={asset(credit.src)}
                  />
                </span>
                <CardContent className="grid gap-0.5 px-1 text-sm">
                  <a
                    className="font-medium text-foreground underline-offset-2 hover:underline"
                    href={credit.source}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {credit.creator}
                  </a>
                  <span className="text-muted-foreground text-xs uppercase tracking-wide">
                    {credit.license}
                  </span>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
