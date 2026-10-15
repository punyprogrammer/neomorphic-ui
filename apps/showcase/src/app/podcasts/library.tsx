"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@neomorphic-react/ui/context-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@neomorphic-react/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@neomorphic-react/ui/input-group";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@neomorphic-react/ui/sidebar";
import { toast } from "@neomorphic-react/ui/toast";
import { Toggle } from "@neomorphic-react/ui/toggle";
import { cn } from "@neomorphic-react/ui/utils";
import {
  Bookmark,
  Folder,
  LibraryBig,
  ListMusic,
  Pin,
  Plus,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";

import { episodesOf, getShow, type Show } from "@/lib/podcasts";

import { Cover, Equalizer } from "./bits";
import { usePlayer, type View } from "./player-context";

type Filter = "pinned" | "in-progress" | null;
type Sort = "recent" | "alpha" | "publisher";

const FILTERS: { id: Exclude<Filter, null>; label: string }[] = [
  { id: "pinned", label: "Pinned" },
  { id: "in-progress", label: "In progress" },
];

const SORT_LABEL: Record<Sort, string> = {
  recent: "Recents",
  alpha: "Alphabetical",
  publisher: "Publisher",
};

/** Hidden while the sidebar is collapsed to covers. */
const EXPANDED_ONLY = "group-data-[collapsible=icon]:hidden";

// Library rows hold a 48px cover; collapsed, the button shrinks to the cover.
const ROW =
  "h-auto gap-3 p-1.5 group-data-[collapsible=icon]:size-12! group-data-[collapsible=icon]:p-0!";

export function Library() {
  const player = usePlayer();
  const { isMobile, setOpenMobile, state, toggleSidebar } = useSidebar();
  const [filter, setFilter] = useState<Filter>(null);
  const [sort, setSort] = useState<Sort>("recent");
  const [search, setSearch] = useState<string | null>(null);

  const go = (view: View) => {
    player.navigate(view);
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const needle = search?.trim().toLowerCase() ?? "";
  const shows = player.followed
    .map(getShow)
    .filter((show) => {
      if (filter === "pinned" && !player.pinned.includes(show.id)) {
        return false;
      }
      if (
        filter === "in-progress" &&
        !episodesOf(show.id).some(
          (e) => player.heard[e.id] > 0 && player.heard[e.id] < e.duration
        )
      ) {
        return false;
      }
      return (
        !needle ||
        `${show.title} ${show.publisher}`.toLowerCase().includes(needle)
      );
    })
    .sort((a, b) => {
      const pin =
        Number(player.pinned.includes(b.id)) -
        Number(player.pinned.includes(a.id));
      if (pin !== 0) {
        return pin;
      }
      if (sort === "alpha") {
        return a.title.localeCompare(b.title);
      }
      if (sort === "publisher") {
        return a.publisher.localeCompare(b.publisher);
      }
      return 0;
    });

  return (
    <Sidebar
      className="bottom-(--player-h)! h-auto!"
      collapsible="icon"
      variant="floating"
    >
      <nav aria-label="Your Library" className="flex min-h-0 flex-1 flex-col">
        <SidebarHeader className="gap-3">
          <div className="flex items-center gap-2">
            <Button
              aria-expanded={state === "expanded"}
              aria-label="Collapse Your Library"
              className={cn(
                "min-w-0 flex-1 justify-start normal-case tracking-normal",
                EXPANDED_ONLY
              )}
              icon={<LibraryBig />}
              onClick={toggleSidebar}
              variant="ghost"
            >
              <span className="truncate font-bold text-base">Your Library</span>
            </Button>
            <Button
              aria-expanded={false}
              aria-label="Expand Your Library"
              className="mx-auto hidden group-data-[collapsible=icon]:inline-flex"
              icon={<LibraryBig />}
              onClick={toggleSidebar}
              variant="ghost"
            />
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    aria-label="Create playlist or folder"
                    className={EXPANDED_ONLY}
                    icon={<Plus />}
                    size="sm"
                  />
                }
              />
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => toast({ title: "New playlist created" })}
                >
                  <ListMusic />
                  Playlist
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => toast({ title: "New folder created" })}
                >
                  <Folder />
                  Folder
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div
            className={cn("flex flex-wrap items-center gap-2", EXPANDED_ONLY)}
          >
            {filter ? (
              <Button
                aria-label="Clear filter"
                icon={<X />}
                onClick={() => setFilter(null)}
                size="sm"
              />
            ) : null}
            {FILTERS.filter((f) => !filter || f.id === filter).map((f) => (
              <Toggle
                className="rounded-full px-3 text-xs normal-case tracking-normal"
                key={f.id}
                onPressedChange={(pressed) => setFilter(pressed ? f.id : null)}
                pressed={filter === f.id}
                size="sm"
              >
                {f.label}
              </Toggle>
            ))}
          </div>

          <div
            className={cn(
              "flex items-center justify-between gap-2",
              EXPANDED_ONLY
            )}
          >
            {search === null ? (
              <Button
                aria-label="Search in Your Library"
                icon={<Search />}
                onClick={() => setSearch("")}
                size="sm"
                variant="ghost"
              />
            ) : (
              <InputGroup className="h-9 max-w-44">
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
                <InputGroupInput
                  aria-label="Search in Your Library"
                  autoFocus
                  onBlur={() => !search && setSearch(null)}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search in Your Library"
                  value={search}
                />
              </InputGroup>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    className="normal-case tracking-normal"
                    size="sm"
                    variant="ghost"
                  >
                    {SORT_LABEL[sort]}
                  </Button>
                }
              />
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup
                  onValueChange={(value) => setSort(value as Sort)}
                  value={sort}
                >
                  <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                  {(Object.keys(SORT_LABEL) as Sort[]).map((key) => (
                    <DropdownMenuRadioItem key={key} value={key}>
                      {SORT_LABEL[key]}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup className="pt-1">
            <SidebarMenu className="gap-2">
              {!filter && !needle ? (
                <SidebarMenuItem>
                  <SavedRow onSelect={() => go({ kind: "saved" })} />
                </SidebarMenuItem>
              ) : null}
              {shows.map((show) => (
                <SidebarMenuItem key={show.id}>
                  <LibraryRow
                    onSelect={() => go({ kind: "show", id: show.id })}
                    show={show}
                  />
                </SidebarMenuItem>
              ))}
              {shows.length === 0 ? (
                <li
                  className={cn(
                    "px-3 py-6 text-center text-muted-foreground text-sm",
                    EXPANDED_ONLY
                  )}
                >
                  Nothing here. Try another filter.
                </li>
              ) : null}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </nav>
    </Sidebar>
  );
}

function SavedRow({ onSelect }: { onSelect: () => void }) {
  const { saved, view } = usePlayer();

  return (
    <SidebarMenuButton
      className={ROW}
      isActive={view.kind === "saved"}
      onClick={onSelect}
      size="lg"
      tooltip="Your Episodes"
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-[calc(var(--radius)*0.6)] bg-linear-to-br from-[oklch(0.62_0.12_160)] to-[oklch(0.45_0.11_175)] text-white">
        <Bookmark className="size-5! fill-current" />
      </span>
      <span className="grid min-w-0 flex-1">
        <span className="truncate font-medium text-base text-foreground">
          Your Episodes
        </span>
        <span className="flex items-center gap-1 truncate text-muted-foreground text-sm">
          <Pin
            aria-label="Pinned"
            className="size-3! fill-primary text-primary"
          />
          Saved · {saved.length} episodes
        </span>
      </span>
    </SidebarMenuButton>
  );
}

function LibraryRow({ onSelect, show }: { onSelect: () => void; show: Show }) {
  const player = usePlayer();
  const playingShow = player.show.id === show.id;
  const active = player.view.kind === "show" && player.view.id === show.id;
  const pinned = player.pinned.includes(show.id);
  const latest = episodesOf(show.id)[0];

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <SidebarMenuButton
          className={ROW}
          isActive={active}
          onClick={onSelect}
          size="lg"
          tooltip={`${show.title} · ${show.publisher}`}
        >
          <Cover className="size-12" sizes="48px" src={show.cover} />
          <span className="grid min-w-0 flex-1">
            <span
              className={cn(
                "truncate font-medium text-base",
                playingShow ? "text-primary" : "text-foreground"
              )}
            >
              {show.title}
            </span>
            <span className="flex items-center gap-1 truncate font-normal text-muted-foreground text-sm">
              {pinned ? (
                <Pin
                  aria-label="Pinned"
                  className="size-3! shrink-0 fill-primary text-primary"
                />
              ) : null}
              Podcast · {show.publisher}
            </span>
          </span>
          {playingShow && player.playing ? (
            <Equalizer className={cn("me-2", EXPANDED_ONLY)} />
          ) : null}
        </SidebarMenuButton>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => player.play(latest.id)}>
          Play latest episode
        </ContextMenuItem>
        <ContextMenuItem onClick={() => player.enqueue(latest.id)}>
          Add latest to queue
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => player.togglePin(show.id)}>
          {pinned ? "Unpin show" : "Pin show"}
        </ContextMenuItem>
        <ContextMenuItem onClick={onSelect}>Go to show</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          onClick={() => {
            player.toggleFollow(show.id);
            toast({ title: `Unfollowed ${show.title}` });
          }}
          variant="destructive"
        >
          Unfollow
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
