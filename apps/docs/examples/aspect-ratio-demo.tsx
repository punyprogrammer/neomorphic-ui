"use client";

import { AspectRatio } from "@neomorphic-react/ui/aspect-ratio";
import { landscape } from "@/components/blocks/images";

const coast = landscape("#9cc8e8", "#f1dcb4", "#7a9a7e");

export default function AspectRatioDemo() {
  return (
    <div className="w-full max-w-md">
      <AspectRatio className="rounded-xl shadow-neu" ratio={16 / 9}>
        <img alt="Hills above a sandy coast at midday" src={coast} />
      </AspectRatio>
    </div>
  );
}
