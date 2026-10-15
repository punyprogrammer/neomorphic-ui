"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { Chip } from "@neomorphic-react/ui/chip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
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
import { Progress } from "@neomorphic-react/ui/progress";
import { toast } from "@neomorphic-react/ui/toast";
import { Toggle } from "@neomorphic-react/ui/toggle";
import { cn } from "@neomorphic-react/ui/utils";
import {
  Bookmark,
  CircleCheck,
  Download,
  Ellipsis,
  ListEnd,
  Share2,
  Star,
} from "lucide-react";
import { type ReactNode, useState } from "react";

import {
  clock,
  type Episode,
  episodesOf,
  getEpisode,
  getShow,
  length,
} from "@/lib/podcasts";

import { Cover, Equalizer, PlayFab } from "./bits";
import { usePlayer } from "./player-context";

/** A hue-washed banner: cover on the left, eyebrow, huge title and byline. */
function Hero({
  byline,
  cover,
  eyebrow,
  hue,
  title,
}: {
  byline: ReactNode;
  cover: ReactNode;
  eyebrow: string;
  hue: number;
  title: string;
}) {
  return (
    <header
      className="flex flex-col gap-6 px-6 pt-16 pb-6 @lg:flex-row @lg:items-end"
      style={{
        backgroundImage: `linear-gradient(to bottom, oklch(0.86 0.06 ${hue}), oklch(0.92 0.03 ${hue}) 60%, transparent)`,
      }}
    >
      {cover}
      <div className="grid min-w-0 gap-2">
        <p className="font-medium text-foreground/80 text-sm">{eyebrow}</p>
        <h2 className="text-balance font-black text-5xl text-foreground tracking-tight @3xl:text-7xl">
          {title}
        </h2>
        <div className="font-semibold text-foreground text-lg">{byline}</div>
      </div>
    </header>
  );
}

