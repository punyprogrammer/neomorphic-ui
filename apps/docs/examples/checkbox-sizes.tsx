"use client";

import { Checkbox } from "@neomorphic-react/ui/checkbox";
import { Label } from "@neomorphic-react/ui/label";

export default function CheckboxSizes() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <Label className="gap-3">
        <Checkbox defaultChecked size="sm" />
        Small
      </Label>
      <Label className="gap-3">
        <Checkbox defaultChecked />
        Medium
      </Label>
      <Label className="gap-3">
        <Checkbox defaultChecked size="lg" />
        Large
      </Label>
    </div>
  );
}
