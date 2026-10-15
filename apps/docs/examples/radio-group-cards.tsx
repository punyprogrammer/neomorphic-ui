"use client";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@neomorphic-react/ui/field";
import { RadioGroup, RadioGroupItem } from "@neomorphic-react/ui/radio-group";

const options = [
  {
    value: "standard",
    title: "Standard",
    detail: "4–6 working days",
    price: "Free",
  },
  {
    value: "express",
    title: "Express",
    detail: "1–2 working days",
    price: "$9",
  },
];

export default function RadioGroupCards() {
  return (
    <RadioGroup
      aria-label="Shipping"
      className="w-full max-w-sm gap-4"
      defaultValue="express"
      name="shipping"
    >
      {options.map((option) => (
        <FieldLabel key={option.value}>
          <Field orientation="horizontal">
            <RadioGroupItem value={option.value} />
            <FieldContent>
              <FieldTitle>{option.title}</FieldTitle>
              <FieldDescription>{option.detail}</FieldDescription>
            </FieldContent>
            <span className="font-medium text-foreground tabular-nums">
              {option.price}
            </span>
          </Field>
        </FieldLabel>
      ))}
    </RadioGroup>
  );
}
