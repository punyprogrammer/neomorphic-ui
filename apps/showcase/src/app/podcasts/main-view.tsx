"use client";

import { Avatar, AvatarImage } from "@neomorphic-react/ui/avatar";
import { Badge, BadgeAnchor } from "@neomorphic-react/ui/badge";
import { Button } from "@neomorphic-react/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@neomorphic-react/ui/carousel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@neomorphic-react/ui/dropdown-menu";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@neomorphic-react/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@neomorphic-react/ui/input-group";
import { Kbd, KbdGroup } from "@neomorphic-react/ui/kbd";
import { Progress } from "@neomorphic-react/ui/progress";
import { ScrollArea } from "@neomorphic-react/ui/scroll-area";
import { Surface } from "@neomorphic-react/ui/surface";
import { toast } from "@neomorphic-react/ui/toast";
import { Toggle } from "@neomorphic-react/ui/toggle";
import { cn } from "@neomorphic-react/ui/utils";
import {
  Bell,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  House,
  LibraryBig,
  Search,
  X,
} from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";

import { PEOPLE } from "@/lib/photos";
import {
  EPISODES,
  episodesOf,
  getShow,
  length,
  SHOWS,
  type Show,
} from "@/lib/podcasts";

import { Cover, Equalizer, PlayFab } from "./bits";
import { useInProgress, usePlayer } from "./player-context";
import { EpisodeRow, SavedView, ShowView } from "./show-view";

export function MainView({ onOpenLibrary }: { onOpenLibrary?: () => void }) {
  const { view } = usePlayer();
  const scroller = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll to the top whenever the view changes
  useEffect(() => {
    scroller.current
      ?.querySelector("[data-slot='scroll-area-viewport']")
      ?.scrollTo({ top: 0 });
  }, [view]);

  return (
    <Surface
      className="relative flex h-full min-w-0 flex-col overflow-hidden"
      ref={scroller}
      render={<section aria-label="Main" />}
    >
      <TopBar onOpenLibrary={onOpenLibrary} />
      <ScrollArea className="min-h-0 flex-1">
        <div className="@container">
          {view.kind === "home" ? <HomeView /> : null}
          {view.kind === "search" ? <SearchView /> : null}
          {view.kind === "saved" ? <SavedView /> : null}
          {view.kind === "show" ? <ShowView id={view.id} /> : null}
        </div>
      </ScrollArea>
    </Surface>
  );
}

function TopBar({ onOpenLibrary }: { onOpenLibrary?: () => void }) {
  const player = usePlayer();
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        input.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex items-center gap-3 border-border border-b px-4 py-3">
      <div className="flex gap-2">
        {onOpenLibrary ? (
          <Button
            aria-label="Open Your Library"
            icon={<LibraryBig />}
            onClick={onOpenLibrary}
            size="sm"
            variant="ghost"
          />
        ) : null}
        <Button
          aria-label="Go back"
          disabled={!player.canBack}
          icon={<ChevronLeft />}
          onClick={player.back}
          shape="pill"
          size="sm"
        />
        <Button
          aria-label="Go forward"
          disabled={!player.canForward}
          icon={<ChevronRight />}
          onClick={player.forward}
          shape="pill"
          size="sm"
        />
      </div>

      <div className="mx-auto flex w-full max-w-md items-center gap-2">
        <Button
          aria-label="Home"
          icon={
            <House
              className={cn(player.view.kind === "home" && "fill-current")}
            />
          }
          onClick={() => player.navigate({ kind: "home" })}
          shape="pill"
        />
        <InputGroup className="flex-1">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            aria-label="Search podcasts and episodes"
            onChange={(event) => {
              player.setQuery(event.target.value);
              player.navigate({ kind: "search" });
            }}
            onFocus={() => player.navigate({ kind: "search" })}
            placeholder="What do you want to listen to?"
            ref={input}
            type="search"
            value={player.query}
          />
          <InputGroupAddon align="inline-end">
            {player.query ? (
              <InputGroupButton
                aria-label="Clear search"
                onClick={() => player.setQuery("")}
              >
                <X />
              </InputGroupButton>
            ) : (
              <KbdGroup className="hidden md:inline-flex">
                <Kbd aria-label="Command" size="sm">
                  ⌘
                </Kbd>
                <Kbd size="sm">K</Kbd>
              </KbdGroup>
            )}
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="flex items-center gap-2">
        <Button
          className="hidden normal-case tracking-normal lg:inline-flex"
          onClick={() =>
            toast({
              title: "Premium",
              description: "Ad-free listening is already on. Enjoy the quiet.",
            })
          }
          size="sm"
        >
          Explore Premium
        </Button>
        <BadgeAnchor>
          <Button
            aria-label="What's new, 3 updates"
            icon={<Bell />}
            onClick={() =>
              toast({
                title: "3 new episodes",
                description: "From shows you follow.",
              })
            }
            shape="pill"
            size="sm"
            variant="ghost"
          />
          <Badge dot placement="top-end" variant="primary" />
        </BadgeAnchor>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                aria-label="Account"
                className="rounded-full outline-offset-2 focus-visible:outline-2 focus-visible:outline-ring"
                type="button"
              />
            }
          >
            <Avatar size="sm">
              <AvatarImage alt="" src={PEOPLE.amardeep} />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Amardeep</DropdownMenuLabel>
              <DropdownMenuItem>Account</DropdownMenuItem>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => toast({ title: "You're still here. Good." })}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

