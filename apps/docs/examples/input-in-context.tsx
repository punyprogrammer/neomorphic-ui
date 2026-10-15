"use client";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@neomorphic-react/ui/field";
import { Input } from "@neomorphic-react/ui/input";

export default function InputInContext() {
  return (
    <FieldSet className="w-full max-w-md">
      <FieldLegend>Shipping address</FieldLegend>
      <FieldGroup>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel>First name</FieldLabel>
            <Input autoComplete="given-name" defaultValue="Amara" required />
          </Field>
          <Field>
            <FieldLabel>Last name</FieldLabel>
            <Input autoComplete="family-name" defaultValue="Okafor" required />
          </Field>
        </div>
        <Field>
          <FieldLabel>Address</FieldLabel>
          <Input
            autoComplete="street-address"
            defaultValue="14 Hill Road"
            required
          />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel>City</FieldLabel>
            <Input autoComplete="address-level2" defaultValue="Mumbai" />
          </Field>
          <Field>
            <FieldLabel>Postcode</FieldLabel>
            <Input
              autoComplete="postal-code"
              defaultValue="400050"
              inputMode="numeric"
            />
          </Field>
        </div>
      </FieldGroup>
    </FieldSet>
  );
}
