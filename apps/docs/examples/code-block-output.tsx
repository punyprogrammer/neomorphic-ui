"use client";

import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@neomorphic-react/ui/code-block";
import { SquareTerminal } from "lucide-react";

export default function CodeBlockOutput() {
  return (
    <div className="grid w-full max-w-lg gap-6">
      <CodeBlock size="sm">
        <CodeBlockHeader>
          <CodeBlockTitle>
            <SquareTerminal aria-hidden="true" />
            pnpm test
          </CodeBlockTitle>
        </CodeBlockHeader>
        <CodeBlockContent>
          {`✓ src/cart.test.ts (6 tests) 41ms
✓ src/checkout.test.ts (4 tests) 28ms

Test Files  2 passed (2)
     Tests  10 passed (10)`}
        </CodeBlockContent>
      </CodeBlock>
      <CodeBlock size="sm" variant="destructive">
        <CodeBlockHeader>
          <CodeBlockTitle>
            <SquareTerminal aria-hidden="true" />
            pnpm build
          </CodeBlockTitle>
        </CodeBlockHeader>
        <CodeBlockContent>
          {`error TS2345: Argument of type 'string' is not assignable
to parameter of type 'number'.
  src/dial.tsx:42:18`}
        </CodeBlockContent>
        <CodeBlockFooter>Exit code 1</CodeBlockFooter>
      </CodeBlock>
    </div>
  );
}
