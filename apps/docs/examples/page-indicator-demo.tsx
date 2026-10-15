"use client";

import { PageIndicator } from "@neomorphic-react/ui/page-indicator";
import { useState } from "react";

export default function PageIndicatorDemo() {
  const [page, setPage] = useState(1);
  return (
    <PageIndicator
      aria-label="Pages"
      count={4}
      onValueChange={setPage}
      value={page}
    />
  );
}
