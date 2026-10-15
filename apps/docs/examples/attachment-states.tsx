"use client";

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentProgress,
  AttachmentTitle,
} from "@neomorphic-react/ui/attachment";
import { Spinner } from "@neomorphic-react/ui/spinner";
import { FileText, FileWarning, Paperclip, RotateCw } from "lucide-react";

export default function AttachmentStates() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <Attachment state="idle">
        <AttachmentMedia>
          <Paperclip />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>notes.txt</AttachmentTitle>
          <AttachmentDescription>Ready to send</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="uploading">
        <AttachmentMedia>
          <Spinner aria-hidden="true" className="size-4" size="sm" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>holiday.mov</AttachmentTitle>
          <AttachmentDescription>Uploading… 40%</AttachmentDescription>
        </AttachmentContent>
        <AttachmentProgress aria-label="Uploading holiday.mov" value={40} />
      </Attachment>
      <Attachment state="processing">
        <AttachmentMedia>
          <Spinner aria-hidden="true" className="size-4" size="sm" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>budget.xlsx</AttachmentTitle>
          <AttachmentDescription>Reading the sheet…</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="error">
        <AttachmentMedia>
          <FileWarning />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>raw-footage.mov</AttachmentTitle>
          <AttachmentDescription>
            Too large: the limit is 100 MB
          </AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction
            aria-label="Retry raw-footage.mov"
            icon={<RotateCw />}
          />
        </AttachmentActions>
      </Attachment>
      <Attachment state="done">
        <AttachmentMedia>
          <FileText />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>contract.pdf</AttachmentTitle>
          <AttachmentDescription>PDF · 180 KB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    </div>
  );
}
