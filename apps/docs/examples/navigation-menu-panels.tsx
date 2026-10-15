"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@neomorphic-react/ui/navigation-menu";
import { BedDouble, Plane, Ticket } from "lucide-react";
import { landscape } from "@/components/blocks/images";

const plan = [
  { href: "#flights", title: "Flights", text: "Compare fares", icon: Plane },
  { href: "#stays", title: "Stays", text: "Hotels", icon: BedDouble },
  { href: "#passes", title: "Rail passes", text: "By train", icon: Ticket },
];

const help = ["City guides", "Visas and entry", "Luggage", "Support"];

export default function NavigationMenuPanels() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Plan a trip</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-2 sm:w-[32rem] sm:grid-cols-[13rem_1fr]">
              <NavigationMenuLink className="justify-end" href="#algarve">
                <img
                  alt=""
                  className="mb-2 h-28 w-full rounded-md object-cover"
                  height={112}
                  src={landscape("#7cc4e8", "#f6d58e", "#4f7a6a")}
                  width={208}
                />
                <span className="font-medium">Summer in the Algarve</span>
                <span className="text-muted-foreground">
                  Seven nights on the coast from €640.
                </span>
              </NavigationMenuLink>
              <ul className="grid gap-1">
                {plan.map(({ href, title, text, icon: Icon }) => (
                  <li key={href}>
                    <NavigationMenuLink
                      className="flex-row items-center gap-3"
                      href={href}
                    >
                      <Icon aria-hidden="true" className="text-primary" />
                      <span className="grid gap-0.5">
                        <span className="font-medium">{title}</span>
                        <span className="text-muted-foreground">{text}</span>
                      </span>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Help</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 sm:w-48">
              {help.map((title) => (
                <li key={title}>
                  <NavigationMenuLink href="#help">{title}</NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
