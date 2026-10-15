"use client";

import { AspectRatio } from "@neomorphic-react/ui/aspect-ratio";
import { landscape } from "@/components/blocks/images";

const trail = landscape("#c9d6ee", "#d8d2c4", "#6d7f95");

const ratios = [
  { label: "1 / 1", ratio: 1 },
  { label: "4 / 3", ratio: 4 / 3 },
  { label: "16 / 9", ratio: 16 / 9 },
];

export default function AspectRatioRatios() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-3 items-start gap-6">
      {ratios.map(({ label, ratio }) => (
        <figure className="grid gap-2" key={label}>
          <AspectRatio className="rounded-lg shadow-neu-sm" ratio={ratio}>
            <img alt="A mountain trail under a pale sky" src={trail} />
          </AspectRatio>
          <figcaption className="text-center text-muted-foreground text-xs">
            {label}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
