"use client";

import { Avatar, AvatarFallback } from "@neomorphic-react/ui/avatar";
import { Button } from "@neomorphic-react/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@neomorphic-react/ui/item";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@neomorphic-react/ui/resizable";
import { Surface } from "@neomorphic-react/ui/surface";
import { Reply } from "lucide-react";
import { useState } from "react";

const messages = [
  {
    from: "Priya Natarajan",
    initials: "PN",
    subject: "Venue shortlist for the offsite",
    body: "I've narrowed it down to three places in Porto. All of them seat twenty. Can you look before Friday?",
  },
  {
    from: "Tom Becker",
    initials: "TB",
    subject: "Invoice 2041 is ready",
    body: "The invoice for September is attached. Payment is due in 30 days.",
  },
  {
    from: "Ana Ribeiro",
    initials: "AR",
    subject: "Launch checklist",
    body: "Copy is signed off. The only thing left is the pricing page.",
  },
];

export default function ResizableInContext() {
  const [selected, setSelected] = useState(messages[0]);

  return (
    <Surface className="h-96 w-full max-w-2xl overflow-hidden rounded-2xl">
      <ResizablePanelGroup>
        <ResizablePanel
          className="grid content-start gap-1.5 p-3"
          defaultSize="40"
          maxSize="55"
          minSize="30"
        >
          {messages.map((message) => (
            <Item
              aria-current={message === selected || undefined}
              key={message.subject}
              onClick={() => setSelected(message)}
              render={<button type="button" />}
              size="sm"
              variant={message === selected ? "raised" : "flat"}
            >
              <ItemContent>
                <ItemTitle>{message.from}</ItemTitle>
                <ItemDescription>{message.subject}</ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </ResizablePanel>
        <ResizableHandle aria-label="Resize message list" withHandle />
        <ResizablePanel className="grid content-start gap-4 p-6" minSize="40">
          <div className="flex items-center gap-3">
            <Avatar size="sm">
              <AvatarFallback>{selected.initials}</AvatarFallback>
            </Avatar>
            <div className="grid min-w-0">
              <p className="truncate font-medium text-sm">{selected.subject}</p>
              <p className="text-muted-foreground text-xs">{selected.from}</p>
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {selected.body}
          </p>
          <Button className="justify-self-start" icon={<Reply />} size="sm">
            Reply
          </Button>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Surface>
  );
}
