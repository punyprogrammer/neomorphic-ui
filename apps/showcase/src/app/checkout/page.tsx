import type { Metadata } from "next";

import { Checkout } from "./checkout";

export const metadata: Metadata = { title: "Atelier · Checkout" };

export default function CheckoutPage() {
  return (
    <main
      className="w-full min-w-0 flex-1 overflow-x-clip px-4 py-8 sm:px-6 lg:px-10"
      data-theme="linen"
    >
      <Checkout />
    </main>
  );
}
