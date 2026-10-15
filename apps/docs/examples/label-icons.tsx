"use client";

import { Input } from "@neomorphic-react/ui/input";
import { Label } from "@neomorphic-react/ui/label";
import { Lock, Phone } from "lucide-react";

export default function LabelIcons() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="label-icons-password">
          <Lock aria-hidden="true" />
          Password
        </Label>
        <Input
          autoComplete="current-password"
          id="label-icons-password"
          type="password"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="label-icons-phone">
          <Phone aria-hidden="true" />
          Phone
          <span className="font-normal text-muted-foreground">(optional)</span>
        </Label>
        <Input autoComplete="tel" id="label-icons-phone" type="tel" />
      </div>
    </div>
  );
}
