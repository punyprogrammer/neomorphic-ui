"use client";

import { AspectRatio } from "@neomorphic-react/ui/aspect-ratio";

export default function AspectRatioCrop() {
  return (
    <div className="grid w-full max-w-lg grid-cols-2 items-start gap-6">
      <AspectRatio className="rounded-lg shadow-neu-sm">
        <img alt="A smart home dashboard" src="/showcase/smart-home.jpg" />
      </AspectRatio>
      <AspectRatio className="rounded-lg shadow-neu-sm [&>img]:object-top">
        <img alt="A smart home dashboard" src="/showcase/smart-home.jpg" />
      </AspectRatio>
    </div>
  );
}
