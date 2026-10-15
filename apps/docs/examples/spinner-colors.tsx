"use client";

import { Spinner } from "@neomorphic-react/ui/spinner";

export default function SpinnerColors() {
  return (
    <div className="flex items-center gap-8">
      <Spinner className="[--spinner-fill:oklch(0.54_0.22_350)]" />
      <Spinner className="[--spinner-fill:oklch(0.62_0.19_45)]" />
      <Spinner className="[--spinner-fill:var(--color-success)]" />
    </div>
  );
}
