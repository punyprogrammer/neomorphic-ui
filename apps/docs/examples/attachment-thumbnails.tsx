"use client";

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@neomorphic-react/ui/attachment";
import { X } from "lucide-react";
import { useState } from "react";

const screenshots = [
  "dashboard.jpg",
  "checkout.jpg",
  "shop.jpg",
  "fitness.jpg",
  "podcasts.jpg",
];

export default function AttachmentThumbnails() {
  const [files, setFiles] = useState(screenshots);

  return (
    <AttachmentGroup
      aria-label="Attached screenshots"
      className="w-full max-w-md"
      role="group"
    >
      {files.map((file) => (
        <Attachment key={file} orientation="vertical">
          <AttachmentTrigger
            aria-label={`Open ${file}`}
            render={
              <a href={`/showcase/${file}`} rel="noreferrer" target="_blank" />
            }
          />
          <AttachmentMedia variant="image">
            <img alt="" height={96} src={`/showcase/${file}`} width={96} />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{file}</AttachmentTitle>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction
              aria-label={`Remove ${file}`}
              icon={<X />}
              onClick={() =>
                setFiles((current) => current.filter((item) => item !== file))
              }
            />
          </AttachmentActions>
        </Attachment>
      ))}
    </AttachmentGroup>
  );
}
