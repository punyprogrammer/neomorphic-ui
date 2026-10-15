"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@neomorphic-react/ui/alert";
import { Badge, BadgeAnchor } from "@neomorphic-react/ui/badge";
import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { Checkbox } from "@neomorphic-react/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@neomorphic-react/ui/field";
import { Input } from "@neomorphic-react/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@neomorphic-react/ui/input-group";
import {
  NativeSelect,
  NativeSelectOption,
} from "@neomorphic-react/ui/native-select";
import { RadioGroup, RadioGroupItem } from "@neomorphic-react/ui/radio-group";
import { Separator } from "@neomorphic-react/ui/separator";
import { Surface } from "@neomorphic-react/ui/surface";
import { Switch } from "@neomorphic-react/ui/switch";
import { toast } from "@neomorphic-react/ui/toast";
import {
  Check,
  CreditCard,
  Lock,
  Mail,
  Phone,
  RotateCcw,
  ShieldCheck,
  Tag,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { PageHeader } from "@/components/page-header";
import { findProduct, usd } from "@/lib/catalog";

const CART = [
  { ...findProduct("begin-mug"), quantity: 2 },
  { ...findProduct("bud-vase"), quantity: 1 },
  { ...findProduct("arc-lamp"), quantity: 1 },
];

const DELIVERY = [
  {
    value: "standard",
    title: "Standard",
    description: "4–6 working days",
    price: 0,
  },
  {
    value: "express",
    title: "Express",
    description: "1–2 working days",
    price: 12,
  },
  {
    value: "pickup",
    title: "Studio pickup",
    description: "Ready tomorrow, Bandra West",
    price: 0,
  },
];

const PAYMENT = [
  { value: "card", title: "Card", description: "Visa, Mastercard, Amex" },
  { value: "upi", title: "UPI", description: "Pay from any UPI app" },
];

const STEPS = ["Cart", "Details", "Payment", "Done"];

type Status = "idle" | "paying" | "paid";

export function Checkout() {
  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("card");
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [status, setStatus] = useState<Status>("idle");

  const subtotal = CART.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = DELIVERY.find((d) => d.value === delivery)?.price ?? 0;
  const tax = Math.round((subtotal - discount) * 0.08 * 100) / 100;
  const total = subtotal - discount + shipping + tax;
  const step = status === "paid" ? 3 : 2;

  function applyPromo() {
    if (promo.trim().toUpperCase() === "CALM10") {
      setDiscount(Math.round(subtotal * 0.1));
      toast.success({
        title: "Code applied",
        description: "10% off your order",
      });
    } else {
      toast.error({
        title: "Code not recognised",
        description: "Try CALM10",
      });
    }
  }

  async function pay(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("paying");
    await new Promise((resolve) => setTimeout(resolve, 1600));
    setStatus("paid");
  }

  return (
    <div className="grid gap-10">
      <PageHeader
        description="Secure checkout. You won't be charged until you place the order."
        eyebrow="Atelier"
        title="Checkout"
      />

      <ol
        aria-label="Checkout steps"
        className="flex flex-wrap items-center gap-3 text-sm"
      >
        {STEPS.map((label, index) => {
          const done = index < step;
          const current = index === step;
          return (
            <li
              aria-current={current ? "step" : undefined}
              className="flex items-center gap-3"
              key={label}
            >
              <Surface
                className={
                  current
                    ? "grid size-8 place-items-center bg-primary font-semibold text-primary-foreground"
                    : "grid size-8 place-items-center font-medium text-muted-foreground"
                }
                depth="sm"
                elevation={done ? "inset" : "raised"}
                shape="circle"
              >
                {done ? (
                  <Check aria-label="Done" className="size-4 text-foreground" />
                ) : (
                  index + 1
                )}
              </Surface>
              <span
                className={
                  current
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                }
              >
                {label}
              </span>
              {index < STEPS.length - 1 ? <Separator className="w-8" /> : null}
            </li>
          );
        })}
      </ol>

      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_24rem]">
        {status === "paid" ? (
          <Card>
            <CardContent className="grid gap-6 py-4">
              <Alert variant="success">
                <ShieldCheck />
                <AlertTitle>Order placed</AlertTitle>
                <AlertDescription>
                  Order #AT-2093 is confirmed. A receipt for {usd.format(total)}{" "}
                  is on its way to your inbox.
                </AlertDescription>
              </Alert>
              <Button
                className="justify-self-start"
                onClick={() => setStatus("idle")}
              >
                Start again
              </Button>
            </CardContent>
          </Card>
        ) : (
          <form className="grid gap-10" onSubmit={pay}>
            <FieldSet>
              <FieldLegend>Contact</FieldLegend>
              <FieldGroup>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <Mail />
                    </InputGroupAddon>
                    <InputGroupInput
                      autoComplete="email"
                      defaultValue="amara@example.com"
                      required
                      type="email"
                    />
                  </InputGroup>
                  <FieldError match="valueMissing">
                    We need an email for the receipt
                  </FieldError>
                </Field>
                <label className="flex cursor-pointer items-center gap-3 text-foreground text-sm">
                  <Checkbox defaultChecked size="sm" />
                  Email me about new collections
                </label>
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldLegend>Shipping address</FieldLegend>
              <FieldGroup>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field>
                    <FieldLabel>First name</FieldLabel>
                    <Input
                      autoComplete="given-name"
                      defaultValue="Amara"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Last name</FieldLabel>
                    <Input
                      autoComplete="family-name"
                      defaultValue="Okafor"
                      required
                    />
                  </Field>
                </div>
                <Field>
                  <FieldLabel>Address</FieldLabel>
                  <Input
                    autoComplete="street-address"
                    defaultValue="14 Hill Road"
                    required
                  />
                </Field>
                <div className="grid gap-5 sm:grid-cols-3">
                  <Field>
                    <FieldLabel>City</FieldLabel>
                    <Input
                      autoComplete="address-level2"
                      defaultValue="Mumbai"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Postcode</FieldLabel>
                    <Input
                      autoComplete="postal-code"
                      defaultValue="400050"
                      inputMode="numeric"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Country</FieldLabel>
                    <NativeSelect autoComplete="country-name" defaultValue="IN">
                      <NativeSelectOption value="IN">India</NativeSelectOption>
                      <NativeSelectOption value="GB">
                        United Kingdom
                      </NativeSelectOption>
                      <NativeSelectOption value="US">
                        United States
                      </NativeSelectOption>
                      <NativeSelectOption value="DE">
                        Germany
                      </NativeSelectOption>
                    </NativeSelect>
                  </Field>
                </div>
                <Field>
                  <FieldLabel>Phone</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <Phone />
                    </InputGroupAddon>
                    <InputGroupInput
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                      type="tel"
                    />
                  </InputGroup>
                  <FieldDescription>
                    Only for delivery updates.
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldLegend>Delivery</FieldLegend>
              <RadioGroup
                className="grid gap-4"
                onValueChange={(value) => setDelivery(value as string)}
                value={delivery}
              >
                {DELIVERY.map((option) => (
                  <FieldLabel key={option.value}>
                    <Field orientation="horizontal">
                      <RadioGroupItem value={option.value} />
                      <FieldContent>
                        <FieldTitle>{option.title}</FieldTitle>
                        <FieldDescription>
                          {option.description}
                        </FieldDescription>
                      </FieldContent>
                      <span className="font-medium text-foreground tabular-nums">
                        {option.price ? usd.format(option.price) : "Free"}
                      </span>
                    </Field>
                  </FieldLabel>
                ))}
              </RadioGroup>
            </FieldSet>

            <FieldSet>
              <FieldLegend>Payment</FieldLegend>
              <FieldGroup>
                <RadioGroup
                  className="grid gap-4 sm:grid-cols-2"
                  onValueChange={(value) => setPayment(value as string)}
                  value={payment}
                >
                  {PAYMENT.map((option) => (
                    <FieldLabel key={option.value}>
                      <Field orientation="horizontal">
                        <RadioGroupItem value={option.value} />
                        <FieldContent>
                          <FieldTitle>{option.title}</FieldTitle>
                          <FieldDescription>
                            {option.description}
                          </FieldDescription>
                        </FieldContent>
                      </Field>
                    </FieldLabel>
                  ))}
                </RadioGroup>

                {payment === "card" ? (
                  <>
                    <Field>
                      <FieldLabel>Card number</FieldLabel>
                      <InputGroup>
                        <InputGroupAddon>
                          <CreditCard />
                        </InputGroupAddon>
                        <InputGroupInput
                          autoComplete="cc-number"
                          inputMode="numeric"
                          placeholder="1234 1234 1234 1234"
                          required
                        />
                        <InputGroupAddon align="inline-end">
                          <Lock />
                        </InputGroupAddon>
                      </InputGroup>
                    </Field>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field>
                        <FieldLabel>Expiry</FieldLabel>
                        <Input
                          autoComplete="cc-exp"
                          placeholder="MM / YY"
                          required
                        />
                      </Field>
                      <Field>
                        <FieldLabel>Security code</FieldLabel>
                        <Input
                          autoComplete="cc-csc"
                          inputMode="numeric"
                          placeholder="CVC"
                          required
                        />
                      </Field>
                    </div>
                  </>
                ) : (
                  <Field>
                    <FieldLabel>UPI ID</FieldLabel>
                    <Input placeholder="name@bank" required />
                    <FieldDescription>
                      You'll approve the payment in your UPI app.
                    </FieldDescription>
                  </Field>
                )}

                <Field orientation="horizontal">
                  <Switch defaultChecked />
                  <FieldContent>
                    <FieldLabel>Billing address same as shipping</FieldLabel>
                  </FieldContent>
                </Field>
              </FieldGroup>
            </FieldSet>

            <Button
              fullWidth
              icon={<Lock />}
              isLoading={status === "paying"}
              size="lg"
              type="submit"
              variant="primary"
            >
              Pay {usd.format(total)}
            </Button>
          </form>
        )}

        <Card
          className="lg:sticky lg:top-6"
          render={<aside aria-label="Order summary" />}
        >
          <CardHeader>
            <CardTitle>Order summary</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5">
            <ul className="grid gap-5">
              {CART.map((item) => (
                <li className="flex items-center gap-4" key={item.id}>
                  <BadgeAnchor>
                    <Surface className="p-1" depth="sm">
                      <span className="relative block size-16 overflow-hidden rounded-[calc(var(--radius)*0.8)]">
                        <Image
                          alt=""
                          className="object-cover"
                          fill
                          sizes="64px"
                          src={item.photo.src}
                        />
                      </span>
                    </Surface>
                    <Badge
                      count={item.quantity}
                      placement="top-end"
                      variant="primary"
                    />
                  </BadgeAnchor>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-foreground">
                      {item.name}
                      <span className="sr-only">
                        , quantity {item.quantity}
                      </span>
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {item.variant}
                    </p>
                  </div>
                  <span className="font-medium text-foreground tabular-nums">
                    {usd.format(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <InputGroup>
              <InputGroupAddon>
                <Tag />
              </InputGroupAddon>
              <InputGroupInput
                aria-label="Promo code"
                onChange={(event) => setPromo(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    applyPromo();
                  }
                }}
                placeholder="Promo code (try CALM10)"
                value={promo}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton disabled={!promo.trim()} onClick={applyPromo}>
                  Apply
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>

            <Separator variant="perforated" />

            <dl className="grid gap-2.5 text-sm">
              <SummaryRow label="Subtotal" value={usd.format(subtotal)} />
              {discount ? (
                <SummaryRow
                  label="Discount (CALM10)"
                  value={`−${usd.format(discount)}`}
                />
              ) : null}
              <SummaryRow
                label="Shipping"
                value={shipping ? usd.format(shipping) : "Free"}
              />
              <SummaryRow label="Estimated tax" value={usd.format(tax)} />
            </dl>
            <Separator />
            <div className="flex items-baseline justify-between">
              <span className="text-muted-foreground">Total</span>
              <span className="font-semibold text-2xl text-foreground tabular-nums">
                {usd.format(total)}
              </span>
            </div>
          </CardContent>
          <CardFooter className="gap-2 text-muted-foreground text-xs">
            <RotateCcw aria-hidden="true" className="size-3.5" />
            Free returns within 30 days
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-foreground tabular-nums">{value}</dd>
    </div>
  );
}
