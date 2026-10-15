"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@neomorphic-react/ui/alert-dialog";
import { Button } from "@neomorphic-react/ui/button";
import { Bluetooth } from "lucide-react";

export default function AlertDialogSmall() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button />}>
        Pair headphones
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="text-primary">
            <Bluetooth />
          </AlertDialogMedia>
          <AlertDialogTitle>Allow pairing?</AlertDialogTitle>
          <AlertDialogDescription>
            "Studio Buds" wants to connect to this device.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Don't allow</AlertDialogCancel>
          <AlertDialogAction>Allow</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
