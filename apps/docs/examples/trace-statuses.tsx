"use client";

import { Spinner } from "@neomorphic-react/ui/spinner";
import {
  Trace,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@neomorphic-react/ui/trace";
import { CircleAlert, CircleCheck, Clock } from "lucide-react";

export default function TraceStatuses() {
  return (
    <Trace className="max-w-sm">
      <TraceLine>
        <TraceIcon>
          <CircleCheck />
        </TraceIcon>
        <TraceTitle>Installed dependencies</TraceTitle>
        <TraceDescription>12.8s</TraceDescription>
      </TraceLine>
      <TraceLine status="running">
        <TraceIcon>
          <Spinner aria-hidden="true" className="size-4" size="sm" />
        </TraceIcon>
        <TraceTitle>Building the docs site</TraceTitle>
      </TraceLine>
      <TraceLine status="pending">
        <TraceIcon>
          <Clock />
        </TraceIcon>
        <TraceTitle>Deploy the preview</TraceTitle>
      </TraceLine>
      <TraceLine status="error">
        <TraceIcon>
          <CircleAlert />
        </TraceIcon>
        <TraceTitle>Checked broken links</TraceTitle>
        <TraceDescription>3 failed</TraceDescription>
      </TraceLine>
    </Trace>
  );
}
