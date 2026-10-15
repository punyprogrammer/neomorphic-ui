import type * as React from "react";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// AspectRatio
// ---------------------------------------------------------------------------

interface AspectRatioProps extends React.ComponentProps<"div"> {
  /**
   * Width divided by height, e.g. `16 / 9`.
   * @default 1
   */
  ratio?: number;
}

/**
 * Holds its child (an image, video or map) at a fixed shape at any width.
 * Images and videos fill it and crop to fit.
 */
function AspectRatio({
  className,
  ratio = 1,
  style,
  ...props
}: AspectRatioProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden [&>img]:size-full [&>img]:object-cover [&>video]:size-full [&>video]:object-cover",
        className
      )}
      data-slot="aspect-ratio"
      style={{ aspectRatio: ratio, ...style }}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { AspectRatioProps };
export { AspectRatio };
