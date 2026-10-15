import Link from "next/link";
import { GitHubIcon, LogoMark } from "@/components/icons";
import { LinkButton } from "@/components/link-button";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { SearchDocs } from "@/components/search";
import { getDocsNav } from "@/lib/nav";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  const sections = getDocsNav();
  return (
    <header className="sticky top-0 z-40 w-full bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center gap-3 px-4 md:px-6">
        <MobileNav sections={sections} />
        <Link
          className="flex items-center gap-2.5 rounded-full font-semibold text-foreground outline-none focus-visible:outline-2 focus-visible:outline-ring/50"
          href="/"
        >
          <LogoMark />
          <span className="hidden sm:inline">neomorphic/ui</span>
        </Link>
        <MainNav className="ms-4 hidden md:flex" />
        <div className="ms-auto flex items-center gap-2">
          <SearchDocs className="w-40 sm:w-56 lg:w-72" sections={sections} />
          <LinkButton
            aria-label="GitHub repository"
            href={siteConfig.links.github}
            iconOnly
            shape="rounded"
            size="sm"
            variant="ghost"
          >
            <GitHubIcon className="size-4" />
          </LinkButton>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />
    </header>
  );
}
