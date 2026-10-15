import type { Metadata } from "next";

import { ThemeStudio } from "./theme-studio";

export const metadata: Metadata = { title: "Theme studio" };

export default function ThemingPage() {
  return (
    <main className="w-full flex-1 px-4 py-8 sm:px-6 lg:px-10">
      <ThemeStudio />
    </main>
  );
}
