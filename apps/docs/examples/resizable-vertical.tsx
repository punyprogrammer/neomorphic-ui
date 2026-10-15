"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@neomorphic-react/ui/resizable";
import { Surface } from "@neomorphic-react/ui/surface";

export default function ResizableVertical() {
  return (
    <Surface className="h-80 w-full max-w-md overflow-hidden rounded-2xl">
      <ResizablePanelGroup orientation="vertical">
        <ResizablePanel className="grid content-start gap-2 p-5" minSize="30">
          <p className="font-medium text-foreground text-sm">checkout.tsx</p>
          <p className="text-muted-foreground text-sm">
            Totals, discounts and the pay button for the cart.
          </p>
        </ResizablePanel>
        <ResizableHandle aria-label="Resize terminal" />
        <ResizablePanel
          className="grid content-start gap-1 p-5 font-mono text-muted-foreground text-xs"
          defaultSize="35"
          minSize="20"
        >
          <span className="text-foreground">$ pnpm test checkout</span>
          <span>✓ adds an item to the cart (12 ms)</span>
          <span>✓ applies the discount code (8 ms)</span>
          <span>Tests: 2 passed, 2 total</span>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Surface>
  );
}
