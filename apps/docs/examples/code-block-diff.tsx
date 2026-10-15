"use client";

import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@neomorphic-react/ui/code-block";

export default function CodeBlockDiff() {
  return (
    <CodeBlock className="max-w-xl">
      <CodeBlockHeader>
        <CodeBlockTitle>playwright.config.ts</CodeBlockTitle>
      </CodeBlockHeader>
      <CodeBlockContent lineNumbers startLine={8}>
        <CodeBlockLine>{"export default defineConfig({"}</CodeBlockLine>
        <CodeBlockLine variant="removed">{"  retries: 0,"}</CodeBlockLine>
        <CodeBlockLine variant="added">
          {"  retries: process.env.CI ? 2 : 0,"}
        </CodeBlockLine>
        <CodeBlockLine>{"  timeout: 30_000,"}</CodeBlockLine>
        <CodeBlockLine variant="highlighted">
          {'  use: { trace: "on-first-retry" },'}
        </CodeBlockLine>
        <CodeBlockLine>{"});"}</CodeBlockLine>
      </CodeBlockContent>
    </CodeBlock>
  );
}
