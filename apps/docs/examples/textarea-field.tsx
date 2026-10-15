"use client";

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@neomorphic-react/ui/field";
import { Textarea } from "@neomorphic-react/ui/textarea";

export default function TextareaField() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="textarea-field-notes">
        Notes for the driver
      </FieldLabel>
      <Textarea
        aria-describedby="textarea-field-hint"
        id="textarea-field-notes"
        placeholder="Gate code, where to leave the parcel…"
      />
      <FieldDescription id="textarea-field-hint">
        Shown to the driver on the day of delivery.
      </FieldDescription>
    </Field>
  );
}
