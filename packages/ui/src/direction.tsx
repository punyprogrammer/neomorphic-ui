"use client";

import {
  DirectionProvider as DirectionProviderPrimitive,
  type TextDirection,
  useDirection,
} from "@base-ui/react/direction-provider";
import type * as React from "react";

// ---------------------------------------------------------------------------
// DirectionProvider
// ---------------------------------------------------------------------------

interface DirectionProviderProps {
  children?: React.ReactNode;
  /**
   * The reading direction. Also set `dir` on `<html>` (or a wrapper) so
   * the layout mirrors; this tells the components, which mirror their
   * keyboard handling (arrow keys in sliders, tabs, menus) and popup sides.
   * @default "ltr"
   */
  direction?: TextDirection;
}

function DirectionProvider({
  direction = "ltr",
  children,
}: DirectionProviderProps) {
  return (
    <DirectionProviderPrimitive direction={direction}>
      {children}
    </DirectionProviderPrimitive>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { DirectionProviderProps, TextDirection };
export { DirectionProvider, useDirection };
