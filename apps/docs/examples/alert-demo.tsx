"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@neomorphic-react/ui/alert";
import { Info } from "lucide-react";

export default function AlertDemo() {
  return (
    <Alert className="max-w-md" variant="info">
      <Info />
      <AlertTitle>Check-in is open</AlertTitle>
      <AlertDescription>
        Check in by 18:00 tomorrow to choose your seat for free.
      </AlertDescription>
    </Alert>
  );
}
