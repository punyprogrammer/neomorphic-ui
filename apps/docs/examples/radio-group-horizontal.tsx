"use client";

import { Label } from "@neomorphic-react/ui/label";
import { RadioGroup, RadioGroupItem } from "@neomorphic-react/ui/radio-group";

export default function RadioGroupHorizontal() {
  return (
    <div className="grid gap-4">
      <p className="font-medium text-foreground text-sm" id="delivery-label">
        Delivery
      </p>
      <RadioGroup
        aria-labelledby="delivery-label"
        className="flex flex-wrap gap-x-8 gap-y-3"
        defaultValue="standard"
      >
        <Label className="gap-3 font-normal">
          <RadioGroupItem value="standard" />
          Standard
        </Label>
        <Label className="gap-3 font-normal">
          <RadioGroupItem value="express" />
          Express
        </Label>
        <Label className="gap-3 font-normal">
          <RadioGroupItem disabled value="same-day" />
          Same day (unavailable)
        </Label>
      </RadioGroup>
    </div>
  );
}
