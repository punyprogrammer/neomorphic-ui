"use client";

import {
  Avatar,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@neomorphic-react/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@neomorphic-react/ui/breadcrumb";
import { Button } from "@neomorphic-react/ui/button";
import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@neomorphic-react/ui/command";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@neomorphic-react/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@neomorphic-react/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@neomorphic-react/ui/input-group";
import { Kbd, KbdGroup } from "@neomorphic-react/ui/kbd";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@neomorphic-react/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@neomorphic-react/ui/select";
import { Separator } from "@neomorphic-react/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  useSidebar,
} from "@neomorphic-react/ui/sidebar";
import { Switch } from "@neomorphic-react/ui/switch";
import { toast } from "@neomorphic-react/ui/toast";
import { Toggle } from "@neomorphic-react/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@neomorphic-react/ui/tooltip";
import { cn } from "@neomorphic-react/ui/utils";
import {
  Copy,
  Download,
  Link2,
  MessageCircle,
  MoreHorizontal,
  PanelLeft,
  PanelRight,
  Pencil,
  Pin,
  Search,
  Share,
  SquarePen,
  Trash2,
} from "lucide-react";
import { type CSSProperties, useEffect, useEffectEvent, useState } from "react";

import { type Conversation, MODELS } from "@/lib/chat";
import { PEOPLE } from "@/lib/photos";

import { ChatProvider, useChat } from "./chat-state";
import { Composer } from "./composer";
import { History } from "./history";
import { RenameDialog } from "./rename-dialog";
import { SessionPanel } from "./session-panel";
import { Transcript } from "./transcript";

const QUIET = "normal-case tracking-normal";

export function ChatApp() {
  return (
    <ChatProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "18rem",
            "--sidebar-width-icon": "4.5rem",
          } as CSSProperties
        }
      >
        <Shell />
      </SidebarProvider>
    </ChatProvider>
  );
}