type Shelf = "all" | "podcasts" | "audiobooks";

function HomeView() {
  const player = usePlayer();
  const [shelf, setShelf] = useState<Shelf>("all");
  const followed = player.followed.map(getShow);
  const discover = SHOWS.filter((show) => !player.followed.includes(show.id));
  const fresh = EPISODES.filter((episode) => episode.date === "Oct 15").concat(
    EPISODES.filter((episode) => episode.date === "Oct 14")
  );

  return (
    <div
      className="grid grid-cols-1 gap-10 px-6 pt-5 pb-10"
      style={{
        backgroundImage: `linear-gradient(to bottom, oklch(0.9 0.04 ${player.show.hue}), transparent 18rem)`,
      }}
    >
      <div className="flex gap-2">
        {(["all", "podcasts", "audiobooks"] as const).map((key) => (
          <Toggle
            className="rounded-full px-4 text-sm capitalize"
            key={key}
            onPressedChange={() => setShelf(key)}
            pressed={shelf === key}
            size="sm"
          >
            {key}
          </Toggle>
        ))}
      </div>

      {shelf === "audiobooks" ? (
        <Empty variant="inset">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <BookOpen />
            </EmptyMedia>
            <EmptyTitle>Audiobooks are coming</EmptyTitle>
            <EmptyDescription>
              Long reads, narrated slowly. For now, there is plenty to hear in
              Podcasts.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <>
          <section
            aria-labelledby="greeting"
            className="grid grid-cols-1 gap-4"
          >
            <h2 className="font-bold text-3xl text-foreground" id="greeting">
              Welcome back, Amardeep
            </h2>
            <ul className="grid grid-cols-1 gap-3 @lg:grid-cols-2 @5xl:grid-cols-4">
              {followed.map((show) => (
                <li key={show.id}>
                  <QuickTile show={show} />
                </li>
              ))}
            </ul>
          </section>

          <ContinueListening />

          <Shelf id="your-shows" title="Your shows">
            <ul className="grid grid-cols-2 gap-5 @2xl:grid-cols-3 @4xl:grid-cols-4 @6xl:grid-cols-5">
              {followed.slice(0, 5).map((show) => (
                <li key={show.id}>
                  <ShowCard show={show} />
                </li>
              ))}
            </ul>
          </Shelf>

          <Shelf id="new-for-you" title="New episodes for you">
            <ul className="grid grid-cols-1">
              {fresh.map((episode) => (
                <li key={episode.id}>
                  <EpisodeRow episode={episode} showName />
                </li>
              ))}
            </ul>
          </Shelf>

          {shelf === "all" ? (
            <Shelf id="discover" title="Shows you might like">
              <ul className="grid grid-cols-2 gap-5 @2xl:grid-cols-3 @4xl:grid-cols-4 @6xl:grid-cols-5">
                {discover.map((show) => (
                  <li key={show.id}>
                    <ShowCard show={show} />
                  </li>
                ))}
              </ul>
            </Shelf>
          ) : null}
        </>
      )}
    </div>
  );
}

