import type { Metadata } from "next";

import { PianoApp } from "./piano-app";

export const metadata: Metadata = { title: "Hush · Felt piano" };

export default function PianoPage() {
  return (
    <main
      className="w-full min-w-0 flex-1 overflow-x-clip px-4 py-8 sm:px-6 lg:px-10"
      data-theme="ivory"
    >
      <PianoApp />
    </main>
  );
}
