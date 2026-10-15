import type { Node, Root } from "fumadocs-core/page-tree";
import type { ReactNode } from "react";
import { source } from "@/lib/source";

export interface NavItem {
  href: string;
  title: string;
}

export interface NavSection {
  items: NavItem[];
  title: string;
}

function text(name: ReactNode): string {
  return typeof name === "string" || typeof name === "number"
    ? String(name)
    : "";
}

/**
 * The docs page tree as plain sections for the sidebar and the mobile menu:
 * a separator starts a section, and a folder is a section of its own, led by
 * its index page.
 */
export function getDocsNav(tree: Root = source.pageTree): NavSection[] {
  const sections: NavSection[] = [];
  let current: NavSection | undefined;

  const visit = (node: Node) => {
    if (node.type === "separator") {
      current = { title: text(node.name), items: [] };
      sections.push(current);
      return;
    }
    if (node.type === "folder") {
      const folder: NavSection = { title: text(node.name), items: [] };
      if (node.index) {
        folder.items.push({ title: "Overview", href: node.index.url });
      }
      for (const child of node.children) {
        if (child.type === "page") {
          folder.items.push({ title: text(child.name), href: child.url });
        }
      }
      sections.push(folder);
      current = undefined;
      return;
    }
    if (!current) {
      current = { title: "", items: [] };
      sections.push(current);
    }
    current.items.push({ title: text(node.name), href: node.url });
  };

  for (const node of tree.children) {
    visit(node);
  }
  return sections.filter((section) => section.items.length > 0);
}
