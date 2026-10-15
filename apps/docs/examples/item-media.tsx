"use client";

import { Avatar, AvatarFallback } from "@neomorphic-react/ui/avatar";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@neomorphic-react/ui/item";
import { Music } from "lucide-react";
import { albumArt } from "@/components/blocks/images";

export default function ItemMediaExample() {
  return (
    <ItemGroup aria-label="Recent activity" className="max-w-md">
      <Item>
        <ItemMedia variant="icon">
          <Music aria-hidden="true" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Morning focus</ItemTitle>
          <ItemDescription>Playlist · 24 tracks</ItemDescription>
        </ItemContent>
      </Item>
      <Item>
        <ItemMedia variant="image">
          <img alt="" height={40} src={albumArt(200)} width={40} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Tidal Lines</ItemTitle>
          <ItemDescription>Album · Nora Vale</ItemDescription>
        </ItemContent>
      </Item>
      <Item>
        <ItemMedia>
          <Avatar>
            <AvatarFallback>RK</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Riya Kapoor</ItemTitle>
          <ItemDescription>Shared a playlist with you</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  );
}
