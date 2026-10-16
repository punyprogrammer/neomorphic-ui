import { Toaster } from "@neomorphic-react/ui/toast";
import { TooltipProvider } from "@neomorphic-react/ui/tooltip";
import type { Metadata } from "next";

import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Neomorphic showcase",
    template: "%s · Neomorphic showcase",
  },
  description:
    "Five themed apps and a live theme studio built with @neomorphic-react/ui.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // Browser extensions add attributes to <html> and <body> before React hydrates.
    <html className={fontVariables} lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* Popups portal to the end of <body>; isolating the app keeps them
            stacked above everything in it. */}
        <div className="isolate flex min-h-dvh min-w-0 flex-col overflow-x-clip">
          <TooltipProvider>{children}</TooltipProvider>
        </div>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
