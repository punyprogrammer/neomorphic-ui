"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@neomorphic-react/ui/alert";
import {
  CircleAlert,
  CircleCheck,
  Info,
  Terminal,
  TriangleAlert,
} from "lucide-react";

export default function AlertVariants() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Alert>
        <Terminal />
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Trains run hourly on Sundays.</AlertDescription>
      </Alert>
      <Alert variant="info">
        <Info />
        <AlertTitle>Gate assigned</AlertTitle>
        <AlertDescription>Your flight leaves from gate B12.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <CircleCheck />
        <AlertTitle>Booking confirmed</AlertTitle>
        <AlertDescription>Your tickets are in your inbox.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <TriangleAlert />
        <AlertTitle>Tight connection</AlertTitle>
        <AlertDescription>
          You have 40 minutes to change trains in Porto.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <CircleAlert />
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>Your card was declined.</AlertDescription>
      </Alert>
    </div>
  );
}
