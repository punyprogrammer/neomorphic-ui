"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@neomorphic-react/ui/input-group";
import { ArrowUp, Paperclip } from "lucide-react";
import { useState } from "react";

export default function InputGroupInContext() {
  const [text, setText] = useState("");
  const [sent, setSent] = useState<{ id: number; text: string }[]>([]);
  const empty = !text.trim();

  const send = () => {
    if (empty) {
      return;
    }
    setSent((current) => [
      ...current,
      { id: current.length, text: text.trim() },
    ]);
    setText("");
  };

  return (
    <div className="grid w-full max-w-md gap-4">
      {sent.length > 0 ? (
        <ul className="grid justify-items-end gap-2 text-sm">
          {sent.slice(-2).map((message) => (
            <li
              className="rounded-2xl bg-primary px-4 py-2 text-primary-foreground"
              key={message.id}
            >
              {message.text}
            </li>
          ))}
        </ul>
      ) : null}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          send();
        }}
      >
        <InputGroup className="rounded-3xl">
          <InputGroupTextarea
            aria-label="Message"
            className="max-h-40 min-h-14 px-5 pt-4"
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                send();
              }
            }}
            placeholder="Write a message…"
            rows={1}
            value={text}
          />
          <InputGroupAddon align="block-end" className="w-full gap-2 px-3 pb-3">
            <InputGroupButton aria-label="Attach a file" icon={<Paperclip />} />
            <InputGroupText className="ms-auto text-xs">
              Enter to send, Shift + Enter for a new line
            </InputGroupText>
            <InputGroupButton
              aria-label="Send message"
              disabled={empty}
              icon={<ArrowUp />}
              type="submit"
              variant="primary"
            />
          </InputGroupAddon>
        </InputGroup>
      </form>
    </div>
  );
}
