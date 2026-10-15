"use client";

import { Button } from "@neomorphic-react/ui/button";
import { ButtonGroup } from "@neomorphic-react/ui/button-group";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SIZES = ["sm", "md", "lg"] as const;

export default function ButtonGroupSizes() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      {SIZES.map((size) => (
        <ButtonGroup aria-label={`Slides, ${size}`} key={size}>
          <Button
            aria-label="Previous slide"
            icon={<ChevronLeft />}
            size={size}
          />
          <Button aria-label="Next slide" icon={<ChevronRight />} size={size} />
        </ButtonGroup>
      ))}
    </div>
  );
}
