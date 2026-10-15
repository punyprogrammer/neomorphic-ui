"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@neomorphic-react/ui/dialog";

const terms = [
  "Tickets are personal and valid only for the date, train and seat shown.",
  "You can change a ticket up to 24 hours before departure for a €5 fee, plus any difference in fare.",
  "Saver fares can't be refunded. Flexible fares are refunded in full up to 1 hour before departure.",
  "Each passenger may bring two pieces of hand luggage and one large case.",
  "Bicycles travel free on regional trains and need a reservation on intercity trains.",
  "Children under 4 travel free without a seat. Children from 4 to 12 pay half fare.",
  "If your train is more than 60 minutes late, you can claim 25% of the fare back.",
  "If it's more than 120 minutes late, you can claim 50% of the fare back.",
  "Claims must be made within 3 months of the journey.",
  "We may change the timetable at short notice. We'll email you if your train is affected.",
];

export default function DialogScrolling() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>Fare terms</DialogTrigger>
      <DialogContent className="max-h-[28rem]">
        <DialogHeader>
          <DialogTitle>Fare terms</DialogTitle>
          <DialogDescription>Saver fare, Lisbon to Porto.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <ol className="grid list-decimal gap-3 ps-5 text-muted-foreground">
            {terms.map((term) => (
              <li key={term}>{term}</li>
            ))}
          </ol>
        </DialogBody>
        <DialogFooter showCloseButton>
          <DialogClose render={<Button variant="primary" />}>
            Accept
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
