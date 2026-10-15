"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar";

import {
  MenuCheckboxItem,
  type MenuCheckboxItemProps,
  type MenuContentProps,
  MenuGroup,
  type MenuGroupProps,
  MenuItem,
  type MenuItemProps,
  MenuLabel,
  type MenuLabelProps,
  MenuPopupContent,
  MenuRadioGroup,
  type MenuRadioGroupProps,
  MenuRadioItem,
  type MenuRadioItemProps,
  MenuSeparator,
  type MenuSeparatorProps,
  MenuShortcut,
  type MenuShortcutProps,
  MenuSub,
  MenuSubContent,
  type MenuSubProps,
  MenuSubTrigger,
  type MenuSubTriggerProps,
} from "./menu-parts";
import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Menubar / MenubarMenu
// ---------------------------------------------------------------------------

type MenubarProps = MenubarPrimitive.Props;

/**
 * A raised slab of menus, as in a desktop app. Arrow keys move between the
 * menus; once one is open, moving opens the next.
 */
function Menubar({ className, ...props }: MenubarProps) {
  return (
    <MenubarPrimitive
      className={cn(
        "inset-shadow-neu-flat flex w-fit items-center gap-1 rounded-xl bg-neu-convex p-1.5 shadow-neu",
        className
      )}
      data-slot="menubar"
      {...props}
    />
  );
}

type MenubarMenuProps = MenuPrimitive.Root.Props;

function MenubarMenu(props: MenubarMenuProps) {
  return <MenuPrimitive.Root data-slot="menubar-menu" {...props} />;
}

// ---------------------------------------------------------------------------
// MenubarTrigger / MenubarContent
// ---------------------------------------------------------------------------

type MenubarTriggerProps = MenuPrimitive.Trigger.Props;

/** Pressed into the slab, in the primary colour, while its menu is open. */
function MenubarTrigger({ className, ...props }: MenubarTriggerProps) {
  return (
    <MenuPrimitive.Trigger
      className={cn(
        "inset-shadow-neu-flat flex h-8 select-none items-center rounded-lg px-3 font-medium text-foreground text-sm shadow-neu-flat outline-none transition-[box-shadow,color] duration-[var(--duration-fast)] hover:text-primary focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2 data-popup-open:inset-shadow-neu-sm data-popup-open:text-primary data-disabled:opacity-50",
        className
      )}
      data-slot="menubar-trigger"
      {...props}
    />
  );
}

type MenubarContentProps = MenuContentProps;

function MenubarContent({
  align = "start",
  alignOffset = -6,
  sideOffset = 12,
  ...props
}: MenubarContentProps) {
  return (
    <MenuPopupContent
      align={align}
      alignOffset={alignOffset}
      positioner={MenuPrimitive.Positioner}
      slotPrefix="menubar"
      sideOffset={sideOffset}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  MenubarContentProps,
  MenubarMenuProps,
  MenubarProps,
  MenubarTriggerProps,
  MenuCheckboxItemProps as MenubarCheckboxItemProps,
  MenuGroupProps as MenubarGroupProps,
  MenuItemProps as MenubarItemProps,
  MenuLabelProps as MenubarLabelProps,
  MenuRadioGroupProps as MenubarRadioGroupProps,
  MenuRadioItemProps as MenubarRadioItemProps,
  MenuSeparatorProps as MenubarSeparatorProps,
  MenuShortcutProps as MenubarShortcutProps,
  MenuSubProps as MenubarSubProps,
  MenuSubTriggerProps as MenubarSubTriggerProps,
};
export {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
  MenuCheckboxItem as MenubarCheckboxItem,
  MenuGroup as MenubarGroup,
  MenuItem as MenubarItem,
  MenuLabel as MenubarLabel,
  MenuRadioGroup as MenubarRadioGroup,
  MenuRadioItem as MenubarRadioItem,
  MenuSeparator as MenubarSeparator,
  MenuShortcut as MenubarShortcut,
  MenuSub as MenubarSub,
  MenuSubContent as MenubarSubContent,
  MenuSubTrigger as MenubarSubTrigger,
};
