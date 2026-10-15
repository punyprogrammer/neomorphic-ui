"use client";

import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { ChevronDown as ChevronDownIcon } from "lucide-react";

import { popupClassName } from "./popup";
import { cn } from "./utils";

// ---------------------------------------------------------------------------
// NavigationMenu
// ---------------------------------------------------------------------------

interface NavigationMenuProps extends NavigationMenuPrimitive.Root.Props {
  /** @default "start" */
  align?: NavigationMenuPrimitive.Positioner.Props["align"];
  /** Gap between the triggers and the panel. @default 12 */
  sideOffset?: number;
}

/**
 * Site navigation: triggers that open raised panels of links. The panel
 * resizes and slides between triggers instead of closing and reopening.
 */
function NavigationMenu({
  className,
  children,
  align = "start",
  sideOffset = 12,
  ...props
}: NavigationMenuProps) {
  return (
    <NavigationMenuPrimitive.Root
      className={cn("relative min-w-max", className)}
      data-slot="navigation-menu"
      {...props}
    >
      {children}
      <NavigationMenuPrimitive.Portal>
        <NavigationMenuPrimitive.Positioner
          align={align}
          className="isolate z-[var(--z-popover)] h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-[var(--duration-slow)] ease-[var(--ease-out)] data-instant:transition-none"
          collisionAvoidance={{ side: "none" }}
          collisionPadding={{ top: 5, bottom: 5, left: 16, right: 16 }}
          sideOffset={sideOffset}
        >
          <NavigationMenuPrimitive.Popup
            className={cn(
              popupClassName,
              "relative h-(--popup-height) w-(--popup-width) rounded-xl transition-[opacity,scale,width,height] duration-[var(--duration-slow)]"
            )}
            data-slot="navigation-menu-popup"
          >
            <NavigationMenuPrimitive.Viewport
              className="relative h-full w-full overflow-hidden"
              data-slot="navigation-menu-viewport"
            />
          </NavigationMenuPrimitive.Popup>
        </NavigationMenuPrimitive.Positioner>
      </NavigationMenuPrimitive.Portal>
    </NavigationMenuPrimitive.Root>
  );
}

type NavigationMenuListProps = NavigationMenuPrimitive.List.Props;

function NavigationMenuList({ className, ...props }: NavigationMenuListProps) {
  return (
    <NavigationMenuPrimitive.List
      className={cn("flex list-none items-center gap-1", className)}
      data-slot="navigation-menu-list"
      {...props}
    />
  );
}

type NavigationMenuItemProps = NavigationMenuPrimitive.Item.Props;

function NavigationMenuItem(props: NavigationMenuItemProps) {
  return (
    <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" {...props} />
  );
}

// ---------------------------------------------------------------------------
// NavigationMenuTrigger
// ---------------------------------------------------------------------------

/**
 * The look of a top-level trigger. Give it to a plain top-level
 * `NavigationMenuLink` so it lines up with the triggers.
 */
const navigationMenuTriggerStyle = () =>
  "group/navigation-menu-trigger inset-shadow-neu-flat inline-flex h-10 select-none items-center justify-center gap-1.5 rounded-lg px-4 font-medium text-foreground text-sm shadow-neu-flat outline-none transition-[box-shadow,color] duration-[var(--duration-fast)] hover:text-primary focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2 data-popup-open:inset-shadow-neu-sm data-popup-open:text-primary data-active:text-primary data-disabled:opacity-50";

type NavigationMenuTriggerProps = NavigationMenuPrimitive.Trigger.Props;

/** Pressed in, in the primary colour, while its panel is open. */
function NavigationMenuTrigger({
  className,
  children,
  ...props
}: NavigationMenuTriggerProps) {
  return (
    <NavigationMenuPrimitive.Trigger
      className={cn(navigationMenuTriggerStyle(), className)}
      data-slot="navigation-menu-trigger"
      {...props}
    >
      {children}
      <NavigationMenuPrimitive.Icon
        className="transition-transform duration-[var(--duration-base)] data-popup-open:rotate-180"
        data-slot="navigation-menu-icon"
      >
        <ChevronDownIcon aria-hidden="true" className="size-3.5" />
      </NavigationMenuPrimitive.Icon>
    </NavigationMenuPrimitive.Trigger>
  );
}

// ---------------------------------------------------------------------------
// NavigationMenuContent / NavigationMenuLink
// ---------------------------------------------------------------------------

type NavigationMenuContentProps = NavigationMenuPrimitive.Content.Props;

/** A trigger's panel. It slides in from the side the pointer came from. */
function NavigationMenuContent({
  className,
  ...props
}: NavigationMenuContentProps) {
  return (
    <NavigationMenuPrimitive.Content
      className={cn(
        "h-full w-[calc(100vw-2rem)] p-2 transition-[opacity,translate] duration-[var(--duration-slow)] ease-[var(--ease-out)] data-ending-style:data-[activation-direction=left]:translate-x-1/2 data-ending-style:data-[activation-direction=right]:-translate-x-1/2 data-starting-style:data-[activation-direction=left]:-translate-x-1/2 data-starting-style:data-[activation-direction=right]:translate-x-1/2 data-ending-style:opacity-0 data-starting-style:opacity-0 sm:w-max sm:max-w-xl",
        className
      )}
      data-slot="navigation-menu-content"
      {...props}
    />
  );
}

type NavigationMenuLinkProps = NavigationMenuPrimitive.Link.Props;

/**
 * A link in a panel: it sinks on hover and focus. Mark the current page
 * with `active`, which adds `aria-current` and the primary colour. Pass
 * `render={<Link … />}` for a router link.
 */
function NavigationMenuLink({ className, ...props }: NavigationMenuLinkProps) {
  return (
    <NavigationMenuPrimitive.Link
      className={cn(
        "inset-shadow-neu-flat flex flex-col gap-1 rounded-lg p-3 text-foreground text-sm shadow-neu-flat outline-none transition-[box-shadow,color] duration-[var(--duration-fast)] hover:inset-shadow-neu-sm focus-visible:inset-shadow-neu-sm focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2 data-active:text-primary [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      data-slot="navigation-menu-link"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  NavigationMenuContentProps,
  NavigationMenuItemProps,
  NavigationMenuLinkProps,
  NavigationMenuListProps,
  NavigationMenuProps,
  NavigationMenuTriggerProps,
};
export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
};
