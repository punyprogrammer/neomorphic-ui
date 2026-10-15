import { LinkButton } from "@/components/link-button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main
        className="mx-auto grid max-w-md flex-1 content-center justify-items-center gap-4 px-4 py-24 text-center"
        id="main"
      >
        <p className="inset-shadow-neu flex size-20 items-center justify-center rounded-full font-semibold text-2xl text-muted-foreground shadow-neu-flat">
          404
        </p>
        <h1 className="font-semibold text-2xl text-foreground">
          This page doesn't exist
        </h1>
        <p className="text-muted-foreground">
          It may have moved, or the link may be wrong.
        </p>
        <div className="flex gap-3 pt-2">
          <LinkButton href="/docs" variant="primary">
            Read the docs
          </LinkButton>
          <LinkButton href="/" variant="ghost">
            Home
          </LinkButton>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
