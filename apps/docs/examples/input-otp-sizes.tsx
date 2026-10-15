"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@neomorphic-react/ui/input-otp";

const sizes = ["sm", "md", "lg"] as const;

export default function InputOTPSizes() {
  return (
    <div className="flex flex-col gap-6">
      {sizes.map((size) => (
        <InputOTP aria-label={`PIN, ${size}`} key={size} length={4} size={size}>
          <InputOTPGroup>
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
            <InputOTPSlot />
          </InputOTPGroup>
        </InputOTP>
      ))}
    </div>
  );
}
