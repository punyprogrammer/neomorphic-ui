"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@neomorphic-react/ui/alert-dialog";
import { Button } from "@neomorphic-react/ui/button";
import { useState } from "react";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function AlertDialogAsync() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  async function cancelSubscription() {
    setPending(true);
    await wait(1500);
    setPending(false);
    setOpen(false);
  }

  return (
    <AlertDialog
      onOpenChange={(next) => {
        if (!pending) {
          setOpen(next);
        }
      }}
      open={open}
    >
      <AlertDialogTrigger render={<Button />}>
        Cancel subscription
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel your Pro plan?</AlertDialogTitle>
          <AlertDialogDescription>
            You'll keep Pro features until 30 November. After that, projects
            over the free limit become read-only.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Keep Pro</AlertDialogCancel>
          <AlertDialogAction
            closeOnClick={false}
            isLoading={pending}
            onClick={cancelSubscription}
            variant="destructive"
          >
            Cancel plan
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
