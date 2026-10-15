"use client";

import { Label } from "@neomorphic-react/ui/label";
import { Textarea } from "@neomorphic-react/ui/textarea";
import { useState } from "react";

const limit = 140;

export default function TextareaCounter() {
  const [bio, setBio] = useState("");

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="textarea-bio">Bio</Label>
      <Textarea
        aria-describedby="textarea-bio-count"
        id="textarea-bio"
        maxLength={limit}
        onChange={(event) => setBio(event.target.value)}
        placeholder="A line or two about you"
        value={bio}
      />
      <p
        aria-live="polite"
        className="text-end text-muted-foreground text-xs tabular-nums"
        id="textarea-bio-count"
      >
        {limit - bio.length} characters left
      </p>
    </div>
  );
}
