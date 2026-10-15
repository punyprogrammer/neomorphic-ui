"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@neomorphic-react/ui/table";

const lines = [
  { item: "Oat flat white", quantity: 2, price: 3.6 },
  { item: "Almond croissant", quantity: 1, price: 3.25 },
  { item: "Sourdough loaf", quantity: 1, price: 4.8 },
  { item: "Cold brew, 1 litre", quantity: 1, price: 9.5 },
];

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
const total = lines.reduce((sum, line) => sum + line.quantity * line.price, 0);

export default function TableFooterExample() {
  return (
    <div className="w-full max-w-md">
      <Table variant="raised">
        <TableCaption>Order 4471, collected at 08:42</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead className="text-end">Qty</TableHead>
            <TableHead className="text-end">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lines.map((line) => (
            <TableRow key={line.item}>
              <TableCell>{line.item}</TableCell>
              <TableCell className="text-end tabular-nums">
                {line.quantity}
              </TableCell>
              <TableCell className="text-end tabular-nums">
                {gbp.format(line.quantity * line.price)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text-end tabular-nums">
              {gbp.format(total)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
