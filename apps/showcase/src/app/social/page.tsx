import type { Metadata } from "next";

import { SocialFeed } from "./social-feed";

export const metadata: Metadata = { title: "Murmur · Social" };

export default function SocialPage() {
  return (
    <main
      className="w-full min-w-0 flex-1 overflow-x-clip px-4 py-8 sm:px-6 lg:px-10"
      data-theme="lilac"
    >
      <SocialFeed />
    </main>
  );
}
