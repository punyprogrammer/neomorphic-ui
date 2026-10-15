"use client";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@neomorphic-react/ui/item";
import { CloudUpload, Lock, ShieldCheck } from "lucide-react";

const variants = [
  {
    variant: "flat",
    icon: CloudUpload,
    title: "Backups",
    text: "Last backed up 2 hours ago",
  },
  {
    variant: "raised",
    icon: Lock,
    title: "Passcode",
    text: "Required after 5 minutes",
  },
  {
    variant: "inset",
    icon: ShieldCheck,
    title: "Two-step sign-in",
    text: "On for this device",
  },
] as const;

export default function ItemVariants() {
  return (
    <div className="grid w-full max-w-md gap-4">
      {variants.map(({ variant, icon: Icon, title, text }) => (
        <Item key={variant} variant={variant}>
          <ItemMedia variant="icon">
            <Icon aria-hidden="true" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{title}</ItemTitle>
            <ItemDescription>{text}</ItemDescription>
          </ItemContent>
          <span className="text-muted-foreground text-xs">{variant}</span>
        </Item>
      ))}
    </div>
  );
}
