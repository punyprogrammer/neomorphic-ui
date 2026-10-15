"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  ButtonGroup,
  ButtonGroupText,
} from "@neomorphic-react/ui/button-group";
import { Surface } from "@neomorphic-react/ui/surface";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const PRODUCTS = [
  { id: "vase", name: "Stoneware vase", variant: "Speckled sand", price: 64 },
  { id: "lamp", name: "Paper lamp", variant: "Warm white", price: 89 },
];

export default function ButtonGroupInContext() {
  const [cart, setCart] = useState<Record<string, number>>({
    vase: 1,
    lamp: 2,
  });
  const setQuantity = (id: string, quantity: number) =>
    setCart((current) => ({ ...current, [id]: Math.max(quantity, 0) }));
  const lines = PRODUCTS.filter((product) => cart[product.id] > 0);
  const subtotal = lines.reduce(
    (sum, product) => sum + product.price * cart[product.id],
    0
  );

  return (
    <Surface className="grid w-80 gap-5 p-5">
      {lines.map((product) => {
        const quantity = cart[product.id];
        return (
          <div className="grid gap-3" key={product.id}>
            <div className="flex justify-between gap-3 text-sm">
              <div>
                <p className="font-medium text-foreground">{product.name}</p>
                <p className="text-muted-foreground text-xs">
                  {product.variant}
                </p>
              </div>
              <span className="font-medium text-foreground tabular-nums">
                ${product.price * quantity}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <ButtonGroup aria-label={`Quantity of ${product.name}`}>
                <Button
                  aria-label="Decrease"
                  icon={<Minus />}
                  onClick={() => setQuantity(product.id, quantity - 1)}
                  size="sm"
                />
                <ButtonGroupText className="min-w-8">
                  {quantity}
                </ButtonGroupText>
                <Button
                  aria-label="Increase"
                  icon={<Plus />}
                  onClick={() => setQuantity(product.id, quantity + 1)}
                  size="sm"
                />
              </ButtonGroup>
              <Button
                aria-label={`Remove ${product.name}`}
                icon={<Trash2 />}
                onClick={() => setQuantity(product.id, 0)}
                size="sm"
                variant="ghost"
              />
            </div>
          </div>
        );
      })}
      <p className="flex justify-between border-border border-t pt-4 text-sm">
        <span className="text-muted-foreground">Subtotal</span>
        <span className="font-semibold text-foreground tabular-nums">
          ${subtotal}
        </span>
      </p>
    </Surface>
  );
}
