"use client";

import type * as React from "react";

import { cn } from "./utils";

// ---------------------------------------------------------------------------
// MessageGroup
// ---------------------------------------------------------------------------

type MessageGroupProps = React.ComponentProps<"div">;

/** Messages from one sender in a row, closer together than separate turns. */
function MessageGroup({ className, ...props }: MessageGroupProps) {
  return (
    <div
      className={cn("flex min-w-0 flex-col gap-2", className)}
      data-slot="message-group"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Message
// ---------------------------------------------------------------------------

interface MessageProps extends React.ComponentProps<"div"> {
  /**
   * `end` puts the avatar on the inline-end side and aligns the content
   * there, for your own messages.
   * @default "start"
   */
  align?: "start" | "end";
}

/**
 * One turn in a conversation: a `MessageAvatar` beside a `MessageContent`
 * holding a `MessageHeader`, one or more `Bubble`s and a `MessageFooter`.
 */
function Message({ align = "start", className, ...props }: MessageProps) {
  return (
    <div
      className={cn(
        "group/message relative flex w-full min-w-0 gap-2 text-sm data-[align=end]:flex-row-reverse",
        className
      )}
      data-align={align}
      data-slot="message"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Parts
// ---------------------------------------------------------------------------

type MessageAvatarProps = React.ComponentProps<"div">;

/**
 * Holds an `Avatar` (or initials) at the bottom of the turn, level with the
 * last bubble; it lifts above a `MessageFooter`.
 */
function MessageAvatar({ className, ...props }: MessageAvatarProps) {
  return (
    <div
      className={cn(
        "flex w-fit min-w-8 shrink-0 items-center justify-center self-end group-has-data-[slot=message-footer]/message:-translate-y-6",
        className
      )}
      data-slot="message-avatar"
      {...props}
    />
  );
}

type MessageContentProps = React.ComponentProps<"div">;

/** The column of header, bubbles and footer. */
function MessageContent({ className, ...props }: MessageContentProps) {
  return (
    <div
      className={cn(
        "wrap-break-word flex w-full min-w-0 flex-col gap-1.5 group-data-[align=end]/message:*:data-slot:self-end",
        className
      )}
      data-slot="message-content"
      {...props}
    />
  );
}

type MessageHeaderProps = React.ComponentProps<"div">;

/** The sender's name, and optionally a time, above the bubbles. */
function MessageHeader({ className, ...props }: MessageHeaderProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 max-w-full items-center gap-2 px-3 font-medium text-muted-foreground text-xs group-has-data-[variant=ghost]/message:px-0",
        className
      )}
      data-slot="message-header"
      {...props}
    />
  );
}

type MessageFooterProps = React.ComponentProps<"div">;

/** A time, a delivery state or message actions under the bubbles. */
function MessageFooter({ className, ...props }: MessageFooterProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 max-w-full items-center gap-2 px-3 text-muted-foreground text-xs tabular-nums group-has-data-[variant=ghost]/message:px-0 group-data-[align=end]/message:justify-end",
        className
      )}
      data-slot="message-footer"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  MessageAvatarProps,
  MessageContentProps,
  MessageFooterProps,
  MessageGroupProps,
  MessageHeaderProps,
  MessageProps,
};
export {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
};
