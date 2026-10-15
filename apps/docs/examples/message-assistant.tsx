"use client";

import { Bubble, BubbleContent } from "@neomorphic-react/ui/bubble";
import { Button } from "@neomorphic-react/ui/button";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "@neomorphic-react/ui/message";
import { Check, Copy, RefreshCw, Sparkles } from "lucide-react";
import { useState } from "react";

const reply =
  "Start with the invite step. Teams create workspaces but wait to add collaborators, so compare invite drop-off by account size before changing the onboarding flow.";

export default function MessageAssistant() {
  const [copied, setCopied] = useState(false);

  return (
    <Message className="max-w-lg">
      <MessageAvatar>
        <span className="inset-shadow-neu-flat flex size-8 items-center justify-center rounded-full bg-neu-convex shadow-neu-sm">
          <Sparkles aria-hidden="true" className="size-4" />
        </span>
      </MessageAvatar>
      <MessageContent>
        <MessageHeader>Assistant</MessageHeader>
        <Bubble variant="ghost">
          <BubbleContent>{reply}</BubbleContent>
        </Bubble>
        <MessageFooter className="gap-1">
          <Button
            aria-label={copied ? "Copied" : "Copy"}
            icon={copied ? <Check /> : <Copy />}
            onClick={() => {
              navigator.clipboard?.writeText(reply);
              setCopied(true);
            }}
            shape="pill"
            size="sm"
            variant="ghost"
          />
          <Button
            aria-label="Regenerate"
            icon={<RefreshCw />}
            shape="pill"
            size="sm"
            variant="ghost"
          />
        </MessageFooter>
      </MessageContent>
    </Message>
  );
}
