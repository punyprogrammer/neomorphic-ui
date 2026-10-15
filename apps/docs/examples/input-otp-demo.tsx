"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@neomorphic-react/ui/input-otp";
import { Label } from "@neomorphic-react/ui/label";

export default function InputOTPDemo() {
  return (
    <div className="grid gap-3">
      <Label htmlFor="input-otp-demo">Verification code</Label>
      <InputOTP id="input-otp-demo" length={6} name="code">
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
    </div>
  );
}
