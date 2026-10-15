"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@neomorphic-react/ui/tabs";
import { cn } from "@neomorphic-react/ui/utils";
import type * as React from "react";

interface PreviewTabsProps {
  align: "center" | "start" | "end";
  className?: string;
  code: React.ReactNode;
  preview: React.ReactNode;
}

const ALIGN = {
  center: "items-center",
  start: "items-start",
  end: "items-end",
};

export function PreviewTabs({
  align,
  className,
  code,
  preview,
}: PreviewTabsProps) {
  const frame = (
    <div
      className={cn(
        "flex min-h-[22rem] w-full justify-center overflow-x-auto rounded-2xl border border-border/70 p-6 sm:p-10",
        ALIGN[align]
      )}
      data-slot="preview"
    >
      {preview}
    </div>
  );

  if (code === null) {
    return <div className={cn("not-prose my-6", className)}>{frame}</div>;
  }

  return (
    <Tabs
      className={cn("not-prose my-6 gap-3", className)}
      defaultValue="preview"
    >
      <TabsList aria-label="Example view" variant="line">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">{frame}</TabsContent>
      <TabsContent value="code">{code}</TabsContent>
    </Tabs>
  );
}
