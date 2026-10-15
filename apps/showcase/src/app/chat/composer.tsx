"use client";

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentProgress,
  AttachmentTitle,
} from "@neomorphic-react/ui/attachment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@neomorphic-react/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@neomorphic-react/ui/input-group";
import { Kbd } from "@neomorphic-react/ui/kbd";
import { Toggle } from "@neomorphic-react/ui/toggle";
import {
  ArrowUp,
  Brain,
  FileSpreadsheet,
  FileText,
  ImagePlus,
  Paperclip,
  Plus,
  Square,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { type FileRef, uid } from "@/lib/chat";

import { useChat } from "./chat-state";

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function Composer() {
  const chat = useChat();
  const [text, setText] = useState("");
  const [files, setFiles] = useState<FileRef[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);

  const uploading = files.some((file) => file.progress !== undefined);
  const empty = !text.trim() && files.length === 0;

  // Uploads are simulated: each picked file fills its bar, then settles.
  useEffect(() => {
    if (!files.some((file) => file.progress !== undefined)) {
      return;
    }
    const timer = setTimeout(() => {
      setFiles((current) =>
        current.map((file) => {
          if (file.progress === undefined) {
            return file;
          }
          return file.progress >= 100
            ? { ...file, progress: undefined }
            : { ...file, progress: Math.min(100, file.progress + 17) };
        })
      );
    }, 160);
    return () => clearTimeout(timer);
  }, [files]);

  // Focus the box whenever a different chat opens.
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs per conversation
  useEffect(() => {
    textarea.current?.focus();
  }, [chat.active.id]);

  const add = (list: FileList | null) => {
    if (!list) {
      return;
    }
    const picked = Array.from(list).map<FileRef>((file) => {
      const image = file.type.startsWith("image/");
      return {
        id: uid("f"),
        name: file.name,
        size: formatSize(file.size),
        kind: image
          ? "image"
          : /csv|sheet|excel/.test(file.type)
            ? "sheet"
            : "doc",
        src: image ? URL.createObjectURL(file) : undefined,
        progress: 0,
      };
    });
    setFiles((current) => [...current, ...picked]);
  };

  const pick = (accept: string) => {
    if (fileInput.current) {
      fileInput.current.accept = accept;
      fileInput.current.click();
    }
  };

  const submit = () => {
    if (chat.busy || uploading || empty) {
      return;
    }
    chat.send(text, files);
    setText("");
    setFiles([]);
  };

  return (
    <div className="mx-auto grid w-full max-w-3xl gap-2 px-4 pb-4 sm:px-6">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <InputGroup className="rounded-3xl">
          {files.length > 0 ? (
            <InputGroupAddon align="block-start" className="w-full px-2 pt-2">
              <AttachmentGroup className="w-full">
                {files.map((file) => (
                  <Attachment
                    className="w-56"
                    key={file.id}
                    size="sm"
                    state={file.progress === undefined ? "idle" : "uploading"}
                  >
                    <AttachmentMedia
                      variant={
                        file.kind === "image" && file.src ? "image" : "icon"
                      }
                    >
                      {file.kind === "image" && file.src ? (
                        <img alt="" src={file.src} />
                      ) : file.kind === "sheet" ? (
                        <FileSpreadsheet />
                      ) : (
                        <FileText />
                      )}
                    </AttachmentMedia>
                    <AttachmentContent>
                      <AttachmentTitle>{file.name}</AttachmentTitle>
                      <AttachmentDescription>
                        {file.progress === undefined
                          ? file.size
                          : `Uploading… ${file.progress}%`}
                      </AttachmentDescription>
                    </AttachmentContent>
                    <AttachmentActions>
                      <AttachmentAction
                        aria-label={`Remove ${file.name}`}
                        icon={<X />}
                        onClick={() =>
                          setFiles((current) =>
                            current.filter((f) => f.id !== file.id)
                          )
                        }
                      />
                    </AttachmentActions>
                    {file.progress === undefined ? null : (
                      <AttachmentProgress
                        aria-label={`Uploading ${file.name}`}
                        value={file.progress}
                      />
                    )}
                  </Attachment>
                ))}
              </AttachmentGroup>
            </InputGroupAddon>
          ) : null}

          <InputGroupTextarea
            aria-label="Message Still"
            className="max-h-48 min-h-14 px-5 pt-4"
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey &&
                !event.nativeEvent.isComposing
              ) {
                event.preventDefault();
                submit();
              }
            }}
            placeholder="Share what's on your mind…"
            ref={textarea}
            rows={1}
            value={text}
          />

          <InputGroupAddon align="block-end" className="w-full gap-2 px-3 pb-3">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <InputGroupButton
                    aria-label="Add files and more"
                    icon={<Plus />}
                    variant="default"
                  />
                }
              />
              <DropdownMenuContent align="start" side="top">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Add to this message</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => pick("")}>
                    <Paperclip />
                    Upload a file
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => pick("image/*")}>
                    <ImagePlus />
                    Add a photo
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() =>
                    setFiles((current) => [
                      ...current,
                      {
                        id: uid("f"),
                        kind: "sheet",
                        name: "sleep-log.csv",
                        size: "14 nights · 3 KB",
                        progress: 0,
                      },
                    ])
                  }
                >
                  <FileSpreadsheet />
                  Attach my sleep log
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Toggle
              className="h-8 gap-1.5 px-3 text-xs normal-case tracking-normal"
              onPressedChange={(pressed) => chat.update("deep", pressed)}
              pressed={chat.settings.deep}
              size="sm"
            >
              <Brain />
              Think deeply
            </Toggle>

            <InputGroupText className="ms-auto hidden gap-1 text-xs sm:flex">
              <Kbd size="sm">↵</Kbd> send
              <Kbd className="ms-2" size="sm">
                ⇧ ↵
              </Kbd>
              new line
            </InputGroupText>

            {chat.busy ? (
              <InputGroupButton
                aria-label="Stop replying"
                className="ms-auto sm:ms-0"
                icon={<Square className="fill-current" />}
                onClick={chat.stop}
                variant="default"
              />
            ) : (
              <InputGroupButton
                aria-label="Send message"
                className="ms-auto sm:ms-0"
                disabled={empty || uploading}
                icon={<ArrowUp />}
                type="submit"
                variant="primary"
              />
            )}
          </InputGroupAddon>
        </InputGroup>
        <input
          className="hidden"
          multiple
          onChange={(event) => {
            add(event.target.files);
            event.target.value = "";
          }}
          ref={fileInput}
          type="file"
        />
      </form>
      <p className="text-center text-muted-foreground text-xs">
        Still is a demo: replies are written ahead of time and aren't medical
        advice.
      </p>
    </div>
  );
}
