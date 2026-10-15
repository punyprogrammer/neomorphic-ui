import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { Chip } from "@neomorphic-react/ui/chip";
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@neomorphic-react/ui/code-block";
import { Surface } from "@neomorphic-react/ui/surface";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { asset } from "@/lib/base-path";
import { ROUTES } from "@/lib/routes";

const TOKENS = `:root:has(main[data-theme="sage"]) {
  --background: oklch(0.966 0.007 165);
  --primary: oklch(0.47 0.09 172);
  --neu-depth: 2.5px;
  --radius: 1rem;
  --font-sans: var(--font-manrope), sans-serif;
}`;

const COMPONENT = `<Progress
  className="[--progress-fill:oklch(0.64_0.14_35)]"
  value={1820}
  max={2400}
/>`;

const RUNTIME = `document.documentElement.style
  .setProperty("--neu-depth", "3px");`;

export default function Home() {
  return (
    <main className="mx-auto grid w-full max-w-7xl flex-1 gap-16 px-4 py-14 sm:px-6">
      <section className="grid justify-items-center gap-6 text-center">
        <Chip icon={<Sparkles />} variant="inset">
          @neomorphic-react/ui 0.1
        </Chip>
        <h1 className="max-w-3xl font-semibold text-4xl text-foreground tracking-tight sm:text-5xl">
          Nine calm apps, one component library
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Each page below re-themes the same neumorphic components with a
          handful of CSS variables: surface tint, primary colour, depth, radius
          and font. Colour is kept for actions, data and status.
        </p>
      </section>

      <section
        aria-label="Showcase pages"
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {ROUTES.map((route, index) => (
          <Card
            className="group transition-shadow duration-(--duration-slow) hover:shadow-neu-lg"
            data-theme={route.theme}
            key={route.href}
            render={<Link href={route.href} />}
          >
            <CardContent>
              <Surface
                className="overflow-hidden rounded-xl p-1.5"
                depth="sm"
                elevation="inset"
              >
                <Image
                  alt={`Screenshot of the ${route.label.toLowerCase()} demo`}
                  className="aspect-16/10 w-full rounded-lg object-cover object-top transition-transform duration-(--duration-slow) ease-out group-hover:scale-[1.02]"
                  height={900}
                  loading={index < 3 ? "eager" : "lazy"}
                  sizes="(min-width: 1024px) 26rem, (min-width: 640px) 50vw, 100vw"
                  src={asset(`/screenshots${route.href}.jpg`)}
                  width={1440}
                />
              </Surface>
            </CardContent>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-lg">{route.title}</CardTitle>
                {route.label !== route.title && (
                  <Chip size="sm" variant="inset">
                    {route.label}
                  </Chip>
                )}
              </div>
              <CardDescription className="leading-relaxed">
                {route.description}
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto justify-between">
              <span className="truncate text-muted-foreground text-xs">
                {route.theme} · {route.font}
              </span>
              <span className="flex shrink-0 items-center gap-2 font-medium text-primary text-sm">
                Open
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </span>
            </CardFooter>
          </Card>
        ))}
      </section>

      <section aria-labelledby="how" className="grid gap-8">
        <div className="grid gap-2">
          <h2 className="font-semibold text-2xl text-foreground" id="how">
            Three ways to theme
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Tokens are plain CSS custom properties, so they cascade: set them
            for the page, for one component, or at runtime.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          <Snippet
            code={TOKENS}
            description="Override the library's tokens per page. :root:has() lets portaled menus and toasts follow."
            title="Page tokens · themes.css"
          />
          <Snippet
            code={COMPONENT}
            description="Each component reads its own fill variable; set it with an arbitrary property class."
            title="Component fills · className"
          />
          <Snippet
            code={RUNTIME}
            description="Write tokens on <html> from JavaScript. The theme studio does exactly this."
            title="Runtime · style.setProperty"
          />
        </div>
      </section>
    </main>
  );
}

function Snippet({
  code,
  description,
  title,
}: {
  code: string;
  description: string;
  title: string;
}) {
  return (
    <div className="grid content-start gap-3">
      <p className="text-muted-foreground text-sm">{description}</p>
      <CodeBlock size="sm">
        <CodeBlockHeader>
          <CodeBlockTitle>{title}</CodeBlockTitle>
        </CodeBlockHeader>
        <CodeBlockContent>{code}</CodeBlockContent>
      </CodeBlock>
    </div>
  );
}
