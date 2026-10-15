"use client";

import { Input } from "@neomorphic-react/ui/input";
import { Label } from "@neomorphic-react/ui/label";

export default function LabelDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="label-demo-name">Full name</Label>
      <Input autoComplete="name" id="label-demo-name" />
    </div>
  );
}
