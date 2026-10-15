"use client";

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@neomorphic-react/ui/alert";
import { Button } from "@neomorphic-react/ui/button";
import { Info } from "lucide-react";

export default function AlertActionExample() {
  return (
    <Alert className="max-w-md" variant="info">
      <Info />
      <AlertTitle>Seat changed</AlertTitle>
      <AlertDescription>You're now in 14A, by the window.</AlertDescription>
      <AlertAction>
        <Button size="sm">Undo</Button>
      </AlertAction>
    </Alert>
  );
}
