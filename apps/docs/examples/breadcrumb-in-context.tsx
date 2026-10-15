"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@neomorphic-react/ui/breadcrumb";
import { Button } from "@neomorphic-react/ui/button";
import { Pencil, Share2 } from "lucide-react";

export default function BreadcrumbInContext() {
  return (
    <header className="flex w-full max-w-2xl flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#projects">Projects</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#website">Website redesign</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Launch checklist</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="grid gap-1">
          <h2 className="font-semibold text-2xl text-foreground">
            Launch checklist
          </h2>
          <p className="text-muted-foreground text-sm">
            12 of 18 tasks done · Due Friday 21 November
          </p>
        </div>
        <div className="flex gap-3">
          <Button icon={<Share2 />} size="sm" variant="ghost">
            Share
          </Button>
          <Button icon={<Pencil />} size="sm">
            Edit
          </Button>
        </div>
      </div>
    </header>
  );
}
