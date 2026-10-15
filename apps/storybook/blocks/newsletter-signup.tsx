import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@neomorphic-react/ui/input-group";
import { Surface } from "@neomorphic-react/ui/surface";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@neomorphic-react/ui/toggle-group";
import { cn } from "@neomorphic-react/ui/utils";
import { Check, Mail } from "lucide-react";
import { type FormEvent, useId, useState } from "react";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TOPICS = [
  ["deals", "Deals"],
  ["guides", "Guides"],
  ["events", "Events"],
] as const;

type Status = "idle" | "invalid" | "sending" | "done";

interface NewsletterSignupProps {
  className?: string;
  /** Called with the address and chosen topics; may return a promise. */
  onSubscribe?: (email: string, topics: string[]) => Promise<void> | void;
}

/**
 * The kit's Subscribe card (`3:71`): an email field with a raised Subscribe
 * button in one pill-shaped well, topic chips, and a confirmation once sent.
 */
function NewsletterSignup({ className, onSubscribe }: NewsletterSignupProps) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [topics, setTopics] = useState<string[]>(["deals", "guides"]);
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") {
      return;
    }
    const address = email.trim();
    if (!EMAIL.test(address)) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    await onSubscribe?.(address, topics);
    setStatus("done");
  }

  function handleEmailChange(value: string) {
    setEmail(value);
    if (status === "invalid") {
      setStatus("idle");
    }
  }

  const invalid = status === "invalid";
  const sending = status === "sending";

  return (
    <Surface
      className={cn("grid w-full max-w-md gap-5 rounded-2xl p-6", className)}
      render={<section aria-labelledby={`${id}-title`} />}
    >
      <div className="grid gap-1">
        <h2
          className="font-medium text-foreground text-sm uppercase tracking-wide"
          id={`${id}-title`}
        >
          Subscribe
        </h2>
        <p className="text-muted-foreground text-sm">
          Travel deals and guides, once a week. Unsubscribe any time.
        </p>
      </div>

      {status === "done" ? (
        <p
          className="flex items-center gap-3 text-foreground text-sm"
          role="status"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-success text-success-foreground shadow-neu-sm">
            <Check aria-hidden="true" className="size-4" />
          </span>
          You're subscribed. Check {email.trim()} to confirm.
        </p>
      ) : (
        <form className="grid gap-4" noValidate onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <InputGroup shape="pill" size="lg">
              <InputGroupAddon>
                <Mail />
              </InputGroupAddon>
              <InputGroupInput
                aria-describedby={invalid ? `${id}-error` : undefined}
                aria-invalid={invalid || undefined}
                aria-label="Email"
                autoComplete="email"
                onValueChange={handleEmailChange}
                placeholder="Your email"
                readOnly={sending}
                type="email"
                value={email}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  isLoading={sending}
                  type="submit"
                  variant="primary"
                >
                  Subscribe
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            {invalid ? (
              <p className="px-5 text-destructive text-xs" id={`${id}-error`}>
                Enter a full email address, like ada@example.com.
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span
              className="text-muted-foreground text-xs uppercase tracking-wide"
              id={`${id}-topics`}
            >
              Send me
            </span>
            <ToggleGroup
              aria-labelledby={`${id}-topics`}
              multiple
              onValueChange={setTopics}
              shape="pill"
              size="sm"
              value={topics}
            >
              {TOPICS.map(([value, label]) => (
                <ToggleGroupItem className="px-4" key={value} value={value}>
                  {label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </form>
      )}
    </Surface>
  );
}

export type { NewsletterSignupProps };
export { NewsletterSignup };
