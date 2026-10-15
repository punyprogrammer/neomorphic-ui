"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
} from "@neomorphic-react/ui/avatar";
import { Button } from "@neomorphic-react/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@neomorphic-react/ui/empty";

export default function EmptyAvatars() {
  return (
    <Empty className="max-w-md">
      <EmptyHeader>
        <EmptyMedia>
          <AvatarGroup>
            <Avatar>
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>MR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
          </AvatarGroup>
        </EmptyMedia>
        <EmptyTitle>No travel companions</EmptyTitle>
        <EmptyDescription>
          Invite people to share this trip's plans and tickets.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Invite</Button>
      </EmptyContent>
    </Empty>
  );
}
