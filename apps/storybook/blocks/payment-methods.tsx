import { Badge } from "@neomorphic-ui/react/badge";
import { Button } from "@neomorphic-ui/react/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@neomorphic-ui/react/card";
import { Checkbox } from "@neomorphic-ui/react/checkbox";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@neomorphic-ui/react/item";
import { RadioGroup, RadioGroupItem } from "@neomorphic-ui/react/radio-group";
import { Separator } from "@neomorphic-ui/react/separator";
import { cn } from "@neomorphic-ui/react/utils";
import { Check, CreditCard, Plus } from "lucide-react";
import { useId, useState } from "react";

interface PaymentCard {
  brand: string;
  expires: string;
  /** Shows an "Expires soon" warning. */
  expiring?: boolean;
  id: string;
  last4: string;
  /** Tints the card icon. */
  tone: string;
}

const CARDS: PaymentCard[] = [
  {
    id: "visa",
    brand: "Visa",
    last4: "4242",
    expires: "08/28",
    tone: "text-[oklch(0.45_0.15_265)]",
  },
  {
    id: "mastercard",
    brand: "Mastercard",
    last4: "5100",
    expires: "11/26",
    expiring: true,
    tone: "text-[oklch(0.55_0.18_40)]",
  },
  {
    id: "amex",
    brand: "Amex",
    last4: "0005",
    expires: "03/30",
    tone: "text-[oklch(0.5_0.12_230)]",
  },
];

type Status = "idle" | "paying" | "paid";

interface PaymentMethodsProps {
  amount?: number;
  cards?: PaymentCard[];
  className?: string;
  defaultCard?: string;
  onAddCard?: () => void;
  /** Called with the chosen card; may return a promise. */
  onPay?: (card: PaymentCard, saveAsDefault: boolean) => Promise<void> | void;
}

/**
 * The kit's credit cards (`3:731`) as a checkout step: saved cards in a
 * `RadioGroup` of raised rows (the chosen one presses in), a total, a "Save
 * as default" `Checkbox`, and a Pay button naming the chosen card.
 */
function PaymentMethods({
  amount = 248,
  cards = CARDS,
  className,
  defaultCard = cards[0]?.id,
  onAddCard,
  onPay,
}: PaymentMethodsProps) {
  const id = useId();
  const [selected, setSelected] = useState(defaultCard);
  const [saveAsDefault, setSaveAsDefault] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const card =
    cards.find((c) => c.id === selected) ?? (cards[0] as PaymentCard);
  const total = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  async function pay() {
    if (status !== "idle") {
      return;
    }
    setStatus("paying");
    await onPay?.(card, saveAsDefault);
    setStatus("paid");
  }

  return (
    <Card
      className={cn("w-96", className)}
      render={<section aria-labelledby={`${id}-title`} />}
    >
      <CardHeader className="items-center">
        <CardTitle>
          <h2 id={`${id}-title`}>Payment method</h2>
        </CardTitle>
        <CardAction>
          <Button
            aria-label="Add card"
            icon={<Plus />}
            onClick={onAddCard}
            size="sm"
          />
        </CardAction>
      </CardHeader>

      <CardContent>
        <RadioGroup
          aria-labelledby={`${id}-title`}
          onValueChange={(value) => setSelected(value as string)}
          readOnly={status !== "idle"}
          value={selected}
        >
          {cards.map((c) => (
            <Item
              className="cursor-pointer has-data-checked:inset-shadow-neu-sm has-data-checked:bg-background has-data-checked:shadow-neu-flat"
              key={c.id}
              render={<label />}
              variant="raised"
            >
              <RadioGroupItem
                aria-describedby={
                  c.expiring
                    ? `${id}-${c.id}-expiry ${id}-${c.id}-warning`
                    : `${id}-${c.id}-expiry`
                }
                aria-labelledby={`${id}-${c.id}-name`}
                value={c.id}
              />
              <ItemMedia variant="icon">
                <CreditCard className={c.tone} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle id={`${id}-${c.id}-name`}>
                  {c.brand}{" "}
                  <span className="text-muted-foreground tabular-nums">
                    <span aria-hidden="true">•••• </span>
                    <span className="sr-only">ending in </span>
                    {c.last4}
                  </span>
                </ItemTitle>
                <ItemDescription id={`${id}-${c.id}-expiry`}>
                  Expires {c.expires}
                </ItemDescription>
              </ItemContent>
              {c.expiring ? (
                <ItemActions>
                  <Badge
                    id={`${id}-${c.id}-warning`}
                    size="sm"
                    variant="warning"
                  >
                    Expires soon
                  </Badge>
                </ItemActions>
              ) : null}
            </Item>
          ))}
        </RadioGroup>
      </CardContent>

      <CardContent className="grid gap-4">
        <Separator />
        <div className="flex items-baseline justify-between">
          <span className="text-muted-foreground">Total</span>
          <span className="font-semibold text-foreground text-xl tabular-nums">
            {total}
          </span>
        </div>
        <label className="flex cursor-pointer items-center gap-3 text-foreground">
          <Checkbox
            checked={saveAsDefault}
            onCheckedChange={setSaveAsDefault}
            readOnly={status !== "idle"}
            size="sm"
          />
          Save as default card
        </label>
      </CardContent>

      <CardFooter>
        {status === "paid" ? (
          <p
            className="flex h-10 w-full items-center justify-center gap-2 font-medium text-foreground"
            role="status"
          >
            <span className="inline-flex size-5 items-center justify-center rounded-full bg-success text-success-foreground">
              <Check aria-hidden="true" className="size-3.5" />
            </span>
            Paid {total} with {card.brand} ending in {card.last4}
          </p>
        ) : (
          <Button
            className="w-full"
            isLoading={status === "paying"}
            onClick={pay}
            size="lg"
            variant="primary"
          >
            Pay {total} with {card.brand}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export type { PaymentCard, PaymentMethodsProps };
export { PaymentMethods };
