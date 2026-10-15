"use client";

import { Checkbox } from "@neomorphic-react/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@neomorphic-react/ui/field";
import { Input } from "@neomorphic-react/ui/input";
import { Switch } from "@neomorphic-react/ui/switch";

export default function FieldOrientation() {
  return (
    <FieldGroup className="max-w-lg">
      <Field orientation="responsive">
        <FieldContent>
          <FieldLabel>Display name</FieldLabel>
          <FieldDescription>Shown on your reviews.</FieldDescription>
        </FieldContent>
        <Input defaultValue="Amara O." />
      </Field>
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel>Public profile</FieldLabel>
          <FieldDescription>Anyone with the link can see it.</FieldDescription>
        </FieldContent>
        <Switch defaultChecked />
      </Field>
      <Field orientation="horizontal">
        <Checkbox />
        <FieldLabel>Hide my city</FieldLabel>
      </Field>
    </FieldGroup>
  );
}
