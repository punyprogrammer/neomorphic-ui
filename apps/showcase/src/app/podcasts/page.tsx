import type { Metadata } from "next";

import { PodcastApp } from "./podcast-app";

export const metadata: Metadata = { title: "Lull · Podcasts" };

export default function PodcastsPage() {
  return <PodcastApp />;
}
