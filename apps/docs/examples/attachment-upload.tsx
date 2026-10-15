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
import { Button } from "@neomorphic-react/ui/button";
import { Spinner } from "@neomorphic-react/ui/spinner";
import { FileText, X } from "lucide-react";
import { useEffect, useState } from "react";

type UploadState = "idle" | "uploading" | "done";

const labels: Record<UploadState, string> = {
  idle: "Send",
  uploading: "Cancel",
  done: "Start again",
};

export default function AttachmentUpload() {
  const [state, setState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);
  const uploading = state === "uploading";

  useEffect(() => {
    if (!uploading) {
      return;
    }
    if (progress >= 100) {
      setState("done");
      return;
    }
    const timeout = setTimeout(() => setProgress(progress + 10), 250);
    return () => clearTimeout(timeout);
  }, [uploading, progress]);

  const reset = () => {
    setState("idle");
    setProgress(0);
  };

  return (
    <div className="flex w-full max-w-xs flex-col items-start gap-4">
      <Attachment className="w-full" state={state}>
        <AttachmentMedia>
          {uploading ? (
            <Spinner aria-hidden="true" className="size-4" size="sm" />
          ) : (
            <FileText />
          )}
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>lease-agreement.pdf</AttachmentTitle>
          <AttachmentDescription>
            {state === "idle" ? "Ready to send" : null}
            {uploading ? `Uploading… ${progress}%` : null}
            {state === "done" ? "PDF · 1.2 MB" : null}
          </AttachmentDescription>
        </AttachmentContent>
        {uploading ? (
          <>
            <AttachmentActions>
              <AttachmentAction
                aria-label="Cancel upload"
                icon={<X />}
                onClick={reset}
              />
            </AttachmentActions>
            <AttachmentProgress
              aria-label="Uploading lease-agreement.pdf"
              value={progress}
            />
          </>
        ) : null}
      </Attachment>
      <Button
        onClick={state === "idle" ? () => setState("uploading") : reset}
        size="sm"
        variant={state === "idle" ? "primary" : "default"}
      >
        {labels[state]}
      </Button>
    </div>
  );
}
