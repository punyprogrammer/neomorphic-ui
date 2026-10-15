"use client";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@neomorphic-react/ui/empty";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@neomorphic-react/ui/item";
import { Kbd, KbdGroup } from "@neomorphic-react/ui/kbd";
import { Surface } from "@neomorphic-react/ui/surface";
import { CloudMoon, Feather, ListChecks, Waves, Wind } from "lucide-react";

import { PROMPTS } from "@/lib/chat";

import { useChat } from "./chat-state";

const ICONS = [CloudMoon, Waves, ListChecks, Wind];

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Good morning";
  }
  return hour < 18 ? "Good afternoon" : "Good evening";
}

export function Welcome() {
  const { send } = useChat();

  return (
    <div className="flex size-full items-center justify-center overflow-y-auto px-4 py-10">
      <Empty className="w-full max-w-2xl">
        <EmptyHeader>
          <EmptyMedia>
            <Surface
              className="grid size-20 place-items-center text-primary"
              depth="lg"
              shape="circle"
            >
              <Feather className="size-8" />
            </Surface>
          </EmptyMedia>
          <EmptyTitle className="font-semibold text-2xl tracking-tight">
            <span suppressHydrationWarning>{greeting()}</span>, Amardeep
          </EmptyTitle>
          <EmptyDescription>
            There's no rush here. Start anywhere, or pick something below.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="max-w-none">
          <ul className="grid w-full gap-4 sm:grid-cols-2">
            {PROMPTS.map((prompt, index) => {
              const Icon = ICONS[index % ICONS.length] as typeof Feather;
              return (
                <li key={prompt.title}>
                  <Item
                    className="h-full text-start"
                    render={
                      <button
                        onClick={() => send(prompt.prompt)}
                        type="button"
                      />
                    }
                    variant="raised"
                  >
                    <ItemMedia variant="icon">
                      <Icon />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{prompt.title}</ItemTitle>
                      <ItemDescription>{prompt.description}</ItemDescription>
                    </ItemContent>
                  </Item>
                </li>
              );
            })}
          </ul>
          <p className="flex items-center gap-2 text-muted-foreground text-xs">
            Search your chats any time
            <KbdGroup>
              <Kbd size="sm">⌘</Kbd>
              <Kbd size="sm">K</Kbd>
            </KbdGroup>
          </p>
        </EmptyContent>
      </Empty>
    </div>
  );
}
