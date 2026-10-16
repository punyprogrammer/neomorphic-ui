import type { Metadata } from "next";

import { SalesDashboard } from "./sales-dashboard";

export const metadata: Metadata = { title: "Ledger · Sales" };

export default function DashboardPage() {
  return (
    <main
      className="w-full min-w-0 flex-1 overflow-x-clip px-4 py-8 sm:px-6 lg:px-10"
      data-theme="graphite"
    >
      <SalesDashboard />
    </main>
  );
}
