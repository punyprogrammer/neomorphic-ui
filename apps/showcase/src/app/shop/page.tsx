import type { Metadata } from "next";

import { Storefront } from "./storefront";

export const metadata: Metadata = { title: "Kiln · Shop" };

export default function ShopPage() {
  return (
    <main
      className="w-full min-w-0 flex-1 overflow-x-clip px-4 py-8 sm:px-6 lg:px-10"
      data-theme="pearl"
    >
      <h1 className="sr-only">Kiln, homeware from small studios</h1>
      <Storefront />
    </main>
  );
}
