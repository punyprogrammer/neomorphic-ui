"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@neomorphic-react/ui/field";
import { Input } from "@neomorphic-react/ui/input";

export default function InputValidation() {
  return (
    <Field className="max-w-sm" validationMode="onBlur">
      <FieldLabel>Work email</FieldLabel>
      <Input placeholder="you@company.com" required type="email" />
      <FieldDescription>We use it to verify your company.</FieldDescription>
      <FieldError match="valueMissing">Enter your work email.</FieldError>
      <FieldError match="typeMismatch">
        Enter an address like name@company.com.
      </FieldError>
    </Field>
  );
}
