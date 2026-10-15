"use client";

import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@neomorphic-react/ui/attachment";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@neomorphic-react/ui/avatar";
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@neomorphic-react/ui/bubble";
import { Button } from "@neomorphic-react/ui/button";
import { Chip } from "@neomorphic-react/ui/chip";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockWrapButton,
} from "@neomorphic-react/ui/code-block";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@neomorphic-react/ui/hover-card";
import { Marker, MarkerContent, MarkerIcon } from "@neomorphic-react/ui/marker";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "@neomorphic-react/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@neomorphic-react/ui/message-scroller";
import { Skeleton } from "@neomorphic-react/ui/skeleton";
import { Spinner } from "@neomorphic-react/ui/spinner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@neomorphic-react/ui/table";
import { toast } from "@neomorphic-react/ui/toast";
import { Toggle } from "@neomorphic-react/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@neomorphic-react/ui/tooltip";
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@neomorphic-react/ui/trace";
import { TypographyBlockquote } from "@neomorphic-react/ui/typography";
import {
  Brain,
  CalendarDays,
  Copy,
  Feather,
  FileSpreadsheet,
  FileText,
  Globe,
  History as HistoryIcon,
  RotateCcw,
  Search,
  ThumbsDown,
  ThumbsUp,
  Volume2,
} from "lucide-react";
import type { ReactNode } from "react";

import type { ChatMessage, FileRef, StepIcon, TraceStep } from "@/lib/chat";
import { PEOPLE } from "@/lib/photos";

import { useChat } from "./chat-state";
import { Checkin } from "./checkin";
import { Welcome } from "./welcome";

const STEP_ICONS: Record<StepIcon, ReactNode> = {
  file: <FileSpreadsheet />,
  calendar: <CalendarDays />,
  search: <Search />,
  memory: <HistoryIcon />,
  think: <Brain />,
};

export function Transcript() {
  const { active, busy, loading } = useChat();

  if (loading) {
    return <TranscriptSkeleton />;
  }
  if (active.entries.length === 0) {
    return <Welcome />;
  }

  const lastAssistant = active.entries.findLast(
    (e): e is ChatMessage => e.type === "message" && e.role === "assistant"
  );

  return (
    <MessageScrollerProvider autoScroll key={active.id}>
      <MessageScroller>
        <MessageScrollerViewport>
          <MessageScrollerContent
            aria-busy={busy || undefined}
            aria-label={`Conversation: ${active.title}`}
            className="mx-auto w-full max-w-3xl gap-8 px-4 pt-6 pb-10 sm:px-6"
          >
            {active.entries.map((entry) => {
              if (entry.type === "marker") {
                return (
                  <MessageScrollerItem key={entry.id} messageId={entry.id}>
                    <Marker variant="separator">
                      <MarkerContent>{entry.label}</MarkerContent>
                    </Marker>
                  </MessageScrollerItem>
                );
              }
              return (
                <MessageScrollerItem
                  key={entry.id}
                  messageId={entry.id}
                  scrollAnchor={entry.role === "user"}
                >
                  {entry.role === "user" ? (
                    <UserMessage message={entry} />
                  ) : (
                    <AssistantMessage
                      isLast={entry.id === lastAssistant?.id}
                      message={entry}
                    />
                  )}
                </MessageScrollerItem>
              );
            })}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton className="bottom-4 normal-case tracking-normal">
          Latest
        </MessageScrollerButton>
      </MessageScroller>
    </MessageScrollerProvider>
  );
}

// ---------------------------------------------------------------------------
// User
// ---------------------------------------------------------------------------

function UserMessage({ message }: { message: ChatMessage }) {
  return (
    <Message align="end">
      <MessageAvatar>
        <Avatar size="sm">
          <AvatarImage alt="" src={PEOPLE.amardeep} />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <MessageHeader>You</MessageHeader>
        {message.files ? <Files files={message.files} /> : null}
        {message.text ? (
          <Bubble align="end">
            <BubbleContent>{message.text}</BubbleContent>
          </Bubble>
        ) : null}
        <MessageFooter>{message.time}</MessageFooter>
      </MessageContent>
    </Message>
  );
}

