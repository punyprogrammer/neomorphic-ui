"use client";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@neomorphic-react/ui/field";
import { Input } from "@neomorphic-react/ui/input";
import { RadioGroup, RadioGroupItem } from "@neomorphic-react/ui/radio-group";
import { useState } from "react";

const methods = [
  { value: "card", title: "Card", description: "Visa, Mastercard, Amex" },
  { value: "upi", title: "UPI", description: "Pay from your bank app" },
];

export default function RadioGroupInContext() {
  const [method, setMethod] = useState("card");

  return (
    <FieldSet className="w-full max-w-md">
      <FieldLegend>Payment</FieldLegend>
      <FieldGroup>
        <RadioGroup
          aria-label="Payment method"
          className="grid gap-4 sm:grid-cols-2"
          onValueChange={setMethod}
          value={method}
        >
          {methods.map((option) => (
            <FieldLabel key={option.value}>
              <Field orientation="horizontal">
                <RadioGroupItem value={option.value} />
                <FieldContent>
                  <FieldTitle>{option.title}</FieldTitle>
                  <FieldDescription>{option.description}</FieldDescription>
                </FieldContent>
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>
        {method === "card" ? (
          <Field>
            <FieldLabel>Card number</FieldLabel>
            <Input
              autoComplete="cc-number"
              inputMode="numeric"
              placeholder="1234 1234 1234 1234"
            />
          </Field>
        ) : (
          <Field>
            <FieldLabel>UPI ID</FieldLabel>
            <Input placeholder="name@bank" />
            <FieldDescription>
              You'll approve the payment in your UPI app.
            </FieldDescription>
          </Field>
        )}
      </FieldGroup>
    </FieldSet>
  );
}
