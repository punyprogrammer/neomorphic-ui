"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@neomorphic-react/ui/input-group";
import { Label } from "@neomorphic-react/ui/label";
import { useState } from "react";

const limit = 160;

export default function InputGroupTextareaExample() {
  const [bio, setBio] = useState("");

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="group-bio">Bio</Label>
      <InputGroup>
        <InputGroupTextarea
          className="max-h-48"
          id="group-bio"
          maxLength={limit}
          onChange={(event) => setBio(event.target.value)}
          placeholder="A line or two about you"
          value={bio}
        />
        <InputGroupAddon align="block-end" className="justify-end">
          <InputGroupText className="text-xs tabular-nums">
            {bio.length} / {limit}
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
