export interface ShowcaseRoute {
  description: string;
  font: string;
  href:
    | "/chat"
    | "/shop"
    | "/podcasts"
    | "/piano"
    | "/fitness"
    | "/social"
    | "/dashboard"
    | "/checkout"
    | "/smart-home"
    | "/theming";
  label: string;
  theme: string;
  title: string;
}

export const ROUTES: ShowcaseRoute[] = [
  {
    href: "/chat",
    label: "Assistant",
    title: "Still",
    theme: "haze",
    font: "Geist and Geist Mono",
    description:
      "A calm AI chat: streaming replies, thinking steps, files, code, a check-in form and tuning controls.",
  },
  {
    href: "/shop",
    label: "Shop",
    title: "Kiln",
    theme: "pearl",
    font: "Figtree and Fraunces",
    description:
      "A storefront with a hero carousel, categories, a product grid, a bag and FAQs.",
  },
  {
    href: "/podcasts",
    label: "Podcasts",
    title: "Lull",
    theme: "cloud",
    font: "Figtree",
    description:
      "A desktop podcast player: library, shows, search, queue, chapters and a sleep timer.",
  },
  {
    href: "/piano",
    label: "Piano",
    title: "Hush",
    theme: "ivory",
    font: "Jost and Fraunces",
    description:
      "A playable felt piano with knobs, faders, presets, pedals and a level meter.",
  },
  {
    href: "/fitness",
    label: "Fitness",
    title: "Pulse",
    theme: "sage",
    font: "Manrope",
    description:
      "Daily goals, a week of activity, workouts and a heart-rate chart.",
  },
  {
    href: "/social",
    label: "Social",
    title: "Murmur",
    theme: "lilac",
    font: "Plus Jakarta Sans",
    description: "A feed with stories, a composer, posts, likes and trends.",
  },
  {
    href: "/dashboard",
    label: "Sales",
    title: "Ledger",
    theme: "graphite",
    font: "IBM Plex Sans",
    description: "KPIs, revenue and channel charts, targets and recent orders.",
  },
  {
    href: "/checkout",
    label: "Checkout",
    title: "Atelier",
    theme: "linen",
    font: "DM Sans",
    description:
      "Contact, shipping, delivery and payment with an order summary.",
  },
  {
    href: "/smart-home",
    label: "Smart home",
    title: "Haven",
    theme: "mist",
    font: "Poppins",
    description: "A thermostat dial, device tiles, scenes and energy use.",
  },
  {
    href: "/theming",
    label: "Theme studio",
    title: "Theme studio",
    theme: "porcelain",
    font: "Inter",
    description:
      "Change depth, radius and colours live and copy the CSS overrides.",
  },
];
