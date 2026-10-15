"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@neomorphic-react/ui/hover-card";
import { Clock, MapPin } from "lucide-react";
import { landscape } from "@/components/blocks/images";

const places = {
  sintra: {
    name: "Sintra",
    photo: landscape("#a9c4e4", "#dfe6ee", "#5f8f6e"),
    summary: "Palaces and gardens in the hills west of Lisbon.",
    distance: "40 min by train",
  },
  cascais: {
    name: "Cascais",
    photo: landscape("#9cc9e8", "#f2dcb3", "#46705c"),
    summary: "A fishing town turned seaside resort, with three small beaches.",
    distance: "35 min by train",
  },
};

function Place({ id }: { id: keyof typeof places }) {
  const place = places[id];
  return (
    <HoverCard>
      <HoverCardTrigger delay={300} href={`#${id}`}>
        {place.name}
      </HoverCardTrigger>
      <HoverCardContent className="grid gap-3 p-3">
        <img
          alt=""
          className="h-28 w-full rounded-lg object-cover"
          height={112}
          src={place.photo}
          width={264}
        />
        <div className="grid gap-1 px-1">
          <p className="flex items-center gap-1.5 font-semibold">
            <MapPin aria-hidden="true" className="size-4" />
            {place.name}
          </p>
          <p className="text-muted-foreground">{place.summary}</p>
          <p className="flex items-center gap-1.5 text-muted-foreground text-xs">
            <Clock aria-hidden="true" className="size-3.5" />
            {place.distance}
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default function HoverCardInContext() {
  return (
    <article className="grid max-w-md gap-2 text-sm leading-relaxed">
      <h3 className="font-semibold text-base text-foreground">
        Day trips from Lisbon
      </h3>
      <p className="text-muted-foreground">
        Take the morning train to <Place id="sintra" /> before the crowds
        arrive, then head down to the coast and finish with dinner by the
        harbour in <Place id="cascais" />.
      </p>
    </article>
  );
}
