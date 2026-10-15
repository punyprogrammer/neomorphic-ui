"use client";

import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@neomorphic-react/ui/attachment";
import { FileText } from "lucide-react";

const sizes = ["default", "sm", "xs"] as const;

export default function AttachmentSizes() {
  return (
    <div className="flex flex-col items-start gap-4">
      {sizes.map((size) => (
        <Attachment key={size} size={size}>
          <AttachmentMedia>
            <FileText />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>brief.pdf</AttachmentTitle>
            {size === "xs" ? null : (
              <AttachmentDescription>PDF · 96 KB</AttachmentDescription>
            )}
          </AttachmentContent>
        </Attachment>
      ))}
    </div>
  );
}
