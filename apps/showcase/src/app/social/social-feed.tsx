"use client";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@neomorphic-react/ui/avatar";
import { Badge } from "@neomorphic-react/ui/badge";
import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@neomorphic-react/ui/card";
import { Chip } from "@neomorphic-react/ui/chip";
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
  InputGroupTextarea,
} from "@neomorphic-react/ui/input-group";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@neomorphic-react/ui/item";
import { Kbd, KbdGroup } from "@neomorphic-react/ui/kbd";
import { Surface } from "@neomorphic-react/ui/surface";
import { Tabs, TabsList, TabsTrigger } from "@neomorphic-react/ui/tabs";
import { toast } from "@neomorphic-react/ui/toast";
import { Toggle } from "@neomorphic-react/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@neomorphic-react/ui/tooltip";
import {
  Bell,
  Bookmark,
  Compass,
  Hash,
  Heart,
  House,
  ImageIcon,
  Mail,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Share,
  Smile,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { PEOPLE, type Photo, SCENES } from "@/lib/photos";

// Likes take a muted rose only once pressed; everything else stays neutral.
const LIKE = "[--toggle-on:oklch(0.55_0.17_10)]";

const STORIES = [
  { name: "You", avatar: PEOPLE.amardeep, seen: false },
  { name: "Noor", avatar: PEOPLE.noor, seen: false },
  { name: "Kenji", avatar: PEOPLE.kenji, seen: false },
  { name: "Lucía", avatar: PEOPLE.lucia, seen: true },
  { name: "Ola", avatar: PEOPLE.ola, seen: true },
  { name: "Theo", avatar: PEOPLE.theo, seen: true },
];

interface Post {
  author: string;
  avatar: string;
  body: string;
  comments: number;
  handle: string;
  id: string;
  likes: number;
  photo?: Photo;
  time: string;
}

const POSTS: Post[] = [
  {
    id: "p1",
    author: "Noor Haddad",
    handle: "@noorh",
    avatar: PEOPLE.noor,
    time: "12 min",
    body: "Walked the ridge trail before sunrise. The valley was still full of fog and the only sound was the wind. Highly recommend getting up early for this one.",
    photo: SCENES.ridgeSunrise,
    likes: 248,
    comments: 31,
  },
  {
    id: "p2",
    author: "Kenji Mori",
    handle: "@kenji.builds",
    avatar: PEOPLE.kenji,
    time: "1 h",
    body: "Shipped the new onboarding today. Fewer steps, softer colours, and every form field now explains itself when it's wrong. Small things add up.",
    likes: 112,
    comments: 9,
  },
  {
    id: "p3",
    author: "Lucía Ferrer",
    handle: "@luciaf",
    avatar: PEOPLE.lucia,
    time: "3 h",
    body: "Sunday market haul: peaches, grapes, a sourdough the size of my head, and far too many flowers.",
    photo: SCENES.marketBasket,
    likes: 532,
    comments: 47,
  },
];

const TRENDS = [
  "slowliving",
  "designsystems",
  "morningwalks",
  "filmphotography",
  "cityparks",
];

const SUGGESTED = [
  { name: "Ola Nordmann", handle: "@ola", avatar: PEOPLE.ola },
  { name: "Theo Laurent", handle: "@theo.l", avatar: PEOPLE.theo },
  { name: "Mira Patel", handle: "@mirap", avatar: PEOPLE.mira },
];

const NAV = [
  { label: "Home", icon: House, current: true },
  { label: "Explore", icon: Compass },
  { label: "Notifications", icon: Bell, count: 4 },
  { label: "Messages", icon: Mail, count: 2 },
  { label: "Bookmarks", icon: Bookmark },
];

export function SocialFeed() {
  const [draft, setDraft] = useState("");
  const [feed, setFeed] = useState("for-you");

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)_18rem]">
      {/* Profile and navigation */}
      <aside className="grid content-start gap-8">
        <Card size="sm">
          <CardContent className="grid justify-items-center gap-3 text-center">
            <Avatar size="xl">
              <AvatarImage alt="" src={PEOPLE.amardeep} />
              <AvatarFallback>AG</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">Amardeep G.</p>
              <p className="text-muted-foreground text-sm">
                @amardeep · online
              </p>
            </div>
            <dl className="grid w-full grid-cols-3 gap-2 text-sm">
              {[
                ["Posts", "128"],
                ["Followers", "2.4k"],
                ["Following", "318"],
              ].map(([label, value]) => (
                <div className="flex flex-col-reverse" key={label}>
                  <dt className="text-muted-foreground text-xs">{label}</dt>
                  <dd className="font-semibold text-foreground tabular-nums">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>

        <ItemGroup aria-label="Sections" className="gap-2">
          {NAV.map(({ label, icon: Icon, current, count }) => (
            <Item
              aria-current={current ? "page" : undefined}
              className="aria-[current=page]:inset-shadow-neu-sm aria-[current=page]:shadow-neu-flat aria-[current=page]:[&_svg]:text-primary"
              key={label}
              render={<button type="button" />}
              size="sm"
            >
              <ItemMedia>
                <Icon className="size-4.5" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{label}</ItemTitle>
              </ItemContent>
              {count ? (
                <ItemActions>
                  <Badge count={count} variant="primary" />
                </ItemActions>
              ) : null}
            </Item>
          ))}
        </ItemGroup>
      </aside>

      {/* Feed */}
      <section aria-label="Feed" className="grid content-start gap-8" id="feed">
        <div className="flex gap-5 overflow-x-auto px-2 pt-2 pb-4">
          {STORIES.map(({ name, avatar, seen }) => (
            <button
              className="group grid shrink-0 justify-items-center gap-2 rounded-xl text-xs focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-4"
              key={name}
              onClick={() => toast(`${name}'s story`)}
              type="button"
            >
              <Surface
                className={
                  seen
                    ? "p-1"
                    : "bg-[conic-gradient(from_200deg,oklch(0.75_0.1_285),oklch(0.8_0.09_20),oklch(0.75_0.1_285))] p-1"
                }
                shape="circle"
              >
                <Avatar className="ring-2 ring-background" size="lg">
                  <AvatarImage alt="" src={avatar} />
                </Avatar>
              </Surface>
              <span
                className={seen ? "text-muted-foreground" : "text-foreground"}
              >
                {name}
              </span>
            </button>
          ))}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (draft.trim()) {
              toast.success({ title: "Posted", description: draft.trim() });
              setDraft("");
            }
          }}
        >
          <InputGroup shape="pill">
            <InputGroupTextarea
              aria-label="What's on your mind?"
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                  event.currentTarget.form?.requestSubmit();
                }
              }}
              placeholder="What's on your mind?"
              rows={2}
              value={draft}
            />
            <InputGroupAddon align="block-end" className="justify-between">
              <div className="flex gap-1">
                <InputGroupButton aria-label="Add photo" icon={<ImageIcon />} />
                <InputGroupButton aria-label="Add emoji" icon={<Smile />} />
                <InputGroupButton aria-label="Add topic" icon={<Hash />} />
              </div>
              <div className="flex items-center gap-3">
                <KbdGroup className="hidden text-muted-foreground sm:flex">
                  <Kbd>⌘</Kbd>
                  <Kbd>↵</Kbd>
                </KbdGroup>
                <InputGroupButton
                  disabled={!draft.trim()}
                  type="submit"
                  variant="primary"
                >
                  Post
                </InputGroupButton>
              </div>
            </InputGroupAddon>
          </InputGroup>
        </form>

        <Tabs onValueChange={(value) => setFeed(value as string)} value={feed}>
          <TabsList aria-label="Feed" variant="line">
            <TabsTrigger value="for-you">For you</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
            <TabsTrigger value="nearby">Nearby</TabsTrigger>
          </TabsList>
        </Tabs>

        {POSTS.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>

      {/* Trends and suggestions */}
      <aside className="grid content-start gap-8">
        <Card size="sm">
          <CardHeader>
            <h2 className="font-semibold text-foreground">Trending today</h2>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            {TRENDS.map((tag) => (
              <Chip icon={<Hash />} key={tag} size="sm">
                {tag}
              </Chip>
            ))}
          </CardContent>
        </Card>

        <Card size="sm">
          <CardHeader>
            <h2 className="font-semibold text-foreground">Who to follow</h2>
          </CardHeader>
          <CardContent>
            <ItemGroup aria-label="Suggested accounts">
              {SUGGESTED.map((person) => (
                <Item className="px-0" key={person.handle} size="sm">
                  <ItemMedia>
                    <Avatar size="md">
                      <AvatarImage alt="" src={person.avatar} />
                    </Avatar>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{person.name}</ItemTitle>
                    <ItemDescription>{person.handle}</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <FollowToggle name={person.name} />
                  </ItemActions>
                </Item>
              ))}
            </ItemGroup>
          </CardContent>
          <CardFooter>
            <AvatarGroup aria-label="Followed by Noor, Kenji and 12 others">
              {[PEOPLE.noor, PEOPLE.kenji, PEOPLE.lucia].map((src) => (
                <Avatar key={src} size="sm">
                  <AvatarImage alt="" src={src} />
                </Avatar>
              ))}
            </AvatarGroup>
            <p className="text-muted-foreground text-xs">
              Followed by Noor, Kenji and 12 others
            </p>
          </CardFooter>
        </Card>
      </aside>
    </div>
  );
}

