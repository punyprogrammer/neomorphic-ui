"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@neomorphic-react/ui/context-menu";
import { Copy, Download, ExternalLink, FileImage, Trash2 } from "lucide-react";

const apps = ["Preview", "Photos", "Web browser"];

export default function ContextMenuSubmenu() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="inset-shadow-neu flex h-40 w-full max-w-xs flex-col items-center justify-center gap-2 rounded-xl text-muted-foreground text-sm shadow-neu-flat">
        <FileImage className="size-8" />
        harbour-at-dusk.jpg
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <ExternalLink />
            Open with
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            {apps.map((app) => (
              <ContextMenuItem key={app}>{app}</ContextMenuItem>
            ))}
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem>
          <Copy />
          Copy image
        </ContextMenuItem>
        <ContextMenuItem>
          <Download />
          Download
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <Trash2 />
          Move to bin
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
