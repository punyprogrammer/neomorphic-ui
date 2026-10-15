"use client";

import { Label } from "@neomorphic-react/ui/label";
import { Textarea } from "@neomorphic-react/ui/textarea";

export default function TextareaStates() {
  return (
    <div className="grid w-full max-w-xl gap-6 sm:grid-cols-2 sm:items-start">
      <div className="grid gap-2">
        <Label htmlFor="textarea-filled">Reply</Label>
        <Textarea
          defaultValue="Thanks for the update. Let's ship it on Friday."
          id="textarea-filled"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="textarea-read-only">Delivery note</Label>
        <Textarea
          defaultValue="Leave the parcel with the concierge."
          id="textarea-read-only"
          readOnly
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="textarea-invalid">What happened?</Label>
        <Textarea
          aria-describedby="textarea-invalid-error"
          aria-invalid
          id="textarea-invalid"
        />
        <p className="text-destructive text-sm" id="textarea-invalid-error">
          Describe the issue in a few words.
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="textarea-disabled">Comments</Label>
        <Textarea
          disabled
          id="textarea-disabled"
          placeholder="Comments are closed"
        />
      </div>
    </div>
  );
}
