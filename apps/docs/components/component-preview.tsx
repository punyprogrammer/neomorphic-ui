import { readFile } from "node:fs/promises";
import path from "node:path";
import { CodeFence } from "@/components/code-fence";
import { PreviewTabs } from "@/components/preview-tabs";
import { examples } from "@/examples/__index__";

const USE_CLIENT = /^"use client";\n\n?/;

export async function readExample(name: string) {
  const file = path.join(process.cwd(), "examples", `${name}.tsx`);
  return (await readFile(file, "utf8")).replace(USE_CLIENT, "");
}

interface ComponentPreviewProps {
  /** Where the example sits in the preview. @default "center" */
  align?: "center" | "start" | "end";
  className?: string;
  /** Show the preview alone, without the Code tab. */
  hideCode?: boolean;
  /** The example's file name in `examples/`, without `.tsx`. */
  name: string;
}

/**
 * A live example and its source, in Preview and Code tabs. The example is
 * rendered on the page; the source is read from its file at build time.
 */
export async function ComponentPreview({
  align = "center",
  className,
  hideCode = false,
  name,
}: ComponentPreviewProps) {
  const load = examples[name];
  if (!load) {
    throw new Error(`No example named "${name}" in examples/`);
  }
  const [{ default: Example }, code] = await Promise.all([
    load(),
    readExample(name),
  ]);
  return (
    <PreviewTabs
      align={align}
      className={className}
      code={
        hideCode ? null : (
          <CodeFence
            className="my-0"
            code={code}
            language="tsx"
            maxLines={40}
          />
        )
      }
      preview={<Example />}
    />
  );
}

/** An example's source on its own, for longer walkthroughs. */
export async function ComponentSource({
  name,
  title,
}: {
  name: string;
  title?: string;
}) {
  const code = await readExample(name);
  return (
    <CodeFence
      code={code}
      language="tsx"
      maxLines={24}
      meta={title ? `title="${title}"` : ""}
    />
  );
}
