"use client";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@neomorphic-react/ui/field";
import { RadioGroup, RadioGroupItem } from "@neomorphic-react/ui/radio-group";

const seats = [
  { value: "window", title: "Window", description: "Rows 1–30, seats A and F" },
  { value: "aisle", title: "Aisle", description: "Rows 1–30, seats C and D" },
  { value: "any", title: "No preference", description: "Assigned at check-in" },
];

export default function RadioGroupField() {
  return (
    <FieldSet className="w-full max-w-sm">
      <FieldLegend variant="label">Seat</FieldLegend>
      <RadioGroup defaultValue="window" name="seat">
        {seats.map((seat) => (
          <Field key={seat.value} orientation="horizontal">
            <RadioGroupItem value={seat.value} />
            <FieldContent>
              <FieldLabel>{seat.title}</FieldLabel>
              <FieldDescription>{seat.description}</FieldDescription>
            </FieldContent>
          </Field>
        ))}
      </RadioGroup>
    </FieldSet>
  );
}
