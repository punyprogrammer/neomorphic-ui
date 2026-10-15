import type { Metadata } from "next";

import { SalesDashboard } from "./sales-dashboard";

export const metadata: Metadata = { title: "Ledger · Sales" };

export default function DashboardPage() {
  return (
    <main
      className="w-full flex-1 px-4 py-8 sm:px-6 lg:px-10"
      data-theme="graphite"
    >
      <SalesDashboard />
    </main>
  );
}
