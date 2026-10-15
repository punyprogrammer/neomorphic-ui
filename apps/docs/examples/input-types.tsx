"use client";

import { Field, FieldLabel } from "@neomorphic-react/ui/field";
import { Input } from "@neomorphic-react/ui/input";

export default function InputTypes() {
  return (
    <div className="grid w-full max-w-xl gap-6 sm:grid-cols-2">
      <Field>
        <FieldLabel>Password</FieldLabel>
        <Input autoComplete="current-password" type="password" />
      </Field>
      <Field>
        <FieldLabel>Guests</FieldLabel>
        <Input defaultValue={2} max={8} min={1} type="number" />
      </Field>
      <Field>
        <FieldLabel>Check-in</FieldLabel>
        <Input type="date" />
      </Field>
      <Field>
        <FieldLabel>Passport scan</FieldLabel>
        <Input accept="image/*,.pdf" type="file" />
      </Field>
    </div>
  );
}