function Shell() {
  const chat = useChat();
  const history = useSidebar();
  const [shortcuts, setShortcuts] = useState(false);
  const [renaming, setRenaming] = useState<Conversation | null>(null);

  const onKey = useEffectEvent((event: KeyboardEvent) => {
    const mod = event.metaKey || event.ctrlKey;
    const target = event.target as HTMLElement;
    const typing = target.closest("input, textarea, [contenteditable]");
    if (mod && event.key.toLowerCase() === "k") {
      event.preventDefault();
      chat.setPaletteOpen(!chat.paletteOpen);
    } else if (mod && event.key.toLowerCase() === "j") {
      event.preventDefault();
      chat.newChat();
    } else if (mod && event.key === ".") {
      event.preventDefault();
      chat.setPanelOpen(!chat.panelOpen);
    } else if (event.key === "Escape" && chat.busy) {
      chat.stop();
    } else if (event.key === "?" && !typing) {
      event.preventDefault();
      setShortcuts(true);
    }
  });

  useEffect(() => {
    const listener = (event: KeyboardEvent) => onKey(event);
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);

  // Narrower desktops start with only the transcript and history.
  useEffect(() => {
    if (window.matchMedia("(max-width: 1279px)").matches) {
      chat.setPanelOpen(false);
    }
  }, [chat.setPanelOpen]);

  return (
    <>
      <History onShortcuts={() => setShortcuts(true)} />
      <SidebarProvider
        className="min-w-0 flex-1"
        onOpenChange={() => undefined}
        open={chat.panelOpen}
        style={{ "--sidebar-width": "22rem" } as CSSProperties}
      >
        <SidebarInset
          className={cn(
            "h-svh min-w-0 ps-3 pt-3 md:ps-0",
            !chat.panelOpen && "pe-3"
          )}
          data-theme="haze"
        >
          <h1 className="sr-only">Still, a calm assistant</h1>
          <Header
            onRename={() => setRenaming(chat.active)}
            onToggleHistory={() =>
              history.isMobile
                ? history.setOpenMobile(true)
                : history.toggleSidebar()
            }
          />
          <div className="relative min-h-0 flex-1">
            <Transcript />
          </div>
          <Composer />
        </SidebarInset>
        <SessionPanel />
      </SidebarProvider>

      <Palette onShortcuts={() => setShortcuts(true)} />
      <Shortcuts onOpenChange={setShortcuts} open={shortcuts} />
      <RenameDialog
        conversation={renaming}
        onOpenChange={(open) => !open && setRenaming(null)}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

function Header({
  onRename,
  onToggleHistory,
}: {
  onRename: () => void;
  onToggleHistory: () => void;
}) {
  const chat = useChat();
  const panel = useSidebar();

  return (
    <header className="flex shrink-0 items-center gap-2 px-2 pb-2 sm:px-4">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              aria-label="Toggle chat history"
              icon={<PanelLeft />}
              onClick={onToggleHistory}
              size="sm"
              variant="ghost"
            />
          }
        />
        <TooltipContent>
          Chats <Kbd size="sm">⌘B</Kbd>
        </TooltipContent>
      </Tooltip>
      <Separator className="hidden h-5 sm:block" orientation="vertical" />

      <Breadcrumb className="hidden min-w-0 md:block">
        <BreadcrumbList className="flex-nowrap">
          <BreadcrumbItem>
            <BreadcrumbLink
              href="#"
              onClick={(event) => {
                event.preventDefault();
                chat.setPaletteOpen(true);
              }}
            >
              {chat.active.topic}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="min-w-0">
            <BreadcrumbPage className="truncate">
              {chat.active.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ms-auto flex items-center gap-2">
        <Select
          items={MODELS}
          onValueChange={(value) => chat.update("model", value as string)}
          value={chat.settings.model}
        >
          <SelectTrigger
            aria-label="Model"
            className={cn("w-28 min-w-0 sm:w-36", QUIET)}
            size="sm"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end">
            {MODELS.map((model) => (
              <SelectItem key={model.value} value={model.value}>
                {model.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          aria-label="Search chats"
          className={cn("hidden lg:inline-flex", QUIET)}
          icon={<Search />}
          onClick={() => chat.setPaletteOpen(true)}
          size="sm"
          variant="ghost"
        >
          Search
          <KbdGroup className="ms-1">
            <Kbd size="sm">⌘</Kbd>
            <Kbd size="sm">K</Kbd>
          </KbdGroup>
        </Button>

        <SharePopover />

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                aria-label="More for this chat"
                icon={<MoreHorizontal />}
                size="sm"
                variant="ghost"
              />
            }
          />
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={onRename}>
              <Pencil />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => chat.togglePin(chat.active.id)}>
              <Pin />
              {chat.active.pinned ? "Unpin" : "Pin to top"}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                toast.success({
                  title: "Exported",
                  description: `${chat.active.title}.md`,
                })
              }
            >
              <Download />
              Export as Markdown
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => chat.remove(chat.active.id)}
              variant="destructive"
            >
              <Trash2 />
              Delete chat
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Tooltip>
          <TooltipTrigger
            render={
              <Toggle
                aria-label="Session panel"
                onPressedChange={(pressed) =>
                  panel.isMobile
                    ? panel.setOpenMobile(pressed)
                    : chat.setPanelOpen(pressed)
                }
                pressed={panel.isMobile ? panel.openMobile : chat.panelOpen}
                shape="rounded"
                size="sm"
              >
                <PanelRight />
              </Toggle>
            }
          />
          <TooltipContent>
            Session <Kbd size="sm">⌘.</Kbd>
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}

function SharePopover() {
  const { active } = useChat();
  const [anyone, setAnyone] = useState(false);
  const link = `https://still.app/c/${active.id}`;

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            className={cn("hidden sm:inline-flex", QUIET)}
            icon={<Share />}
            size="sm"
          >
            Share
          </Button>
        }
      />
      <PopoverContent align="end" className="grid w-80 gap-4">
        <PopoverHeader>
          <PopoverTitle>Share this chat</PopoverTitle>
          <PopoverDescription>
            Only the messages so far are shared; new ones stay private.
          </PopoverDescription>
        </PopoverHeader>
        <InputGroup size="sm">
          <InputGroupAddon>
            <Link2 />
          </InputGroupAddon>
          <InputGroupInput aria-label="Share link" readOnly value={link} />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              aria-label="Copy link"
              icon={<Copy />}
              onClick={() => {
                navigator.clipboard?.writeText(link);
                toast({ title: "Link copied" });
              }}
            />
          </InputGroupAddon>
        </InputGroup>
        <label className="flex items-center justify-between gap-3 text-sm">
          <span className="grid">
            <span className="font-medium text-foreground">
              Anyone with the link
            </span>
            <span className="text-muted-foreground text-xs">
              {anyone ? "Can view" : "Only people you invite"}
            </span>
          </span>
          <Switch checked={anyone} onCheckedChange={setAnyone} />
        </label>
        <div className="flex items-center gap-3">
          <AvatarGroup aria-label="Shared with Noor, Kenji and 2 others">
            <Avatar size="sm">
              <AvatarImage alt="" src={PEOPLE.noor} />
            </Avatar>
            <Avatar size="sm">
              <AvatarImage alt="" src={PEOPLE.kenji} />
            </Avatar>
            <AvatarGroupCount>+2</AvatarGroupCount>
          </AvatarGroup>
          <span className="text-muted-foreground text-xs">
            Shared with Noor, Kenji and 2 others
          </span>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// ---------------------------------------------------------------------------
// Command palette
// ---------------------------------------------------------------------------

interface PaletteItem {
  id: string;
  label: string;
  run: () => void;
  shortcut?: string;
}

interface PaletteGroup {
  items: PaletteItem[];
  value: string;
}

function Palette({ onShortcuts }: { onShortcuts: () => void }) {
  const chat = useChat();
  const close = () => chat.setPaletteOpen(false);

  const groups: PaletteGroup[] = [
    {
      value: "Actions",
      items: [
        { id: "new", label: "New chat", shortcut: "⌘J", run: chat.newChat },
        {
          id: "panel",
          label: chat.panelOpen ? "Hide session panel" : "Show session panel",
          shortcut: "⌘.",
          run: () => chat.setPanelOpen(!chat.panelOpen),
        },
        {
          id: "shortcuts",
          label: "Keyboard shortcuts",
          shortcut: "?",
          run: onShortcuts,
        },
      ],
    },
    {
      value: "Chats",
      items: chat.conversations.map((c) => ({
        id: c.id,
        label: c.title,
        run: () => chat.open(c.id),
      })),
    },
  ];

  return (
    <CommandDialog onOpenChange={chat.setPaletteOpen} open={chat.paletteOpen}>
      <Command items={groups}>
        <CommandInput
          aria-label="Search chats and actions"
          placeholder="Search chats and actions…"
        />
        <CommandEmpty>Nothing matches. Try fewer words.</CommandEmpty>
        <CommandList>
          {(group: PaletteGroup) => (
            <CommandGroup
              heading={group.value}
              items={group.items}
              key={group.value}
            >
              <CommandCollection>
                {(item: PaletteItem) => (
                  <CommandItem
                    key={item.id}
                    onClick={() => {
                      item.run();
                      close();
                    }}
                    value={item}
                  >
                    {group.value === "Chats" ? (
                      <MessageCircle />
                    ) : (
                      <SquarePen />
                    )}
                    {item.label}
                    {item.shortcut ? (
                      <CommandShortcut>{item.shortcut}</CommandShortcut>
                    ) : null}
                  </CommandItem>
                )}
              </CommandCollection>
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}

// ---------------------------------------------------------------------------
// Shortcuts
// ---------------------------------------------------------------------------

const SHORTCUTS: { keys: string[]; label: string }[] = [
  { keys: ["⌘", "K"], label: "Search chats and actions" },
  { keys: ["⌘", "J"], label: "New chat" },
  { keys: ["⌘", "B"], label: "Show or hide chats" },
  { keys: ["⌘", "."], label: "Show or hide the session panel" },
  { keys: ["↵"], label: "Send message" },
  { keys: ["⇧", "↵"], label: "New line" },
  { keys: ["Esc"], label: "Stop the reply" },
  { keys: ["1", "–", "4"], label: "Pick a check-in answer" },
];

function Shortcuts({
  onOpenChange,
  open,
}: {
  onOpenChange: (open: boolean) => void;
  open: boolean;
}) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>Keyboard shortcuts</DialogTitle>
          <DialogDescription>Fewer clicks, more calm.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <dl className="grid gap-3">
            {SHORTCUTS.map((shortcut) => (
              <div
                className="flex items-center justify-between gap-4 text-sm"
                key={shortcut.label}
              >
                <dt className="text-foreground">{shortcut.label}</dt>
                <dd>
                  <KbdGroup>
                    {shortcut.keys.map((key) => (
                      <Kbd key={key}>{key}</Kbd>
                    ))}
                  </KbdGroup>
                </dd>
              </div>
            ))}
          </dl>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
