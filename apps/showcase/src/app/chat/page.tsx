import type { Metadata } from "next";

import { ChatApp } from "./chat-app";

export const metadata: Metadata = { title: "Still · Assistant" };

export default function ChatPage() {
  return <ChatApp />;
}
