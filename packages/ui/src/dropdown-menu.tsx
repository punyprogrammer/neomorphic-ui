"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";

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

// ---------------------------------------------------------------------------
// DropdownMenu / DropdownMenuTrigger / DropdownMenuContent
// ---------------------------------------------------------------------------

type DropdownMenuProps = MenuPrimitive.Root.Props;

/**
 * Actions and options behind a button. Arrow keys move through the items,
 * typing jumps to a match, Escape closes and returns focus.
 */
function DropdownMenu(props: DropdownMenuProps) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

type DropdownMenuTriggerProps = MenuPrimitive.Trigger.Props;

/** Renders a `<button>`; pass `render={<Button … />}` to use a library button. */
function DropdownMenuTrigger(props: DropdownMenuTriggerProps) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

type DropdownMenuContentProps = MenuContentProps;

/** The raised popup holding the items. */
function DropdownMenuContent(props: DropdownMenuContentProps) {
  return (
    <MenuPopupContent
      positioner={MenuPrimitive.Positioner}
      slotPrefix="dropdown-menu"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  DropdownMenuContentProps,
  DropdownMenuProps,
  DropdownMenuTriggerProps,
  MenuCheckboxItemProps as DropdownMenuCheckboxItemProps,
  MenuGroupProps as DropdownMenuGroupProps,
  MenuItemProps as DropdownMenuItemProps,
  MenuLabelProps as DropdownMenuLabelProps,
  MenuRadioGroupProps as DropdownMenuRadioGroupProps,
  MenuRadioItemProps as DropdownMenuRadioItemProps,
  MenuSeparatorProps as DropdownMenuSeparatorProps,
  MenuShortcutProps as DropdownMenuShortcutProps,
  MenuSubProps as DropdownMenuSubProps,
  MenuSubTriggerProps as DropdownMenuSubTriggerProps,
};
export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  MenuCheckboxItem as DropdownMenuCheckboxItem,
  MenuGroup as DropdownMenuGroup,
  MenuItem as DropdownMenuItem,
  MenuLabel as DropdownMenuLabel,
  MenuRadioGroup as DropdownMenuRadioGroup,
  MenuRadioItem as DropdownMenuRadioItem,
  MenuSeparator as DropdownMenuSeparator,
  MenuShortcut as DropdownMenuShortcut,
  MenuSub as DropdownMenuSub,
  MenuSubContent as DropdownMenuSubContent,
  MenuSubTrigger as DropdownMenuSubTrigger,
};
