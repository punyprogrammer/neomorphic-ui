import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { z } from "zod";

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: pageSchema.extend({
      /** The Base UI part a component builds on, linked from the page header. */
      primitive: z.string().optional(),
      /** The component's kebab-case import path, shown in the page header. */
      component: z.string().optional(),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

interface CodeNode {
  children?: CodeNode[];
  data?: { hProperties?: Record<string, unknown> };
  lang?: string | null;
  meta?: string | null;
  type: string;
}

/**
 * Code fences are highlighted by the `pre` component, which only sees the
 * rendered `<code>` element: copy the fence's language and meta string
 * (`title="…"`, `{1,3-4}`) onto it as data attributes.
 */
function remarkCodeMeta() {
  const visit = (node: CodeNode) => {
    if (node.type === "code") {
      node.data ??= {};
      node.data.hProperties = {
        ...node.data.hProperties,
        "data-language": node.lang ?? "text",
        "data-meta": node.meta ?? "",
      };
    }
    for (const child of node.children ?? []) {
      visit(child);
    }
  };
  return (tree: CodeNode) => {
    visit(tree);
  };
}

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkCodeMeta],
    rehypeCodeOptions: false,
  },
});
