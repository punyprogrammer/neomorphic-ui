"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  ButtonGroup,
  ButtonGroupText,
} from "@neomorphic-react/ui/button-group";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function ButtonGroupTextExample() {
  const [quantity, setQuantity] = useState(1);
  return (
    <ButtonGroup aria-label="Quantity" shape="pill">
      <Button
        aria-label="Decrease quantity"
        disabled={quantity === 0}
        icon={<Minus />}
        onClick={() => setQuantity((value) => value - 1)}
        size="sm"
      />
      <ButtonGroupText className="min-w-10" render={<output />}>
        {quantity}
      </ButtonGroupText>
      <Button
        aria-label="Increase quantity"
        icon={<Plus />}
        onClick={() => setQuantity((value) => value + 1)}
        size="sm"
      />
    </ButtonGroup>
  );
}