export function Files({ files }: { files: FileRef[] }) {
  return (
    <AttachmentGroup className="-mx-2 max-w-full">
      {files.map((file) =>
        file.kind === "image" && file.src ? (
          <Attachment key={file.id} orientation="vertical" size="sm">
            <AttachmentMedia variant="image">
              <img alt="" src={file.src} />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>{file.name}</AttachmentTitle>
              <AttachmentDescription>{file.size}</AttachmentDescription>
            </AttachmentContent>
            <AttachmentTrigger
              aria-label={`Open ${file.name}`}
              onClick={() => toast({ title: `Opened ${file.name}` })}
            />
          </Attachment>
        ) : (
          <Attachment key={file.id} size="sm">
            <AttachmentMedia>
              {file.kind === "sheet" ? <FileSpreadsheet /> : <FileText />}
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>{file.name}</AttachmentTitle>
              <AttachmentDescription>{file.size}</AttachmentDescription>
            </AttachmentContent>
            <AttachmentTrigger
              aria-label={`Open ${file.name}`}
              onClick={() => toast({ title: `Opened ${file.name}` })}
            />
          </Attachment>
        )
      )}
    </AttachmentGroup>
  );
}

// ---------------------------------------------------------------------------
// Assistant
// ---------------------------------------------------------------------------

function StillAvatar() {
  return (
    <Avatar size="sm">
      <AvatarFallback className="text-primary">
        <Feather className="size-4" />
      </AvatarFallback>
    </Avatar>
  );
}

function AssistantMessage({
  isLast,
  message,
}: {
  isLast: boolean;
  message: ChatMessage;
}) {
  const chat = useChat();
  const thinking = message.status === "thinking";
  const live = thinking || message.status === "streaming";
  const paragraphs = (message.text ?? "").split("\n\n").filter(Boolean);
  const vote = chat.feedback[message.id];
  const variant =
    chat.settings.model === "still-2-deep"
      ? "Deep"
      : chat.settings.model === "still-mini"
        ? "Mini"
        : null;

  return (
    <Message>
      <MessageAvatar>
        <StillAvatar />
      </MessageAvatar>
      <MessageContent className="gap-3">
        <MessageHeader>
          Still
          {variant ? (
            <Chip size="sm" variant="inset">
              {variant}
            </Chip>
          ) : null}
        </MessageHeader>

        {message.steps?.length ? (
          <Steps open={live} steps={message.steps} />
        ) : null}

        {thinking ? (
          <Marker role="status" shimmer>
            <MarkerIcon>
              <Spinner size="sm" />
            </MarkerIcon>
            <MarkerContent>Thinking it through…</MarkerContent>
          </Marker>
        ) : null}

        {paragraphs.length > 0 ? (
          <BubbleGroup>
            {paragraphs.map((paragraph, index) => (
              <Bubble key={index} variant="secondary">
                <BubbleContent>{paragraph}</BubbleContent>
                {message.reaction && index === paragraphs.length - 1 ? (
                  <BubbleReactions
                    aria-label="You reacted with a leaf"
                    role="img"
                  >
                    {message.reaction}
                  </BubbleReactions>
                ) : null}
              </Bubble>
            ))}
          </BubbleGroup>
        ) : null}

        {message.table ? <PlanTableView table={message.table} /> : null}

        {message.code ? (
          <CodeBlock
            className="w-full [&_[data-slot=code-block-footer]_button]:normal-case [&_[data-slot=code-block-footer]_button]:tracking-normal"
            size="sm"
          >
            <CodeBlockHeader>
              <CodeBlockTitle>
                <FileText />
                {message.code.title}
              </CodeBlockTitle>
              <CodeBlockActions>
                <CodeBlockWrapButton />
                <CodeBlockCopyButton value={message.code.code} />
              </CodeBlockActions>
            </CodeBlockHeader>
            <CodeBlockContent lineNumbers maxLines={12}>
              {message.code.code}
            </CodeBlockContent>
          </CodeBlock>
        ) : null}

        {message.after ? (
          <Bubble variant="secondary">
            <BubbleContent>{message.after}</BubbleContent>
          </Bubble>
        ) : null}

        {message.quote ? (
          <TypographyBlockquote className="my-1 text-sm">
            {message.quote}
          </TypographyBlockquote>
        ) : null}

        {message.sources ? <Sources sources={message.sources} /> : null}

        {message.checkin ? <Checkin /> : null}

        {message.status === "stopped" ? (
          <Marker>
            <MarkerContent>You stopped this reply.</MarkerContent>
          </Marker>
        ) : null}

        {isLast && message.status === "done" && message.suggestions ? (
          <div className="flex flex-wrap gap-2 pt-1">
            {message.suggestions.map((suggestion) => (
              <Bubble className="max-w-full" key={suggestion} variant="outline">
                <BubbleContent
                  render={
                    <button
                      disabled={chat.busy}
                      onClick={() => chat.send(suggestion)}
                      type="button"
                    />
                  }
                >
                  {suggestion}
                </BubbleContent>
              </Bubble>
            ))}
          </div>
        ) : null}

        {live ? null : (
          <MessageFooter className="gap-1">
            <span className="me-1">{message.time}</span>
            <Action
              icon={<Copy />}
              label="Copy"
              onClick={() => {
                navigator.clipboard?.writeText(message.text ?? "");
                toast({ title: "Copied to clipboard" });
              }}
            />
            <Action
              icon={<Volume2 />}
              label="Read aloud"
              onClick={() => chat.speak(message.text ?? "")}
            />
            {isLast ? (
              <Action
                disabled={chat.busy}
                icon={<RotateCcw />}
                label="Try again"
                onClick={chat.regenerate}
              />
            ) : null}
            <Toggle
              aria-label="Helpful"
              className="size-7"
              iconFill
              onPressedChange={(pressed) =>
                chat.setFeedback(message.id, pressed ? "up" : undefined)
              }
              pressed={vote === "up"}
              size="sm"
            >
              <ThumbsUp />
            </Toggle>
            <Toggle
              aria-label="Not helpful"
              className="size-7"
              iconFill
              onPressedChange={(pressed) =>
                chat.setFeedback(message.id, pressed ? "down" : undefined)
              }
              pressed={vote === "down"}
              size="sm"
            >
              <ThumbsDown />
            </Toggle>
          </MessageFooter>
        )}
      </MessageContent>
    </Message>
  );
}

