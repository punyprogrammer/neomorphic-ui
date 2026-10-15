"use client";

import { ScrollArea } from "@neomorphic-react/ui/scroll-area";

const terms = [
  "Tickets are valid only for the train and date shown.",
  "Changes are free up to 24 hours before departure.",
  "After that, a change costs €10 plus any difference in fare.",
  "Refunds go back to the card you paid with, within 7 days.",
  "Children under 4 travel free without a seat of their own.",
  "Bikes travel free on regional trains, space permitting.",
  "Pets under 6kg travel free in a carrier.",
  "Lost tickets can be reissued from your account.",
];

export default function ScrollAreaFade() {
  return (
    <div className="grid w-full max-w-lg gap-6 sm:grid-cols-2">
      {[false, true].map((fade) => (
        <figure className="grid gap-2" key={String(fade)}>
          <ScrollArea
            className="inset-shadow-neu-sm h-48 rounded-xl bg-background shadow-neu-flat"
            fade={fade}
          >
            <ol className="grid list-decimal gap-3 py-4 ps-8 pe-4 text-sm">
              {terms.map((term) => (
                <li key={term}>{term}</li>
              ))}
            </ol>
          </ScrollArea>
          <figcaption className="text-center text-muted-foreground text-xs">
            {fade ? "With fade" : "Without fade"}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
