"use client";

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@neomorphic-react/ui/attachment";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@neomorphic-react/ui/input-group";
import { ArrowUp, FileSpreadsheet, FileText, X } from "lucide-react";
import { useState } from "react";

const picked = [
  { name: "q3-forecast.xlsx", detail: "Sheet · 840 KB", icon: FileSpreadsheet },
  { name: "board-notes.pdf", detail: "PDF · 2.1 MB", icon: FileText },
  { name: "hiring-plan.pdf", detail: "PDF · 460 KB", icon: FileText },
];

export default function AttachmentInContext() {
  const [files, setFiles] = useState(picked);
  const [text, setText] = useState("Here's everything for Thursday's review.");
  const [sent, setSent] = useState("");
  const empty = !text.trim() && files.length === 0;

  return (
    <form
      className="grid w-full max-w-md gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(`Sent with ${files.length} of ${picked.length} files.`);
        setFiles([]);
        setText("");
      }}
    >
      <InputGroup className="rounded-3xl">
        {files.length > 0 ? (
          <InputGroupAddon align="block-start" className="px-2 pt-2">
            <AttachmentGroup aria-label="Attached files" role="group">
              {files.map(({ name, detail, icon: Icon }) => (
                <Attachment key={name} size="sm" state="idle">
                  <AttachmentMedia>
                    <Icon />
                  </AttachmentMedia>
                  <AttachmentContent>
                    <AttachmentTitle>{name}</AttachmentTitle>
                    <AttachmentDescription>{detail}</AttachmentDescription>
                  </AttachmentContent>
                  <AttachmentActions>
                    <AttachmentAction
                      aria-label={`Remove ${name}`}
                      icon={<X />}
                      onClick={() =>
                        setFiles((current) =>
                          current.filter((file) => file.name !== name)
                        )
                      }
                    />
                  </AttachmentActions>
                </Attachment>
              ))}
            </AttachmentGroup>
          </InputGroupAddon>
        ) : null}
        <InputGroupTextarea
          aria-label="Message"
          className="max-h-40 px-5"
          onChange={(event) => setText(event.target.value)}
          placeholder="Write a message…"
          rows={1}
          value={text}
        />
        <InputGroupAddon
          align="block-end"
          className="w-full justify-end px-3 pb-3"
        >
          <InputGroupButton
            aria-label="Send"
            disabled={empty}
            icon={<ArrowUp />}
            type="submit"
            variant="primary"
          />
        </InputGroupAddon>
      </InputGroup>
      <output className="px-4 text-muted-foreground text-xs">{sent}</output>
    </form>
  );
}
