import { Avatar, AvatarBadge, AvatarImage } from "@neomorphic-ui/react/avatar";
import { Button } from "@neomorphic-ui/react/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@neomorphic-ui/react/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@neomorphic-ui/react/input-group";
import { Separator } from "@neomorphic-ui/react/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@neomorphic-ui/react/tooltip";
import { cn } from "@neomorphic-ui/react/utils";
import { Paperclip, Phone, SendHorizontal, Video } from "lucide-react";
import {
  type KeyboardEvent,
  type ReactElement,
  type SyntheticEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { portrait } from "./images";

interface Message {
  from: "me" | "them";
  id: number;
  text: string;
  time: string;
}

const MESSAGES: Message[] = [
  {
    id: 1,
    from: "them",
    text: "Morning! Did you get the tickets for Saturday?",
    time: "09:12",
  },
  { id: 2, from: "me", text: "Yes, two seats in row F.", time: "09:14" },
  {
    id: 3,
    from: "them",
    text: "Perfect. Dinner before the show?",
    time: "09:15",
  },
];

const clock = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
});

interface ChatThreadProps {
  className?: string;
  /** The other person's name. */
  contact?: string;
  defaultMessages?: Message[];
  onSend?: (text: string) => void;
  /** The other person's answer to each message you send; none if omitted. */
  reply?: (text: string) => string | undefined;
  /** Delay before the reply arrives, in milliseconds. */
  replyDelay?: number;
}

function IconAction({ icon, label }: { icon: ReactElement; label: string }) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button aria-label={label} icon={icon} shape="pill" size="sm" />
        }
      />
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

/**
 * The kit's chat app (`3:731`): a contact header with call actions, a message
 * log with raised incoming and primary outgoing bubbles, and a pill-shaped
 * composer. Enter sends; Shift+Enter starts a new line.
 */
function ChatThread({
  className,
  contact = "Maya Chen",
  defaultMessages = MESSAGES,
  onSend,
  reply,
  replyDelay = 1200,
}: ChatThreadProps) {
  const id = useId();
  const [messages, setMessages] = useState(defaultMessages);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const nextId = useRef(defaultMessages.length + 1);
  const log = useRef<HTMLDivElement>(null);
  const first = contact.split(" ")[0];

  function append(from: Message["from"], text: string) {
    const message = {
      id: nextId.current++,
      from,
      text,
      time: clock.format(new Date()),
    };
    setMessages((current) => [...current, message]);
  }

  function send(event: SyntheticEvent) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) {
      return;
    }
    append("me", text);
    setDraft("");
    onSend?.(text);
    const answer = reply?.(text);
    if (answer) {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        append("them", answer);
      }, replyDelay);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      send(event);
    }
  }

  // Keep the newest message in view.
  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll whenever the log grows
  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight });
  }, [messages.length, typing]);

  return (
    <Card
      className={cn("w-96 gap-4", className)}
      render={<section aria-labelledby={`${id}-name`} />}
    >
      <CardHeader className="flex items-center gap-3">
        <Avatar>
          <AvatarImage alt="" src={portrait(330)} />
          <AvatarBadge />
        </Avatar>
        <div className="grid flex-1 gap-0.5">
          <h2 className="font-medium text-foreground" id={`${id}-name`}>
            {contact}
          </h2>
          <span className="text-muted-foreground text-xs">Online</span>
        </div>
        <TooltipProvider>
          <div className="flex gap-3">
            <IconAction icon={<Phone />} label="Voice call" />
            <IconAction icon={<Video />} label="Video call" />
          </div>
        </TooltipProvider>
      </CardHeader>

      <Separator />

      <CardContent>
        <div
          aria-label={`Conversation with ${contact}`}
          className="-mx-2 h-80 overflow-y-auto scroll-smooth px-2 py-1 outline-none focus-visible:outline-2 focus-visible:outline-ring/50"
          ref={log}
          role="log"
          // biome-ignore lint/a11y/noNoninteractiveTabindex: a scrolling region must be reachable by keyboard
          tabIndex={0}
        >
          <ol className="grid gap-3">
            {messages.length > 0 ? (
              <li
                aria-hidden="true"
                className="flex items-center gap-3 text-muted-foreground text-xs"
              >
                <Separator className="flex-1" />
                Today
                <Separator className="flex-1" />
              </li>
            ) : null}
            {messages.map((message) => {
              const mine = message.from === "me";
              return (
                <li
                  className={cn(
                    "grid max-w-[80%] gap-1",
                    mine
                      ? "justify-items-end justify-self-end"
                      : "justify-self-start"
                  )}
                  key={message.id}
                >
                  <p
                    className={cn(
                      "whitespace-pre-wrap rounded-2xl px-4 py-2.5 leading-snug",
                      mine
                        ? "inset-shadow-neu-flat rounded-br-sm bg-primary text-primary-foreground shadow-neu-sm"
                        : "inset-shadow-neu-flat rounded-bl-sm bg-neu-convex text-foreground shadow-neu-sm"
                    )}
                  >
                    <span className="sr-only">{`${mine ? "You" : first}: `}</span>
                    {message.text}
                  </p>
                  <time className="px-1 text-muted-foreground text-xs tabular-nums">
                    {message.time}
                  </time>
                </li>
              );
            })}
            {typing ? (
              <li className="justify-self-start">
                <span className="inset-shadow-neu-flat flex items-center gap-1 rounded-2xl rounded-bl-sm bg-neu-convex px-4 py-3.5 shadow-neu-sm">
                  <span className="sr-only">{first} is typing</span>
                  {[0, 150, 300].map((delay) => (
                    <span
                      aria-hidden="true"
                      className="size-1.5 animate-bounce rounded-full bg-muted-foreground motion-reduce:animate-none"
                      key={delay}
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </span>
              </li>
            ) : null}
          </ol>
        </div>
      </CardContent>

      <CardFooter>
        <form className="w-full" onSubmit={send}>
          <InputGroup shape="pill">
            <InputGroupAddon>
              <InputGroupButton
                aria-label="Attach a file"
                icon={<Paperclip />}
              />
            </InputGroupAddon>
            <InputGroupTextarea
              aria-label={`Message ${contact}`}
              className="max-h-32"
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message…"
              rows={1}
              value={draft}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                aria-label="Send"
                icon={<SendHorizontal />}
                type="submit"
                variant="primary"
              />
            </InputGroupAddon>
          </InputGroup>
        </form>
      </CardFooter>
    </Card>
  );
}

export type { ChatThreadProps, Message };
export { ChatThread };
