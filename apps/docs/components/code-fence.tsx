import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@neomorphic-react/ui/code-block";
import { cn } from "@neomorphic-react/ui/utils";
import { FileCodeIcon, TerminalIcon } from "lucide-react";
import { highlight, parseCodeMeta, tokenStyle } from "@/lib/highlight";

const TRAILING_NEWLINE = /\n$/;
const SHELL = new Set(["bash", "sh", "shell", "zsh"]);

interface CodeFenceProps {
  className?: string;
  code: string;
  language?: string;
  /** Collapse the code under a Show more button past this many lines. */
  maxLines?: number;
  /** The fence's meta string: `title="…"`, `{1,3-4}`, `showLineNumbers`. */
  meta?: string;
}

/**
 * A highlighted block of code in the library's `CodeBlock`, rendered on the
 * server. A `title` gets a header with the copy button; without one the
 * button floats over the corner.
 */
export async function CodeFence({
  className,
  code,
  language = "text",
  meta = "",
  maxLines,
}: CodeFenceProps) {
  const source = code.replace(TRAILING_NEWLINE, "");
  const { highlighted, lineNumbers, title } = parseCodeMeta(meta);
  const tokens = await highlight(source, language);
  const lines = tokens
    ? tokens.map((line) =>
        line.map((token) => (
          <span key={token.offset} style={tokenStyle(token)}>
            {token.content}
          </span>
        ))
      )
    : source.split("\n");
  const copy = <CodeBlockCopyButton value={source} />;
  const Icon = SHELL.has(language) ? TerminalIcon : FileCodeIcon;

  return (
    <CodeBlock className={cn("my-6", className)}>
      {title ? (
        <CodeBlockHeader>
          <CodeBlockTitle>
            <Icon aria-hidden="true" />
            {title}
          </CodeBlockTitle>
          <CodeBlockActions>{copy}</CodeBlockActions>
        </CodeBlockHeader>
      ) : (
        <CodeBlockActions>{copy}</CodeBlockActions>
      )}
      <CodeBlockContent
        className="text-[0.8125rem]"
        lineNumbers={lineNumbers}
        maxLines={maxLines}
      >
        {lines.map((line, index) => (
          <CodeBlockLine
            // biome-ignore lint/suspicious/noArrayIndexKey: lines have no other identity
            key={index}
            variant={highlighted.has(index + 1) ? "highlighted" : "default"}
          >
            {line}
          </CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  );
}
