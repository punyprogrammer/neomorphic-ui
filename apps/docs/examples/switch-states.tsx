"use client";

import { Label } from "@neomorphic-react/ui/label";
import { Switch } from "@neomorphic-react/ui/switch";

export default function SwitchStates() {
  return (
    <div className="grid grid-cols-2 gap-x-12 gap-y-5">
      <Label className="gap-3">
        <Switch />
        Off
      </Label>
      <Label className="gap-3">
        <Switch defaultChecked />
        On
      </Label>
      <Label className="gap-3">
        <Switch defaultChecked readOnly />
        Read-only
      </Label>
      <Label className="gap-3">
        <Switch aria-invalid />
        Invalid
      </Label>
      <Label className="gap-3">
        <Switch disabled />
        Disabled
      </Label>
      <Label className="gap-3">
        <Switch defaultChecked disabled />
        Disabled on
      </Label>
    </div>
  );
}
