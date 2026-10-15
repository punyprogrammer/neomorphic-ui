"use client";

import { Badge, BadgeAnchor } from "@neomorphic-react/ui/badge";
import { Button } from "@neomorphic-react/ui/button";
import { Surface } from "@neomorphic-react/ui/surface";
import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";

export default function BadgeInContext() {
  const [saved, setSaved] = useState(2);
  const [bag, setBag] = useState(0);
  return (
    <Surface className="grid w-80 gap-6 p-5">
      <header className="flex items-center justify-between">
        <span className="font-semibold text-foreground">Atelier</span>
        <div className="flex items-center gap-3">
          <BadgeAnchor>
            <Button
              aria-label={`Saved items, ${saved}`}
              icon={<Heart />}
              variant="ghost"
            />
            <Badge
              count={saved}
              placement="top-end"
              size="sm"
              variant="primary"
            />
          </BadgeAnchor>
          <BadgeAnchor>
            <Button aria-label={`Bag, ${bag} items`} icon={<ShoppingBag />} />
            <Badge
              count={bag}
              placement="top-end"
              size="sm"
              variant="primary"
            />
          </BadgeAnchor>
        </div>
      </header>
      <div className="grid gap-1">
        <p className="font-medium text-foreground">Stoneware vase</p>
        <p className="text-muted-foreground text-sm">Speckled sand · $64</p>
      </div>
      <div className="flex gap-3">
        <Button
          className="flex-1"
          onClick={() => setBag((value) => value + 1)}
          variant="primary"
        >
          Add to bag
        </Button>
        <Button
          aria-label="Save stoneware vase"
          icon={<Heart />}
          onClick={() => setSaved((value) => value + 1)}
        />
      </div>
    </Surface>
  );
}
