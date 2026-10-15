"use client";

import { Checkbox } from "@neomorphic-react/ui/checkbox";
import { Label } from "@neomorphic-react/ui/label";

export default function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-5">
      <Label className="gap-3">
        <Checkbox defaultChecked name="remember" />
        Remember me
      </Label>
      <Label className="gap-3">
        <Checkbox name="newsletter" />
        Send me the monthly newsletter
      </Label>
    </div>
  );
}
