"use client";

import { Button } from "@neomorphic-react/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";

/** Copies the page as Markdown, for pasting into an AI assistant or a doc. */
export function CopyPageButton({ markdown }: { markdown: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <>
      <Button
        icon={copied ? <CheckIcon /> : <CopyIcon />}
        onClick={() => {
          navigator.clipboard
            ?.writeText(markdown)
            .then(() => setCopied(true))
            .catch(() => undefined);
        }}
        size="sm"
      >
        Copy page
      </Button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied the page as Markdown" : ""}
      </span>
    </>
  );
}
