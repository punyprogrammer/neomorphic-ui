"use client";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@neomorphic-react/ui/avatar";
import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@neomorphic-react/ui/item";
import { MessageCircle, UserPlus } from "lucide-react";
import { portrait } from "@/components/blocks/images";

const members = [
  { name: "Ada Lovelace", role: "Organiser", hue: 210, online: true },
  { name: "Grace Hopper", role: "Booked flights", hue: 140, online: true },
  { name: "Katherine Johnson", role: "Invited", online: false },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("");

export default function AvatarInContext() {
  return (
    <Card className="w-full max-w-sm" size="sm">
      <CardHeader>
        <CardTitle>Lisbon, May</CardTitle>
        <CardDescription>3 travellers, 2 online</CardDescription>
        <CardAction>
          <Button icon={<UserPlus />} size="sm">
            Invite
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ItemGroup aria-label="Travellers" className="gap-1">
          {members.map(({ name, role, hue, online }) => (
            <Item key={name} size="sm">
              <ItemMedia>
                <Avatar>
                  {hue === undefined ? null : (
                    <AvatarImage alt="" src={portrait(hue)} />
                  )}
                  <AvatarFallback>{initials(name)}</AvatarFallback>
                  {online ? <AvatarBadge /> : null}
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{name}</ItemTitle>
                <ItemDescription>
                  {role} · {online ? "online" : "offline"}
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button
                  aria-label={`Message ${name}`}
                  icon={<MessageCircle />}
                  size="sm"
                  variant="ghost"
                />
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
}
