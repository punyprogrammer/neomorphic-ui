"use client";

import { Button } from "@neomorphic-react/ui/button";
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

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>Edit profile</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Your name and username are shown on your public page.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input defaultValue="Maya Lindqvist" />
          </Field>
          <Field>
            <FieldLabel>Username</FieldLabel>
            <Input defaultValue="mayal" />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button />}>Cancel</DialogClose>
          <DialogClose render={<Button variant="primary" />}>Save</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
