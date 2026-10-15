"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@neomorphic-react/ui/table";

const invoices = [
  { id: "INV-2041", customer: "Harbour Coffee", amount: "£1,240.00" },
  { id: "INV-2042", customer: "Oak & Pine Studio", amount: "£860.50" },
  { id: "INV-2043", customer: "Kite Logistics", amount: "£3,075.00" },
  { id: "INV-2044", customer: "Marlow Dental", amount: "£412.80" },
];

export default function TableDemo() {
  return (
    <div className="w-full max-w-md">
      <Table aria-label="Invoices">
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="text-end">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell>{invoice.customer}</TableCell>
              <TableCell className="text-end tabular-nums">
                {invoice.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
