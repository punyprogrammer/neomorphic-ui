"use client";

import { Label } from "@neomorphic-react/ui/label";
import { Textarea } from "@neomorphic-react/ui/textarea";

export default function TextareaDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="textarea-demo-message">Message</Label>
      <Textarea
        id="textarea-demo-message"
        placeholder="Tell us how we can help…"
      />
    </div>
  );
}
