"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@neomorphic-react/ui/input-otp";
import { Label } from "@neomorphic-react/ui/label";

const toUpperCase = (value: string) => value.toUpperCase();

export default function InputOTPValidationType() {
  return (
    <div className="grid gap-8">
      <div className="grid gap-3">
        <Label htmlFor="input-otp-booking">Booking reference</Label>
        <InputOTP
          id="input-otp-booking"
          length={6}
          normalizeValue={toUpperCase}
          validationType="alphanumeric"
        >
          <InputOTPGroup>
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="input-otp-pin">Card PIN</Label>
        <InputOTP id="input-otp-pin" length={4} mask>
          <InputOTPGroup>
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
          </InputOTPGroup>
        </InputOTP>
      </div>
    </div>
  );
}
