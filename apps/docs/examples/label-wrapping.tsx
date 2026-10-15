"use client";

import { Checkbox } from "@neomorphic-react/ui/checkbox";
import { Label } from "@neomorphic-react/ui/label";
import { RadioGroup, RadioGroupItem } from "@neomorphic-react/ui/radio-group";
import { Switch } from "@neomorphic-react/ui/switch";

export default function LabelWrapping() {
  return (
    <div className="grid gap-5">
      <Label className="gap-3">
        <Checkbox defaultChecked name="newsletter" />
        Send me the monthly newsletter
      </Label>
      <Label className="gap-3">
        <Switch name="night-mode" />
        Dim the screen after sunset
      </Label>
      <RadioGroup aria-label="Delivery" defaultValue="standard" name="delivery">
        <Label className="gap-3 font-normal">
          <RadioGroupItem value="standard" />
          Standard, 3 to 5 days
        </Label>
        <Label className="gap-3 font-normal">
          <RadioGroupItem value="express" />
          Express, next day
        </Label>
      </RadioGroup>
    </div>
  );
}
