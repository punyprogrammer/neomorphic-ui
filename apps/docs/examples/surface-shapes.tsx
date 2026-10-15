"use client";

import { Surface } from "@neomorphic-react/ui/surface";

export default function SurfaceShapes() {
  return (
    <div className="grid gap-8">
      <div className="flex flex-wrap items-center gap-8">
        <Surface className="size-14" shape="square" />
        <Surface className="size-14" shape="rounded" />
        <Surface className="size-14" shape="circle" />
      </div>
      <div className="flex flex-wrap items-center gap-8">
        <Surface className="h-12 w-36" elevation="inset" shape="square" />
        <Surface className="h-12 w-36" elevation="inset" shape="rounded" />
        <Surface className="h-12 w-36" elevation="inset" shape="pill" />
      </div>
    </div>
  );
}
