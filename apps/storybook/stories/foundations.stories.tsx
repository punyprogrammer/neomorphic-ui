import { Surface } from "@neomorphic-react/ui/surface";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

const meta = {
  title: "Foundations/Tokens",
  parameters: {
    docs: {
      description: {
        component:
          "Theme tokens from `@neomorphic-react/ui/theme.css` and the shadow and radius scales `base.css` derives from them.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Full class names (not built from `token`) so Tailwind's scanner finds them,
// and as classes rather than inline styles so they replace the raised
// surface's gradient instead of sitting underneath it.
const COLORS = [
  {
    token: "background",
    swatch: "bg-background",
    note: "Page and every surface",
  },
  { token: "foreground", swatch: "bg-foreground", note: "Body text · 5.55:1" },
  {
    token: "muted-foreground",
    swatch: "bg-muted-foreground",
    note: "Secondary text · 4.77:1",
  },
  { token: "primary", swatch: "bg-primary", note: "On / selected · 7.93:1" },
  { token: "muted", swatch: "bg-muted", note: "Subtle fill" },
  { token: "border", swatch: "bg-border", note: "Hairlines only" },
  {
    token: "destructive",
    swatch: "bg-destructive",
    note: "Errors, destructive text · 5.26:1",
  },
  { token: "success", swatch: "bg-success", note: "Positive status" },
  { token: "warning", swatch: "bg-warning", note: "Caution status" },
  {
    token: "neu-light",
    swatch: "bg-neu-light",
    note: "Highlight, cast up-left",
  },
  { token: "neu-dark", swatch: "bg-neu-dark", note: "Shadow, cast down-right" },
];

export const Colors: Story = {
  render: () => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-8 p-10">
      {COLORS.map(({ token, swatch, note }) => (
        <div className="flex flex-col gap-3" key={token}>
          <Surface className={`h-20 ${swatch}`} data-token={token} depth="sm" />
          <div className="flex flex-col">
            <code className="font-bold text-sm">--{token}</code>
            <span className="text-muted-foreground text-xs">{note}</span>
          </div>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const swatches = [...canvasElement.querySelectorAll("[data-token]")].map(
      (el) => getComputedStyle(el)
    );
    await expect(swatches.map((s) => s.backgroundImage)).not.toContain(
      expect.stringContaining("gradient")
    );
    await expect(new Set(swatches.map((s) => s.backgroundColor)).size).toBe(
      COLORS.length
    );
  },
};

const SHADOWS = [
  "shadow-neu-sm",
  "shadow-neu",
  "shadow-neu-lg",
  "inset-shadow-neu-sm",
  "inset-shadow-neu",
  "inset-shadow-neu-lg",
];

export const Shadows: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-12 p-10">
      {SHADOWS.map((utility) => (
        <div className="flex flex-col items-center gap-4" key={utility}>
          <div className={`size-28 rounded-xl bg-background ${utility}`} />
          <code className="text-xs">{utility}</code>
        </div>
      ))}
    </div>
  ),
};

const RADII = [
  "rounded-sm",
  "rounded-md",
  "rounded-lg",
  "rounded-xl",
  "rounded-2xl",
  "rounded-full",
];

export const Radius: Story = {
  render: () => (
    <div className="flex flex-wrap gap-10 p-10">
      {RADII.map((utility) => (
        <div className="flex flex-col items-center gap-4" key={utility}>
          <div className={`size-20 bg-background shadow-neu-sm ${utility}`} />
          <code className="text-xs">{utility}</code>
        </div>
      ))}
    </div>
  ),
};
