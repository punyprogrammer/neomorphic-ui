"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@neomorphic-react/ui/context-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@neomorphic-react/ui/dropdown-menu";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@neomorphic-react/ui/item";
import { Copy, FileText, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

const initialFiles = [
  { name: "Campaign brief.pdf", detail: "2.4 MB, edited yesterday" },
  { name: "Launch plan.docx", detail: "310 KB, edited on Monday" },
  { name: "Press release.docx", detail: "96 KB, edited last week" },
];

function FileActions({
  item: MenuItem,
  onDelete,
}: {
  item: typeof ContextMenuItem;
  onDelete: () => void;
}) {
  return (
    <>
      <MenuItem>
        <Pencil />
        Rename
      </MenuItem>
      <MenuItem>
        <Copy />
        Duplicate
      </MenuItem>
      <MenuItem onClick={onDelete} variant="destructive">
        <Trash2 />
        Delete
      </MenuItem>
    </>
  );
}

export default function ContextMenuInContext() {
  const [files, setFiles] = useState(initialFiles);

  return (
    <Card className="w-full max-w-md" size="sm">
      <CardHeader>
        <CardTitle>Files</CardTitle>
        <CardDescription>Right-click a file, or use its menu.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-1">
        {files.map((file) => {
          const remove = () =>
            setFiles((current) => current.filter((item) => item !== file));
          return (
            <ContextMenu key={file.name}>
              <ContextMenuTrigger className="rounded-lg">
                <Item size="sm">
                  <ItemMedia variant="icon">
                    <FileText />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{file.name}</ItemTitle>
                    <ItemDescription>{file.detail}</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            aria-label={`Actions for ${file.name}`}
                            icon={<MoreHorizontal />}
                            size="sm"
                            variant="ghost"
                          />
                        }
                      />
                      <DropdownMenuContent align="end">
                        <FileActions
                          item={DropdownMenuItem}
                          onDelete={remove}
                        />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </ItemActions>
                </Item>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <FileActions item={ContextMenuItem} onDelete={remove} />
              </ContextMenuContent>
            </ContextMenu>
          );
        })}
      </CardContent>
    </Card>
  );
}
