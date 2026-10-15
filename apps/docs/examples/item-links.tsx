"use client";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@neomorphic-react/ui/item";
import { ChevronRight, KeyRound, User, Wallet } from "lucide-react";

const links = [
  { href: "#account", icon: User, title: "Account", text: "Name and email" },
  { href: "#security", icon: KeyRound, title: "Security", text: "Passkeys" },
  { href: "#billing", icon: Wallet, title: "Billing", text: "Cards, invoices" },
];

export default function ItemLinks() {
  return (
    <ItemGroup aria-label="Settings" className="max-w-md">
      {links.map(({ href, icon: Icon, title, text }) => (
        <div key={href} role="listitem">
          <Item render={<a href={href} />}>
            <ItemMedia variant="icon">
              <Icon aria-hidden="true" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{title}</ItemTitle>
              <ItemDescription>{text}</ItemDescription>
            </ItemContent>
            <ChevronRight
              aria-hidden="true"
              className="size-4 text-muted-foreground"
            />
          </Item>
        </div>
      ))}
    </ItemGroup>
  );
}
