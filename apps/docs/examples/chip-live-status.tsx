"use client";

import { Button } from "@neomorphic-react/ui/button";
import { Chip } from "@neomorphic-react/ui/chip";
import { FilePen, Send } from "lucide-react";
import { useState } from "react";

export default function ChipLiveStatus() {
  const [sent, setSent] = useState(false);
  return (
    <div className="flex items-center gap-6">
      <p className="flex items-center gap-2 text-foreground text-sm">
        Invoice #1045
        <span role="status">
          {sent ? (
            <Chip icon={<Send />} size="sm" variant="primary">
              Sent
            </Chip>
          ) : (
            <Chip icon={<FilePen />} size="sm" variant="inset">
              Draft
            </Chip>
          )}
        </span>
      </p>
      <Button
        disabled={sent}
        icon={<Send />}
        onClick={() => setSent(true)}
        size="sm"
      >
        Send
      </Button>
    </div>
  );
}
