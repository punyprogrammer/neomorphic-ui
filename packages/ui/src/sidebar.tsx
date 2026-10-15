"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { PanelLeft as PanelLeftIcon } from "lucide-react";
import type * as React from "react";
import {
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

import { Button, type ButtonProps } from "./button";
import { Input, type InputProps } from "./input";
import { Separator, type SeparatorProps } from "./separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./sheet";
import { Skeleton } from "./skeleton";
import {
  Tooltip,
  TooltipContent,
  type TooltipContentProps,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3.5rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const MOBILE_QUERY = "(max-width: 767px)";

// A small ghost icon button pinned to the end of a row.
const SIDEBAR_ACTION =
  "absolute flex aspect-square w-6 items-center justify-center rounded-md text-muted-foreground outline-none transition-[color,box-shadow,opacity] hover:bg-neu-convex hover:text-foreground hover:shadow-neu-sm focus-visible:outline-2 focus-visible:outline-ring/50 after:absolute after:-inset-2 group-data-[collapsible=icon]:hidden md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0";

// ---------------------------------------------------------------------------
// useIsMobile
// ---------------------------------------------------------------------------

function subscribeToMobile(onChange: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) {
    return () => undefined;
  }
  const query = window.matchMedia(MOBILE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getMobile() {
  return typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia(MOBILE_QUERY).matches
    : false;
}

/** Whether the viewport is below the `md` breakpoint. */
function useIsMobile() {
  return useSyncExternalStore(subscribeToMobile, getMobile, () => false);
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface SidebarContextValue {
  isMobile: boolean;
  open: boolean;
  openMobile: boolean;
  setOpen: (open: boolean) => void;
  setOpenMobile: (open: boolean) => void;
  state: "expanded" | "collapsed";
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

/** The sidebar's open state and toggles. */
function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a <SidebarProvider />");
  }
  return context;
}

// ---------------------------------------------------------------------------
// SidebarProvider
// ---------------------------------------------------------------------------

interface SidebarProviderProps extends React.ComponentProps<"div"> {
  /** @default true */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Whether the desktop sidebar is expanded. Use when controlled. */
  open?: boolean;
}

/**
 * Owns the open state for a `Sidebar` and the `SidebarInset` beside it.
 * ⌘B / Ctrl+B toggles it, and the desktop state is kept in a
 * `sidebar_state` cookie so a server render can read `defaultOpen`. Below
 * the `md` breakpoint the sidebar opens as a Sheet instead.
 */
function SidebarProvider({
  className,
  children,
  defaultOpen = true,
  onOpenChange,
  open: openProp,
  style,
  ...props
}: SidebarProviderProps) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = useState(false);
  const [ownOpen, setOwnOpen] = useState(defaultOpen);
  const open = openProp ?? ownOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (openProp === undefined) {
        setOwnOpen(next);
      }
      onOpenChange?.(next);
      // biome-ignore lint/suspicious/noDocumentCookie: the state cookie lets a server render pick the initial state
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${next}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [onOpenChange, openProp]
  );

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setOpenMobile((current) => !current);
    } else {
      setOpen(!open);
    }
  }, [isMobile, open, setOpen]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleSidebar]);

  const context = useMemo<SidebarContextValue>(
    () => ({
      isMobile,
      open,
      openMobile,
      setOpen,
      setOpenMobile,
      state: open ? "expanded" : "collapsed",
      toggleSidebar,
    }),
    [isMobile, open, openMobile, setOpen, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={context}>
      <TooltipProvider delay={0}>
        <div
          className={cn(
            "group/sidebar-wrapper flex min-h-svh w-full bg-background",
            className
          )}
          data-slot="sidebar-wrapper"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------

interface SidebarProps extends React.ComponentProps<"div"> {
  /**
   * `offcanvas` slides it away, `icon` narrows it to its icons (labels move
   * into tooltips), `none` keeps it open.
   * @default "offcanvas"
   */
  collapsible?: "offcanvas" | "icon" | "none";
  /** @default "left" */
  side?: "left" | "right";
  /**
   * `sidebar` is a raised slab against the screen edge; `floating` a raised
   * card held off the edges; `inset` lies flat while the `SidebarInset`
   * beside it is raised.
   * @default "sidebar"
   */
  variant?: "sidebar" | "floating" | "inset";
}

/** The side panel. Fill it with a header, `SidebarContent` and a footer. */
function Sidebar({
  className,
  children,
  collapsible = "offcanvas",
  side = "left",
  variant = "sidebar",
  ...props
}: SidebarProps) {
  const { isMobile, openMobile, setOpenMobile, state } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        className={cn(
          "inset-shadow-neu-flat flex h-full w-(--sidebar-width) flex-col bg-neu-convex text-foreground shadow-neu-lg",
          className
        )}
        data-slot="sidebar"
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet onOpenChange={setOpenMobile} open={openMobile}>
        <SheetContent
          className="w-(--sidebar-width) max-w-[calc(100%-3rem)] gap-0 p-0"
          data-mobile="true"
          data-sidebar="sidebar"
          data-slot="sidebar"
          showCloseButton={false}
          side={side}
          style={
            { "--sidebar-width": SIDEBAR_WIDTH_MOBILE } as React.CSSProperties
          }
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Shows the navigation.</SheetDescription>
          </SheetHeader>
          <div className="flex size-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  const spaced = variant === "floating" || variant === "inset";

  return (
    <div
      className="group peer hidden text-foreground md:block"
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-side={side}
      data-slot="sidebar"
      data-state={state}
      data-variant={variant}
    >
      {/* Holds the sidebar's space in the page flow. */}
      <div
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-[var(--duration-slow)] ease-[var(--ease-out)]",
          "group-data-[collapsible=offcanvas]:w-0",
          spaced
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+--spacing(6))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        )}
        data-slot="sidebar-gap"
      />
      <div
        className={cn(
          "fixed inset-y-0 z-(--z-sticky) hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-[var(--duration-slow)] ease-[var(--ease-out)] md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          spaced
            ? "p-3 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+--spacing(6))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
          className
        )}
        data-slot="sidebar-container"
        {...props}
      >
        <div
          className={cn(
            "flex size-full flex-col",
            variant === "inset"
              ? "inset-shadow-neu-flat shadow-neu-flat"
              : "inset-shadow-neu-flat bg-neu-convex shadow-neu-lg",
            variant === "floating" && "rounded-2xl",
            variant === "sidebar" &&
              (side === "left" ? "rounded-e-2xl" : "rounded-s-2xl")
          )}
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SidebarTrigger / SidebarRail
// ---------------------------------------------------------------------------

type SidebarTriggerProps = Omit<ButtonProps, "children" | "icon">;

/** A ghost icon button that toggles the sidebar. */
function SidebarTrigger({
  className,
  onClick,
  size = "sm",
  variant = "ghost",
  ...props
}: SidebarTriggerProps) {
  const { toggleSidebar } = useSidebar();
  const handleClick = useCallback<NonNullable<ButtonProps["onClick"]>>(
    (event) => {
      onClick?.(event);
      toggleSidebar();
    },
    [onClick, toggleSidebar]
  );
  return (
    <Button
      aria-label="Toggle sidebar"
      className={cn("rtl:[&_svg]:rotate-180", className)}
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      icon={<PanelLeftIcon />}
      onClick={handleClick}
      size={size}
      variant={variant}
      {...props}
    />
  );
}

type SidebarRailProps = React.ComponentProps<"button">;

/**
 * A thin strip along the sidebar's inner edge: hover shows a primary
 * groove, a click toggles. Pointer only; keyboard users have the trigger
 * and ⌘B.
 */
function SidebarRail({ className, ...props }: SidebarRailProps) {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      aria-label="Toggle sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-4 after:left-1/2 after:w-0.5 after:rounded-full after:transition-colors hover:after:bg-primary/60 sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize group-data-[side=left]:-right-4 group-data-[side=right]:left-0",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2 [[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      data-sidebar="rail"
      data-slot="sidebar-rail"
      onClick={toggleSidebar}
      tabIndex={-1}
      title="Toggle sidebar"
      type="button"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// SidebarInset
// ---------------------------------------------------------------------------

type SidebarInsetProps = React.ComponentProps<"main">;

/** The page beside the sidebar; raised as a card when the sidebar is `inset`. */
function SidebarInset({ className, ...props }: SidebarInsetProps) {
  return (
    <main
      className={cn(
        "relative flex w-full flex-1 flex-col bg-background",
        "md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ms-3 md:peer-data-[variant=inset]:inset-shadow-neu-flat md:peer-data-[variant=inset]:my-3 md:peer-data-[variant=inset]:me-3 md:peer-data-[variant=inset]:rounded-2xl md:peer-data-[variant=inset]:bg-neu-convex md:peer-data-[variant=inset]:shadow-neu-lg",
        className
      )}
      data-slot="sidebar-inset"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Layout parts
// ---------------------------------------------------------------------------

function SidebarInput({ className, ...props }: InputProps) {
  return (
    <Input
      className={cn("w-full", className)}
      data-sidebar="input"
      data-slot="sidebar-input"
      size="sm"
      {...props}
    />
  );
}

type SidebarSectionProps = React.ComponentProps<"div">;

function SidebarHeader({ className, ...props }: SidebarSectionProps) {
  return (
    <div
      className={cn("flex flex-col gap-2 p-3", className)}
      data-sidebar="header"
      data-slot="sidebar-header"
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: SidebarSectionProps) {
  return (
    <div
      className={cn("flex flex-col gap-2 p-3", className)}
      data-sidebar="footer"
      data-slot="sidebar-footer"
      {...props}
    />
  );
}

/** A groove between sections. */
function SidebarSeparator({ className, ...props }: SeparatorProps) {
  return (
    <Separator
      className={cn("mx-3 w-auto", className)}
      data-sidebar="separator"
      data-slot="sidebar-separator"
      {...props}
    />
  );
}

/** The scrolling middle, holding `SidebarGroup`s. */
function SidebarContent({ className, ...props }: SidebarSectionProps) {
  return (
    <div
      className={cn(
        "neu-scrollbar flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      data-sidebar="content"
      data-slot="sidebar-content"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// SidebarGroup
// ---------------------------------------------------------------------------

function SidebarGroup({ className, ...props }: SidebarSectionProps) {
  return (
    <div
      className={cn("relative flex w-full min-w-0 flex-col p-3", className)}
      data-sidebar="group"
      data-slot="sidebar-group"
      {...props}
    />
  );
}

type SidebarGroupLabelProps = useRender.ComponentProps<"div">;

/** A small uppercase heading; it fades out when collapsed to icons. */
function SidebarGroupLabel({
  className,
  render,
  ...props
}: SidebarGroupLabelProps) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      {
        className: cn(
          "flex h-8 shrink-0 items-center px-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide outline-none transition-[margin,opacity] duration-[var(--duration-slow)] ease-[var(--ease-out)] focus-visible:outline-2 focus-visible:outline-ring/50 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 [&>svg]:size-4 [&>svg]:shrink-0",
          className
        ),
      },
      props
    ),
    state: { slot: "sidebar-group-label", sidebar: "group-label" },
  });
}

type SidebarGroupActionProps = useRender.ComponentProps<"button">;

/** An icon button beside a group label, such as "Add project". */
function SidebarGroupAction({
  className,
  render,
  ...props
}: SidebarGroupActionProps) {
  return useRender({
    defaultTagName: "button",
    render,
    props: mergeProps<"button">(
      {
        className: cn(SIDEBAR_ACTION, "end-4 top-4.5", className),
        type: "button",
      },
      props
    ),
    state: { slot: "sidebar-group-action", sidebar: "group-action" },
  });
}

function SidebarGroupContent({ className, ...props }: SidebarSectionProps) {
  return (
    <div
      className={cn("w-full text-sm", className)}
      data-sidebar="group-content"
      data-slot="sidebar-group-content"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// SidebarMenu
// ---------------------------------------------------------------------------

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      data-sidebar="menu"
      data-slot="sidebar-menu"
      {...props}
    />
  );
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      className={cn("group/menu-item relative", className)}
      data-sidebar="menu-item"
      data-slot="sidebar-menu-item"
      {...props}
    />
  );
}

// Rest flat, rise on hover, press in (and turn primary) when active or when
// the collapsible it opens is open.
const sidebarMenuButtonVariants = cva(
  "peer/menu-button inset-shadow-neu-flat flex w-full items-center gap-2.5 overflow-hidden rounded-lg px-2.5 text-start shadow-neu-flat outline-none transition-[width,height,padding,box-shadow,color] duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:bg-neu-convex hover:shadow-neu-sm focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pe-9 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-active:inset-shadow-neu-sm data-active:bg-none data-active:font-medium data-panel-open:font-medium data-active:text-primary data-active:shadow-neu-flat group-data-[collapsible=icon]:size-9! group-data-[collapsible=icon]:p-2.5! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      size: {
        sm: "h-8 text-xs",
        md: "h-9 text-sm",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-1.5!",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

interface SidebarMenuButtonProps
  extends useRender.ComponentProps<"button">,
    VariantProps<typeof sidebarMenuButtonVariants> {
  /**
   * Marks the current page: pressed in and primary, with
   * `aria-current="page"` on links.
   * @default false
   */
  isActive?: boolean;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /**
   * Shown beside the button while the sidebar is collapsed to icons. Pass
   * the label, or `TooltipContent` props.
   */
  tooltip?: string | TooltipContentProps;
}

/** A row in a `SidebarMenu`; `render={<a href />}` for links. */
function SidebarMenuButton({
  className,
  isActive = false,
  render,
  size = "md",
  tooltip,
  ...props
}: SidebarMenuButtonProps) {
  const { isMobile, state } = useSidebar();
  const isLink = isValidElement(render) && render.type === "a";
  const button = useRender({
    defaultTagName: "button",
    render,
    props: mergeProps<"button">(
      {
        className: cn(sidebarMenuButtonVariants({ size }), className),
        "aria-current": isActive && isLink ? "page" : undefined,
        type: isLink ? undefined : "button",
      } as React.ComponentProps<"button">,
      props
    ),
    state: {
      slot: "sidebar-menu-button",
      sidebar: "menu-button",
      size,
      active: isActive,
    },
  });

  if (!tooltip) {
    return button;
  }
  const content = typeof tooltip === "string" ? { children: tooltip } : tooltip;
  return (
    <Tooltip disabled={state !== "collapsed" || isMobile}>
      <TooltipTrigger render={button} />
      <TooltipContent align="center" side="right" {...content} />
    </Tooltip>
  );
}

interface SidebarMenuActionProps extends useRender.ComponentProps<"button"> {
  /**
   * Show only while the row is hovered or focused, or its menu is open.
   * @default false
   */
  showOnHover?: boolean;
}

/** An icon button at the end of a menu row, such as "More". Label it. */
function SidebarMenuAction({
  className,
  render,
  showOnHover = false,
  ...props
}: SidebarMenuActionProps) {
  return useRender({
    defaultTagName: "button",
    render,
    props: mergeProps<"button">(
      {
        className: cn(
          SIDEBAR_ACTION,
          "end-1.5 top-1.5 peer-data-[size=lg]/menu-button:top-3 peer-data-[size=sm]/menu-button:top-1",
          showOnHover &&
            "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-popup-open:opacity-100 md:opacity-0",
          className
        ),
        type: "button",
      },
      props
    ),
    state: { slot: "sidebar-menu-action", sidebar: "menu-action" },
  });
}

/** A count at the end of a row, sunk into a small well. */
function SidebarMenuBadge({ className, ...props }: SidebarSectionProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-shadow-neu-sm end-2 flex h-5 min-w-5 select-none items-center justify-center rounded-full px-1.5 font-medium text-muted-foreground text-xs tabular-nums shadow-neu-flat",
        "top-2 group-data-[collapsible=icon]:hidden peer-data-[size=lg]/menu-button:top-3.5 peer-data-[size=sm]/menu-button:top-1.5 peer-data-active/menu-button:text-primary",
        className
      )}
      data-sidebar="menu-badge"
      data-slot="sidebar-menu-badge"
      {...props}
    />
  );
}

interface SidebarMenuSkeletonProps extends SidebarSectionProps {
  /** @default false */
  showIcon?: boolean;
  /**
   * Width of the text bar, any CSS length.
   * @default "70%"
   */
  width?: string;
}

/** A loading row: an optional icon block and a text bar. */
function SidebarMenuSkeleton({
  className,
  showIcon = false,
  width = "70%",
  style,
  ...props
}: SidebarMenuSkeletonProps) {
  return (
    <div
      className={cn("flex h-9 items-center gap-2.5 px-2.5", className)}
      data-sidebar="menu-skeleton"
      data-slot="sidebar-menu-skeleton"
      style={{ "--skeleton-width": width, ...style } as React.CSSProperties}
      {...props}
    >
      {showIcon ? (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      ) : null}
      <Skeleton
        className="h-3.5 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        shape="line"
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// SidebarMenuSub
// ---------------------------------------------------------------------------

/** Nested rows hanging off a groove; hidden when collapsed to icons. */
function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn(
        "ms-4.5 mt-1 flex min-w-0 flex-col gap-1 border-[var(--neu-dark)] border-s py-0.5 ps-2.5 shadow-[inset_1px_0_0_var(--neu-light)] group-data-[collapsible=icon]:hidden rtl:shadow-[inset_-1px_0_0_var(--neu-light)]",
        className
      )}
      data-sidebar="menu-sub"
      data-slot="sidebar-menu-sub"
      {...props}
    />
  );
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      className={cn("group/menu-sub-item relative", className)}
      data-sidebar="menu-sub-item"
      data-slot="sidebar-menu-sub-item"
      {...props}
    />
  );
}

interface SidebarMenuSubButtonProps extends useRender.ComponentProps<"a"> {
  /** @default false */
  isActive?: boolean;
  /** @default "md" */
  size?: "sm" | "md";
}

/** A nested row, a link by default. */
function SidebarMenuSubButton({
  className,
  isActive = false,
  render,
  size = "md",
  ...props
}: SidebarMenuSubButtonProps) {
  return useRender({
    defaultTagName: "a",
    render,
    props: mergeProps<"a">(
      {
        "aria-current": isActive ? "page" : undefined,
        className: cn(
          "inset-shadow-neu-flat flex h-8 min-w-0 items-center gap-2 overflow-hidden rounded-md px-2.5 text-muted-foreground shadow-neu-flat outline-none transition-[box-shadow,color] duration-[var(--duration-fast)] hover:bg-neu-convex hover:text-foreground hover:shadow-neu-sm focus-visible:outline-2 focus-visible:outline-ring/50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-active:inset-shadow-neu-sm data-active:bg-none data-active:font-medium data-active:text-primary data-active:shadow-neu-flat group-data-[collapsible=icon]:hidden [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
          size === "sm" ? "text-xs" : "text-sm",
          className
        ),
      } as React.ComponentProps<"a">,
      props
    ),
    state: {
      slot: "sidebar-menu-sub-button",
      sidebar: "menu-sub-button",
      size,
      active: isActive,
    },
  });
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  SidebarGroupActionProps,
  SidebarGroupLabelProps,
  SidebarMenuActionProps,
  SidebarMenuButtonProps,
  SidebarMenuSkeletonProps,
  SidebarMenuSubButtonProps,
  SidebarProps,
  SidebarProviderProps,
  SidebarRailProps,
  SidebarTriggerProps,
};
export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  sidebarMenuButtonVariants,
  useIsMobile,
  useSidebar,
};
