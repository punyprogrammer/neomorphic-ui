"use client";

import { PageIndicator } from "@neomorphic-react/ui/page-indicator";
import { useState } from "react";

const sections = ["Overview", "Features", "Pricing", "Reviews", "Contact"];

export default function PageIndicatorVertical() {
  const [section, setSection] = useState(2);
  return (
    <div className="flex items-center gap-6">
      <PageIndicator
        aria-label="Sections"
        count={sections.length}
        getAriaLabel={(index) => sections[index] ?? `Section ${index + 1}`}
        onValueChange={setSection}
        orientation="vertical"
        value={section}
      />
      <p aria-live="polite" className="w-24 font-medium text-foreground">
        {sections[section]}
      </p>
    </div>
  );
}
