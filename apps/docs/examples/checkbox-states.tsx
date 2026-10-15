"use client";

import { Checkbox } from "@neomorphic-react/ui/checkbox";
import { Label } from "@neomorphic-react/ui/label";

export default function CheckboxStates() {
  return (
    <div className="grid grid-cols-2 gap-x-12 gap-y-5">
      <Label className="gap-3">
        <Checkbox />
        Unchecked
      </Label>
      <Label className="gap-3">
        <Checkbox defaultChecked />
        Checked
      </Label>
      <Label className="gap-3">
        <Checkbox indeterminate />
        Indeterminate
      </Label>
      <Label className="gap-3">
        <Checkbox defaultChecked readOnly />
        Read-only
      </Label>
      <Label className="gap-3">
        <Checkbox aria-invalid />
        Invalid
      </Label>
      <Label className="gap-3">
        <Checkbox defaultChecked disabled />
        Disabled
      </Label>
    </div>
  );
}
