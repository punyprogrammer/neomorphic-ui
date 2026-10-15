import uiPackage from "../../../packages/ui/package.json" with { type: "json" };

export const siteConfig = {
  name: "Neomorphic UI",
  title: "Neomorphic UI: soft, accessible React components",
  description:
    "Neumorphic React components that rise out of the page or sink into it. Built on Base UI and Tailwind CSS v4: accessible, themeable and imported one component at a time.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:4000",
  packageName: uiPackage.name,
  version: uiPackage.version,
  componentCount: 70,
  links: {
    github: "https://github.com/punyprogrammer/neomorphic-ui",
    npm: "https://www.npmjs.com/package/@neomorphic-react/ui",
    storybook: "https://punyprogrammer.github.io/neomorphic-ui/",
    changelog:
      "https://github.com/punyprogrammer/neomorphic-ui/blob/main/packages/ui/CHANGELOG.md",
    baseUi: "https://base-ui.com",
    tailwind: "https://tailwindcss.com",
  },
} as const;

export const mainNav = [
  { title: "Docs", href: "/docs" },
  { title: "Components", href: "/docs/components" },
  { title: "Theming", href: "/docs/theming" },
  { title: "Showcase", href: "/#showcase" },
] as const;
