"use client";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@neomorphic-react/ui/field";
import { Input } from "@neomorphic-react/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@neomorphic-react/ui/select";
import { Textarea } from "@neomorphic-react/ui/textarea";

const topics = [
  { label: "Billing", value: "billing" },
  { label: "Bookings", value: "bookings" },
  { label: "Something else", value: "other" },
];

export default function FieldControls() {
  return (
    <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel>Booking reference</FieldLabel>
        <Input name="reference" placeholder="ABC123" />
      </Field>
      <Field>
        <FieldLabel>Topic</FieldLabel>
        <Select items={topics} name="topic">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a topic" />
          </SelectTrigger>
          <SelectContent>
            {topics.map((topic) => (
              <SelectItem key={topic.value} value={topic.value}>
                {topic.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field>
        <FieldLabel htmlFor="field-controls-message">Message</FieldLabel>
        <Textarea
          aria-describedby="field-controls-hint"
          id="field-controls-message"
          name="message"
        />
        <FieldDescription id="field-controls-hint">
          We reply within one working day.
        </FieldDescription>
      </Field>
    </FieldGroup>
  );
}
