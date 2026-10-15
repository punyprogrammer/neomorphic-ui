"use client";

import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";

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
// ContextMenu / ContextMenuTrigger / ContextMenuContent
// ---------------------------------------------------------------------------

type ContextMenuProps = ContextMenuPrimitive.Root.Props;

/**
 * A menu opened at the pointer by right-click or long-press. It's a
 * shortcut: put the same actions somewhere reachable without a pointer.
 */
function ContextMenu(props: ContextMenuProps) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

type ContextMenuTriggerProps = ContextMenuPrimitive.Trigger.Props;

/** The area that opens the menu. Renders a `<div>`. */
function ContextMenuTrigger({ className, ...props }: ContextMenuTriggerProps) {
  return (
    <ContextMenuPrimitive.Trigger
      className={cn("select-none", className)}
      data-slot="context-menu-trigger"
      {...props}
    />
  );
}

type ContextMenuContentProps = Omit<MenuContentProps, "side" | "sideOffset">;

/** The raised popup, placed at the pointer. */
function ContextMenuContent({
  align = "start",
  alignOffset = 4,
  ...props
}: ContextMenuContentProps) {
  return (
    <MenuPopupContent
      align={align}
      alignOffset={alignOffset}
      positioner={ContextMenuPrimitive.Positioner}
      slotPrefix="context-menu"
      side="bottom"
      sideOffset={4}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  ContextMenuContentProps,
  ContextMenuProps,
  ContextMenuTriggerProps,
  MenuCheckboxItemProps as ContextMenuCheckboxItemProps,
  MenuGroupProps as ContextMenuGroupProps,
  MenuItemProps as ContextMenuItemProps,
  MenuLabelProps as ContextMenuLabelProps,
  MenuRadioGroupProps as ContextMenuRadioGroupProps,
  MenuRadioItemProps as ContextMenuRadioItemProps,
  MenuSeparatorProps as ContextMenuSeparatorProps,
  MenuShortcutProps as ContextMenuShortcutProps,
  MenuSubProps as ContextMenuSubProps,
  MenuSubTriggerProps as ContextMenuSubTriggerProps,
};
export {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
  MenuCheckboxItem as ContextMenuCheckboxItem,
  MenuGroup as ContextMenuGroup,
  MenuItem as ContextMenuItem,
  MenuLabel as ContextMenuLabel,
  MenuRadioGroup as ContextMenuRadioGroup,
  MenuRadioItem as ContextMenuRadioItem,
  MenuSeparator as ContextMenuSeparator,
  MenuShortcut as ContextMenuShortcut,
  MenuSub as ContextMenuSub,
  MenuSubContent as ContextMenuSubContent,
  MenuSubTrigger as ContextMenuSubTrigger,
};
