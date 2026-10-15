"use client";

import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { Search as SearchIcon } from "lucide-react";
import type * as React from "react";
import { useCallback } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./dialog";
import { inputControlClassName } from "./input";
import { InputGroup, InputGroupAddon } from "./input-group";
import {
  popupItemClassName,
  popupLabelClassName,
  popupSeparatorClassName,
} from "./popup";
import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Command (Root)
// ---------------------------------------------------------------------------

type ChangeDetails = AutocompletePrimitive.Root.ChangeEventDetails;

interface CommandProps<ItemValue>
  extends Omit<
    AutocompletePrimitive.Root.Props<ItemValue>,
    "defaultOpen" | "inline" | "items" | "onOpenChange" | "open"
  > {
  className?: string;
  /** The items to filter, flat or as groups that each hold `items`. */
  items?: readonly ItemValue[];
}

/**
 * An always-open search list: type to filter, arrows to move, Enter to run
 * the highlighted item's `onClick`. Pass `items` (or groups of `items`) so
 * the list filters; the first match stays highlighted. Running an item
 * leaves the query as typed.
 */
function Command<ItemValue>({
  autoHighlight = "always",
  children,
  className,
  keepHighlight = true,
  onValueChange,
  ...props
}: CommandProps<ItemValue>) {
  const handleValueChange = useCallback(
    (value: string, details: ChangeDetails) => {
      if (details.reason === "item-press") {
        details.cancel();
        return;
      }
      onValueChange?.(value, details);
    },
    [onValueChange]
  );
  // The primitive's overloads split flat and grouped `items`; one generic
  // signature accepts both.
  const Root = AutocompletePrimitive.Root as (
    props: AutocompletePrimitive.Root.Props<ItemValue>
  ) => React.ReactElement;
  return (
    <Root
      autoHighlight={autoHighlight}
      inline
      keepHighlight={keepHighlight}
      onValueChange={handleValueChange}
      open
      {...props}
    >
      {/* A raised card on its own; bare inside a Dialog, which is raised. */}
      <div
        className={cn(
          "inset-shadow-neu-flat flex size-full min-h-0 flex-col overflow-hidden rounded-xl bg-neu-convex p-1.5 text-foreground shadow-neu-lg",
          "in-data-[slot=dialog-content]:inset-shadow-neu-flat in-data-[slot=dialog-content]:rounded-none in-data-[slot=dialog-content]:bg-none in-data-[slot=dialog-content]:p-0 in-data-[slot=dialog-content]:shadow-neu-flat",
          className
        )}
        data-slot="command"
      >
        {children}
      </div>
    </Root>
  );
}

// ---------------------------------------------------------------------------
// CommandDialog
// ---------------------------------------------------------------------------

interface CommandDialogProps
  extends Omit<React.ComponentProps<typeof Dialog>, "children"> {
  children: React.ReactNode;
  /** Classes for the dialog panel. */
  className?: string;
  /**
   * Read by screen readers; not shown.
   * @default "Search for a command to run."
   */
  description?: string;
  /** @default false */
  showCloseButton?: boolean;
  /**
   * The dialog's accessible name; not shown.
   * @default "Command palette"
   */
  title?: string;
}

/**
 * A `Command` in a Dialog near the top of the screen, the ⌘K palette. Wire
 * the shortcut yourself and close the dialog from each item's `onClick`.
 */
