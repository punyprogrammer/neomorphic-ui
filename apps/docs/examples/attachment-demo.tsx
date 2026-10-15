"use client";

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@neomorphic-react/ui/attachment";
import { FileText, X } from "lucide-react";

export default function AttachmentDemo() {
  return (
    <Attachment>
      <AttachmentMedia>
        <FileText />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>quarterly-report.pdf</AttachmentTitle>
        <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction
          aria-label="Remove quarterly-report.pdf"
          icon={<X />}
        />
      </AttachmentActions>
    </Attachment>
  );
}
