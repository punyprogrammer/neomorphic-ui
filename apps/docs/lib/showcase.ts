export interface ShowcaseApp {
  description: string;
  label: string;
  /** The app's route under /showcase, and its screenshot in `public/showcase`. */
  slug: string;
  /** The theme preset the app uses; see `app/themes.css`. */
  theme: ThemePreset;
  title: string;
}

export type ThemePreset =
  | "porcelain"
  | "haze"
  | "pearl"
  | "cloud"
  | "sage"
  | "lilac"
  | "graphite"
  | "linen"
  | "mist";

export const themePresets: {
  id: ThemePreset;
  name: string;
  /** The preset's --background and --primary, for swatches. */
  swatch: [string, string];
}[] = [
  {
    id: "porcelain",
    name: "Porcelain",
    swatch: ["oklch(0.962 0.004 265)", "oklch(0.4 0.02 262)"],
  },
  {
    id: "haze",
    name: "Haze",
    swatch: ["oklch(0.962 0.006 210)", "oklch(0.47 0.06 205)"],
  },
  {
    id: "sage",
    name: "Sage",
    swatch: ["oklch(0.966 0.007 165)", "oklch(0.47 0.09 172)"],
  },
  {
    id: "lilac",
    name: "Lilac",
    swatch: ["oklch(0.968 0.005 295)", "oklch(0.47 0.11 285)"],
  },
  {
    id: "mist",
    name: "Mist",
    swatch: ["oklch(0.963 0.007 225)", "oklch(0.46 0.08 235)"],
  },
  {
    id: "pearl",
    name: "Pearl",
    swatch: ["oklch(0.969 0.006 45)", "oklch(0.43 0.06 38)"],
  },
  {
    id: "linen",
    name: "Linen",
    swatch: ["oklch(0.97 0.007 80)", "oklch(0.38 0.035 55)"],
  },
  {
    id: "graphite",
    name: "Graphite",
    swatch: ["oklch(0.968 0.003 250)", "oklch(0.42 0.05 255)"],
  },
];

export const showcaseApps: ShowcaseApp[] = [
  {
    slug: "podcasts",
    label: "Podcasts",
    title: "Lull",
    theme: "cloud",
    description:
      "A desktop podcast player: library, shows, search, queue, chapters and a sleep timer.",
  },
  {
    slug: "piano",
    label: "Piano",
    title: "Hush",
    theme: "linen",
    description:
      "A playable felt piano with knobs, faders, presets, pedals and a level meter.",
  },
  {
    slug: "chat",
    label: "Assistant",
    title: "Still",
    theme: "haze",
    description:
      "A calm AI chat: streaming replies, thinking steps, files, code, a check-in form and tuning controls.",
  },
  {
    slug: "shop",
    label: "Shop",
    title: "Kiln",
    theme: "pearl",
    description:
      "A storefront with a hero carousel, categories, a product grid, a bag and FAQs.",
  },
  {
    slug: "fitness",
    label: "Fitness",
    title: "Pulse",
    theme: "sage",
    description:
      "Daily goals, a week of activity, workouts and a heart-rate chart.",
  },
  {
    slug: "social",
    label: "Social",
    title: "Murmur",
    theme: "lilac",
    description: "A feed with stories, a composer, posts, likes and trends.",
  },
  {
    slug: "dashboard",
    label: "Sales",
    title: "Ledger",
    theme: "graphite",
    description: "KPIs, revenue and channel charts, targets and recent orders.",
  },
  {
    slug: "checkout",
    label: "Checkout",
    title: "Atelier",
    theme: "linen",
    description:
      "Contact, shipping, delivery and payment with an order summary.",
  },
  {
    slug: "smart-home",
    label: "Smart home",
    title: "Haven",
    theme: "mist",
    description: "A thermostat dial, device tiles, scenes and energy use.",
  },
  {
    slug: "theming",
    label: "Theming",
    title: "Theme studio",
    theme: "porcelain",
    description:
      "Change depth, radius and colours live and copy the CSS overrides.",
  },
];
