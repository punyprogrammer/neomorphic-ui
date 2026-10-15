"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@neomorphic-react/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@neomorphic-react/ui/input-otp";
import { useState } from "react";

export default function InputOTPInContext() {
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState(false);

  return (
    <Card
      className="w-full max-w-sm"
      render={
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setVerified(true);
          }}
        />
      }
    >
      <CardHeader>
        <CardTitle>Check your email</CardTitle>
        <CardDescription>
          We sent a 6-digit code to amara@example.com.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <FieldLabel>Sign-in code</FieldLabel>
          <InputOTP
            length={6}
            name="code"
            onValueChange={(value) => {
              setCode(value);
              setVerified(false);
            }}
            value={code}
          >
            <InputOTPGroup>
              <InputOTPSlot />
              <InputOTPSlot />
              <InputOTPSlot />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot />
              <InputOTPSlot />
              <InputOTPSlot />
            </InputOTPGroup>
          </InputOTP>
          <FieldDescription>
            {verified ? "You're signed in." : "The code expires in 10 minutes."}
          </FieldDescription>
        </Field>
      </CardContent>
      <CardFooter className="justify-between">
        <Button size="sm" variant="ghost">
          Resend code
        </Button>
        <Button disabled={code.length < 6} type="submit" variant="primary">
          Verify
        </Button>
      </CardFooter>
    </Card>
  );
}
