import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@neomorphic-react/ui/alert";
import { cn } from "@neomorphic-react/ui/utils";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type * as React from "react";
import { CodeFence } from "@/components/code-fence";
import {
  ComponentPreview,
  ComponentSource,
} from "@/components/component-preview";
import { ComponentsIndex } from "@/components/components-index";
import { InstallCommand } from "@/components/install-command";
import { ThemePresets } from "@/components/theme-presets";

type CodeProps = React.ComponentProps<"code"> & {
  "data-language"?: string;
  "data-meta"?: string;
};

function Pre({ children }: React.ComponentProps<"pre">) {
  const code = children as React.ReactElement<CodeProps> | undefined;
  const text = code?.props.children;
  return (
    <CodeFence
      code={typeof text === "string" ? text : ""}
      language={code?.props["data-language"]}
      meta={code?.props["data-meta"]}
    />
  );
}

function heading(Tag: "h2" | "h3" | "h4", className: string) {
  return function Heading({
    children,
    className: extra,
    id,
    ...props
  }: React.ComponentProps<"h2">) {
    return (
      <Tag
        className={cn(
          "group scroll-mt-24 font-semibold text-foreground",
          className,
          extra
        )}
        id={id}
        {...props}
      >
        {id ? (
          <a className="outline-none" href={`#${id}`}>
            {children}
            <span
              aria-hidden="true"
              className="ms-2 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
            >
              #
            </span>
          </a>
        ) : (
          children
        )}
      </Tag>
    );
  };
}

function Anchor({ href = "", className, ...props }: React.ComponentProps<"a">) {
  const classes = cn(
    "font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary",
    className
  );
  if (href.startsWith("/") || href.startsWith("#")) {
    return <Link className={classes} href={href} {...props} />;
  }
  return (
    <a
      className={classes}
      href={href}
      rel="noreferrer"
      target="_blank"
      {...props}
    />
  );
}

interface CalloutProps {
  children: React.ReactNode;
  title?: string;
  variant?: "default" | "info" | "success" | "warning" | "destructive";
}

/** A note set apart from the text, as the library's `Alert`. */
export function Callout({ children, title, variant = "info" }: CalloutProps) {
  return (
    <Alert className="my-6" variant={variant}>
      {title ? <AlertTitle>{title}</AlertTitle> : null}
      <AlertDescription className="[&_p]:leading-relaxed">
        {children}
      </AlertDescription>
    </Alert>
  );
}

/** Numbered steps: each `###` heading inside starts a step. */
export function Steps({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative my-8 ms-4 border-border border-s ps-8 [counter-reset:step] [&>h3:first-child]:mt-0 [&>h3]:relative [&>h3]:mt-10 [&>h3]:[counter-increment:step] [&>h3]:before:absolute [&>h3]:before:-start-[2.875rem] [&>h3]:before:top-0 [&>h3]:before:flex [&>h3]:before:size-7 [&>h3]:before:items-center [&>h3]:before:justify-center [&>h3]:before:rounded-full [&>h3]:before:bg-neu-convex [&>h3]:before:font-medium [&>h3]:before:text-muted-foreground [&>h3]:before:text-xs [&>h3]:before:shadow-neu-sm [&>h3]:before:content-[counter(step)]">
      {children}
    </div>
  );
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    h2: heading("h2", "mt-14 mb-4 text-2xl tracking-tight first:mt-0"),
    h3: heading("h3", "mt-10 mb-3 text-lg tracking-tight"),
    h4: heading("h4", "mt-8 mb-2 text-base"),
    p: ({ className, ...props }) => (
      <p
        className={cn(
          "my-4 text-[0.9375rem] text-muted-foreground leading-7",
          className
        )}
        {...props}
      />
    ),
    a: Anchor,
    strong: ({ className, ...props }) => (
      <strong
        className={cn("font-semibold text-foreground", className)}
        {...props}
      />
    ),
    ul: ({ className, ...props }) => (
      <ul
        className={cn(
          "my-4 ms-6 list-disc text-[0.9375rem] text-muted-foreground leading-7 marker:text-border [&>li]:mt-1.5",
          className
        )}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={cn(
          "my-4 ms-6 list-decimal text-[0.9375rem] text-muted-foreground leading-7 [&>li]:mt-1.5",
          className
        )}
        {...props}
      />
    ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          "my-6 border-border border-s-2 ps-4 text-muted-foreground italic",
          className
        )}
        {...props}
      />
    ),
    hr: () => (
      <hr className="my-10 h-px border-0 bg-gradient-to-r from-transparent via-border to-transparent" />
    ),
    code: ({ className, ...props }) => (
      <code
        className={cn(
          "inset-shadow-neu-sm rounded-md bg-background px-1.5 py-0.5 font-mono text-[0.8125rem] text-foreground shadow-neu-flat",
          className
        )}
        {...props}
      />
    ),
    pre: Pre,
    table: ({ className, ...props }) => (
      <div className="my-6 w-full overflow-x-auto rounded-xl border border-border/70">
        <table
          className={cn("w-full border-collapse text-sm", className)}
          {...props}
        />
      </div>
    ),
    thead: ({ className, ...props }) => (
      <thead className={cn("bg-muted/50", className)} {...props} />
    ),
    tr: ({ className, ...props }) => (
      <tr
        className={cn("border-border/70 border-b last:border-0", className)}
        {...props}
      />
    ),
    th: ({ className, ...props }) => (
      <th
        className={cn(
          "px-4 py-2.5 text-start font-medium text-foreground",
          className
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }) => (
      <td
        className={cn(
          "px-4 py-2.5 align-top text-muted-foreground [&_code]:whitespace-nowrap",
          className
        )}
        {...props}
      />
    ),
    img: ({ className, alt, ...props }) => (
      // biome-ignore lint/correctness/useImageSize: MDX images have no known size
      <img alt={alt} className={cn("my-6 rounded-xl", className)} {...props} />
    ),
    Callout,
    ComponentPreview,
    ComponentSource,
    ComponentsIndex,
    InstallCommand,
    Steps,
    ThemePresets,
    ...components,
  };
}
