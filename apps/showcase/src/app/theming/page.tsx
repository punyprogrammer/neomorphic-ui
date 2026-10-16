import type { Metadata } from "next";

import { ThemeStudio } from "./theme-studio";

export const metadata: Metadata = { title: "Theme studio" };

export default function ThemingPage() {
  return (
    <main className="w-full min-w-0 flex-1 overflow-x-clip px-4 py-8 sm:px-6 lg:px-10">
      <ThemeStudio />
    </main>
  );
}
