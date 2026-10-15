"use client";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@neomorphic-react/ui/field";
import { Switch } from "@neomorphic-react/ui/switch";

export default function SwitchField() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel>Trip updates</FieldLabel>
          <FieldDescription>Gate changes and delays by email.</FieldDescription>
        </FieldContent>
        <Switch defaultChecked name="trip-updates" />
      </Field>
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel>Offers</FieldLabel>
          <FieldDescription>
            Fare sales on routes you've searched.
          </FieldDescription>
        </FieldContent>
        <Switch name="offers" />
      </Field>
    </FieldGroup>
  );
}
