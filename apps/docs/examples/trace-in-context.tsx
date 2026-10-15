"use client";

import { Bubble, BubbleContent } from "@neomorphic-react/ui/bubble";
import { Button } from "@neomorphic-react/ui/button";
import {
  Message,
  MessageContent,
  MessageHeader,
} from "@neomorphic-react/ui/message";
import { Spinner } from "@neomorphic-react/ui/spinner";
import {
  Trace,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@neomorphic-react/ui/trace";
import { FileSearch, Globe, PenLine, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

const steps = [
  { title: "Read the order history", time: "0.4s", icon: <FileSearch /> },
  { title: "Checked the courier's tracking", time: "1.1s", icon: <Globe /> },
  { title: "Drafted a reply", time: "0.8s", icon: <PenLine /> },
];

function statusOf(index: number, step: number) {
  if (index === step) {
    return "running";
  }
  return index > step ? "pending" : undefined;
}

export default function TraceInContext() {
  const [step, setStep] = useState(0);
  const done = step >= steps.length;

  useEffect(() => {
    if (done) {
      return;
    }
    const timer = setTimeout(() => setStep((current) => current + 1), 1200);
    return () => clearTimeout(timer);
  }, [done]);

  return (
    <div className="grid w-full max-w-md gap-4">
      <Message>
        <MessageContent>
          <MessageHeader>Assistant</MessageHeader>
          <Trace aria-label="Assistant's steps" role="status">
            {steps.map((item, index) => (
              <TraceLine key={item.title} status={statusOf(index, step)}>
                <TraceIcon>
                  {index === step ? (
                    <Spinner aria-hidden="true" className="size-4" size="sm" />
                  ) : (
                    item.icon
                  )}
                </TraceIcon>
                <TraceTitle>{item.title}</TraceTitle>
                {index < step ? (
                  <TraceDescription>{item.time}</TraceDescription>
                ) : null}
              </TraceLine>
            ))}
          </Trace>
          {done ? (
            <Bubble variant="ghost">
              <BubbleContent>
                Order #4821 left the depot this morning and should arrive on
                Thursday. I've drafted a reply with the tracking link.
              </BubbleContent>
            </Bubble>
          ) : null}
        </MessageContent>
      </Message>
      <Button
        className="justify-self-start"
        disabled={!done}
        icon={<RotateCcw />}
        onClick={() => setStep(0)}
        size="sm"
        variant="ghost"
      >
        Run again
      </Button>
    </div>
  );
}
