"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
} from "@neomorphic-react/ui/code-block";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@neomorphic-react/ui/tabs";

const snippets = [
  {
    id: "curl",
    label: "cURL",
    code: `curl https://api.example.com/v1/events \\
  -H "Authorization: Bearer $API_KEY" \\
  -d name=signup \\
  -d user_id=usr_42`,
  },
  {
    id: "js",
    label: "JavaScript",
    code: `await fetch("https://api.example.com/v1/events", {
  method: "POST",
  headers: { Authorization: \`Bearer \${process.env.API_KEY}\` },
  body: new URLSearchParams({ name: "signup", user_id: "usr_42" }),
});`,
  },
];

export default function CodeBlockInContext() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Send your first event</CardTitle>
        <CardDescription>
          Run this from your server. Events show up in the dashboard within a
          minute.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="curl">
          <TabsList aria-label="Language" variant="line">
            {snippets.map((snippet) => (
              <TabsTrigger key={snippet.id} value={snippet.id}>
                {snippet.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {snippets.map((snippet) => (
            <TabsContent key={snippet.id} value={snippet.id}>
              <CodeBlock size="sm">
                <CodeBlockActions>
                  <CodeBlockCopyButton value={snippet.code} />
                </CodeBlockActions>
                <CodeBlockContent>{snippet.code}</CodeBlockContent>
              </CodeBlock>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
