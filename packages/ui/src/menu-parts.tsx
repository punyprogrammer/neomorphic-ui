"use client";

// The item parts shared by DropdownMenu, ContextMenu and Menubar. Base UI's
// context menu and menubar reuse Menu's parts, so these work inside all
// three; each part's `data-slot` takes the prefix of the menu it sits in.

import type { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import {
  Check as CheckIcon,
  ChevronRight as ChevronRightIcon,
  Circle as CircleIcon,
} from "lucide-react";
import type * as React from "react";
import { createContext, useContext } from "react";

import {
  popupClassName,
  popupItemClassName,
  popupLabelClassName,
  popupSeparatorClassName,
} from "./popup";
import { cn } from "./utils";

type MenuSlotPrefix = "dropdown-menu" | "context-menu" | "menubar";

const MenuSlotContext = createContext<MenuSlotPrefix>("dropdown-menu");

function useSlot(part: string) {
  return `${useContext(MenuSlotContext)}-${part}`;
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

type Side = MenuPrimitive.Positioner.Props["side"];
type Align = MenuPrimitive.Positioner.Props["align"];

interface MenuContentProps extends MenuPrimitive.Popup.Props {
  /** @default "start" */
  align?: Align;
  /** @default 0 */
  alignOffset?: number;
  /** @default "bottom" */
  side?: Side;
  /** Gap from the trigger; room for both shadows. @default 8 */
  sideOffset?: number;
}

const menuPopupClassName = cn(
  popupClassName,
  "neu-scrollbar flex max-h-(--available-height) min-w-44 flex-col gap-0.5 overflow-y-auto p-1.5"
);

function MenuPopupContent({
  slotPrefix,
  positioner: Positioner,
  className,
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 8,
  ...props
}: MenuContentProps & {
  slotPrefix: MenuSlotPrefix;
  positioner:
    | typeof MenuPrimitive.Positioner
    | typeof ContextMenuPrimitive.Positioner;
}) {
  return (
    <MenuSlotContext.Provider value={slotPrefix}>
      <MenuPrimitive.Portal>
        <Positioner
          align={align}
          alignOffset={alignOffset}
          className="isolate z-[var(--z-dropdown)] outline-none"
          side={side}
          sideOffset={sideOffset}
        >
          <MenuPrimitive.Popup
            className={cn(menuPopupClassName, className)}
            data-slot={`${slotPrefix}-content`}
            {...props}
          />
        </Positioner>
      </MenuPrimitive.Portal>
    </MenuSlotContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// MenuGroup / MenuLabel / MenuSeparator
// ---------------------------------------------------------------------------

type MenuGroupProps = MenuPrimitive.Group.Props;

function MenuGroup(props: MenuGroupProps) {
  return <MenuPrimitive.Group data-slot={useSlot("group")} {...props} />;
}

interface MenuLabelProps extends MenuPrimitive.GroupLabel.Props {
  /** Lines the label up with items that have a leading icon. */
  inset?: boolean;
}

/** Names a `Group`. It must sit inside the group it labels. */
function MenuLabel({ className, inset, ...props }: MenuLabelProps) {
  return (
    <MenuPrimitive.GroupLabel
      className={cn(popupLabelClassName, inset && "ps-9", className)}
      data-inset={inset || undefined}
      data-slot={useSlot("label")}
      {...props}
    />
  );
}

type MenuSeparatorProps = MenuPrimitive.Separator.Props;

function MenuSeparator({ className, ...props }: MenuSeparatorProps) {
  return (
    <MenuPrimitive.Separator
      className={cn(popupSeparatorClassName, className)}
      data-slot={useSlot("separator")}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// MenuItem
// ---------------------------------------------------------------------------

interface MenuItemProps extends MenuPrimitive.Item.Props {
  /** Lines the item up with items that have a leading icon. */
  inset?: boolean;
  /**
   * `destructive` colours the item (and its icon) for actions that delete.
   * @default "default"
   */
  variant?: "default" | "destructive";
}

/** An action. The highlighted item (pointer or arrow keys) sinks in. */
function MenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: MenuItemProps) {
  return (
    <MenuPrimitive.Item
      className={cn(
        popupItemClassName,
        "group/menu-item",
        inset && "ps-9",
        variant === "destructive" && "text-destructive",
        className
      )}
      data-inset={inset || undefined}
      data-slot={useSlot("item")}
      data-variant={variant}
      {...props}
    />
  );
}

type MenuShortcutProps = React.ComponentProps<"span">;

/** A key hint at the end of an item. Purely visual: wire the keys yourself. */
function MenuShortcut({ className, ...props }: MenuShortcutProps) {
  return (
    <span
      className={cn(
        "ms-auto ps-4 text-muted-foreground text-xs tracking-widest",
        className
      )}
      data-slot={useSlot("shortcut")}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// MenuCheckboxItem / MenuRadioGroup / MenuRadioItem
// ---------------------------------------------------------------------------

// Checked items carry a mark in the primary colour at the end; depth is kept
// for the highlight.
const MARK_CLASS =
  "pointer-events-none absolute end-3 flex items-center justify-center text-primary";

type MenuCheckboxItemProps = MenuPrimitive.CheckboxItem.Props;

/** Toggles a setting. It stays open on click, so several can be changed. */
function MenuCheckboxItem({
  className,
  children,
  ...props
}: MenuCheckboxItemProps) {
  return (
    <MenuPrimitive.CheckboxItem
      className={cn(popupItemClassName, "pe-9", className)}
      data-slot={useSlot("checkbox-item")}
      {...props}
    >
      {children}
      <span className={MARK_CLASS}>
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon aria-hidden="true" className="size-4" />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
    </MenuPrimitive.CheckboxItem>
  );
}

type MenuRadioGroupProps = MenuPrimitive.RadioGroup.Props;

function MenuRadioGroup(props: MenuRadioGroupProps) {
  return (
    <MenuPrimitive.RadioGroup data-slot={useSlot("radio-group")} {...props} />
  );
}

interface MenuRadioItemProps extends MenuPrimitive.RadioItem.Props {
  /**
   * Picking one option is the whole interaction, so the menu closes (Base
   * UI's default keeps it open).
   * @default true
   */
  closeOnClick?: boolean;
}

function MenuRadioItem({
  className,
  children,
  closeOnClick = true,
  ...props
}: MenuRadioItemProps) {
  return (
    <MenuPrimitive.RadioItem
      className={cn(popupItemClassName, "pe-9", className)}
      closeOnClick={closeOnClick}
      data-slot={useSlot("radio-item")}
      {...props}
    >
      {children}
      <span className={MARK_CLASS}>
        <MenuPrimitive.RadioItemIndicator>
          <CircleIcon aria-hidden="true" className="size-2 fill-current" />
        </MenuPrimitive.RadioItemIndicator>
      </span>
    </MenuPrimitive.RadioItem>
  );
}

// ---------------------------------------------------------------------------
// MenuSub / MenuSubTrigger / MenuSubContent
// ---------------------------------------------------------------------------

type MenuSubProps = MenuPrimitive.SubmenuRoot.Props;

function MenuSub(props: MenuSubProps) {
  return <MenuPrimitive.SubmenuRoot data-slot={useSlot("sub")} {...props} />;
}

interface MenuSubTriggerProps extends MenuPrimitive.SubmenuTrigger.Props {
  inset?: boolean;
}

/** Opens a submenu on hover, click or the arrow key; it stays sunk while open. */
function MenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuSubTriggerProps) {
  return (
    <MenuPrimitive.SubmenuTrigger
      className={cn(
        popupItemClassName,
        "data-popup-open:inset-shadow-neu-sm",
        inset && "ps-9",
        className
      )}
      data-inset={inset || undefined}
      data-slot={useSlot("sub-trigger")}
      {...props}
    >
      {children}
      <ChevronRightIcon
        aria-hidden="true"
        className="ms-auto size-4 rtl:-scale-x-100"
      />
    </MenuPrimitive.SubmenuTrigger>
  );
}

function MenuSubContent({
  align = "start",
  alignOffset = -6,
  side = "inline-end",
  sideOffset = 6,
  className,
  ...props
}: MenuContentProps) {
  const slot = useSlot("sub-content");
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        className="isolate z-[var(--z-dropdown)] outline-none"
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          className={cn(menuPopupClassName, "min-w-36", className)}
          data-slot={slot}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  MenuCheckboxItemProps,
  MenuContentProps,
  MenuGroupProps,
  MenuItemProps,
  MenuLabelProps,
  MenuRadioGroupProps,
  MenuRadioItemProps,
  MenuSeparatorProps,
  MenuShortcutProps,
  MenuSlotPrefix,
  MenuSubProps,
  MenuSubTriggerProps,
};
export {
  MenuCheckboxItem,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuPopupContent,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSlotContext,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
};