function FollowToggle({ name }: { name: string }) {
  const [following, setFollowing] = useState(false);
  return (
    <Toggle
      aria-label={`Follow ${name}`}
      onPressedChange={setFollowing}
      pressed={following}
      size="sm"
    >
      {following ? "Following" : "Follow"}
    </Toggle>
  );
}

const compact = new Intl.NumberFormat("en-US", { notation: "compact" });

function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false);
  const likes = post.likes + (liked ? 1 : 0);

  return (
    <Card render={<article aria-label={`Post by ${post.author}`} />}>
      <CardHeader className="flex items-center gap-3">
        <Avatar>
          <AvatarImage alt="" src={post.avatar} />
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-foreground">
            {post.author}
          </p>
          <p className="truncate text-muted-foreground text-sm">
            {post.handle} · {post.time}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                aria-label="Post options"
                icon={<MoreHorizontal />}
                size="sm"
                variant="ghost"
              />
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => toast("Saved to bookmarks")}>
              <Bookmark />
              Save post
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast(`Muted ${post.handle}`)}>
              Mute {post.handle}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="grid gap-4">
        <p className="text-foreground leading-relaxed">{post.body}</p>
        {post.photo ? (
          <Surface
            className="overflow-hidden p-1.5"
            depth="sm"
            elevation="inset"
          >
            <span className="relative block aspect-[16/9] overflow-hidden rounded-[calc(var(--radius)*0.8)]">
              <Image
                alt={post.photo.alt}
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                src={post.photo.src}
              />
            </span>
          </Surface>
        ) : null}
      </CardContent>

      <CardFooter className="gap-2">
        <Toggle
          aria-label={liked ? "Unlike" : "Like"}
          className={LIKE}
          iconFill
          onPressedChange={setLiked}
          pressed={liked}
          size="sm"
        >
          <Heart />
          <span className="tabular-nums">{compact.format(likes)}</span>
        </Toggle>
        <Button icon={<MessageCircle />} size="sm" variant="ghost">
          <span className="tabular-nums">{post.comments}</span>
          <span className="sr-only">comments</span>
        </Button>
        <Button
          aria-label="Repost"
          icon={<Repeat2 />}
          size="sm"
          variant="ghost"
        />
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                aria-label="Share"
                className="ms-auto"
                icon={<Share />}
                onClick={() => toast("Link copied")}
                size="sm"
                variant="ghost"
              />
            }
          />
          <TooltipContent>Copy link</TooltipContent>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}
