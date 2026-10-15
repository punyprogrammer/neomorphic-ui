"use client";

import { Field, FieldError, FieldLabel } from "@neomorphic-react/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@neomorphic-react/ui/input-group";
import { Mail, Search } from "lucide-react";

export default function InputGroupStates() {
  return (
    <div className="grid w-full max-w-xl gap-6 sm:grid-cols-2 sm:items-start">
      <Field invalid>
        <FieldLabel>Email</FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <Mail />
          </InputGroupAddon>
          <InputGroupInput defaultValue="ada@" type="email" />
        </InputGroup>
        <FieldError>Enter a full email address.</FieldError>
      </Field>
      <Field disabled>
        <FieldLabel>Search orders</FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput placeholder="Order number" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton disabled>Go</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </div>
  );
}
