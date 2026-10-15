"use client";

import { Button } from "@neomorphic-react/ui/button";
import { PageIndicator } from "@neomorphic-react/ui/page-indicator";
import { Surface } from "@neomorphic-react/ui/surface";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const slides = [
  { title: "Track", body: "Log every run, ride and swim in one place." },
  { title: "Plan", body: "Build a week of training around your goals." },
  { title: "Share", body: "Send your best days to friends and coaches." },
];

export default function PageIndicatorOnboarding() {
  const [page, setPage] = useState(0);
  const slide = slides[page];
  return (
    <Surface className="grid w-80 gap-6 p-6 text-center">
      <div aria-live="polite" className="grid gap-2">
        <h3 className="font-medium text-foreground text-lg">{slide?.title}</h3>
        <p className="text-muted-foreground text-sm">{slide?.body}</p>
      </div>
      <div className="flex items-center justify-between">
        <Button
          aria-label="Previous"
          disabled={page === 0}
          icon={<ChevronLeft />}
          onClick={() => setPage(page - 1)}
          shape="pill"
          size="sm"
        />
        <PageIndicator
          aria-label="Slides"
          count={slides.length}
          getAriaLabel={(index, count) => `Slide ${index + 1} of ${count}`}
          onValueChange={setPage}
          value={page}
        />
        <Button
          aria-label="Next"
          disabled={page === slides.length - 1}
          icon={<ChevronRight />}
          onClick={() => setPage(page + 1)}
          shape="pill"
          size="sm"
        />
      </div>
    </Surface>
  );
}
