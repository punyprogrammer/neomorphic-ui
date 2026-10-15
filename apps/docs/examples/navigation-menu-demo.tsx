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

const cities = [
  { href: "#lisbon", title: "Lisbon", text: "Hills, trams and the river." },
  { href: "#porto", title: "Porto", text: "Port cellars and the Douro." },
  { href: "#faro", title: "Faro", text: "Gateway to the Algarve." },
  { href: "#coimbra", title: "Coimbra", text: "The old university town." },
];

export default function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Destinations</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 sm:w-[28rem] sm:grid-cols-2">
              {cities.map((city) => (
                <li key={city.href}>
                  <NavigationMenuLink href={city.href}>
                    <span className="font-medium">{city.title}</span>
                    <span className="text-muted-foreground">{city.text}</span>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            href="#deals"
          >
            Deals
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