function Action({
  disabled,
  icon,
  label,
  onClick,
}: {
  disabled?: boolean;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            aria-label={label}
            className="size-7"
            disabled={disabled}
            icon={icon}
            onClick={onClick}
            size="sm"
            variant="ghost"
          />
        }
      />
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

function Steps({ open, steps }: { open: boolean; steps: TraceStep[] }) {
  const running = steps.some((step) => step.status);
  const lines = (
    <Trace>
      {steps.map((step) => {
        const line = (
          <TraceLine key={step.id} status={step.status}>
            <TraceIcon>
              {step.status === "running" ? (
                <Spinner size="sm" />
              ) : (
                STEP_ICONS[step.icon]
              )}
            </TraceIcon>
            <TraceTitle>{step.title}</TraceTitle>
            <TraceDescription>{step.detail}</TraceDescription>
          </TraceLine>
        );
        return step.output && !step.status ? (
          <TraceCollapsible key={step.id}>
            <TraceCollapsibleTrigger>{line}</TraceCollapsibleTrigger>
            <TraceCollapsibleContent>{step.output}</TraceCollapsibleContent>
          </TraceCollapsible>
        ) : (
          <div key={step.id}>{line}</div>
        );
      })}
    </Trace>
  );

  if (open || running) {
    return lines;
  }
  return (
    <TraceCollapsible>
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceIcon>
            <Brain />
          </TraceIcon>
          <TraceTitle>Worked through {steps.length} steps</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>{lines}</TraceCollapsibleContent>
    </TraceCollapsible>
  );
}

function PlanTableView({
  table,
}: {
  table: NonNullable<ChatMessage["table"]>;
}) {
  return (
    <Table variant="raised">
      <TableCaption>{table.caption}</TableCaption>
      <TableHeader>
        <TableRow>
          {table.columns.map((column) => (
            <TableHead key={column}>{column}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {table.rows.map((row) => (
          <TableRow key={row.join()}>
            {row.map((cell, index) => (
              <TableCell
                className={
                  index === 0
                    ? "font-medium tabular-nums"
                    : "whitespace-normal text-pretty"
                }
                key={cell}
              >
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function Sources({
  sources,
}: {
  sources: NonNullable<ChatMessage["sources"]>;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-muted-foreground text-xs">Sources</span>
      {sources.map((source) => (
        <HoverCard key={source.href}>
          <HoverCardTrigger
            className="rounded-full outline-none focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2"
            href={source.href}
            rel="noreferrer"
            target="_blank"
          >
            <Chip icon={<Globe />} size="sm">
              {source.site}
            </Chip>
          </HoverCardTrigger>
          <HoverCardContent className="grid w-72 gap-1.5">
            <p className="text-muted-foreground text-xs">{source.site}</p>
            <p className="font-medium text-foreground">{source.title}</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {source.summary}
            </p>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
}

function TranscriptSkeleton() {
  return (
    <output
      aria-busy="true"
      aria-label="Loading conversation"
      className="mx-auto grid w-full max-w-3xl gap-8 px-4 pt-8 sm:px-6"
    >
      <div className="flex justify-end">
        <Skeleton className="h-12 w-2/3 rounded-2xl" />
      </div>
      <div className="flex gap-3">
        <Skeleton className="size-8 shrink-0" shape="circle" />
        <div className="grid flex-1 gap-2.5">
          <Skeleton className="w-1/3" shape="line" />
          <Skeleton className="h-20 w-11/12 rounded-2xl" />
          <Skeleton className="h-12 w-3/4 rounded-2xl" />
        </div>
      </div>
    </output>
  );
}
