"use client";

import { Checkbox } from "@neomorphic-react/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@neomorphic-react/ui/table";
import { useState } from "react";

const files = [
  { id: "brief", name: "Brand brief.pdf", size: "2.4 MB" },
  { id: "logo", name: "Logo final.svg", size: "48 KB" },
  { id: "deck", name: "Pitch deck.key", size: "18.1 MB" },
  { id: "notes", name: "Workshop notes.docx", size: "312 KB" },
];

export default function TableSelection() {
  const [selected, setSelected] = useState(["logo"]);
  const all = selected.length === files.length;

  return (
    <div className="w-full max-w-md">
      <Table aria-label="Files">
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                aria-label="Select all files"
                checked={all}
                indeterminate={selected.length > 0 && !all}
                onCheckedChange={(checked) =>
                  setSelected(checked ? files.map((file) => file.id) : [])
                }
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-end">Size</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => {
            const isSelected = selected.includes(file.id);
            return (
              <TableRow data-selected={isSelected || undefined} key={file.id}>
                <TableCell>
                  <Checkbox
                    aria-label={`Select ${file.name}`}
                    checked={isSelected}
                    onCheckedChange={(checked) =>
                      setSelected((current) =>
                        checked
                          ? [...current, file.id]
                          : current.filter((id) => id !== file.id)
                      )
                    }
                  />
                </TableCell>
                <TableCell>{file.name}</TableCell>
                <TableCell className="text-end tabular-nums">
                  {file.size}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
