"use client";

import { Field, FieldError, FieldLabel } from "@neomorphic-react/ui/field";
import { Input } from "@neomorphic-react/ui/input";

export default function InputStates() {
  return (
    <div className="grid w-full max-w-xl gap-6 sm:grid-cols-2 sm:items-start">
      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input defaultValue="Ada Lovelace" />
      </Field>
      <Field>
        <FieldLabel>Order number</FieldLabel>
        <Input defaultValue="ORD-4821" readOnly />
      </Field>
      <Field invalid>
        <FieldLabel>Email</FieldLabel>
        <Input defaultValue="ada@" type="email" />
        <FieldError>Enter a full email address.</FieldError>
      </Field>
      <Field disabled>
        <FieldLabel>Referral code</FieldLabel>
        <Input placeholder="Not available" />
      </Field>
    </div>
  );
}
