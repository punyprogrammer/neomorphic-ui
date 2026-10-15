"use client";

import { Label } from "@neomorphic-react/ui/label";
import { Textarea } from "@neomorphic-react/ui/textarea";

export default function TextareaAutoResize() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="textarea-notes">Notes</Label>
      <Textarea
        autoResize
        className="max-h-60 min-h-12"
        id="textarea-notes"
        placeholder="Start typing; the field grows with each line"
      />
    </div>
  );
}
