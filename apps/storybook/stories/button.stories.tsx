import { Button, buttonVariants } from "@neomorphic-ui/react/button";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Archive,
  ArrowRight,
  Bell,
  Bookmark,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Fingerprint,
  Heart,
  House,
  LogIn,
  Mic,
  Minus,
  Play,
  Plus,
  Send,
  Settings,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Trash2,
  TriangleAlert,
  Undo2,
  User,
} from "lucide-react";
import {
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
  useState,
} from "react";
import { expect, userEvent, within } from "storybook/test";

const ICONS = {
  none: undefined,
  ArrowRight: <ArrowRight />,
  Share2: <Share2 />,
  Download: <Download />,
  Send: <Send />,
  Heart: <Heart />,
  Settings: <Settings />,
  LogIn: <LogIn />,
};

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `
Raised from the surface at rest, pressed into it while held, flat when
disabled. Pass any icon element through \`icon\` and place it with
\`iconPosition\`; with no children the button becomes an icon tile.

\`\`\`tsx
import { Button } from "@neomorphic-ui/react/button";
import { ArrowRight, House } from "lucide-react";

<Button icon={<ArrowRight />} iconPosition="end">Sign in</Button>
<Button aria-label="Home" icon={<House />} />

// Links: style the anchor, don't render a button as one
<a className={buttonVariants()} href="/docs">Docs</a>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "primary", "destructive", "ghost"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    shape: { control: "inline-radio", options: ["pill", "rounded"] },
    icon: {
      control: "select",
      options: Object.keys(ICONS),
      mapping: ICONS,
    },
    iconPosition: {
      control: "inline-radio",
      options: ["start", "end", "top", "bottom"],
    },
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
  args: {
    children: "Sign in",
    variant: "default",
    size: "md",
    icon: "ArrowRight",
    iconPosition: "end",
    isLoading: false,
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="p-10">
      <Button {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button", {
      name: "Sign in",
    });
    await expect(button).toHaveAttribute("data-icon-position", "end");
    await expect(getComputedStyle(button).boxShadow).not.toBe("none");
    await userEvent.click(button);
  },
};

/** The kit's "Basic Buttons & Components" row, rebuilt from components. */
export const KitReplica: Story = {
  render: () => (
    <div className="flex flex-col gap-10 p-10">
      <div className="flex items-center gap-6">
        <Button aria-label="Profile" icon={<User />} size="lg" />
        <Button aria-label="Notifications" icon={<Bell />} size="lg" />
        <Button aria-label="Cart" icon={<ShoppingCart />} size="lg" />
        <Button aria-label="Home" icon={<House />} size="lg" />
        <Button aria-label="Delete" icon={<Trash2 />} size="lg" />
      </div>
      <div className="flex items-center gap-10">
        <Button icon={<ArrowRight />} iconPosition="end" size="lg">
          Sign in
        </Button>
        <Button icon={<Share2 />} size="lg">
          Share
        </Button>
      </div>
      <div className="flex items-center gap-6">
        <Button aria-label="Increase" icon={<Plus />} shape="pill" size="sm" />
        <Button aria-label="Decrease" icon={<Minus />} shape="pill" size="sm" />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-8 p-10">
      <Button icon={<Download />}>Default</Button>
      <Button icon={<Play />} variant="primary">
        Primary
      </Button>
      <Button icon={<Trash2 />} variant="destructive">
        Delete
      </Button>
      <Button icon={<Bookmark />} variant="ghost">
        Ghost
      </Button>
    </div>
  ),
};

function Group({
  title,
  note,
  children,
}: {
  title: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h3 className="font-bold text-sm">{title}</h3>
        <p className="max-w-prose text-muted-foreground text-xs">{note}</p>
      </div>
      <div className="flex flex-wrap items-center gap-8">{children}</div>
    </section>
  );
}

const BRAND = { "--brand": "oklch(0.52 0.2 290)" } as CSSProperties;

/**
 * Colour comes from theme tokens through `className`. A `bg-*` token class
 * replaces the raised gradient outright (tailwind-merge drops `bg-neu-convex`),
 * and the press, hover and disabled states keep working on top of it.
 *
 * Only pairings that pass WCAG AA are shown. `--success` and `--warning` are
 * fill colours: as text or icons on the raised surface they measure 2.58:1
 * and 1.72:1, below even the 3:1 minimum for icons.
 */
export const ColorTokens: Story = {
  render: () => (
    <div className="flex flex-col gap-12 p-10">
      <Group
        note="Token text on the default raised button: text-primary 7.39:1, text-foreground 5.18:1, text-destructive 4.91:1 against the darker end of the fill."
        title="Text tokens"
      >
        <Button icon={<Archive />}>Foreground</Button>
        <Button className="text-primary" icon={<Star />}>
          Primary
        </Button>
        <Button icon={<Trash2 />} variant="destructive">
          Destructive
        </Button>
      </Group>

      <Group
        note="A fill token with its -foreground partner: bg-destructive 5.59:1, bg-success 4.64:1, bg-warning 6.99:1."
        title="Fill tokens"
      >
        <Button icon={<Play />} variant="primary">
          Primary
        </Button>
        <Button
          className="bg-destructive text-destructive-foreground"
          data-tone="destructive"
          icon={<Trash2 />}
        >
          Delete
        </Button>
        <Button
          className="bg-success text-success-foreground"
          data-tone="success"
          icon={<Check />}
        >
          Approve
        </Button>
        <Button
          className="bg-warning text-warning-foreground"
          data-tone="warning"
          icon={<TriangleAlert />}
        >
          Review
        </Button>
      </Group>

      <Group
        note="The same fills on icon tiles and circles. Name each one with aria-label."
        title="Icon-only"
      >
        <Button
          aria-label="Verified"
          className="bg-success text-success-foreground"
          icon={<ShieldCheck />}
          size="lg"
        />
        <Button
          aria-label="Warning"
          className="bg-warning text-warning-foreground"
          icon={<TriangleAlert />}
          size="lg"
        />
        <Button
          aria-label="Delete"
          className="bg-destructive text-destructive-foreground"
          icon={<Trash2 />}
          shape="pill"
          size="lg"
        />
        <Button
          aria-label="Favourite"
          icon={<Heart className="text-destructive" fill="currentColor" />}
          shape="pill"
          size="lg"
        />
      </Group>

      <Group
        note="Colour just the icon with a text-* class on it; the label stays in text-foreground."
        title="Accent icon"
      >
        <Button icon={<Heart className="text-destructive" />}>Like</Button>
        <Button icon={<Star className="text-primary" fill="currentColor" />}>
          Starred
        </Button>
        <Button icon={<Undo2 className="text-primary" />} variant="ghost">
          Undo
        </Button>
      </Group>

      <Group
        note="Your own token: set a custom property and read it with bg-(--brand). This purple (the kit's calendar accent) gives 5.18:1 with text-primary-foreground."
        title="Custom token"
      >
        <div className="flex flex-wrap items-center gap-8" style={BRAND}>
          <Button
            className="bg-(--brand) text-primary-foreground"
            data-tone="brand"
            icon={<CalendarDays />}
          >
            Book
          </Button>
          <Button className="text-(--brand)" icon={<CalendarDays />}>
            Calendar
          </Button>
        </div>
      </Group>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const toned = [...canvasElement.querySelectorAll("[data-tone]")];
    const styles = toned.map((el) => getComputedStyle(el));
    await expect(styles.map((s) => s.backgroundImage)).toEqual(
      toned.map(() => "none")
    );
    await expect(new Set(styles.map((s) => s.backgroundColor)).size).toBe(
      toned.length
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-10">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div className="flex items-center gap-6" key={size}>
          <Button icon={<Send />} iconPosition="end" size={size}>
            Send {size}
          </Button>
          <Button aria-label={`Like ${size}`} icon={<Heart />} size={size} />
          <Button
            aria-label={`Settings ${size}`}
            icon={<Settings />}
            shape="pill"
            size={size}
          />
        </div>
      ))}
    </div>
  ),
};

/** `start` and `end` follow the writing direction; `top` and `bottom` stack. */
export const IconPositions: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-8 p-10">
      <Button icon={<LogIn />} iconPosition="start">
        Start
      </Button>
      <Button icon={<ArrowRight />} iconPosition="end">
        End
      </Button>
      <Button icon={<Mic />} iconPosition="top" shape="rounded">
        Top
      </Button>
      <Button icon={<Download />} iconPosition="bottom" shape="rounded">
        Bottom
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const positions = ["start", "end", "top", "bottom"];
    const rendered = positions.map((position) =>
      canvas
        .getByRole("button", {
          name: position.charAt(0).toUpperCase() + position.slice(1),
        })
        .getAttribute("data-icon-position")
    );
    await expect(rendered).toEqual(positions);
  },
};

/** No children: a square tile by default (the kit's icon buttons), a circle with `shape="pill"`. */
export const IconOnly: Story = {
  render: () => (
    <div className="flex items-center gap-6 p-10">
      <Button aria-label="Previous" icon={<ChevronLeft />} size="sm" />
      <Button aria-label="Next" icon={<ChevronRight />} size="sm" />
      <Button aria-label="Fingerprint" icon={<Fingerprint />} size="lg" />
      <Button
        aria-label="Play"
        icon={<Play />}
        shape="pill"
        size="lg"
        variant="primary"
      />
      <Button aria-label="Favourite" icon={<Heart />} variant="ghost" />
    </div>
  ),
};

function SparkMark(props: ComponentProps<"svg">) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
    </svg>
  );
}

/**
 * `icon` takes any node. Unsized SVGs follow the button size; anything with
 * its own `size-*` class (or a non-SVG element) keeps its size.
 */
export const AnyIcon: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-8 p-10">
      <Button icon={<Sparkles />}>Lucide</Button>
      <Button icon={<Heart className="text-destructive" fill="currentColor" />}>
        Styled lucide
      </Button>
      <Button icon={<SparkMark />}>Custom SVG</Button>
      <Button icon={<Bell className="size-6" strokeWidth={1.5} />}>
        Own size
      </Button>
      <Button icon={<span className="text-base">🚀</span>}>Emoji</Button>
    </div>
  ),
};

function ToggleExample() {
  const [liked, setLiked] = useState(false);
  return (
    <Button
      aria-pressed={liked}
      icon={<Heart fill={liked ? "currentColor" : "none"} />}
      onClick={() => setLiked((v) => !v)}
    >
      {liked ? "Liked" : "Like"}
    </Button>
  );
}

/** Held, `aria-pressed`, loading and disabled. */
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-8 p-10">
      <ToggleExample />
      <Button isLoading>Saving</Button>
      <Button icon={<Download />} isLoading variant="primary">
        Download
      </Button>
      <Button disabled icon={<Send />}>
        Disabled
      </Button>
      <Button disabled variant="primary">
        Disabled
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const fills = [
      ...canvasElement.querySelectorAll('[data-slot="button"]'),
    ].map((b) => getComputedStyle(b).backgroundColor);
    await expect(fills).not.toContain("rgba(0, 0, 0, 0)");
    await expect(fills.join(" ")).not.toContain("/ 0.4");

    const like = within(canvasElement).getByRole("button", { name: "Like" });
    await expect(like).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(like);
    await expect(
      within(canvasElement).getByRole("button", { name: "Liked" })
    ).toHaveAttribute("aria-pressed", "true");
  },
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-80 p-10">
      <Button fullWidth icon={<LogIn />} variant="primary">
        Continue
      </Button>
    </div>
  ),
};

/** Navigation stays a real link, styled with `buttonVariants`. */
export const AsLink: Story = {
  render: () => (
    <div className="p-10">
      <a
        className={buttonVariants({ variant: "default" })}
        href="#button-as-link"
      >
        Read the docs
        <ArrowRight />
      </a>
    </div>
  ),
};
