"use client";

import { Avatar, AvatarFallback } from "@neomorphic-react/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@neomorphic-react/ui/item";
import { ScrollArea } from "@neomorphic-react/ui/scroll-area";

const messages = [
  {
    from: "Ana Lopes",
    initials: "AL",
    text: "Platform 4, not 6. See you there.",
  },
  {
    from: "Miguel Reis",
    initials: "MR",
    text: "I've booked the table for 20:30.",
  },
  { from: "Joana Silva", initials: "JS", text: "Can you bring the charger?" },
  {
    from: "Tomás Costa",
    initials: "TC",
    text: "Running ten minutes late, sorry.",
  },
  {
    from: "Rita Sousa",
    initials: "RS",
    text: "The museum is closed on Mondays.",
  },
  {
    from: "Pedro Alves",
    initials: "PA",
    text: "Tickets are in the shared folder.",
  },
  { from: "Inês Martins", initials: "IM", text: "Rain forecast for Saturday." },
];

export default function ScrollAreaInContext() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Trip chat</CardTitle>
        <CardDescription>{messages.length} unread messages</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <ScrollArea className="h-72" fade>
          <ItemGroup className="px-3">
            {messages.map((message) => (
              <Item key={message.from} size="sm">
                <ItemMedia>
                  <Avatar size="sm">
                    <AvatarFallback>{message.initials}</AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{message.from}</ItemTitle>
                  <ItemDescription>{message.text}</ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </ItemGroup>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
