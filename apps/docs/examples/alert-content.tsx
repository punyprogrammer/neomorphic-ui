"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@neomorphic-react/ui/alert";
import { CircleAlert } from "lucide-react";

export default function AlertContent() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Alert variant="destructive">
        <CircleAlert />
        <AlertTitle>We couldn't take your payment</AlertTitle>
        <AlertDescription>
          <p>Your card was declined. Try another card, or:</p>
          <ul className="ms-4 list-disc">
            <li>Check the billing address matches your card</li>
            <li>Ask your bank to allow the payment</li>
          </ul>
        </AlertDescription>
      </Alert>
      <Alert>
        <AlertTitle>Prices shown include taxes and fees</AlertTitle>
      </Alert>
      <Alert variant="info">
        <AlertDescription>
          Seat maps can change up to 24 hours before departure.
        </AlertDescription>
      </Alert>
    </div>
  );
}
