"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@neomorphic-react/ui/table";

const departures = [
  ["06:12", "Cambridge", "4"],
  ["06:40", "Brighton", "2"],
  ["07:05", "Oxford", "7"],
  ["07:18", "Reading", "9"],
  ["07:44", "Bristol Temple Meads", "11"],
  ["08:02", "Cambridge", "4"],
  ["08:30", "Gatwick Airport", "1"],
  ["08:51", "Oxford", "7"],
  ["09:15", "Bath Spa", "10"],
  ["09:40", "Brighton", "2"],
  ["10:05", "Reading", "8"],
  ["10:32", "Cardiff Central", "12"],
];

export default function TableStickyHeader() {
  return (
    <div className="w-full max-w-md">
      <Table
        aria-label="Departures"
        containerProps={{ className: "max-h-64" }}
        stickyHeader
        variant="inset"
      >
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead className="text-end">Platform</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departures.map(([time, destination, platform]) => (
            <TableRow key={`${time}-${destination}`}>
              <TableCell className="tabular-nums">{time}</TableCell>
              <TableCell>{destination}</TableCell>
              <TableCell className="text-end tabular-nums">
                {platform}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
