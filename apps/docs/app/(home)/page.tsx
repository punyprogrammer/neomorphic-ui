import {
  AccessibilityIcon,
  ArrowRightIcon,
  BotIcon,
  LanguagesIcon,
  PackageIcon,
  PaletteIcon,
  SparklesIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HomeBlocks } from "@/components/home-blocks";
import { InstallCommand } from "@/components/install-command";
import { LinkButton } from "@/components/link-button";
import { showcaseApps } from "@/lib/showcase";
import { siteConfig } from "@/lib/site";

const FEATURES = [
  {
    icon: AccessibilityIcon,
    title: "Accessible by default",
    text: "Keyboard support and ARIA from Base UI, visible focus rings and colours that pass WCAG AA contrast.",
  },
  {
    icon: PaletteIcon,
    title: "Themed with CSS variables",
    text: "One surface colour, a depth and a radius. Change a few tokens and every shadow follows.",
  },
  {
    icon: PackageIcon,
    title: "One import per component",
    text: "Every component has its own entry point, so your app bundles only what it uses.",
  },
  {
    icon: BotIcon,
    title: "Ready for AI interfaces",
    text: "Messages, bubbles, traces, attachments, code blocks and a transcript that follows the latest reply.",
  },
  {
    icon: LanguagesIcon,
    title: "Right-to-left and reduced motion",
    text: "Logical properties throughout, and no animation when the reader asks for less.",
  },
  {
    icon: SparklesIcon,
    title: "React 19 and Tailwind v4",
    text: "Server Component friendly entries, no runtime styles, and Tailwind's CSS-first configuration.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="mx-auto grid max-w-4xl justify-items-center gap-6 px-4 pt-16 pb-12 text-center sm:pt-24">
        <Link
          className="group inset-shadow-neu-flat inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full bg-neu-convex py-1 ps-1 pe-3 text-muted-foreground text-sm shadow-neu-sm outline-none transition-shadow hover:shadow-neu focus-visible:outline-2 focus-visible:outline-ring/50"
          href="/docs/components"
        >
          <span className="rounded-full bg-primary px-2 py-0.5 font-medium text-primary-foreground text-xs">
            v{siteConfig.version}
          </span>
          <span className="text-start">
            {siteConfig.componentCount} components, with chat and agent parts
          </span>
          <ArrowRightIcon
            aria-hidden="true"
            className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
        <h1 className="text-balance font-semibold text-3xl text-foreground tracking-tight sm:text-6xl">
          Soft interfaces that rise out of the page
        </h1>
        <p className="max-w-2xl text-balance text-lg text-muted-foreground leading-relaxed">
          Neumorphic React components built on Base UI and Tailwind CSS v4.
          Raised and pressed surfaces, real keyboard support, and a theme you
          change with a handful of CSS variables.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <LinkButton href="/docs/installation" size="lg" variant="primary">
            Get started
          </LinkButton>
          <LinkButton href="/docs/components" size="lg">
            Browse components
          </LinkButton>
        </div>
        <div className="w-full max-w-md pt-4 text-start">
          <InstallCommand packages={siteConfig.packageName} />
        </div>
      </section>

      <div className="mx-auto max-w-screen-2xl px-4 pb-24 md:px-6">
        <HomeBlocks />
      </div>

      <section
        aria-labelledby="features-heading"
        className="mx-auto max-w-6xl px-4 pb-24 md:px-6"
      >
        <div className="mx-auto mb-12 grid max-w-2xl gap-3 text-center">
          <h2
            className="font-semibold text-3xl text-foreground tracking-tight"
            id="features-heading"
          >
            Depth without the guesswork
          </h2>
          <p className="text-muted-foreground">
            Neumorphism is easy to get wrong: low contrast, shadows that
            disagree, focus you can't see. The library handles that so your
            screens stay calm and usable.
          </p>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <li
              className="inset-shadow-neu-flat grid content-start gap-3 rounded-2xl bg-neu-convex p-6 shadow-neu"
              key={feature.title}
            >
              <span className="inset-shadow-neu-sm flex size-10 items-center justify-center rounded-xl bg-background text-primary shadow-neu-flat">
                <feature.icon aria-hidden="true" className="size-5" />
              </span>
              <h3 className="font-medium text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.text}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="showcase-heading"
        className="mx-auto max-w-screen-2xl scroll-mt-20 px-4 pb-24 md:px-6"
        id="showcase"
      >
        <div className="mx-auto mb-12 grid max-w-2xl gap-3 text-center">
          <h2
            className="font-semibold text-3xl text-foreground tracking-tight"
            id="showcase-heading"
          >
            Built with Neomorphic UI
          </h2>
          <p className="text-muted-foreground">
            Nine complete apps and a theme studio, each with its own theme
            preset and typeface, made only from library components.
          </p>
        </div>
        <ul className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {showcaseApps.map((app) => (
            <li key={app.title}>
              {/* The showcase is a separate Next.js app behind a rewrite, so
                  this is a full page load rather than a client-side Link. */}
              <a
                className="group block rounded-2xl outline-none focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-4"
                href={`/showcase/${app.slug}`}
              >
                <figure className="inset-shadow-neu-flat grid gap-4 rounded-2xl bg-neu-convex p-3 shadow-neu transition-shadow duration-(--duration-slow) group-hover:shadow-neu-lg">
                  <div className="inset-shadow-neu-sm overflow-hidden rounded-xl shadow-neu-flat">
                    <Image
                      alt={`${app.title}, the ${app.label.toLowerCase()} showcase`}
                      className="aspect-[16/10] w-full object-cover object-top transition-transform duration-(--duration-slow) ease-out group-hover:scale-[1.02]"
                      height={900}
                      sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                      src={`/showcase/${app.slug}.jpg`}
                      width={1440}
                    />
                  </div>
                  <figcaption className="grid gap-1 px-2 pb-2">
                    <span className="flex items-baseline gap-2">
                      <span className="font-medium text-foreground">
                        {app.title}
                      </span>
                      <span className="text-muted-foreground text-xs uppercase tracking-wide">
                        {app.label}
                      </span>
                    </span>
                    <span className="text-muted-foreground text-sm leading-relaxed">
                      {app.description}
                    </span>
                  </figcaption>
                </figure>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-28 text-center">
        <div className="inset-shadow-neu-flat grid justify-items-center gap-4 rounded-3xl bg-neu-convex px-6 py-12 shadow-neu-lg">
          <h2 className="text-balance font-semibold text-2xl text-foreground tracking-tight sm:text-3xl">
            Start with one component
          </h2>
          <p className="max-w-lg text-muted-foreground">
            Add the package, import two stylesheets, and render a Button. The
            installation guide takes about five minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <LinkButton href="/docs/installation" variant="primary">
              Read the installation guide
            </LinkButton>
            <LinkButton href={siteConfig.links.github} variant="ghost">
              View on GitHub
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
