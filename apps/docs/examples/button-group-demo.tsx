"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  ButtonGroup,
  ButtonGroupText,
} from "@neomorphic-react/ui/button-group";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const TOTAL = 5;

export default function ButtonGroupDemo() {
  const [page, setPage] = useState(2);
  return (
    <ButtonGroup aria-label="Pagination">
      <Button
        aria-label="Previous page"
        disabled={page === 1}
        icon={<ChevronLeft />}
        onClick={() => setPage((value) => value - 1)}
        size="sm"
      />
      <ButtonGroupText aria-live="polite">
        {page} / {TOTAL}
      </ButtonGroupText>
      <Button
        aria-label="Next page"
        disabled={page === TOTAL}
        icon={<ChevronRight />}
        onClick={() => setPage((value) => value + 1)}
        size="sm"
      />
    </ButtonGroup>
  );
}
