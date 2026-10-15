import type * as React from "react";
import { type BundledLanguage, codeToTokens, type ThemedToken } from "shiki";

const TRAILING_NEWLINE = /\n$/;
const ITALIC = 1;
const BOLD = 2;

const LANGUAGE_ALIASES: Record<string, string> = {
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  js: "javascript",
  ts: "typescript",
  mjs: "javascript",
};

export type HighlightedLine = ThemedToken[];

/**
 * Highlights `code` on the server with the light theme the library's
 * `useHighlightedCode` uses by default. Returns `null` for a language Shiki
 * doesn't know, so the caller falls back to plain lines.
 */
export async function highlight(
  code: string,
  language: string
): Promise<HighlightedLine[] | null> {
  const lang = LANGUAGE_ALIASES[language] ?? language;
  if (lang === "text" || lang === "txt" || lang === "plaintext") {
    return null;
  }
  try {
    const { tokens } = await codeToTokens(code.replace(TRAILING_NEWLINE, ""), {
      lang: lang as BundledLanguage,
      theme: "github-light",
    });
    return tokens;
  } catch {
    return null;
  }
}

function hasFlag(fontStyle: number, flag: number) {
  // biome-ignore lint/suspicious/noBitwiseOperators: Shiki's font style is a bitmask
  return (fontStyle & flag) !== 0;
}

export function tokenStyle(token: ThemedToken): React.CSSProperties {
  const fontStyle = token.fontStyle ?? 0;
  return {
    color: token.color,
    fontStyle: hasFlag(fontStyle, ITALIC) ? "italic" : undefined,
    fontWeight: hasFlag(fontStyle, BOLD) ? 600 : undefined,
  };
}

const RANGE = /^(\d+)(?:-(\d+))?$/;
const LINES_META = /\{([\d,\s-]+)\}/;
const TITLE_META = /title="([^"]*)"/;

export interface CodeMeta {
  /** 1-based line numbers to mark. */
  highlighted: Set<number>;
  lineNumbers: boolean;
  title?: string;
}

/** Reads a fence's meta string: `title="file.tsx" {2,4-6} showLineNumbers`. */
export function parseCodeMeta(meta: string): CodeMeta {
  const highlighted = new Set<number>();
  const lines = LINES_META.exec(meta)?.[1];
  for (const part of lines?.split(",") ?? []) {
    const match = RANGE.exec(part.trim());
    if (!match) {
      continue;
    }
    const start = Number(match[1]);
    const end = Number(match[2] ?? match[1]);
    for (let line = start; line <= end; line++) {
      highlighted.add(line);
    }
  }
  return {
    highlighted,
    lineNumbers: meta.includes("showLineNumbers"),
    title: TITLE_META.exec(meta)?.[1],
  };
}
