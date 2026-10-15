"use client";

import type * as React from "react";
import { useEffect, useMemo, useState } from "react";
import type {
  BundledLanguage,
  BundledTheme,
  HighlighterCore,
  ThemedToken,
} from "shiki";

// Shiki is an optional peer dependency: it's only loaded, on first use, by
// this hook. The JavaScript regex engine avoids shipping the Oniguruma WASM,
// and each language and theme is fetched the first time it's needed.

const TRAILING_NEWLINE = /\n$/;
const ITALIC = 1;
const BOLD = 2;
const UNDERLINE = 4;

let highlighterPromise: Promise<HighlighterCore> | undefined;

function getHighlighter() {
  highlighterPromise ??= Promise.all([
    import("shiki/core"),
    import("shiki/engine/javascript"),
  ]).then(([{ createHighlighterCore }, { createJavaScriptRegexEngine }]) =>
    createHighlighterCore({
      engine: createJavaScriptRegexEngine(),
      langs: [],
      themes: [],
    })
  );
  return highlighterPromise;
}

async function tokenize(code: string, language: string, theme: BundledTheme) {
  const [highlighter, { bundledLanguages }, { bundledThemes }] =
    await Promise.all([
      getHighlighter(),
      import("shiki/langs"),
      import("shiki/themes"),
    ]);
  const loadLanguage = bundledLanguages[language as BundledLanguage];
  if (!loadLanguage) {
    throw new Error(`Shiki has no language "${language}"`);
  }
  if (!highlighter.getLoadedLanguages().includes(language)) {
    await highlighter.loadLanguage(loadLanguage);
  }
  if (!highlighter.getLoadedThemes().includes(theme)) {
    await highlighter.loadTheme(bundledThemes[theme]);
  }
  return highlighter.codeToTokens(code.replace(TRAILING_NEWLINE, ""), {
    lang: language,
    theme,
  }).tokens;
}

function hasFlag(fontStyle: number, flag: number) {
  // biome-ignore lint/suspicious/noBitwiseOperators: Shiki's font style is a bitmask
  return (fontStyle & flag) !== 0;
}

function tokenStyle(token: ThemedToken): React.CSSProperties {
  const fontStyle = token.fontStyle ?? 0;
  return {
    color: token.color,
    fontStyle: hasFlag(fontStyle, ITALIC) ? "italic" : undefined,
    fontWeight: hasFlag(fontStyle, BOLD) ? 600 : undefined,
    textDecoration: hasFlag(fontStyle, UNDERLINE) ? "underline" : undefined,
  };
}

function renderLine(tokens: ThemedToken[]) {
  return tokens.map((token) => (
    <span key={token.offset} style={tokenStyle(token)}>
      {token.content}
    </span>
  ));
}

// ---------------------------------------------------------------------------
// useHighlightedCode
// ---------------------------------------------------------------------------

interface UseHighlightedCodeOptions {
  /** A Shiki language id or alias, such as `"tsx"` or `"bash"`. */
  language: BundledLanguage | (string & {});
  /**
   * A Shiki theme. Its token colours are used; its background isn't, so the
   * code stays in the `CodeBlock` well.
   * @default "github-light"
   */
  theme?: BundledTheme;
}

interface HighlightedCode {
  /**
   * One node per line: plain text until the tokens are ready (or if
   * highlighting fails), then coloured spans. Render each in a
   * `CodeBlockLine`.
   */
  lines: React.ReactNode[];
  status: "loading" | "ready" | "error";
}

/**
 * Highlights `code` with Shiki, loading the highlighter, the language and
 * the theme on demand. Needs the optional `shiki` package installed.
 */
function useHighlightedCode(
  code: string,
  { language, theme = "github-light" }: UseHighlightedCodeOptions
): HighlightedCode {
  const key = `${language}\u0000${theme}\u0000${code}`;
  const [result, setResult] = useState<{
    key: string;
    tokens: ThemedToken[][] | null;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    tokenize(code, language, theme).then(
      (tokens) => {
        if (!cancelled) {
          setResult({ key, tokens });
        }
      },
      () => {
        if (!cancelled) {
          setResult({ key, tokens: null });
        }
      }
    );
    return () => {
      cancelled = true;
    };
  }, [code, key, language, theme]);

  return useMemo(() => {
    const current = result?.key === key ? result : null;
    if (current?.tokens) {
      return { lines: current.tokens.map(renderLine), status: "ready" };
    }
    return {
      lines: code.replace(TRAILING_NEWLINE, "").split("\n"),
      status: current ? "error" : "loading",
    };
  }, [code, key, result]);
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type { HighlightedCode, UseHighlightedCodeOptions };
export { useHighlightedCode };
