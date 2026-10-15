"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@neomorphic-react/ui/navigation-menu";
import { useState } from "react";

const guides = [
  { href: "/guides/packing", title: "Packing light" },
  { href: "/guides/rail", title: "Travelling by rail" },
  { href: "/guides/budget", title: "Planning a budget" },
];

export default function NavigationMenuActive() {
  const [path, setPath] = useState("/guides/rail");

  return (
    <div className="flex flex-col items-center gap-6">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Guides</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-1 sm:w-56">
                {guides.map((guide) => (
                  <li key={guide.href}>
                    <NavigationMenuLink
                      active={path === guide.href}
                      closeOnClick
                      href={guide.href}
                      onClick={(event) => {
                        event.preventDefault();
                        setPath(guide.href);
                      }}
                    >
                      {guide.title}
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              active={path === "/journal"}
              className={navigationMenuTriggerStyle()}
              href="/journal"
              onClick={(event) => {
                event.preventDefault();
                setPath("/journal");
              }}
            >
              Journal
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <p className="text-muted-foreground text-sm">
        Current page: <code className="text-foreground">{path}</code>
      </p>
    </div>
  );
}
