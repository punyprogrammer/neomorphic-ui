"use client";

import { Field, FieldError, FieldLabel } from "@neomorphic-react/ui/field";
import { Input } from "@neomorphic-react/ui/input";
import { useState } from "react";

const DIGIT = /\d/;
const CAPITAL = /[A-Z]/;

const rules = [
  {
    test: (value: string) => value.length >= 10,
    message: "Use 10 or more characters.",
  },
  { test: (value: string) => DIGIT.test(value), message: "Include a number." },
  {
    test: (value: string) => CAPITAL.test(value),
    message: "Include a capital letter.",
  },
];

export default function FieldErrors() {
  const [password, setPassword] = useState("");
  const errors =
    password === ""
      ? []
      : rules
          .filter((rule) => !rule.test(password))
          .map((rule) => ({ message: rule.message }));

  return (
    <Field className="max-w-sm" invalid={errors.length > 0}>
      <FieldLabel>New password</FieldLabel>
      <Input
        autoComplete="new-password"
        onValueChange={setPassword}
        type="password"
        value={password}
      />
      <FieldError errors={errors} />
    </Field>
  );
}
