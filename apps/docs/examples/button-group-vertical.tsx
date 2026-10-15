"use client";

import { Button } from "@neomorphic-react/ui/button";
import { ButtonGroup } from "@neomorphic-react/ui/button-group";
import { ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";

export default function ButtonGroupVertical() {
  return (
    <div className="flex items-center gap-8">
      <ButtonGroup aria-label="Scroll" orientation="vertical">
        <Button aria-label="Scroll up" icon={<ChevronUp />} size="sm" />
        <Button aria-label="Scroll down" icon={<ChevronDown />} size="sm" />
      </ButtonGroup>
      <ButtonGroup aria-label="Zoom" orientation="vertical" shape="pill">
        <Button aria-label="Zoom in" icon={<Plus />} size="sm" />
        <Button aria-label="Zoom out" icon={<Minus />} size="sm" />
      </ButtonGroup>
    </div>
  );
}
