"use client";

import { Avatar, AvatarImage } from "@neomorphic-react/ui/avatar";
import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@neomorphic-react/ui/empty";
import { ScrollArea } from "@neomorphic-react/ui/scroll-area";
import { Sidebar } from "@neomorphic-react/ui/sidebar";
import { Surface } from "@neomorphic-react/ui/surface";
import { Tabs, TabsList, TabsTrigger } from "@neomorphic-react/ui/tabs";
import { toast } from "@neomorphic-react/ui/toast";
import { Toggle } from "@neomorphic-react/ui/toggle";
import { cn } from "@neomorphic-react/ui/utils";
import { Bookmark, ListMusic, X } from "lucide-react";
import { useEffect, useState } from "react";

import { clock, getEpisode, getShow } from "@/lib/podcasts";

import { Cover, Equalizer, PlayFab } from "./bits";
import { type Panel, usePlayer } from "./player-context";

const TITLES: Record<Exclude<Panel, null>, string> = {
  now: "Now playing",
  queue: "Queue",
  chapters: "Chapters",
};

export function SidePanel() {
  const { panel, setPanel } = usePlayer();
  // Keep the last tab on screen while the panel slides away.
  const [shown, setShown] = useState<Exclude<Panel, null>>(panel ?? "now");
  useEffect(() => {
    if (panel) {
      setShown(panel);
    }
  }, [panel]);
  const tab = panel ?? shown;

  return (
    <Sidebar
      className="bottom-(--player-h)! h-auto!"
      collapsible="offcanvas"
      side="right"
      variant="floating"
    >
      <aside
        aria-label={TITLES[tab]}
        className="flex min-h-0 flex-1 flex-col gap-3 py-3"
        inert={!panel}
      >
        <div className="flex items-center gap-1 px-3">
          <Tabs
            className="min-w-0 flex-1"
            onValueChange={(value) => setPanel(value as Panel)}
            value={tab}
          >
            <TabsList className="w-full min-w-0">
              {(Object.keys(TITLES) as Exclude<Panel, null>[]).map((key) => (
                <TabsTrigger
                  className="min-w-0 flex-1 px-2 text-xs"
                  key={key}
                  value={key}
                >
                  {TITLES[key]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <Button
            aria-label="Close panel"
            icon={<X />}
            onClick={() => setPanel(null)}
            size="sm"
            variant="ghost"
          />
        </div>
        <ScrollArea className="min-h-0 flex-1" fade>
          <div className="grid grid-cols-1 gap-4 px-4 pt-1 pb-4">
            {tab === "now" ? <NowPlaying /> : null}
            {tab === "queue" ? <Queue /> : null}
            {tab === "chapters" ? <Chapters /> : null}
          </div>
        </ScrollArea>
      </aside>
    </Sidebar>
  );
}

function NowPlaying() {
  const player = usePlayer();
  const { episode, show } = player;
  const following = player.followed.includes(show.id);
  const saved = player.saved.includes(episode.id);
  const upNext = player.queue[0] ? getEpisode(player.queue[0]) : null;

  return (
    <>
      <Surface className="p-2" elevation="inset">
        <Cover className="w-full" eager sizes="300px" src={show.cover} />
      </Surface>
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-bold text-foreground text-xl leading-tight">
            {episode.title}
          </p>
          <button
            className="text-muted-foreground text-sm hover:text-foreground hover:underline"
            onClick={() => player.navigate({ kind: "show", id: show.id })}
            type="button"
          >
            {show.title}
          </button>
        </div>
        <Toggle
          aria-label="Save to Your Episodes"
          iconFill
          onPressedChange={() => player.toggleSaved(episode.id)}
          pressed={saved}
          size="sm"
        >
          <Bookmark />
        </Toggle>
      </div>

      <Card size="sm">
        <CardHeader>
          <CardTitle>About the episode</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {episode.description}
          </p>
          <p className="text-muted-foreground text-xs">
            {episode.date} · {episode.chapters.length} chapters
          </p>
        </CardContent>
      </Card>

      <Card size="sm">
        <CardHeader>
          <CardTitle>Next in queue</CardTitle>
          <CardAction>
            <Button
              className="normal-case tracking-normal"
              onClick={() => player.setPanel("queue")}
              size="sm"
              variant="ghost"
            >
              Open queue
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          {upNext ? (
            <QueueRow id={upNext.id} />
          ) : (
            <p className="text-muted-foreground text-sm">
              Nothing queued. Add episodes from any show.
            </p>
          )}
        </CardContent>
      </Card>

      <Card size="sm">
        <CardHeader>
          <CardTitle>About the host</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarImage alt="" src={show.host.avatar} />
            </Avatar>
            <div className="min-w-0">
              <p className="font-semibold text-foreground">{show.host.name}</p>
              <p className="text-muted-foreground text-sm">
                Host of {show.title}
              </p>
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {show.host.bio}
          </p>
          <Toggle
            className="justify-self-start px-4 text-sm normal-case tracking-normal"
            onPressedChange={() => {
              player.toggleFollow(show.id);
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
        </CardContent>
      </Card>
    </>
  );
}

function QueueRow({
  id,
  removable = false,
}: {
  id: string;
  removable?: boolean;
}) {
  const player = usePlayer();
  const episode = getEpisode(id);
  const show = getShow(episode.showId);

  return (
    <div className="group/row flex items-center gap-3">
      <span className="relative">
        <Cover className="size-12" sizes="48px" src={show.cover} />
        <PlayFab
          className="absolute inset-0 m-auto size-8 opacity-0 transition-opacity focus-visible:opacity-100 group-hover/row:opacity-100"
          episodeId={id}
          label={episode.title}
          size="sm"
        />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-foreground text-sm">
          {episode.title}
        </p>
        <p className="truncate text-muted-foreground text-xs">{show.title}</p>
      </div>
      {removable ? (
        <Button
          aria-label={`Remove ${episode.title} from queue`}
          icon={<X />}
          onClick={() => player.dequeue(id)}
          size="sm"
          variant="ghost"
        />
      ) : null}
    </div>
  );
}

function Queue() {
  const player = usePlayer();

  return (
    <>
      <section aria-labelledby="queue-now" className="grid grid-cols-1 gap-3">
        <h3 className="font-bold text-foreground" id="queue-now">
          Now playing
        </h3>
        <div className="flex items-center gap-3">
          <Cover className="size-12" sizes="48px" src={player.show.cover} />
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-primary text-sm">
              {player.episode.title}
            </p>
            <p className="truncate text-muted-foreground text-xs">
              {player.show.title}
            </p>
          </div>
          {player.playing ? <Equalizer /> : null}
        </div>
      </section>

      <section aria-labelledby="queue-next" className="grid grid-cols-1 gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-foreground" id="queue-next">
            Next up
          </h3>
          {player.queue.length > 0 ? (
            <Button
              className="normal-case tracking-normal"
              onClick={player.clearQueue}
              size="sm"
              variant="ghost"
            >
              Clear queue
            </Button>
          ) : null}
        </div>
        {player.queue.length === 0 ? (
          <Empty variant="inset">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ListMusic />
              </EmptyMedia>
              <EmptyTitle>Your queue is empty</EmptyTitle>
              <EmptyDescription>
                Use “Add to queue” on any episode.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ol className="grid grid-cols-1 gap-3">
            {player.queue.map((id) => (
              <li key={id}>
                <QueueRow id={id} removable />
              </li>
            ))}
          </ol>
        )}
      </section>
    </>
  );
}

function Chapters() {
  const { episode, playing, position, seek } = usePlayer();
  const active = episode.chapters.findLastIndex(
    (chapter) => chapter.start <= position
  );

  return (
    <ol className="grid gap-1">
      {episode.chapters.map((chapter, index) => (
        <li key={chapter.start}>
          <button
            aria-current={index === active ? "true" : undefined}
            className={cn(
              "flex w-full items-center gap-3 rounded-[var(--radius)] p-3 text-start transition-colors hover:bg-muted/70",
              index === active && "bg-muted"
            )}
            onClick={() => seek(chapter.start)}
            type="button"
          >
            <span className="w-14 shrink-0 font-mono text-muted-foreground text-xs tabular-nums">
              {clock(chapter.start)}
            </span>
            <span
              className={cn(
                "flex-1 font-medium text-sm",
                index === active ? "text-primary" : "text-foreground"
              )}
            >
              {chapter.title}
            </span>
            {index === active && playing ? <Equalizer /> : null}
          </button>
        </li>
      ))}
    </ol>
  );
}
