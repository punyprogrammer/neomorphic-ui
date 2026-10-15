"use client";

import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockWrapButton,
} from "@neomorphic-react/ui/code-block";
import { FileCode } from "lucide-react";

const code = `import { Button } from "@neomorphic-react/ui/button";

export function SaveButton({ pending }: { pending: boolean }) {
  return (
    <Button isLoading={pending} variant="primary">
      Save changes
    </Button>
  );
}`;

export default function CodeBlockDemo() {
  return (
    <CodeBlock className="max-w-xl">
      <CodeBlockHeader>
        <CodeBlockTitle>
          <FileCode aria-hidden="true" />
          save-button.tsx
        </CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockWrapButton />
          <CodeBlockCopyButton value={code} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent lineNumbers>{code}</CodeBlockContent>
    </CodeBlock>
  );
}
