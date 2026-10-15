"use client";

import { Label } from "@neomorphic-react/ui/label";
import { Switch } from "@neomorphic-react/ui/switch";

export default function SwitchDemo() {
  return (
    <div className="flex flex-col gap-5">
      <Label className="gap-3">
        <Switch defaultChecked name="wifi" />
        Wi-Fi
      </Label>
      <Label className="gap-3">
        <Switch name="airplane-mode" />
        Airplane mode
      </Label>
    </div>
  );
}
