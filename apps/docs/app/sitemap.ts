import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { source } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, siteConfig.url).toString();
  return [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    ...source.getPages().map((page) => ({
      url: url(page.url),
      changeFrequency: "weekly" as const,
      priority: page.slugs.length === 0 ? 0.9 : 0.7,
    })),
  ];
}
