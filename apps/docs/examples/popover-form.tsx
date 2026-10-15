"use client";

import { Button } from "@neomorphic-react/ui/button";
import { Field, FieldLabel } from "@neomorphic-react/ui/field";
import { Input } from "@neomorphic-react/ui/input";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@neomorphic-react/ui/popover";
import { Ruler } from "lucide-react";

export default function PopoverForm() {
  return (
    <Popover>
      <PopoverTrigger render={<Button icon={<Ruler />} />}>
        Dimensions
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the size of the frame.</PopoverDescription>
        </PopoverHeader>
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel>Width</FieldLabel>
            <Input defaultValue="1280" inputMode="numeric" size="sm" />
          </Field>
          <Field>
            <FieldLabel>Height</FieldLabel>
            <Input defaultValue="720" inputMode="numeric" size="sm" />
          </Field>
        </div>
        <div className="flex justify-end gap-2">
          <PopoverClose render={<Button size="sm" variant="ghost" />}>
            Cancel
          </PopoverClose>
          <PopoverClose render={<Button size="sm" variant="primary" />}>
            Apply
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}
