"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@neomorphic-react/ui/dialog";

export default function DialogCloseButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      <Dialog>
        <DialogTrigger render={<Button />}>Corner button</DialogTrigger>
        <DialogContent size="sm">
          <DialogHeader>
            <DialogTitle>What's new</DialogTitle>
            <DialogDescription>
              You can now pin up to five playlists to the top of your library.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger render={<Button />}>Footer button</DialogTrigger>
        <DialogContent showCloseButton={false} size="sm">
          <DialogHeader>
            <DialogTitle>Backup complete</DialogTitle>
            <DialogDescription>
              2,418 photos were saved to your cloud library.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>
    </div>
  );
}