export function ShowView({ id }: { id: string }) {
  const player = usePlayer();
  const show = getShow(id);
  const [order, setOrder] = useState<"newest" | "oldest">("newest");
  const episodes = episodesOf(id);
  const sorted = order === "newest" ? episodes : [...episodes].reverse();
  const following = player.followed.includes(id);

  return (
    <div className="grid grid-cols-1 gap-6 pb-10">
      <Hero
        byline={show.publisher}
        cover={
          <Cover
            className="size-48 shadow-[0_18px_40px_-12px_oklch(0.3_0.04_200/0.45)] @3xl:size-56"
            eager
            sizes="224px"
            src={show.cover}
          />
        }
        eyebrow="Podcast"
        hue={show.hue}
        title={show.title}
      />

      <div className="flex flex-wrap items-center gap-4 px-6">
        <PlayFab
          className="size-14"
          episodeId={episodes[0].id}
          label={`latest episode of ${show.title}`}
          size="lg"
        />
        <Toggle
          className="px-4 text-sm normal-case tracking-normal"
          onPressedChange={() => {
            player.toggleFollow(id);
            toast({
              title: following
                ? `Unfollowed ${show.title}`
                : `Following ${show.title}`,
            });
          }}
          pressed={following}
          size="sm"
        >
          {following ? "Following" : "Follow"}
        </Toggle>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                aria-label={`More options for ${show.title}`}
                icon={<Ellipsis />}
                variant="ghost"
              />
            }
          />
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => player.togglePin(id)}>
              {player.pinned.includes(id) ? "Unpin show" : "Pin show"}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                for (const episode of episodes) {
                  player.markPlayed(episode.id);
                }
                toast({ title: "All episodes marked as played" });
              }}
            >
              Mark all as played
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => toast({ title: "Link copied to clipboard" })}
            >
              <Share2 />
              Share
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Chip className="ms-auto" icon={<Star className="fill-current" />}>
          {show.rating} ({show.ratings})
        </Chip>
      </div>

      <div className="grid grid-cols-1 gap-8 px-6 @5xl:grid-cols-[minmax(0,1fr)_18rem]">
        <section
          aria-labelledby="all-episodes"
          className="grid grid-cols-1 gap-2"
        >
          <div className="flex items-center justify-between gap-4">
            <h2
              className="font-bold text-2xl text-foreground"
              id="all-episodes"
            >
              All episodes
            </h2>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    className="normal-case tracking-normal"
                    size="sm"
                    variant="ghost"
                  >
                    {order === "newest" ? "Newest first" : "Oldest first"}
                  </Button>
                }
              />
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup
                  onValueChange={(value) =>
                    setOrder(value as "newest" | "oldest")
                  }
                  value={order}
                >
                  <DropdownMenuRadioItem value="newest">
                    Newest first
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="oldest">
                    Oldest first
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ul className="grid grid-cols-1">
            {sorted.map((episode) => (
              <li key={episode.id}>
                <EpisodeRow episode={episode} />
              </li>
            ))}
          </ul>
        </section>

        <Card className="h-fit" render={<aside aria-labelledby="about" />}>
          <CardHeader>
            <CardTitle id="about">About</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <p className="text-muted-foreground text-sm leading-relaxed">
              {show.description}
            </p>
            <div className="flex flex-wrap gap-2">
              <Chip size="sm" variant="inset">
                {show.category}
              </Chip>
              <Chip size="sm" variant="inset">
                {episodes.length} episodes
              </Chip>
            </div>
            <div className="flex items-center gap-1 text-primary">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  aria-hidden="true"
                  className={cn(
                    "size-4",
                    n <= Math.round(show.rating) && "fill-current"
                  )}
                  key={n}
                />
              ))}
              <span className="ms-2 text-muted-foreground text-sm">
                {show.rating} from {show.ratings} ratings
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function SavedView() {
  const { saved } = usePlayer();
  const episodes = saved.map(getEpisode);

  return (
    <div className="grid grid-cols-1 gap-6 pb-10">
      <Hero
        byline={`Amardeep · ${episodes.length} episodes`}
        cover={
          <span className="grid size-48 shrink-0 place-items-center rounded-[calc(var(--radius)*0.6)] bg-linear-to-br from-[oklch(0.62_0.12_160)] to-[oklch(0.45_0.11_175)] text-white shadow-[0_18px_40px_-12px_oklch(0.3_0.04_200/0.45)] @3xl:size-56">
            <Bookmark className="size-20 fill-current" />
          </span>
        }
        eyebrow="Playlist"
        hue={160}
        title="Your Episodes"
      />
      <div className="px-6">
        {episodes.length === 0 ? (
          <Empty variant="inset">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Bookmark />
              </EmptyMedia>
              <EmptyTitle>Episodes you save show up here</EmptyTitle>
              <EmptyDescription>
                Tap the bookmark on any episode to keep it for later.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ul className="grid grid-cols-1">
            {episodes.map((episode) => (
              <li key={episode.id}>
                <EpisodeRow episode={episode} showName />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/** Spotify's episode row: cover, title, two-line blurb and an action strip. */
export function EpisodeRow({
  episode,
  showName = false,
}: {
  episode: Episode;
  showName?: boolean;
}) {
  const player = usePlayer();
  const show = getShow(episode.showId);
  const heard = player.heard[episode.id] ?? 0;
  const played = heard >= episode.duration;
  const started = heard > 0 && !played;
  const isCurrent = player.current === episode.id;
  const saved = player.saved.includes(episode.id);

  return (
    <article className="group flex gap-4 border-border border-b px-2 py-4 transition-colors last:border-b-0 hover:bg-muted/50 sm:rounded-[var(--radius)]">
      <button
        aria-label={`Open ${show.title}`}
        className="shrink-0 self-start rounded-[calc(var(--radius)*0.6)]"
        onClick={() => player.navigate({ kind: "show", id: show.id })}
        type="button"
      >
        <Cover className="size-20 sm:size-24" sizes="96px" src={show.cover} />
      </button>
      <div className="grid min-w-0 flex-1 gap-1.5">
        <h3
          className={cn(
            "flex items-center gap-2 truncate font-semibold",
            isCurrent ? "text-primary" : "text-foreground"
          )}
        >
          {isCurrent && player.playing ? <Equalizer /> : null}
          <span className="truncate">{episode.title}</span>
        </h3>
        {showName ? (
          <p className="truncate text-foreground/80 text-sm">{show.title}</p>
        ) : null}
        <p className="line-clamp-2 text-muted-foreground text-sm leading-relaxed">
          {episode.description}
        </p>
        <div className="mt-1 flex items-center gap-3">
          <PlayFab
            className="size-9"
            episodeId={episode.id}
            label={episode.title}
            size="sm"
          />
          <span className="text-muted-foreground text-sm">
            {episode.date} ·{" "}
            {started
              ? `${length(episode.duration - heard)} left`
              : length(episode.duration)}
          </span>
          {started ? (
            <Progress
              aria-label={`${clock(heard)} heard`}
              className="w-24"
              size="sm"
              value={(heard / episode.duration) * 100}
            />
          ) : null}
          {played ? (
            <span className="flex items-center gap-1 text-primary text-sm">
              <CircleCheck className="size-4" />
              Played
            </span>
          ) : null}
          <div className="ms-auto flex items-center gap-1 opacity-100 transition-opacity sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
            <Toggle
              aria-label="Save to Your Episodes"
              iconFill
              onPressedChange={() => {
                player.toggleSaved(episode.id);
                toast({
                  title: saved
                    ? "Removed from Your Episodes"
                    : "Saved to Your Episodes",
                });
              }}
              pressed={saved}
              size="sm"
            >
              <Bookmark />
            </Toggle>
            <Button
              aria-label="Download"
              icon={<Download />}
              onClick={() =>
                toast({
                  title: "Downloading",
                  description: `${episode.title} will be ready offline.`,
                })
              }
              size="sm"
              variant="ghost"
            />
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    aria-label={`More options for ${episode.title}`}
                    icon={<Ellipsis />}
                    size="sm"
                    variant="ghost"
                  />
                }
              />
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => player.enqueue(episode.id)}>
                  <ListEnd />
                  Add to queue
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => player.markPlayed(episode.id)}>
                  <CircleCheck />
                  Mark as played
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => player.navigate({ kind: "show", id: show.id })}
                >
                  Go to show
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => toast({ title: "Link copied to clipboard" })}
                >
                  <Share2 />
                  Share episode
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </article>
  );
}
