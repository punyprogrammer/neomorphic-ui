"use client";

import { Checkbox } from "@neomorphic-react/ui/checkbox";
import { Label } from "@neomorphic-react/ui/label";
import { Switch } from "@neomorphic-react/ui/switch";

export default function LabelDisabled() {
  return (
    <div className="grid gap-5">
      <Label className="gap-3">
        <Switch disabled />
        Location sharing, set by your organisation
      </Label>
      <div className="flex items-center gap-3">
        <Checkbox className="peer" disabled id="label-disabled-gift" />
        <Label htmlFor="label-disabled-gift">
          Gift wrap, not available for this item
        </Label>
      </div>
    </div>
  );
}
