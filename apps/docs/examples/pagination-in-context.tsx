"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@neomorphic-react/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@neomorphic-react/ui/table";
import { useState } from "react";

const customers = ["Northwind", "Bluebird Cafe", "Kestrel Labs", "Oak & Co"];
const invoices = Array.from({ length: 14 }, (_, index) => ({
  id: `INV-${1040 + index}`,
  customer: customers[index % customers.length],
  amount: ((index * 137) % 900) + 120,
}));
const PER_PAGE = 5;
const pages = Array.from(
  { length: Math.ceil(invoices.length / PER_PAGE) },
  (_, index) => index + 1
);

const eur = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
});

export default function PaginationInContext() {
  const [page, setPage] = useState(1);
  const start = (page - 1) * PER_PAGE;
  const rows = invoices.slice(start, start + PER_PAGE);

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="text-end">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.customer}</TableCell>
                <TableCell className="text-end tabular-nums">
                  {eur.format(invoice.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex-wrap justify-between">
        <p className="text-muted-foreground text-sm">
          {start + 1}–{start + rows.length} of {invoices.length}
        </p>
        <Pagination aria-label="Invoice pages" className="mx-0 w-auto">
          <PaginationContent>
            {pages.map((number) => (
              <PaginationItem key={number}>
                <PaginationLink
                  href={`#invoices-${number}`}
                  isActive={number === page}
                  onClick={(event) => {
                    event.preventDefault();
                    setPage(number);
                  }}
                  size="sm"
                >
                  {number}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
}
