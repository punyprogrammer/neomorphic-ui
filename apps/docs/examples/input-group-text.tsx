"use client";

import { Field, FieldLabel } from "@neomorphic-react/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@neomorphic-react/ui/input-group";
import { MapPin } from "lucide-react";

export default function InputGroupTextExample() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <Field>
        <FieldLabel>Price</FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>$</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput inputMode="decimal" placeholder="0.00" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>USD</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel>Website</FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="example.com" />
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel>City</FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <MapPin />
          </InputGroupAddon>
          <InputGroupInput placeholder="Kolkata" />
        </InputGroup>
      </Field>
    </div>
  );
}
