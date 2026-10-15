"use client";

import { Avatar, AvatarFallback } from "@neomorphic-react/ui/avatar";
import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@neomorphic-react/ui/dropdown-menu";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@neomorphic-react/ui/item";
import { MoreHorizontal, UserMinus } from "lucide-react";
import { useState } from "react";

const roles = ["Owner", "Editor", "Viewer"];

const team = [
  { id: "maya", name: "Maya Chen", initials: "MC", role: "Owner" },
  { id: "tom", name: "Tom Okafor", initials: "TO", role: "Editor" },
  { id: "lena", name: "Lena Fischer", initials: "LF", role: "Viewer" },
];

export default function DropdownMenuInContext() {
  const [members, setMembers] = useState(team);

  const setRole = (id: string, role: string) =>
    setMembers((current) =>
      current.map((member) => (member.id === id ? { ...member, role } : member))
    );

  return (
    <Card className="w-full max-w-md" size="sm">
      <CardHeader>
        <CardTitle>Project members</CardTitle>
        <CardDescription>
          {members.length === 1 ? "1 person" : `${members.length} people`} can
          open "Spring campaign"
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          {members.map((member) => (
            <Item key={member.id} size="sm">
              <ItemMedia>
                <Avatar size="sm">
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{member.name}</ItemTitle>
                <ItemDescription>{member.role}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        aria-label={`Options for ${member.name}`}
                        icon={<MoreHorizontal />}
                        size="sm"
                        variant="ghost"
                      />
                    }
                  />
                  <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>Role</DropdownMenuLabel>
                      <DropdownMenuRadioGroup
                        onValueChange={(role) => setRole(member.id, role)}
                        value={member.role}
                      >
                        {roles.map((role) => (
                          <DropdownMenuRadioItem key={role} value={role}>
                            {role}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() =>
                        setMembers((current) =>
                          current.filter((item) => item.id !== member.id)
                        )
                      }
                      variant="destructive"
                    >
                      <UserMinus />
                      Remove from project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
}
