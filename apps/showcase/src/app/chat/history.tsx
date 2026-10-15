"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@neomorphic-react/ui/alert-dialog";
import { Avatar, AvatarBadge, AvatarImage } from "@neomorphic-react/ui/avatar";
import { Button } from "@neomorphic-react/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@neomorphic-react/ui/dropdown-menu";
import { Kbd, KbdGroup } from "@neomorphic-react/ui/kbd";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@neomorphic-react/ui/progress";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@neomorphic-react/ui/sidebar";
import { Surface } from "@neomorphic-react/ui/surface";
import { cn } from "@neomorphic-react/ui/utils";
import {
  Feather,
  Keyboard,
  LogOut,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Pin,
  PinOff,
  Plus,
  Search,
  Settings2,
  SquarePen,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import type { Conversation, When } from "@/lib/chat";
import { PEOPLE } from "@/lib/photos";

import { useChat } from "./chat-state";
import { RenameDialog } from "./rename-dialog";

const EXPANDED_ONLY = "group-data-[collapsible=icon]:hidden";

const GROUPS: { when: When; label: string }[] = [
  { when: "today", label: "Today" },
  { when: "week", label: "Previous 7 days" },
  { when: "earlier", label: "Earlier" },
];

interface HistoryProps {
  onShortcuts: () => void;
}

export function History({ onShortcuts }: HistoryProps) {
  const chat = useChat();
  const { isMobile, setOpenMobile } = useSidebar();
  const [query, setQuery] = useState("");
  const [renaming, setRenaming] = useState<Conversation | null>(null);
  const [deleting, setDeleting] = useState<Conversation | null>(null);

  const needle = query.trim().toLowerCase();
  const matches = chat.conversations.filter(
    (c) => !needle || `${c.title} ${c.topic}`.toLowerCase().includes(needle)
  );
  const pinned = matches.filter((c) => c.pinned);

  const go = (id: string) => {
    chat.open(id);
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const row = (c: Conversation) => (
    <SidebarMenuItem key={c.id}>
      <SidebarMenuButton
        isActive={c.id === chat.active.id}
        onClick={() => go(c.id)}
        tooltip={c.title}
      >
        <MessageCircle />
        <span className="truncate">{c.title}</span>
      </SidebarMenuButton>
      {c.unread ? (
        <SidebarMenuBadge
          aria-label={`${c.unread} unread`}
          className="group-hover/menu-item:opacity-0"
        >
          {c.unread}
        </SidebarMenuBadge>
      ) : null}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <SidebarMenuAction aria-label={`More for ${c.title}`} showOnHover />
          }
        >
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" side="right">
          <DropdownMenuItem onClick={() => chat.togglePin(c.id)}>
            {c.pinned ? <PinOff /> : <Pin />}
            {c.pinned ? "Unpin" : "Pin"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setRenaming(c)}>
            <Pencil />
            Rename
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setDeleting(c)}
            variant="destructive"
          >
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );

  return (
    <Sidebar collapsible="icon" variant="floating">
      <nav aria-label="Chats" className="flex min-h-0 flex-1 flex-col">
        <SidebarHeader className="gap-4">
          <div className="flex items-center gap-3 px-1 pt-1">
            <Surface
              className="grid size-10 shrink-0 place-items-center text-primary"
              depth="sm"
              shape="circle"
            >
              <Feather className="size-4.5" />
            </Surface>
            <div className={cn("grid min-w-0 leading-tight", EXPANDED_ONLY)}>
              <span className="font-semibold text-foreground text-lg tracking-tight">
                Still
              </span>
              <span className="truncate text-muted-foreground text-xs">
                A quiet place to think
              </span>
            </div>
          </div>
          <Button
            className={cn(
              "w-full justify-start normal-case tracking-normal",
              EXPANDED_ONLY
            )}
            icon={<SquarePen />}
            onClick={chat.newChat}
          >
            New chat
            <KbdGroup className="ms-auto">
              <Kbd size="sm">⌘</Kbd>
              <Kbd size="sm">J</Kbd>
            </KbdGroup>
          </Button>
          <Button
            aria-label="New chat"
            className="mx-auto hidden group-data-[collapsible=icon]:inline-flex"
            icon={<SquarePen />}
            onClick={chat.newChat}
            size="sm"
          />
          <div className={cn("relative", EXPANDED_ONLY)}>
            <Search className="pointer-events-none absolute start-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground" />
            <SidebarInput
              aria-label="Search chats"
              className="ps-9"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search chats"
              value={query}
            />
          </div>
        </SidebarHeader>

        <SidebarContent>
          {pinned.length > 0 ? (
            <SidebarGroup>
              <SidebarGroupLabel>Pinned</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>{pinned.map(row)}</SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ) : null}
          {GROUPS.map(({ when, label }) => {
            const items = matches.filter((c) => !c.pinned && c.when === when);
            if (items.length === 0) {
              return null;
            }
            return (
              <SidebarGroup key={when}>
                <SidebarGroupLabel>{label}</SidebarGroupLabel>
                {when === "today" ? (
                  <SidebarGroupAction
                    aria-label="New chat"
                    onClick={chat.newChat}
                    title="New chat"
                  >
                    <Plus />
                  </SidebarGroupAction>
                ) : null}
                <SidebarGroupContent>
                  <SidebarMenu>{items.map(row)}</SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            );
          })}
          {matches.length === 0 ? (
            <p
              className={cn(
                "px-4 py-6 text-center text-muted-foreground text-sm",
                EXPANDED_ONLY
              )}
            >
              No chats match “{query}”.
            </p>
          ) : null}
        </SidebarContent>

        <SidebarSeparator />
        <SidebarFooter className="gap-4">
          <Progress className={EXPANDED_ONLY} size="sm" value={64}>
            <div className="flex justify-between text-xs">
              <ProgressLabel>Quiet minutes this week</ProgressLabel>
              <ProgressValue>{() => "64 of 100"}</ProgressValue>
            </div>
          </Progress>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <SidebarMenuButton
                  className="h-auto p-1.5"
                  size="lg"
                  tooltip="Amardeep · Account"
                />
              }
            >
              <Avatar size="sm">
                <AvatarImage alt="" src={PEOPLE.amardeep} />
                <AvatarBadge />
              </Avatar>
              <span className="grid min-w-0 flex-1 text-start leading-tight">
                <span className="truncate font-medium text-foreground">
                  Amardeep
                </span>
                <span className="truncate text-muted-foreground text-xs">
                  Online · Calm plan
                </span>
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56" side="top">
              <DropdownMenuGroup>
                <DropdownMenuLabel>amardeep@still.app</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => chat.setPanelOpen(true)}>
                  <Settings2 />
                  Session settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onShortcuts}>
                  <Keyboard />
                  Keyboard shortcuts
                  <DropdownMenuShortcut>?</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <LogOut />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </nav>
      <SidebarRail />

      <RenameDialog
        conversation={renaming}
        onOpenChange={(open) => !open && setRenaming(null)}
      />
      <AlertDialog
        onOpenChange={(open) => !open && setDeleting(null)}
        open={deleting !== null}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="text-destructive">
              <Trash2 />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete this chat?</AlertDialogTitle>
            <AlertDialogDescription>
              “{deleting?.title}” will be removed from your history. You can
              undo straight after.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep it</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleting && chat.remove(deleting.id)}
              variant="destructive"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Sidebar>
  );
}
