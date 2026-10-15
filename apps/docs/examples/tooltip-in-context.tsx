"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@neomorphic-react/ui/item";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@neomorphic-react/ui/tooltip";
import { Download, FileSpreadsheet, FileText, Link2 } from "lucide-react";

const files = [
  {
    name: "Q3 budget.xlsx",
    meta: "48 KB · Edited 2 hours ago",
    icon: FileSpreadsheet,
  },
  {
    name: "Launch brief.pdf",
    meta: "1.2 MB · Edited yesterday",
    icon: FileText,
  },
];

export default function TooltipInContext() {
  return (
    <TooltipProvider>
      <ItemGroup className="w-full max-w-md">
        {files.map(({ name, meta, icon: Icon }) => (
          <Item key={name} variant="raised">
            <ItemMedia variant="icon">
              <Icon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{name}</ItemTitle>
              <ItemDescription>{meta}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      aria-label={`Copy link to ${name}`}
                      icon={<Link2 />}
                      size="sm"
                      variant="ghost"
                    />
                  }
                />
                <TooltipContent>Copy link</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      aria-label={`Download ${name}`}
                      icon={<Download />}
                      size="sm"
                      variant="ghost"
                    />
                  }
                />
                <TooltipContent>Download</TooltipContent>
              </Tooltip>
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
    </TooltipProvider>
  );
}
