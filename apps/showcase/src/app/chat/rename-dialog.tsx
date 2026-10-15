"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@neomorphic-react/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@neomorphic-react/ui/field";
import { Input } from "@neomorphic-react/ui/input";
import { useEffect, useState } from "react";

import type { Conversation } from "@/lib/chat";

import { useChat } from "./chat-state";

interface RenameDialogProps {
  conversation: Conversation | null;
  onOpenChange: (open: boolean) => void;
}

export function RenameDialog({
  conversation,
  onOpenChange,
}: RenameDialogProps) {
  const { rename } = useChat();
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (conversation) {
      setTitle(conversation.title);
    }
  }, [conversation]);

  return (
    <Dialog onOpenChange={onOpenChange} open={conversation !== null}>
      <DialogContent size="sm">
        <form
          className="grid gap-6"
          onSubmit={(event) => {
            event.preventDefault();
            if (conversation && title.trim()) {
              rename(conversation.id, title.trim());
              onOpenChange(false);
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>Rename chat</DialogTitle>
            <DialogDescription>
              A short name helps you find it again later.
            </DialogDescription>
          </DialogHeader>
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input
              autoFocus
              maxLength={60}
              onChange={(event) => setTitle(event.target.value)}
              value={title}
            />
            <FieldDescription>
              {60 - title.length} characters left
            </FieldDescription>
          </Field>
          <DialogFooter showCloseButton>
            <Button
              className="normal-case tracking-normal"
              disabled={!title.trim()}
              type="submit"
              variant="primary"
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
