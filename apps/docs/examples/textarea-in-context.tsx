"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { Textarea } from "@neomorphic-react/ui/textarea";
import { useState } from "react";

const initial =
  "Keep suggestions small and kind. I'd rather start with one change than five.";

export default function TextareaInContext() {
  const [instructions, setInstructions] = useState(initial);
  const [saved, setSaved] = useState(initial);
  const changed = instructions !== saved;

  return (
    <Card className="w-full max-w-sm" size="sm">
      <CardHeader>
        <CardTitle id="instructions-title">Custom instructions</CardTitle>
        <CardDescription>
          The assistant reads these before every reply.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          aria-labelledby="instructions-title"
          autoResize
          className="max-h-60 min-h-24"
          onChange={(event) => setInstructions(event.target.value)}
          value={instructions}
        />
      </CardContent>
      <CardFooter>
        <span
          aria-live="polite"
          className="me-auto text-muted-foreground text-xs"
        >
          {changed ? "Unsaved changes" : "Saved"}
        </span>
        <Button
          disabled={!changed}
          onClick={() => setSaved(instructions)}
          size="sm"
          variant="primary"
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
