"use client";

import { cva, type VariantProps } from "class-variance-authority";
import {
  Check as CheckIcon,
  Copy as CopyIcon,
  WrapText as WrapTextIcon,
} from "lucide-react";
import type * as React from "react";
import {
  Children,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";

import { Button, type ButtonProps } from "./button";
import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface CodeBlockContextValue {
  setWrap: (wrap: boolean) => void;
  wrap: boolean;
}

const CodeBlockContext = createContext<CodeBlockContextValue>({
  setWrap: () => undefined,
  wrap: false,
});

const TRAILING_NEWLINE = /\n$/;

// ---------------------------------------------------------------------------
// CodeBlock
// ---------------------------------------------------------------------------

// A well pressed into the surface, so code reads as content rather than a
// control. Actions placed straight in the block float over its corner.
const codeBlockVariants = cva(
  "group/code-block relative inset-shadow-neu flex w-full min-w-0 flex-col overflow-hidden rounded-xl bg-background text-sm shadow-neu-flat has-[>[data-slot=code-block-content]:focus-visible]:outline-2 has-[>[data-slot=code-block-content]:focus-visible]:outline-ring/50 has-[>[data-slot=code-block-content]:focus-visible]:outline-offset-2 data-[size=sm]:rounded-lg data-[size=sm]:text-xs",
  {
    variants: {
      variant: {
        default: "text-foreground",
        destructive:
          "bg-[color-mix(in_oklab,var(--color-destructive)_6%,var(--color-background))] text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface CodeBlockProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof codeBlockVariants> {
  /** Start with long lines wrapped; a `CodeBlockWrapButton` toggles it. */
  defaultWrap?: boolean;
  /**
   * `sm` is tighter and smaller, for output nested in a `Trace` or a message.
   * @default "default"
   */
  size?: "default" | "sm";
  /**
   * `destructive` tints the well and text, for an error or a stack trace.
   * @default "default"
   */
  variant?: "default" | "destructive";
}

/**
 * A block of code: an optional `CodeBlockHeader` (title and actions), a
 * `CodeBlockContent` and an optional `CodeBlockFooter`.
 */
function CodeBlock({
  className,
  defaultWrap = false,
  size = "default",
  variant = "default",
  ...props
}: CodeBlockProps) {
  const [wrap, setWrap] = useState(defaultWrap);
  const context = useMemo(() => ({ setWrap, wrap }), [wrap]);
  return (
    <CodeBlockContext.Provider value={context}>
      <div
        className={cn(codeBlockVariants({ variant }), className)}
        data-size={size}
        data-slot="code-block"
        data-variant={variant}
        {...props}
      />
    </CodeBlockContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Header, title, actions, footer
// ---------------------------------------------------------------------------

type CodeBlockHeaderProps = React.ComponentProps<"div">;

/** The row above the code: a `CodeBlockTitle` and `CodeBlockActions`. */
function CodeBlockHeader({ className, ...props }: CodeBlockHeaderProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 shrink-0 items-center gap-2 px-3 pt-3 text-muted-foreground group-data-[size=sm]/code-block:px-2.5 group-data-[size=sm]/code-block:pt-2.5 group-data-[variant=destructive]/code-block:text-destructive",
        className
      )}
      data-slot="code-block-header"
      {...props}
    />
  );
}

type CodeBlockTitleProps = React.ComponentProps<"div">;

/** A file name or language, with an optional leading icon. */
function CodeBlockTitle({ className, ...props }: CodeBlockTitleProps) {
  return (
    <div
      className={cn(
        "min-w-0 truncate font-medium font-sans text-foreground text-sm group-data-[size=sm]/code-block:text-xs group-data-[variant=destructive]/code-block:text-destructive [&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:me-1.5 [&_svg]:inline-block [&_svg]:align-middle",
        className
      )}
      data-slot="code-block-title"
      {...props}
    />
  );
}

type CodeBlockActionsProps = React.ComponentProps<"div">;

/**
 * Buttons such as copy and wrap. In a header they sit at its end; placed
 * straight in the `CodeBlock` they float over the top corner, shown on hover
 * or focus (always on touch screens).
 */
function CodeBlockActions({ className, ...props }: CodeBlockActionsProps) {
  return (
    <div
      className={cn(
        "-my-1 ms-auto -me-1.5 flex shrink-0 items-center gap-1 [[data-slot=code-block]>&]:absolute [[data-slot=code-block]>&]:end-2 [[data-slot=code-block]>&]:top-2 [[data-slot=code-block]>&]:z-10 [[data-slot=code-block]>&]:m-0 [[data-slot=code-block]>&]:opacity-0 [[data-slot=code-block]>&]:pointer-coarse:opacity-100 [[data-slot=code-block]>&]:transition-opacity [[data-slot=code-block]>&]:duration-[var(--duration-fast)] [[data-slot=code-block]>&]:group-focus-within/code-block:opacity-100 [[data-slot=code-block]>&]:group-hover/code-block:opacity-100 group-data-[size=sm]/code-block:[[data-slot=code-block]>&]:end-1.5 group-data-[size=sm]/code-block:[[data-slot=code-block]>&]:top-1.5",
        className
      )}
      data-slot="code-block-actions"
      {...props}
    />
  );
}

type CodeBlockFooterProps = React.ComponentProps<"div">;

/** A row under the code, e.g. "Exit code 1" or a Show more button. */
function CodeBlockFooter({ className, ...props }: CodeBlockFooterProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 shrink-0 items-center gap-2 px-3 pb-3 text-muted-foreground text-xs group-data-[size=sm]/code-block:px-2.5 group-data-[size=sm]/code-block:pb-2.5",
        className
      )}
      data-slot="code-block-footer"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Action buttons
// ---------------------------------------------------------------------------

const ACTION_CLASS =
  "size-7 group-data-[size=sm]/code-block:size-6 [[data-slot=code-block]>[data-slot=code-block-actions]>&]:bg-neu-convex [[data-slot=code-block]>[data-slot=code-block-actions]>&]:shadow-neu-sm";

interface CodeBlockCopyButtonProps extends Omit<ButtonProps, "value"> {
  /** The text to copy, usually the same string the block shows. */
  value: string;
}

/**
 * Copies `value` to the clipboard and shows a check for two seconds. The
 * change is announced as "Copied".
 */
function CodeBlockCopyButton({
  className,
  onClick,
  shape = "pill",
  size = "sm",
  value,
  variant = "ghost",
  ...props
}: CodeBlockCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  const handleClick = useCallback<NonNullable<ButtonProps["onClick"]>>(
    (event) => {
      onClick?.(event);
      navigator.clipboard
        ?.writeText(value)
        .then(() => setCopied(true))
        .catch(() => undefined);
    },
    [onClick, value]
  );

  return (
    <>
      <Button
        aria-label={copied ? "Copied" : "Copy code"}
        className={cn(ACTION_CLASS, className)}
        data-copied={copied || undefined}
        data-slot="code-block-copy-button"
        icon={copied ? <CheckIcon /> : <CopyIcon />}
        onClick={handleClick}
        shape={shape}
        size={size}
        variant={variant}
        {...props}
      />
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied" : ""}
      </span>
    </>
  );
}

type CodeBlockWrapButtonProps = ButtonProps;

/** Toggles wrapping of long lines (`aria-pressed`). */
function CodeBlockWrapButton({
  className,
  onClick,
  shape = "pill",
  size = "sm",
  variant = "ghost",
  ...props
}: CodeBlockWrapButtonProps) {
  const { setWrap, wrap } = useContext(CodeBlockContext);
  const handleClick = useCallback<NonNullable<ButtonProps["onClick"]>>(
    (event) => {
      onClick?.(event);
      setWrap(!wrap);
    },
    [onClick, setWrap, wrap]
  );
  return (
    <Button
      aria-label="Wrap lines"
      aria-pressed={wrap}
      className={cn(
        ACTION_CLASS,
        "aria-pressed:inset-shadow-neu-sm aria-pressed:text-primary aria-pressed:shadow-neu-flat",
        className
      )}
      data-slot="code-block-wrap-button"
      icon={<WrapTextIcon />}
      onClick={handleClick}
      shape={shape}
      size={size}
      variant={variant}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// CodeBlockContent
// ---------------------------------------------------------------------------

interface CodeBlockContentProps extends React.ComponentProps<"pre"> {
  /** Number each line; `startLine` sets the first number. */
  lineNumbers?: boolean;
  /**
   * Show at most this many lines, with a Show more button under them for
   * the rest.
   */
  maxLines?: number;
  /** @default 1 */
  startLine?: number;
  /** Wrap long lines instead of scrolling; overrides the block's wrap state. */
  wrap?: boolean;
}

/**
 * The code. Pass a string, or `CodeBlockLine`s to mark lines (and for
 * highlighted tokens from `useHighlightedCode`). A string with
 * `lineNumbers` or `maxLines` is split into lines for you. The region is
 * focusable, so it scrolls from the keyboard.
 */
function CodeBlockContent({
  children,
  className,
  id,
  lineNumbers = false,
  maxLines,
  startLine = 1,
  style,
  wrap,
  ...props
}: CodeBlockContentProps) {
  const context = useContext(CodeBlockContext);
  const resolvedWrap = wrap ?? context.wrap;
  const fallbackId = useId();
  const contentId = id ?? `${fallbackId}-code`;
  const [expanded, setExpanded] = useState(false);
  const toggle = useCallback(() => setExpanded((value) => !value), []);

  const split =
    typeof children === "string" && (lineNumbers || maxLines !== undefined);
  const lines = split
    ? children
        .replace(TRAILING_NEWLINE, "")
        .split("\n")
        .map((line, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: lines have no other identity
          <CodeBlockLine key={index}>{line}</CodeBlockLine>
        ))
    : children;
  const lineCount = Children.count(lines);
  const clipped =
    maxLines !== undefined && lineCount > maxLines && !expanded
      ? maxLines
      : undefined;
  const showToggle = maxLines !== undefined && lineCount > maxLines;

  return (
    <>
      <pre
        className={cn(
          "data-clipped:mask-linear-[to_bottom,black_calc(100%-2lh),transparent] data-wrap:wrap-break-word neu-scrollbar min-h-0 min-w-0 overflow-auto px-3 py-3 text-start font-mono leading-relaxed outline-none group-has-data-[slot=code-block-header]/code-block:pt-2 group-has-data-[slot=code-block-footer]/code-block:pb-2 data-wrap:whitespace-pre-wrap group-data-[size=sm]/code-block:px-2.5 group-data-[size=sm]/code-block:py-2.5",
          className
        )}
        data-clipped={clipped ? "" : undefined}
        data-numbered={lineNumbers || undefined}
        data-slot="code-block-content"
        data-wrap={resolvedWrap || undefined}
        dir="ltr"
        id={contentId}
        style={{
          counterReset: `line ${startLine - 1}`,
          ...(clipped ? { maxHeight: `calc(${clipped}lh + 1.5rem)` } : null),
          ...style,
        }}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: a scrolling region must be reachable by keyboard
        tabIndex={0}
        {...props}
      >
        <code
          className="grid min-h-lh in-data-wrap:min-w-0 min-w-max in-data-numbered:grid-cols-[auto_1fr] content-start"
          data-slot="code-block-code"
        >
          {lines}
        </code>
      </pre>
      {showToggle ? (
        <CodeBlockFooter className="pt-1">
          <Button
            aria-controls={contentId}
            aria-expanded={expanded}
            className="-ms-2"
            onClick={toggle}
            size="sm"
            variant="ghost"
          >
            {expanded
              ? "Show less"
              : `Show ${lineCount - (maxLines ?? 0)} more lines`}
          </Button>
        </CodeBlockFooter>
      ) : null}
    </>
  );
}

// ---------------------------------------------------------------------------
// CodeBlockLine
// ---------------------------------------------------------------------------

// The diff sign sits in the left padding; line numbers come from a CSS
// counter, with empty alt text so they aren't read or copied.
const codeBlockLineVariants = cva(
  "relative in-data-numbered:col-span-2 -mx-3 block in-data-numbered:grid min-h-lh in-data-numbered:grid-cols-subgrid in-data-numbered:gap-x-3 px-3 in-data-numbered:[counter-increment:line] in-data-numbered:before:min-w-6 in-data-numbered:before:select-none in-data-numbered:before:text-end in-data-numbered:before:text-muted-foreground in-data-numbered:before:content-[counter(line)] after:absolute after:start-1 after:top-0 after:select-none after:text-muted-foreground group-data-[size=sm]/code-block:-mx-2.5 group-data-[size=sm]/code-block:px-2.5 in-data-numbered:supports-[content:counter(line)_/_'']:before:content-[counter(line)_/_'']",
  {
    variants: {
      variant: {
        default: "",
        highlighted:
          "bg-[color-mix(in_oklab,var(--color-primary)_8%,transparent)] shadow-[inset_2px_0_0_var(--color-primary)]",
        added:
          "bg-[color-mix(in_oklab,var(--color-success)_14%,transparent)] after:text-success-foreground after:content-['+']",
        removed:
          "bg-[color-mix(in_oklab,var(--color-destructive)_10%,transparent)] after:text-destructive after:content-['−']",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface CodeBlockLineProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof codeBlockLineVariants> {
  /**
   * `highlighted` marks a line to look at; `added` and `removed` show a diff
   * with a `+` or `−` in the gutter.
   * @default "default"
   */
  variant?: "default" | "highlighted" | "added" | "removed";
}

/** One line of code. */
function CodeBlockLine({
  children,
  className,
  variant = "default",
  ...props
}: CodeBlockLineProps) {
  // An empty line holds a newline, so a copied selection keeps blank lines.
  const empty =
    children === undefined ||
    children === null ||
    children === "" ||
    (Array.isArray(children) && children.length === 0);
  const content = empty ? "\n" : children;
  return (
    <span
      className={cn(codeBlockLineVariants({ variant }), className)}
      data-slot="code-block-line"
      data-variant={variant}
      {...props}
    >
      <span className="min-w-0" data-slot="code-block-line-content">
        {content}
      </span>
    </span>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  CodeBlockActionsProps,
  CodeBlockContentProps,
  CodeBlockCopyButtonProps,
  CodeBlockFooterProps,
  CodeBlockHeaderProps,
  CodeBlockLineProps,
  CodeBlockProps,
  CodeBlockTitleProps,
  CodeBlockWrapButtonProps,
};
export {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
  CodeBlockWrapButton,
  codeBlockLineVariants,
  codeBlockVariants,
};
