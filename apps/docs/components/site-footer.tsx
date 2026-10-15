import { siteConfig } from "@/lib/site";

const LINK =
  "font-medium text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground";

export function SiteFooter() {
  return (
    <footer className="mt-auto">
      <div
        aria-hidden="true"
        className="h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-2 px-4 py-8 text-muted-foreground text-sm md:flex-row md:items-center md:justify-between md:px-6">
        <p>
          Built on{" "}
          <a
            className={LINK}
            href={siteConfig.links.baseUi}
            rel="noreferrer"
            target="_blank"
          >
            Base UI
          </a>{" "}
          and{" "}
          <a
            className={LINK}
            href={siteConfig.links.tailwind}
            rel="noreferrer"
            target="_blank"
          >
            Tailwind CSS
          </a>
          . The source is on{" "}
          <a
            className={LINK}
            href={siteConfig.links.github}
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          .
        </p>
        <p>
          {siteConfig.packageName} v{siteConfig.version} · MIT licence
        </p>
      </div>
    </footer>
  );
}
