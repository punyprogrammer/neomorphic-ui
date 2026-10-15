"use client";

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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@neomorphic-react/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@neomorphic-react/ui/field";
import { Input } from "@neomorphic-react/ui/input";
import { UserPlus } from "lucide-react";
import { useState } from "react";

export default function DialogInContext() {
  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState([
    "priya@northwind.io",
    "tom@northwind.io",
  ]);

  return (
    <Card className="w-full max-w-sm" size="sm">
      <CardHeader>
        <CardTitle>Team</CardTitle>
        <CardDescription>{members.length} members</CardDescription>
        <CardAction>
          <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger render={<Button icon={<UserPlus />} size="sm" />}>
              Invite
            </DialogTrigger>
            <DialogContent size="sm">
              <form
                className="grid gap-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  const email = String(
                    new FormData(event.currentTarget).get("email")
                  );
                  setMembers((current) =>
                    current.includes(email) ? current : [...current, email]
                  );
                  setOpen(false);
                }}
              >
                <DialogHeader>
                  <DialogTitle>Invite a teammate</DialogTitle>
                  <DialogDescription>
                    They'll get an email with a link to join Northwind.
                  </DialogDescription>
                </DialogHeader>
                <FieldGroup>
                  <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                      name="email"
                      placeholder="name@northwind.io"
                      required
                      type="email"
                    />
                  </Field>
                </FieldGroup>
                <DialogFooter>
                  <DialogClose render={<Button />}>Cancel</DialogClose>
                  <Button type="submit" variant="primary">
                    Send invite
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-2 text-sm">
          {members.map((email) => (
            <li key={email}>{email}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
