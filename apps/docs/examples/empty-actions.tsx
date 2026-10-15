"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@neomorphic-react/ui/empty";
import { SearchX } from "lucide-react";

export default function EmptyActions() {
  return (
    <Empty className="max-w-md">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchX />
        </EmptyMedia>
        <EmptyTitle>No trains match your search</EmptyTitle>
        <EmptyDescription>
          Try a different date, or read{" "}
          <a href="#routes">which routes we cover</a>.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="primary">Change date</Button>
          <Button variant="ghost">Clear filters</Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}
