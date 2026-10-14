import { Surface } from "@neomorphic-ui/react/surface";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Foundations/Tokens",
  parameters: {
    docs: {
      description: {
        component:
          "Theme tokens from `@neomorphic-ui/react/theme.css` and the shadow and radius scales `base.css` derives from them.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const COLORS = [
  { token: "background", note: "Page and every surface" },
  { token: "foreground", note: "Body text · 5.55:1" },
  { token: "muted-foreground", note: "Secondary text · 4.77:1" },
  { token: "primary", note: "On / selected · 7.93:1" },
  { token: "muted", note: "Subtle fill" },
  { token: "border", note: "Hairlines only" },
  { token: "destructive", note: "Errors" },
  { token: "success", note: "Positive status" },
  { token: "warning", note: "Caution status" },
  { token: "neu-light", note: "Highlight, cast up-left" },
  { token: "neu-dark", note: "Shadow, cast down-right" },
];

export const Colors: Story = {
  render: () => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-8 p-10">
      {COLORS.map(({ token, note }) => (
        <div className="flex flex-col gap-3" key={token}>
          <Surface
            className="h-20"
            depth="sm"
            style={{ backgroundColor: `var(--${token})` }}
          />
          <div className="flex flex-col">
            <code className="font-bold text-sm">--{token}</code>
            <span className="text-muted-foreground text-xs">{note}</span>
          </div>
        </div>
      ))}
    </div>
  ),
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
