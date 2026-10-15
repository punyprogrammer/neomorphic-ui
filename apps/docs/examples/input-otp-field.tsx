"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@neomorphic-react/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@neomorphic-react/ui/input-otp";
import { useState } from "react";

export default function InputOTPField() {
  const [code, setCode] = useState("");
  const [invalid, setInvalid] = useState(false);

  return (
    <Field className="w-fit" invalid={invalid}>
      <FieldLabel>Code from your authenticator app</FieldLabel>
      <InputOTP
        length={4}
        onValueChange={(value) => {
          setCode(value);
          setInvalid(false);
        }}
        onValueComplete={(value) => setInvalid(value !== "2468")}
        value={code}
      >
        <InputOTPGroup>
          <InputOTPSlot />
          <InputOTPSlot />
          <InputOTPSlot />
          <InputOTPSlot />
        </InputOTPGroup>
      </InputOTP>
      {invalid ? (
        <FieldError>
          That code didn't match. Check the app and try again.
        </FieldError>
      ) : (
        <FieldDescription>It changes every 30 seconds.</FieldDescription>
      )}
    </Field>
  );
}
