"use client";

import { Avatar, AvatarFallback } from "@neomorphic-react/ui/avatar";
import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { Chip } from "@neomorphic-react/ui/chip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@neomorphic-react/ui/table";
import { MoreHorizontal, UserPlus } from "lucide-react";

const members = [
  {
    name: "Priya Nair",
    email: "priya@fernhill.co",
    role: "Owner",
    active: true,
  },
  { name: "Tom Becker", email: "tom@fernhill.co", role: "Admin", active: true },
  {
    name: "Lucía Gómez",
    email: "lucia@fernhill.co",
    role: "Editor",
    active: true,
  },
  {
    name: "Sam Okoro",
    email: "sam@fernhill.co",
    role: "Viewer",
    active: false,
  },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("");

export default function TableInContext() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Team</CardTitle>
        <CardDescription>4 of 5 seats used</CardDescription>
        <CardAction>
          <Button icon={<UserPlus />} size="sm">
            Invite
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Table aria-label="Team members">
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.email}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar size="sm">
                      <AvatarFallback>{initials(member.name)}</AvatarFallback>
                    </Avatar>
                    <div className="grid leading-tight">
                      <span className="font-medium">{member.name}</span>
                      <span className="text-muted-foreground text-xs">
                        {member.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>
                  <Chip size="sm" variant={member.active ? "default" : "inset"}>
                    {member.active ? "Active" : "Invited"}
                  </Chip>
                </TableCell>
                <TableCell className="text-end">
                  <Button
                    aria-label={`Manage ${member.name}`}
                    icon={<MoreHorizontal />}
                    size="sm"
                    variant="ghost"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
