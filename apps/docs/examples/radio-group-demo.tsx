"use client";

import { Label } from "@neomorphic-react/ui/label";
import { RadioGroup, RadioGroupItem } from "@neomorphic-react/ui/radio-group";

export default function RadioGroupDemo() {
  return (
    <div className="grid gap-4">
      <p className="font-medium text-foreground text-sm" id="notify-label">
        Notify me about
      </p>
      <RadioGroup
        aria-labelledby="notify-label"
        defaultValue="mentions"
        name="notify"
      >
        <Label className="gap-3 font-normal">
          <RadioGroupItem value="all" />
          All new messages
        </Label>
        <Label className="gap-3 font-normal">
          <RadioGroupItem value="mentions" />
          Direct messages and mentions
        </Label>
        <Label className="gap-3 font-normal">
          <RadioGroupItem value="none" />
          Nothing
        </Label>
      </RadioGroup>
    </div>
  );
}
