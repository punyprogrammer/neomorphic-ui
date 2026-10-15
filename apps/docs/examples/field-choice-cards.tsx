"use client";

import { Checkbox } from "@neomorphic-react/ui/checkbox";
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

const extras = [
  { id: "bag", title: "Extra bag", description: "23 kg in the hold, £35" },
  { id: "seat", title: "Extra legroom", description: "Exit row seat, £24" },
  {
    id: "lounge",
    title: "Lounge access",
    description: "Before departure, £30",
  },
];

export default function FieldChoiceCards() {
  return (
    <FieldSet className="w-full max-w-sm">
      <FieldLegend variant="label">Add to your trip</FieldLegend>
      <FieldDescription>Prices are per passenger, each way.</FieldDescription>
      <FieldGroup className="gap-4">
        {extras.map((extra) => (
          <FieldLabel key={extra.id}>
            <Field orientation="horizontal">
              <Checkbox defaultChecked={extra.id === "bag"} name={extra.id} />
              <FieldContent>
                <FieldTitle>{extra.title}</FieldTitle>
                <FieldDescription>{extra.description}</FieldDescription>
              </FieldContent>
            </Field>
          </FieldLabel>
        ))}
      </FieldGroup>
    </FieldSet>
  );
}
