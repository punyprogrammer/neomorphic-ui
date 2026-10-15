"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@neomorphic-react/ui/navigation-menu";
import { Surface } from "@neomorphic-react/ui/surface";
import { TrainFront } from "lucide-react";

const routes = [
  { href: "#lisbon-porto", title: "Lisbon to Porto", text: "From 2h 49m" },
  { href: "#porto-vigo", title: "Porto to Vigo", text: "From 2h 15m" },
  { href: "#lisbon-faro", title: "Lisbon to Faro", text: "From 3h 02m" },
  { href: "#madrid-lisbon", title: "Madrid to Lisbon", text: "Night train" },
];

const passes = [
  { href: "#interrail", title: "Interrail Portugal", text: "3 to 8 days" },
  { href: "#youth", title: "Under 26", text: "25% off every fare" },
];

export default function NavigationMenuInContext() {
  return (
    <Surface
      className="flex w-full max-w-3xl items-center gap-4 rounded-2xl px-4 py-3"
      render={<header />}
    >
      <a className="flex items-center gap-2 font-semibold text-sm" href="#home">
        <TrainFront aria-hidden="true" className="size-5 text-primary" />
        Iberia Rail
      </a>
      <NavigationMenu align="center" className="mx-auto">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Routes</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-1 sm:w-96 sm:grid-cols-2">
                {routes.map((route) => (
                  <li key={route.href}>
                    <NavigationMenuLink href={route.href}>
                      <span className="font-medium">{route.title}</span>
                      <span className="text-muted-foreground">
                        {route.text}
                      </span>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Passes</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-1 sm:w-60">
                {passes.map((pass) => (
                  <li key={pass.href}>
                    <NavigationMenuLink href={pass.href}>
                      <span className="font-medium">{pass.title}</span>
                      <span className="text-muted-foreground">{pass.text}</span>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              active
              className={navigationMenuTriggerStyle()}
              href="#timetables"
            >
              Timetables
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Button size="sm" variant="primary">
        Book a seat
      </Button>
    </Surface>
  );
}