function Shelf({
  action,
  children,
  id,
  title,
}: {
  action?: ReactNode;
  children: ReactNode;
  id: string;
  title: string;
}) {
  return (
    <section aria-labelledby={id} className="grid grid-cols-1 gap-4">
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-bold text-2xl text-foreground" id={id}>
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

/** The greeting grid's compact tile: cover, title, a play button on hover. */
function QuickTile({ show }: { show: Show }) {
  const player = usePlayer();
  const latest = episodesOf(show.id)[0];
  const playingShow = player.show.id === show.id;

  return (
    <Surface
      className="group relative flex items-center gap-3 overflow-hidden pe-3 transition-transform hover:-translate-y-0.5"
      depth="sm"
    >
      <Cover className="size-14 rounded-none" sizes="56px" src={show.cover} />
      <button
        className="min-w-0 flex-1 truncate text-start font-semibold text-foreground text-sm after:absolute after:inset-0 focus-visible:outline-none"
        onClick={() => player.navigate({ kind: "show", id: show.id })}
        type="button"
      >
        {show.title}
      </button>
      {playingShow && player.playing ? (
        <Equalizer className="group-hover:hidden" />
      ) : null}
      <PlayFab
        className={cn(
          "relative z-10 size-9 opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100",
          playingShow && player.playing && "hidden group-hover:inline-flex"
        )}
        episodeId={playingShow ? player.current : latest.id}
        label={show.title}
        size="sm"
      />
    </Surface>
  );
}

/** A square-cover card with the round play button rising on hover. */
function ShowCard({ show }: { show: Show }) {
  const player = usePlayer();
  const latest = episodesOf(show.id)[0];

  return (
    <Surface className="group relative grid gap-3 p-3" depth="sm">
      <div className="relative">
        <Cover
          className="w-full"
          sizes="(min-width: 1536px) 15vw, 30vw"
          src={show.cover}
        />
        <PlayFab
          className="absolute end-2 bottom-2 z-10 size-12 translate-y-2 opacity-0 shadow-lg transition-all focus-visible:translate-y-0 focus-visible:opacity-100 group-hover:translate-y-0 group-hover:opacity-100"
          episodeId={latest.id}
          label={show.title}
        />
      </div>
      <button
        className="grid gap-0.5 text-start after:absolute after:inset-0 focus-visible:outline-none"
        onClick={() => player.navigate({ kind: "show", id: show.id })}
        type="button"
      >
        <span className="truncate font-semibold text-foreground">
          {show.title}
        </span>
        <span className="truncate text-muted-foreground text-sm">
          {show.publisher}
        </span>
      </button>
    </Surface>
  );
}

function ContinueListening() {
  const player = usePlayer();
  const episodes = useInProgress();
  const [api, setApi] = useState<CarouselApi>();
  const [edges, setEdges] = useState({ prev: false, next: false });

  useEffect(() => {
    if (!api) {
      return;
    }
    const sync = () =>
      setEdges({ prev: api.canScrollPrev(), next: api.canScrollNext() });
    sync();
    api.on("select", sync).on("reInit", sync);
    return () => {
      api.off("select", sync).off("reInit", sync);
    };
  }, [api]);

  if (episodes.length === 0) {
    return null;
  }

  return (
    <Shelf
      action={
        <div className="flex gap-2">
          <Button
            aria-label="Previous episodes"
            disabled={!edges.prev}
            icon={<ChevronLeft />}
            onClick={() => api?.scrollPrev()}
            size="sm"
          />
          <Button
            aria-label="Next episodes"
            disabled={!edges.next}
            icon={<ChevronRight />}
            onClick={() => api?.scrollNext()}
            size="sm"
          />
        </div>
      }
      id="continue"
      title="Continue listening"
    >
      <Carousel
        aria-label="Continue listening"
        gap="1.25rem"
        opts={{ align: "start" }}
        setApi={setApi}
      >
        <CarouselContent>
          {episodes.map((episode) => {
            const show = getShow(episode.showId);
            const heard = player.heard[episode.id];
            return (
              <CarouselItem
                className="basis-[85%] @xl:basis-1/2 @5xl:basis-1/3"
                key={episode.id}
              >
                <Surface className="flex h-full gap-4 p-3" depth="sm">
                  <Cover className="size-24" sizes="96px" src={show.cover} />
                  <div className="grid min-w-0 flex-1 content-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-foreground">
                        {episode.title}
                      </p>
                      <p className="truncate text-muted-foreground text-sm">
                        {show.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <PlayFab
                        className="size-9"
                        episodeId={episode.id}
                        label={episode.title}
                        size="sm"
                      />
                      <div className="grid min-w-0 flex-1 gap-1">
                        <Progress
                          aria-label={`${episode.title} progress`}
                          size="sm"
                          value={(heard / episode.duration) * 100}
                        />
                        <span className="text-muted-foreground text-xs">
                          {length(episode.duration - heard)} left
                        </span>
                      </div>
                    </div>
                  </div>
                </Surface>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </Shelf>
  );
}

const CATEGORY_HUE: Record<string, number> = {};
for (const show of SHOWS) {
  CATEGORY_HUE[show.category] ??= show.hue;
}

function SearchView() {
  const player = usePlayer();
  const needle = player.query.trim().toLowerCase();

  if (!needle) {
    const categories = Object.keys(CATEGORY_HUE);
    return (
      <div className="grid grid-cols-1 gap-4 px-6 pt-5 pb-10">
        <h2 className="font-bold text-2xl text-foreground">Browse all</h2>
        <ul className="grid grid-cols-2 gap-4 @2xl:grid-cols-3 @5xl:grid-cols-4">
          {categories.map((category) => {
            const show = SHOWS.find((s) => s.category === category) as Show;
            const hue = CATEGORY_HUE[category];
            return (
              <li key={category}>
                <button
                  className="relative block aspect-[16/10] w-full overflow-hidden rounded-[var(--radius)] p-4 text-start shadow-[0_10px_24px_-14px_oklch(0.3_0.04_200/0.5)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-ring"
                  onClick={() => player.setQuery(category)}
                  style={{ backgroundColor: `oklch(0.84 0.07 ${hue})` }}
                  type="button"
                >
                  <span className="relative z-10 font-bold text-[oklch(0.25_0.03_200)] text-xl">
                    {category}
                  </span>
                  <Cover
                    className="absolute -end-4 -bottom-2 size-24 rotate-[25deg] shadow-lg"
                    sizes="96px"
                    src={show.cover}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  const shows = SHOWS.filter((show) =>
    `${show.title} ${show.publisher} ${show.category}`
      .toLowerCase()
      .includes(needle)
  );
  const episodes = EPISODES.filter((episode) =>
    `${episode.title} ${episode.description} ${getShow(episode.showId).category}`
      .toLowerCase()
      .includes(needle)
  ).slice(0, 6);
  const top = shows[0];

  if (shows.length === 0 && episodes.length === 0) {
    return (
      <div className="px-6 pt-10">
        <Empty variant="inset">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Search />
            </EmptyMedia>
            <EmptyTitle>No results for “{player.query}”</EmptyTitle>
            <EmptyDescription>
              Check the spelling, or try a mood like “calm” or “ocean”.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-10 px-6 pt-5 pb-10">
      {top ? (
        <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-[22rem_minmax(0,1fr)]">
          <Shelf id="top-result" title="Top result">
            <Surface className="group relative grid gap-4 p-5" depth="sm">
              <Cover className="size-24" sizes="96px" src={top.cover} />
              <button
                className="grid gap-1 text-start after:absolute after:inset-0 focus-visible:outline-none"
                onClick={() => player.navigate({ kind: "show", id: top.id })}
                type="button"
              >
                <span className="font-bold text-3xl text-foreground">
                  {top.title}
                </span>
                <span className="text-muted-foreground text-sm">
                  Podcast · {top.publisher}
                </span>
              </button>
              <PlayFab
                className="absolute end-5 bottom-5 z-10 size-12 opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
                episodeId={episodesOf(top.id)[0].id}
                label={top.title}
              />
            </Surface>
          </Shelf>
          {episodes.length > 0 ? (
            <Shelf id="episode-results" title="Episodes">
              <ul className="grid grid-cols-1">
                {episodes.slice(0, 3).map((episode) => (
                  <li key={episode.id}>
                    <EpisodeRow episode={episode} showName />
                  </li>
                ))}
              </ul>
            </Shelf>
          ) : null}
        </div>
      ) : (
        <Shelf id="episode-results" title="Episodes">
          <ul className="grid grid-cols-1">
            {episodes.map((episode) => (
              <li key={episode.id}>
                <EpisodeRow episode={episode} showName />
              </li>
            ))}
          </ul>
        </Shelf>
      )}

      {shows.length > 1 ? (
        <Shelf id="show-results" title="Podcasts">
          <ul className="grid grid-cols-2 gap-5 @2xl:grid-cols-3 @4xl:grid-cols-4 @6xl:grid-cols-5">
            {shows.slice(1).map((show) => (
              <li key={show.id}>
                <ShowCard show={show} />
              </li>
            ))}
          </ul>
        </Shelf>
      ) : null}
    </div>
  );
}
