import type { Metadata } from "next";

import { FitnessApp } from "./fitness-app";

export const metadata: Metadata = { title: "Pulse · Fitness" };

export default function FitnessPage() {
  return (
    <main
      className="w-full flex-1 px-4 py-8 sm:px-6 lg:px-10"
      data-theme="sage"
    >
      <FitnessApp />
    </main>
  );
}
