"use client";

import { Button } from "@neomorphic-react/ui/button";
import { Checkbox } from "@neomorphic-react/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@neomorphic-react/ui/field";
import { useState } from "react";

export default function CheckboxField() {
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const invalid = submitted && !accepted;

  return (
    <form
      className="w-full max-w-sm"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <FieldGroup>
        <Field orientation="horizontal">
          <Checkbox defaultChecked name="updates" />
          <FieldContent>
            <FieldLabel>Product updates</FieldLabel>
            <FieldDescription>
              One email a month about new features.
            </FieldDescription>
          </FieldContent>
        </Field>
        <Field invalid={invalid} orientation="horizontal">
          <Checkbox
            checked={accepted}
            name="terms"
            onCheckedChange={setAccepted}
          />
          <FieldContent>
            <FieldLabel>I accept the terms of service</FieldLabel>
            {invalid ? (
              <FieldError>Accept the terms to continue.</FieldError>
            ) : null}
          </FieldContent>
        </Field>
        <Button type="submit" variant="primary">
          Create account
        </Button>
      </FieldGroup>
    </form>
  );
}
