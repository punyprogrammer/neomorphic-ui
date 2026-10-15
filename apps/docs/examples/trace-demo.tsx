"use client";

import { Spinner } from "@neomorphic-react/ui/spinner";
import {
  Trace,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@neomorphic-react/ui/trace";
import { FileSearch, Globe } from "lucide-react";

export default function TraceDemo() {
  return (
    <Trace className="max-w-sm">
      <TraceLine>
        <TraceIcon>
          <FileSearch />
        </TraceIcon>
        <TraceTitle>Read 3 files</TraceTitle>
        <TraceDescription>0.2s</TraceDescription>
      </TraceLine>
      <TraceLine status="running">
        <TraceIcon>
          <Spinner aria-hidden="true" className="size-4" size="sm" />
        </TraceIcon>
        <TraceTitle>Searching the web for flight prices</TraceTitle>
      </TraceLine>
      <TraceLine status="pending">
        <TraceIcon>
          <Globe />
        </TraceIcon>
        <TraceTitle>Compare the cheapest dates</TraceTitle>
      </TraceLine>
    </Trace>
  );
}
