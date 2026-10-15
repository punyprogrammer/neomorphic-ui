"use client";

import { Spinner } from "@neomorphic-react/ui/spinner";
import { Surface } from "@neomorphic-react/ui/surface";

export default function SpinnerPlaceholder() {
  return (
    <Surface className="grid h-48 w-72 place-items-center content-center gap-4 p-6">
      <Spinner aria-label="Loading messages" />
      <p aria-hidden="true" className="text-muted-foreground text-sm">
        Loading messages…
      </p>
    </Surface>
  );
}
