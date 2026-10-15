"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@neomorphic-react/ui/field";
import { Input } from "@neomorphic-react/ui/input";
import { RadioGroup, RadioGroupItem } from "@neomorphic-react/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@neomorphic-react/ui/select";
import { Switch } from "@neomorphic-react/ui/switch";

const cabins = [
  { label: "Economy", value: "economy" },
  { label: "Premium economy", value: "premium" },
  { label: "Business", value: "business" },
];

export default function FieldInContext() {
  return (
    <form
      className="w-full max-w-md"
      onSubmit={(event) => event.preventDefault()}
    >
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Passenger</FieldLegend>
          <FieldDescription>As printed on the passport.</FieldDescription>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel>First name</FieldLabel>
              <Input autoComplete="given-name" name="first-name" />
            </Field>
            <Field>
              <FieldLabel>Last name</FieldLabel>
              <Input autoComplete="family-name" name="last-name" />
            </Field>
          </div>
          <Field>
            <FieldLabel>Cabin</FieldLabel>
            <Select defaultValue="economy" items={cabins} name="cabin">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cabins.map((cabin) => (
                  <SelectItem key={cabin.value} value={cabin.value}>
                    {cabin.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </FieldSet>
        <FieldSeparator>Preferences</FieldSeparator>
        <FieldSet>
          <FieldLegend variant="label">Seat</FieldLegend>
          <RadioGroup className="flex gap-6" defaultValue="window" name="seat">
            {["Window", "Aisle"].map((seat) => (
              <Field className="w-auto" key={seat} orientation="horizontal">
                <RadioGroupItem value={seat.toLowerCase()} />
                <FieldLabel>{seat}</FieldLabel>
              </Field>
            ))}
          </RadioGroup>
        </FieldSet>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel>Trip updates</FieldLabel>
            <FieldDescription>
              Gate changes and delays by email.
            </FieldDescription>
          </FieldContent>
          <Switch defaultChecked name="updates" />
        </Field>
        <Button type="submit" variant="primary">
          Save passenger
        </Button>
      </FieldGroup>
    </form>
  );
}
