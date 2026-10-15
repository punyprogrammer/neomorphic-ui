"use client";

import { CodeBlock, CodeBlockContent } from "@neomorphic-react/ui/code-block";
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@neomorphic-react/ui/trace";
import { CircleAlert, Terminal } from "lucide-react";

export default function TraceCollapsibleExample() {
  return (
    <Trace className="max-w-md">
      <TraceCollapsible defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <Terminal />
            </TraceIcon>
            <TraceTitle>Ran the unit tests</TraceTitle>
            <TraceDescription>2.4s</TraceDescription>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <CodeBlock size="sm">
            <CodeBlockContent>{`$ vitest run
 ✓ src/cart.test.tsx (6 tests)
 ✓ src/checkout.test.tsx (4 tests)
 Test Files  2 passed (2)`}</CodeBlockContent>
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine status="error">
            <TraceIcon>
              <CircleAlert />
            </TraceIcon>
            <TraceTitle>Fetched the changelog</TraceTitle>
            <TraceDescription>404</TraceDescription>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          The page wasn't found, so the release notes in the repository were
          used instead.
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  );
}
