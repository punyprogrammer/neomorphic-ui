import type { Metadata } from "next";

import { SmartHome } from "./smart-home";

export const metadata: Metadata = { title: "Haven · Smart home" };

export default function SmartHomePage() {
  return (
    <main
      className="w-full flex-1 px-4 py-8 sm:px-6 lg:px-10"
      data-theme="mist"
    >
      <SmartHome />
    </main>
  );
}