function CommandDialog({
  children,
  className,
  description = "Search for a command to run.",
  showCloseButton = false,
  title = "Command palette",
  ...props
}: CommandDialogProps) {
  return (
    <Dialog {...props}>
      <DialogContent
        className={cn(
          "top-[12%] max-h-[min(32rem,calc(100dvh-6rem))] translate-y-0 gap-0 overflow-hidden p-2",
          className
        )}
        showCloseButton={showCloseButton}
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">{description}</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
}

// ---------------------------------------------------------------------------
// CommandInput
// ---------------------------------------------------------------------------

interface CommandInputProps
  extends Omit<AutocompletePrimitive.Input.Props, "className" | "size"> {
  /** Classes for the well around the input. */
  className?: string;
}

/** The search field: an `InputGroup` well with a search icon. */
function CommandInput({ className, ...props }: CommandInputProps) {
  return (
    <AutocompletePrimitive.InputGroup
      className={cn("mb-1.5 shrink-0", className)}
      render={<InputGroup />}
    >
      <InputGroupAddon>
        <SearchIcon aria-hidden="true" />
      </InputGroupAddon>
      <AutocompletePrimitive.Input
        className={cn(
          inputControlClassName,
          "h-(--input-group-h) flex-1 px-(--input-group-px)"
        )}
        data-slot="input-group-control"
        {...props}
      />
    </AutocompletePrimitive.InputGroup>
  );
}

// ---------------------------------------------------------------------------
// CommandList / CommandEmpty
// ---------------------------------------------------------------------------

type CommandListProps = AutocompletePrimitive.List.Props;

/**
 * The scrolling results. Give it a render function over the filtered
 * `items`, or over groups that each hold a `CommandCollection`.
 */
function CommandList({ className, ...props }: CommandListProps) {
  return (
    <AutocompletePrimitive.List
      className={cn(
        "neu-scrollbar max-h-80 min-h-0 flex-1 scroll-py-1 overflow-y-auto overscroll-contain outline-none",
        className
      )}
      data-slot="command-list"
      {...props}
    />
  );
}

type CommandEmptyProps = AutocompletePrimitive.Empty.Props;

/** Shown when nothing matches; stays mounted so screen readers hear it. */
function CommandEmpty({ className, ...props }: CommandEmptyProps) {
  return (
    <AutocompletePrimitive.Empty
      className={cn(
        "px-3 not-empty:py-8 text-center text-muted-foreground text-sm",
        className
      )}
      data-slot="command-empty"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// CommandGroup / CommandCollection / CommandSeparator
// ---------------------------------------------------------------------------

interface CommandGroupProps extends AutocompletePrimitive.Group.Props {
  /** A heading that labels the group. */
  heading?: React.ReactNode;
}

/** A labelled run of items. Pass the group's `items` so it filters. */
function CommandGroup({
  className,
  children,
  heading,
  ...props
}: CommandGroupProps) {
  return (
    <AutocompletePrimitive.Group
      className={cn("not-last:mb-1 grid", className)}
      data-slot="command-group"
      {...props}
    >
      {heading == null ? null : (
        <AutocompletePrimitive.GroupLabel
          className={popupLabelClassName}
          data-slot="command-group-heading"
        >
          {heading}
        </AutocompletePrimitive.GroupLabel>
      )}
      {children}
    </AutocompletePrimitive.Group>
  );
}

type CommandCollectionProps = AutocompletePrimitive.Collection.Props;

/** Maps a group's filtered `items` through a render function. */
function CommandCollection(props: CommandCollectionProps) {
  return <AutocompletePrimitive.Collection {...props} />;
}

type CommandSeparatorProps = AutocompletePrimitive.Separator.Props;

function CommandSeparator({ className, ...props }: CommandSeparatorProps) {
  return (
    <AutocompletePrimitive.Separator
      className={cn(popupSeparatorClassName, className)}
      data-slot="command-separator"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// CommandItem / CommandShortcut
// ---------------------------------------------------------------------------

type CommandItemProps = AutocompletePrimitive.Item.Props;

/**
 * A result. The highlighted one sinks into the card; Enter or a click runs
 * its `onClick`.
 */
function CommandItem({ className, ...props }: CommandItemProps) {
  return (
    <AutocompletePrimitive.Item
      className={cn(
        popupItemClassName,
        "group/command-item scroll-my-1 data-highlighted:text-primary",
        className
      )}
      data-slot="command-item"
      {...props}
    />
  );
}

type CommandShortcutProps = React.ComponentProps<"span">;

/** A keyboard hint at the end of an item, as plain muted text. */
function CommandShortcut({ className, ...props }: CommandShortcutProps) {
  return (
    <span
      className={cn(
        "ms-auto text-muted-foreground text-xs tracking-widest",
        className
      )}
      data-slot="command-shortcut"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  CommandCollectionProps,
  CommandDialogProps,
  CommandEmptyProps,
  CommandGroupProps,
  CommandInputProps,
  CommandItemProps,
  CommandListProps,
  CommandProps,
  CommandSeparatorProps,
  CommandShortcutProps,
};
export {
  Command,
  CommandCollection,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
};
