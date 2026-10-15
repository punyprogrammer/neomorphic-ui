"use client";

import { Button } from "@neomorphic-react/ui/button";
import { Field, FieldLabel } from "@neomorphic-react/ui/field";
import { Input } from "@neomorphic-react/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@neomorphic-react/ui/popover";
import { Pencil } from "lucide-react";
import { useState } from "react";

export default function PopoverControlled() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("Weekend in Lisbon");

  return (
    <div className="flex items-center gap-3">
      <p className="font-medium text-foreground">{name}</p>
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger
          render={
            <Button
              aria-label="Rename trip"
              icon={<Pencil />}
              size="sm"
              variant="ghost"
            />
          }
        />
        <PopoverContent
          render={
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const value = new FormData(event.currentTarget).get("name");
                setName(String(value).trim() || name);
                setOpen(false);
              }}
            />
          }
        >
          <PopoverHeader>
            <PopoverTitle>Rename trip</PopoverTitle>
          </PopoverHeader>
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input defaultValue={name} name="name" size="sm" />
          </Field>
          <Button size="sm" type="submit" variant="primary">
            Save
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
