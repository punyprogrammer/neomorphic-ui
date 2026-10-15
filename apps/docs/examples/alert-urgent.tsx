"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@neomorphic-react/ui/alert";
import { Button } from "@neomorphic-react/ui/button";
import { CircleAlert } from "lucide-react";
import { useState } from "react";

export default function AlertUrgent() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex w-full max-w-md flex-col items-start gap-4">
      <Button onClick={() => setFailed(true)} variant="primary">
        Pay €140
      </Button>
      {failed ? (
        <Alert role="alert" variant="destructive">
          <CircleAlert />
          <AlertTitle>Payment failed</AlertTitle>
          <AlertDescription>
            Your card was declined. Nothing has been charged.
          </AlertDescription>
        </Alert>
      ) : null}
    </div>
  );
}
