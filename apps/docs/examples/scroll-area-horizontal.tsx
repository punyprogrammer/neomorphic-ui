"use client";

import { ScrollArea } from "@neomorphic-react/ui/scroll-area";
import { landscape } from "@/components/blocks/images";

const places = [
  ["Porto", "#a7c7e7", "#f2d8b5", "#6f8f72"],
  ["Lisbon", "#b9d3f0", "#f4e0c0", "#7d9c88"],
  ["Faro", "#9fd0e0", "#f5e4c6", "#6e8f9a"],
  ["Sintra", "#c3d3ea", "#dfd6c5", "#5e7a63"],
  ["Évora", "#d6dff0", "#ead7b4", "#8a8a6a"],
  ["Coimbra", "#b2c9e6", "#efdcbf", "#728f80"],
] as const;

export default function ScrollAreaHorizontal() {
  return (
    <ScrollArea
      className="w-full max-w-md rounded-xl"
      fade
      orientation="horizontal"
    >
      <div className="flex w-max gap-4 p-4">
        {places.map(([name, sky, sand, hills]) => (
          <figure className="shrink-0" key={name}>
            <img
              alt={`Hills near ${name}`}
              className="h-28 w-40 rounded-lg object-cover shadow-neu"
              src={landscape(sky, sand, hills)}
            />
            <figcaption className="pt-2 text-muted-foreground text-xs">
              {name}
            </figcaption>
          </figure>
        ))}
      </div>
    </ScrollArea>
  );
}
