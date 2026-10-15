"use client";

import {
  Trace,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@neomorphic-react/ui/trace";
import { FileCode } from "lucide-react";
import { useState } from "react";

const files = [
  { path: "src/cart/summary.tsx", lines: "48 lines" },
  { path: "src/cart/use-totals.ts", lines: "112 lines" },
  { path: "src/lib/currency.ts", lines: "31 lines" },
];

export default function TraceActions() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="grid w-full max-w-sm gap-4">
      <Trace>
        {files.map((file) => (
          <button
            aria-pressed={open === file.path}
            key={file.path}
            onClick={() => setOpen(file.path)}
            type="button"
          >
            <TraceLine>
              <TraceIcon>
                <FileCode />
              </TraceIcon>
              <TraceTitle>Read {file.path}</TraceTitle>
              <TraceDescription>{file.lines}</TraceDescription>
            </TraceLine>
          </button>
        ))}
      </Trace>
      <p className="text-muted-foreground text-sm" role="status">
        {open ? `Showing ${open}` : "Choose a file to open it"}
      </p>
    </div>
  );
}
