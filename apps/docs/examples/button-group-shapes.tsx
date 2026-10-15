"use client";

import { Button } from "@neomorphic-react/ui/button";
import { ButtonGroup } from "@neomorphic-react/ui/button-group";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ButtonGroupShapes() {
  return (
    <div className="grid justify-items-center gap-8">
      <ButtonGroup aria-label="Steps">
        <Button icon={<ChevronLeft />}>Back</Button>
        <Button icon={<ChevronRight />} iconPosition="end">
          Next
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Steps" shape="pill">
        <Button icon={<ChevronLeft />}>Back</Button>
        <Button icon={<ChevronRight />} iconPosition="end">
          Next
        </Button>
      </ButtonGroup>
    </div>
  );
}
