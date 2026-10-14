import type { Preview } from "@storybook/react-vite";
import "./preview.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Neomorphic shadows only read against the theme background, so the
    // canvas must never fall back to Storybook's white.
    backgrounds: { disable: true },
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default preview;
