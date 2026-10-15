"use client";

import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@neomorphic-react/ui/code-block";
import { useHighlightedCode } from "@neomorphic-react/ui/use-highlighted-code";

const code = `export async function getOrder(id: string) {
  const response = await fetch(\`/api/orders/\${id}\`);
  if (!response.ok) {
    throw new Error("Order not found");
  }
  return (await response.json()) as Order;
}`;

export default function CodeBlockHighlighting() {
  const { lines } = useHighlightedCode(code, { language: "ts" });
  return (
    <CodeBlock className="max-w-xl">
      <CodeBlockHeader>
        <CodeBlockTitle>orders.ts</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={code} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent lineNumbers>
        {lines.map((line, index) => (
          <CodeBlockLine key={index}>{line}</CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  );
}
