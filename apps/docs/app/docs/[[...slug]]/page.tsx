import { findNeighbour } from "fumadocs-core/page-tree";
import { ArrowUpRightIcon, PencilIcon } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsPager } from "@/components/docs-pager";
import { DocsToc } from "@/components/docs-toc";
import { LinkButton } from "@/components/link-button";
import { getMDXComponents } from "@/components/mdx";
import { CopyPageButton } from "@/components/page-actions";
import { siteConfig } from "@/lib/site";
import { source } from "@/lib/source";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function DocsPage({ params }: PageProps) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) {
    notFound();
  }
  const MDX = page.data.body;
  const { previous, next } = findNeighbour(source.pageTree, page.url);
  const markdown = await page.data.getText("processed");
  const editUrl = `${siteConfig.links.github}/blob/main/apps/docs/content/docs/${page.path}`;
  const { component, primitive } = page.data;

  return (
    <div className="grid gap-x-12 py-8 lg:py-10 xl:grid-cols-[minmax(0,1fr)_13rem]">
      <article className="mx-auto w-full min-w-0 max-w-3xl">
        <header className="grid gap-4 pb-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <h1 className="font-semibold text-3xl text-foreground tracking-tight sm:text-4xl">
              {page.data.title}
            </h1>
            <CopyPageButton markdown={markdown} />
          </div>
          {page.data.description ? (
            <p className="text-balance text-lg text-muted-foreground leading-relaxed">
              {page.data.description}
            </p>
          ) : null}
          {component || primitive ? (
            <div className="flex flex-wrap gap-3 pt-1">
              {component ? (
                <LinkButton
                  href={`${siteConfig.links.storybook}?path=/docs/components-${component.replaceAll("-", "")}--docs`}
                  iconPosition="end"
                  size="sm"
                  variant="ghost"
                >
                  Storybook
                  <ArrowUpRightIcon aria-hidden="true" />
                </LinkButton>
              ) : null}
              {primitive ? (
                <LinkButton
                  href={primitive}
                  iconPosition="end"
                  size="sm"
                  variant="ghost"
                >
                  Base UI reference
                  <ArrowUpRightIcon aria-hidden="true" />
                </LinkButton>
              ) : null}
            </div>
          ) : null}
        </header>
        <div className="docs-content">
          <MDX components={getMDXComponents()} />
        </div>
        <DocsPager next={next} previous={previous} />
      </article>
      <aside className="hidden xl:block">
        <div className="sticky top-24 grid max-h-[calc(100svh-7rem)] gap-6 overflow-y-auto pb-8">
          <DocsToc toc={page.data.toc} />
          <a
            className="flex items-center gap-1.5 text-muted-foreground text-xs hover:text-foreground"
            href={editUrl}
            rel="noreferrer"
            target="_blank"
          >
            <PencilIcon aria-hidden="true" className="size-3" />
            Edit this page on GitHub
          </a>
        </div>
      </aside>
    </div>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) {
    notFound();
  }
  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      type: "article",
    },
  };
}
