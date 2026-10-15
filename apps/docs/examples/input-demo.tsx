"use client";

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@neomorphic-react/ui/field";
import { Input } from "@neomorphic-react/ui/input";

export default function InputDemo() {
  return (
    <Field className="max-w-sm">
      <FieldLabel>Email</FieldLabel>
      <Input autoComplete="email" placeholder="you@example.com" type="email" />
      <FieldDescription>We'll send your receipt here.</FieldDescription>
    </Field>
  );
}
