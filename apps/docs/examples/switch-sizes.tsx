"use client";

import { Label } from "@neomorphic-react/ui/label";
import { Switch } from "@neomorphic-react/ui/switch";

export default function SwitchSizes() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <Label className="gap-3">
        <Switch defaultChecked size="sm" />
        Small
      </Label>
      <Label className="gap-3">
        <Switch defaultChecked />
        Medium
      </Label>
      <Label className="gap-3">
        <Switch defaultChecked size="lg" />
        Large
      </Label>
    </div>
  );
}
