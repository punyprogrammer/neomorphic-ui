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
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div className="grid gap-1.5">
        {eyebrow ? (
          <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.18em]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-semibold text-3xl text-foreground tracking-tight sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-xl text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex flex-wrap items-center gap-3">{actions}</div>
      ) : null}
    </div>
  );
}
