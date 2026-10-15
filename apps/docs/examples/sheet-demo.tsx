"use client";

import { Button } from "@neomorphic-react/ui/button";
import { Field, FieldGroup, FieldLabel } from "@neomorphic-react/ui/field";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@neomorphic-react/ui/sheet";
import { Switch } from "@neomorphic-react/ui/switch";

const settings = ["Comments on my posts", "New followers", "Weekly summary"];

export default function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button />}>Notifications</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>Choose what we email you about.</SheetDescription>
        </SheetHeader>
        <FieldGroup>
          {settings.map((label, index) => (
            <Field key={label} orientation="horizontal">
              <FieldLabel className="flex-1">{label}</FieldLabel>
              <Switch defaultChecked={index < 2} />
            </Field>
          ))}
        </FieldGroup>
        <SheetFooter>
          <SheetClose render={<Button variant="primary" />}>Save</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
