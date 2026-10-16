import type * as React from "react";

interface PageHeaderProps {
  actions?: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: string;
  title: React.ReactNode;
}

/** The title row every showcase page opens with. */
export function PageHeader({
  actions,
  description,
  eyebrow,
  title,
}: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 sm:gap-6">
      <div className="grid min-w-0 flex-1 gap-1.5">
        {eyebrow ? (
          <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.18em]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-balance font-semibold text-2xl text-foreground tracking-tight sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-xl text-pretty text-muted-foreground text-sm sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
          {actions}
        </div>
      ) : null}
    </div>
  );
}
