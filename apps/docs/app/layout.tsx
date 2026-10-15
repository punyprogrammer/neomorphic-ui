import { Toaster } from "@neomorphic-react/ui/toast";
import type { Metadata, Viewport } from "next";
import { Geist_Mono, Roboto } from "next/font/google";
import type * as React from "react";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s – ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "React",
    "neumorphism",
    "neomorphic",
    "components",
    "design system",
    "Base UI",
    "Tailwind CSS",
  ],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#eff0f5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${roboto.variable} ${geistMono.variable}`} lang="en">
      <body>
        <a
          className="sr-only rounded-full bg-background px-4 py-2 shadow-neu focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50"
          href="#main"
        >
          Skip to content
        </a>
        <div className="app-root relative flex min-h-svh flex-col">
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
