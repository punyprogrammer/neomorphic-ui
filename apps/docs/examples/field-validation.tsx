"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@neomorphic-react/ui/field";
import { Input } from "@neomorphic-react/ui/input";

const WHITESPACE = /\s/;

function validateUsername(value: unknown) {
  if (typeof value === "string" && WHITESPACE.test(value)) {
    return "Usernames can't contain spaces.";
  }
  return null;
}

export default function FieldValidation() {
  return (
    <Field
      className="max-w-sm"
      validate={validateUsername}
      validationMode="onBlur"
    >
      <FieldLabel>Username</FieldLabel>
      <Input autoComplete="username" minLength={3} required />
      <FieldDescription>At least 3 characters, no spaces.</FieldDescription>
      <FieldError />
    </Field>
  );
}
