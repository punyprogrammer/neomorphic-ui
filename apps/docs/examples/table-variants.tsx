"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@neomorphic-react/ui/table";

const rates = [
  { currency: "EUR", rate: "1.1712" },
  { currency: "USD", rate: "1.3405" },
  { currency: "JPY", rate: "198.62" },
];

function Rates({ variant }: { variant: "flat" | "raised" | "inset" }) {
  return (
    <Table aria-label={`Exchange rates, ${variant}`} variant={variant}>
      <TableHeader>
        <TableRow>
          <TableHead>{variant}</TableHead>
          <TableHead className="text-end">Per £1</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rates.map((row) => (
          <TableRow key={row.currency}>
            <TableCell>{row.currency}</TableCell>
            <TableCell className="text-end tabular-nums">{row.rate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function TableVariants() {
  return (
    <div className="grid w-full max-w-2xl gap-6 sm:grid-cols-3">
      <Rates variant="flat" />
      <Rates variant="raised" />
      <Rates variant="inset" />
    </div>
  );
}
