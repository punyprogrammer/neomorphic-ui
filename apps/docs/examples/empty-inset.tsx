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
import { Upload } from "lucide-react";

export default function EmptyInset() {
  return (
    <Empty className="w-full max-w-md" variant="inset">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Upload />
        </EmptyMedia>
        <EmptyTitle>No documents</EmptyTitle>
        <EmptyDescription>
          Add your passport and visas so they're to hand at the border.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Upload a document</Button>
      </EmptyContent>
    </Empty>
  );
}
